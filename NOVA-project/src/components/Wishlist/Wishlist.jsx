import { Link } from "react-router-dom";
import { useWishlist } from "../WishlistContext/WishlistContext";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
    const { wishlist, toggleWishlist } = useWishlist();
    return (
    <div className={styles.wishlistPage}>
        <h1>My Wishlist</h1>
        {wishlist.length === 0 ? (
        <div className={styles.emptyWishlist}>
            <i className="bi bi-heart"></i>
            <h2>Your wishlist is empty</h2>
            <p>Add now, buy later when you're not broke.</p>
        </div>
        ) : (
        <div className={styles.wishlistContainer}>
            {wishlist.map(product => (
            <div className={styles.productCard} key={product.id}>
                <img src={product.thumbnail} alt={product.title}/>
                <h3>{product.title}</h3>
                <p>{product.price}$</p>
                <Link to={`/products/${product.id}`} className={styles.viewButton}> View </Link>
                <button className={styles.removeButton} onClick={() => toggleWishlist(product)}> Remove </button>
            </div>
                ))}
        </div>
            )}
    </div>
    );
}