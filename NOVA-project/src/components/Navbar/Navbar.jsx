import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo 3.jpeg';
import styles from './Navbar.module.css';
import { useCart } from "../CartContext/CartContext";

export default function Navbar(){
    const {cart} = useCart();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true" );
    const [userName, setUserName] = useState("");
    useEffect(() => {
    const updateLogin = () => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {setUserName(savedUser.fullName);}
    };
    updateLogin();
    window.addEventListener("login", updateLogin);
    return () => {window.removeEventListener("login", updateLogin);};}, []);
    function handleLogout(){localStorage.removeItem("isLoggedIn"); setIsLoggedIn(false);
        navigate("/");}
    
    return(
        <>
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand ${styles.brand}`} to="/">
                    <img src = {logo} alt ="NOVA logo" width={40} height={35} className="d-inline-block align-text-top" />NOVA
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>    
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${styles.navLink}`} to="/"> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${styles.navLink}`} to="/products"> Products</Link> </li> 
                    </ul> 
                    <div className={styles.authLinks}>
                        {isLoggedIn ? (
                        <>
                        <span className={styles.welcome}> Welcome, {userName}</span>
                        <button className={styles.logout} onClick={handleLogout}> Logout</button>
                        </>
                        ) : (
                        <>
                        <Link to="/login" className={styles.authLink}> Login</Link>
                        <Link to="/signup" className={styles.authLink}> Sign Up </Link>
                        </>
                        )}
                        </div>
                        <Link to="/wishlist" className={styles.wishlist}>
                            <i className="bi bi-heart"></i>
                        </Link>
                        <Link to= "/cart" className={styles.cartcontainer}>
                            <i className="bi bi-cart3"></i>
                            <span className={styles.cartCount}>
                                {cart.reduce((total, product) => total + product.quantity, 0)}
                            </span>
                        </Link>
                    </div>     
            </div>
        </nav>
        </>
    );
}