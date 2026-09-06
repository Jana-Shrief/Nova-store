import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import ProductDetails from './components/ProductsDetails/ProductsDetails'
import Checkout from './components/Checkout/Checkout'
import Cart from './components/Cart/Cart'
import PageLoader from './components/PageLoader/PageLoader'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import ProtectedRoute from './components/productRoute/ProductRoute'
import Footer from './components/Footer/Footer'
import { WishlistProvider } from "./components/WishlistContext/WishlistContext";
import Wishlist from './components/Wishlist/Wishlist'

function App() {
  return (
    <>
      <BrowserRouter>
      <WishlistProvider>
      <PageLoader/>
        <Navbar/>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }/>
          <Route path="/products/:id" element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }/>
          <Route path="/wishlist" element={
              <ProtectedRoute>
                  <Wishlist />
              </ProtectedRoute>
          }/>
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }/>
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
        </WishlistProvider>
      </BrowserRouter>
      
    </>
  )
}

export default App
