import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

        if (savedUsers.length === 0) {
            alert("Please create an account first!");
            return;
        }
        const foundUser = savedUsers.find(
            (u) => u.email.toLowerCase() === user.email.toLowerCase() && u.password === user.password
        );

        if (foundUser) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            
            window.dispatchEvent(new Event("login"));
            navigate("/");
        } else {
            alert("Email or password is incorrect!");
        }
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginBox}>
                <h1>Welcome Back</h1>
                <p>Login to your NOVA account</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <div className={styles.passwordBox}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className={styles.showPassword}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className={styles.loginButton}> Login </button>
                </form>
                <p className={styles.signupText}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}