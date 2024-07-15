# JWT-APP-FRONT_END-BACK_END

This project is a web application with a Spring Boot backend and a React frontend. The application features user authentication, including password reset functionality using OTP.

## Technologies Used

### Backend
- **Java**
- **Spring Boot**
- **Spring Security**
- **JWT (JSON Web Token)**
- **JPA (Java Persistence API)**
- **MySQL** (or any relational database)
- **Maven**

### Frontend
- **React**
- **React Router**
- **Formik**
- **Yup**
- **Axios**
- **React Toastify**
- **CSS**

## Backend

The backend is built using Spring Boot and provides RESTful endpoints for user registration, authentication, and password reset functionality. The backend also includes role-based access control.

### Endpoints

- `POST /register`: Register a new user.
- `POST /signin`: Authenticate a user and generate a JWT token.
- `GET /hello`: Public endpoint accessible by any user.
- `GET /user`: Endpoint accessible only by users with `ROLE_USER`.
- `GET /admin`: Endpoint accessible only by users with `ROLE_ADMIN`.
- `POST /forgot-password/{username}`: Send an OTP to the user's registered email.
- `POST /reset-password`: Reset the user's password using the OTP.

### Important Files

- `Application.java`: Main class to run the Spring Boot application.
- `UserController.java`: Controller class handling user-related requests.
- `SecurityConfig.java`: Configures Spring Security and JWT.
- `UserService.java`: Service class handling business logic for user management.
- `JwtUtils.java`: Utility class for generating and validating JWT tokens.

## Frontend

The frontend is built using React and provides a user interface for registration, login, and password reset functionalities.

### Components

- `Register.js`: Component for user registration.
- `Login.js`: Component for user login.
- `ForgotPassword.js`: Component for initiating the password reset process.
- `ResetPassword.js`: Component for resetting the password using OTP.
- `Hello.js`: Public component accessible by any user.
- `User.js`: Component accessible only by users with `ROLE_USER`.
- `Admin.js`: Component accessible only by users with `ROLE_ADMIN`.

### Styles

- Custom CSS files for styling components.

## Setup Instructions

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo/backend
    ```

2. Configure the database in `application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your-database
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    spring.jpa.hibernate.ddl-auto=update
    ```

3. Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

3. Run the React application:
    ```bash
    npm start
    ```

## Usage

1. Access the application in your web browser at `http://localhost:3000`.
2. Register a new user.
3. Log in with the registered user credentials to obtain a JWT token.
4. Use the JWT token to access protected routes (`/user` and `/admin`).
5. Use the forgot password functionality to reset the password using OTP.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
