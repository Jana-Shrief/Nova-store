import { createContext, useContext, useState } from "react";
const WishlistContext = createContext();
export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
    });
    function toggleWishlist(product) {
        setWishlist(currentWishlist => {
        const exists = currentWishlist.some(
            item => item.id === product.id
        );
        const newWishlist = exists
            ? currentWishlist.filter(item => item.id !== product.id)
            : [...currentWishlist, product];
        localStorage.setItem("wishlist",
            JSON.stringify(newWishlist)
        );
        return newWishlist;
    });
    }
    function isInWishlist(id) {
        return wishlist.some(item => item.id === id);}
    return (
        <WishlistContext.Provider
            value={{ wishlist, toggleWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
}
export function useWishlist() {
    return useContext(WishlistContext);
}