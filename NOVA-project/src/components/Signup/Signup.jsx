import { useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function handleChange(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("SIGN UP CLICKED");

        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = [...existingUsers, {
            fullName: user.fullName,
            email: user.email,
            password: user.password
        }];

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        
        navigate("/login");
    }

    return (
        <div className={styles.signupPage}>
            <div className={styles.signupBox}>
                <h1>Create Account</h1>
                <p>Join NOVA today</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={user.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.signupButton}>Sign Up</button>
                </form>
                <p className={styles.loginText}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
