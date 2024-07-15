package JWT_Authentication_2;


import JWT_Authentication_2.JWT_Classes.AuthEntryPointJwt;
import JWT_Authentication_2.JWT_Classes.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {


    @Autowired
    DataSource dataSource;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;


    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }


    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorizeRequests ->
                authorizeRequests.
                        requestMatchers(
                        "/register","/signin","/forgot-password/**","/reset-password"
                        ).permitAll()
                        .anyRequest().authenticated());

        http.sessionManagement(
                session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS)
        );

        http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));
        http.csrf(AbstractHttpConfigurer::disable);    //http.csrf(csrf -> csrf.disable());
        http.cors(AbstractHttpConfigurer::disable);   //http.cors(cors->cors.disable());
        http.addFilterBefore(authenticationJwtTokenFilter(),
                UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService(){
        return new JdbcUserDetailsManager(dataSource);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }

}


//@Bean
//public UserDetailsService userDetailsService(){
//
////        UserDetails user1= User.withUsername("user")
////                .password(passwordEncoder().encode("123"))
////                .roles("USER")
////                .build();
////
////        UserDetails admin1= User.withUsername("admin")
////                .password(passwordEncoder().encode("123"))
////                .roles("ADMIN")
////                .build();
////
////                UserDetails admin2= User.withUsername("krishna")
////                .password(passwordEncoder().encode("123"))
////                .roles("ADMIN")
////                .build();
//
//    JdbcUserDetailsManager userDetailsManager=new JdbcUserDetailsManager(dataSource);
////        userDetailsManager.createUser(user1);
////        userDetailsManager.createUser(admin1);
////        userDetailsManager.createUser(admin2);
//
//    return userDetailsManager;
//}

//
//
//@Bean
//SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
//    http.authorizeHttpRequests(authorizeRequests ->
//            authorizeRequests.requestMatchers(
//                            "/register","/signin","/forgot-password/**","/reset-password"
//                    ).permitAll()
//                    .anyRequest().authenticated());
//
//    http.sessionManagement(
//            session ->
//                    session.sessionCreationPolicy(
//                            SessionCreationPolicy.STATELESS)
//    );
//
//    http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));
//    http.csrf(csrf -> csrf.disable());
//    http.addFilterBefore(authenticationJwtTokenFilter(),
//            UsernamePasswordAuthenticationFilter.class);
//
//    return http.build();
//}
