import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import styles from "./ProductDetails.module.css";
import { useCart } from "../CartContext/CartContext";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
    api.get(`/products/${id}`)
        .then(response => {
        setProduct(response.data);
        });
}, [id]);
if (!product) {
    return <h2>Loading...</h2>;
    }

    return (
    <div className={styles.productDetails}>
        <div className={styles.productInfo}>
            <h1 className={styles.productTitle}> {product.title}</h1>
            <h3 className={styles.productPrice}> {product.price}$</h3>
            <p className={styles.productDescription}> {product.description}</p>
            <div className={styles.quantity}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}> - </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}> + </button>
            </div>
            <button className={styles.addToCartButton} onClick={() => addToCart(product, quantity)}>
                <i className="bi bi-cart3"></i> Add to Cart </button>
            </div>
            <div className={styles.imageContainer}>
                <img className={styles.productThumbnail} src={product.thumbnail} alt={product.title} />
            </div>
        </div>
    );
}