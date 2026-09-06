import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
export default function PageLoader() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => { setLoading(false);}, 700);
        return () => clearTimeout(timer);
    }, [location.pathname]);
    if (!loading) {return null;}
    return <Loader />;
}