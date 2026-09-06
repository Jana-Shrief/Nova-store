import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import homeImage from "../../assets/download (1).jpg";
export default function Home(){
    return(
        <div className={styles.hero}>
            <img src={homeImage} className={styles.heroImage}/>
            <div className={styles.content}>
                <h1>Welcome To Our Store</h1>
                <p>Discover Our latest products</p>
                <Link to="/products" className={styles.shopButton}> Our Products </Link>
            </div>
        </div>
    )
}