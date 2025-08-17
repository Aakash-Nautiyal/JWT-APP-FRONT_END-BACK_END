# 🌐 JWT SecureAuth — Full Stack Web Authentication App

A full-stack web application that combines a secure **Spring Boot (Java)** backend with a modern **React** frontend. This project features **JWT-based authentication**, **role-based access control**, **password reset via OTP**, and **multi-language support (i18n)** — all in one sleek UI.

## ✨ Features

* 🔐 User authentication with JWT
* 👤 Role-based access (Admin / User)
* 📧 Password reset using OTP via email
* 🌍 Multi-language support (i18n) — English, Hindi, Spanish, Mandarin, Arabic
* 🎨 Responsive UI with smooth animations
* 📂 Cleanly structured backend (Spring Boot + JPA)
* ⚛️ Frontend built using modern React practices (Formik, Yup, Toastify)

---

## 💠 Tech Stack

### 🚀 Backend (Spring Boot)

* Java 17+
* Spring Boot
* Spring Security (JWT-based)
* JPA (Hibernate)
* MySQL (or any RDBMS)
* JavaMailSender (for OTP via email)
* Maven

### 💻 Frontend (React)

* React 18+
* React Router
* Formik & Yup
* Axios
* React Toastify
* Framer Motion (animations)
* i18next (for localization)

---

## 🌐 Internationalization (i18n)

**Supported Languages:**

* English 🇺🇸
* Hindi 🇮🇳
* Spanish 🇪🇸
* Arabic 🇸🇦
* Mandarin 🇨🇳

Users can select their preferred language using a language switcher (globe icon 🌐). All pages will dynamically update text based on selection.

---

## 📁 Project Structure

```
├── backend/
│   ├── src/main/java/.../controller
│   ├── src/main/java/.../service
│   ├── src/main/java/.../security
│   ├── application.properties
│   └── pom.xml
│
├── frontend/
    ├── src/components
    ├── src/locales/
    ├── src/i18n.js
    ├── App.jsx
    └── index.js
```

---

## 📡 Backend Endpoints

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST   | `/register`                   | Register new user        |
| POST   | `/signin`                     | User login & receive JWT |
| GET    | `/hello`                      | Public route             |
| GET    | `/user`                       | Requires ROLE\_USER      |
| GET    | `/admin`                      | Requires ROLE\_ADMIN     |
| POST   | `/forgot-password/{username}` | Send OTP to user's email |
| POST   | `/reset-password`             | Reset password using OTP |

---

## 🧰 Key Frontend Components

| Component            | Description                                |
| -------------------- | ------------------------------------------ |
| `Hello.jsx`          | Public landing page with language selector |
| `Login.jsx`          | Login form with JWT handling               |
| `Register.jsx`       | User registration with validations         |
| `ForgotPassword.jsx` | Send OTP to registered email               |
| `ResetPassword.jsx`  | Reset password using received OTP          |
| `User.jsx`           | Page for authenticated users               |
| `Admin.jsx`          | Admin dashboard (restricted route)         |

---

## 🧪 Setup Instructions

### 🔧 Backend Setup

```bash
git clone https://github.com/your-username/jwt-secureauth.git
cd jwt-secureauth/backend
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=your_user
spring.datasource.password=your_pass
spring.jpa.hibernate.ddl-auto=update
```

Run the backend:

```bash
mvn spring-boot:run
```

---

### 🎨 Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

> App will be available at `http://localhost:3000`.

---

## 🚀 Usage

1. Visit the home page (`/`)
2. Register or log in to get a JWT token
3. Navigate to user/admin page based on role
4. Use OTP-based forgot/reset password feature
5. Switch languages anytime via top-left selector

---

## 👨‍💼 Author

Made with 💙 by **Aakash Nautiyal**

