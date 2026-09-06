import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useCart} from "../CartContext/CartContext"
import api from "../../services/api";
import styles from "./Products.module.css";
import productsBackground from "../../assets/products-background.jpg";
import { useWishlist } from "../WishlistContext/WishlistContext";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("all");
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        api.get("/products")
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const filteredProducts =
    category === "all" ? products : products.filter(product => product.category === category);

    return (
    <div className={styles.productsPage} style={{backgroundImage: `url(${productsBackground})`}}>
        <div className={styles.header}>
            <h1 className={styles.productsTitle}> our products</h1>
            <select className={styles.filterSelect} value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All Products</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
            </select>
        </div>
        <div className={`row ${styles.productsContainer}`}>
            {filteredProducts.map(product => (
            <div className="col-md-3" key={product.id}>    
                <div className={styles.productCard}>
                    <img className={styles.productImage} src={product.thumbnail} alt={product.title}/>
                    <div className={styles.productBody}>
                        <h3 className={styles.productTitle}>{product.title}</h3>
                        <p className={styles.productPrice}>{product.price}$</p>
                        <button className={styles.wishlistButton} onClick={() => toggleWishlist(product)}>
                            <i className={isInWishlist(product.id) ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                        </button>
                        <Link to={`/products/${product.id}`} className={styles.viewButton}> View </Link>
                        <button className={styles.addToCartButton} onClick={() => addToCart(product)}> Add to Cart </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    );
}