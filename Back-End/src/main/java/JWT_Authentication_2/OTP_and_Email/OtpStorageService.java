package JWT_Authentication_2.OTP_and_Email;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
public class OtpStorageService {

    private final ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> otpExpiry = new ConcurrentHashMap<>();
    private static final long OTP_VALIDITY_DURATION = TimeUnit.MINUTES.toMillis(5); // 5 minutes

    public void storeOtp(String username, String otp) {
        otpStorage.put(username, otp);
        otpExpiry.put(username, System.currentTimeMillis() + OTP_VALIDITY_DURATION);
    }

    public String getOtp(String username) {
        if (otpExpiry.containsKey(username) && otpExpiry.get(username) > System.currentTimeMillis()) {
            return otpStorage.get(username);
        } else {
            otpStorage.remove(username);
            otpExpiry.remove(username);
            return null;
        }
    }

    public void removeOtp(String username) {
        otpStorage.remove(username);
        otpExpiry.remove(username);
    }

    public Long getOtpExpiry(String username) {
        System.out.println("\n\n\n======>"+otpExpiry+"    \n\n\n\n");
        return otpExpiry.get(username);
    }
}
