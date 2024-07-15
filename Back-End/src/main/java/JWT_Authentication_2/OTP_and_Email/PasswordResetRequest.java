package JWT_Authentication_2.OTP_and_Email;

public class PasswordResetRequest {
    private String username;
    private String otp;
    private String newPassword;

    public PasswordResetRequest(String username, String otp, String newPassword) {
        this.username = username;
        this.otp = otp;
        this.newPassword = newPassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}