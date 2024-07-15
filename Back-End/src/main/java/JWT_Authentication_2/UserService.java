package JWT_Authentication_2;

import JWT_Authentication_2.OTP_and_Email.EmailService;
import JWT_Authentication_2.OTP_and_Email.OtpStorageService;
import JWT_Authentication_2.OTP_and_Email.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {
    private static final String DEFAULT_ROLE = "USER";

    @Autowired
    private JdbcUserDetailsManager jdbcUserDetailsManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private OtpStorageService otpStorageService;

    @Autowired
    private EmailService emailService;

    public UserService() {
    }

    public String registerNewUser(String username, String password, String email) {
        // Check if user with username already exists
        if (jdbcUserDetailsManager.userExists(username)) {
            return "User already exists";
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return "Invalid email format";
        }

//        if (isEmailAlreadyRegistered(email)) {
//            return "Email is already in use";
//        }

        // Create UserDetails object with username, password, and role
        UserDetails user = User.withUsername(username)
                .password(passwordEncoder.encode(password))
                .roles(DEFAULT_ROLE)
                .build();

        // Create user using JdbcUserDetailsManager
        jdbcUserDetailsManager.createUser(user);

        // Save the email in the users table
        saveUserEmail(username, email);

        return "The user has been added\nUsername: " + username + "\nEmail: " + email + "\n";

    }

    // Email format validation using regex
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }


    private void saveUserEmail(String username, String email) {
        String sql = "UPDATE users SET email = ? WHERE username = ?";
        jdbcTemplate.update(sql, email, username);
    }


    // Check if email is already registered
    private boolean isEmailAlreadyRegistered(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

    public boolean sendOtpToUser(String username) {

        if (!jdbcUserDetailsManager.userExists(username)) {
            //return "There is no such user: "+username;
            return false;
        }
        // Fetch user email from the database
        String email = getEmailByUsername(username);
        if (email != null) {
            // Generate OTP
            String otp = OtpUtil.generateOtp();

            // Store OTP temporarily
            otpStorageService.storeOtp(username, otp);

            // Send OTP to user email
            emailService.sendOtpEmail(email, otp);
        } else {
            //return ("No email found for username: Mr/Ms " + username);
            return false;
        }

       // return ("OTP has been sent to your email. Mr/Ms " + username);
        return true;
    }

    private String getEmailByUsername(String username) {
        String sql = "SELECT email FROM users WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{username}, String.class);
    }


    public boolean validateOtpAndResetPassword(String username, String otpEnteredByUser, String newPassword) {
        String storedOtp = otpStorageService.getOtp(username);
        // Check if there's a stored OTP for the username
        if (storedOtp != null) {
            // Compare the OTP entered by the user with the stored OTP
            if (storedOtp.equals(otpEnteredByUser)) {
                // OTP matches, now check if it's still valid
                if (isOtpValid(username)) {
                    // Reset the password
                    updateUserPassword(username, newPassword);
                    // Remove OTP from storage after successful password reset
                    otpStorageService.removeOtp(username);
                    return true; // Password reset successfully
                } else {
                    // OTP expired, remove it from storage
                    otpStorageService.removeOtp(username);
                    return false; // OTP expired
                }
            } else {
                return false; // OTP does not match
            }
        } else {
            return false; // No OTP found for the username
        }
    }


    private void updateUserPassword(String username, String newPassword) {
        String encodedPassword = passwordEncoder.encode(newPassword);
        String sql = "UPDATE users SET password = ? WHERE username = ?";
        jdbcTemplate.update(sql, encodedPassword, username);
    }

//    private void updateUserPassword(String username, String newPassword) {
//        String encodedPassword = passwordEncoder.encode(newPassword);
//        jdbcUserDetailsManager.changePassword(username, encodedPassword);
//    }

    private boolean isOtpValid(String username) {
        Long otpExpiryTime = otpStorageService.getOtpExpiry(username);
        return otpExpiryTime != null && otpExpiryTime > System.currentTimeMillis();
    }
}
