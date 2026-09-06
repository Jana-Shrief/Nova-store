import React, { useState } from "react";
import styles from "./Checkout.module.css";
import {useCart} from "../CartContext/CartContext";
export default function Checkout() {
        const [payment, setPayment] = useState("");
        const [shipping, setShipping] = useState("");
        const { cart, getTotal } = useCart();
        const [orderPlaced, setOrderPlaced] = useState(false);

    function handlePaymentChange(event){    
        setPayment(event.target.value);
    }
    function handleShippingChange(event){
        setShipping(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        setOrderPlaced(true);
        console.log("Payment:", payment);
        console.log("Shipping:", shipping);
    }
    return (
    <div className={styles.checkoutPage}>
        <h1>Checkout</h1>
        <div className={styles.checkoutContainer}>
            <div className={styles.formSection}>
                <h2>Shipping Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your full name" required/>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email (optional)"/>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Phone</label>
                        <input type="tel" placeholder="Enter your phone number" required/>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Address</label>
                        <input type="text" placeholder="Enter your address" required/>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>City</label>
                            <input type="text" placeholder="City" required/>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Postal Code</label>
                            <input type="text" placeholder="Postal Code (optional)"/>
                        </div>
                    </div>
                    <h2>Payment Method</h2>
                    <div className={styles.payment}>
                        <select className={styles.methods}value={payment} onChange={handlePaymentChange} required>
                            <option value="">select an option</option>
                            <option value="Visa">Visa</option>
                            <option value="MasterCard">MasterCard</option>
                            <option value="cashOnDelivery">cashOnDelivery</option>
                        </select>
                            <p>Payment:{payment}</p>
                    </div>
                    <label>
                        <input type='radio' value="Pick Up" 
                            checked={shipping === "Pick Up"}
                            onChange={handleShippingChange} />
                        Pick Up</label><br/>
                    <label> 
                        <input type='radio' value="Delivery" 
                            checked={shipping === "Delivery"}
                            onChange={handleShippingChange}/>
                        Delivery</label>
                    <p>Shipping: {shipping}</p>
                    <button type="submit" className={styles.placeOrder}> Place Order </button>
                </form>
            </div>
            <div className={styles.orderSummary}>
                <h2>Order Summary</h2>
                <p> Subtotal <span>${getTotal().toFixed(2)}</span> </p>
                <p> Shipping <span>20$</span> </p>
                <div className={styles.total}>
                <strong>Total</strong>
                <strong>${(getTotal() + 20).toFixed(2)}</strong>
            </div>
        </div>
    </div>
    {orderPlaced && (
    <div className={styles.overlay}>
        <div className={styles.orderMessage}>
            <i className="bi bi-check-circle"></i>
            <h2>Your order has been placed!</h2>
            <button onClick={() => setOrderPlaced(false)}> OK </button>
        </div>
    </div>
    )}
    </div>
    );
}