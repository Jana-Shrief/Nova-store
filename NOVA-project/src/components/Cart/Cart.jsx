import styles from "./Cart.module.css";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
export default function Cart() {
    const navigate = useNavigate();
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const total = cart.reduce( (total, product) => total + product.price * product.quantity,0);

    return (
    <div className={styles.cartPage}>
        <h1>My cart</h1>
        {cart.length === 0 ? (
        <div className={styles.emptyCart}>
            <h2>Your cart is empty bro</h2>
            <p>add some products to cart!</p>
        </div>
        ) : (
        <div className={styles.cartContainer}>
            <div className={styles.products}>
                {cart.map((product) => (
                <div className={styles.cartItem}key={product.id}>
                    <img className={styles.image} src={product.thumbnail} alt={product.title}/>
                    <div className={styles.info}>
                        <h2>{product.title}</h2>
                        <p>${product.price}</p>
                        <div className={styles.quantity}>
                            <button onClick={() => decreaseQuantity(product.id)}> − </button>
                            <span>{product.quantity}</span>
                            <button onClick={() => increaseQuantity(product.id)}> + </button>
                        </div>
                    </div>
                    <button className={styles.remove} onClick={() => removeFromCart(product.id)}> Remove </button>
                </div>
                ))}
            </div>
            <div className={styles.summary}>
                <h2>Order summary</h2>
                <div className={styles.total}>
                    <span>Total</span>
                    <strong>${total.toFixed(2)}</strong>
                </div>
                <button className={styles.checkout} onClick={() => navigate("/Checkout")}> Checkout </button>
            </div>
        </div>
        )}
    </div>
    );
}