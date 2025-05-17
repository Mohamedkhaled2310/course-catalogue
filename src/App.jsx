import { useState, useEffect } from 'react';
import './App.css';
import Cart from './components/Cart';
import CourseCatalogue from './components/CourseCatalogue';
import { courses } from './utils/MockData';
import CartButton from './components/CartButton';

function App() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('courseCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) { 
      localStorage.setItem('courseCart', JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addToCart = (course) => {
    const existingItem = cart.find(item => item.id === course.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...course, quantity: 1 }]);
    }
  };

  const removeFromCart = (courseId) => {
    setCart(cart.filter(item => item.id !== courseId));
  };

  const updateQuantity = (courseId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(courseId);
    }else{
      setCart(cart.map(item => 
        item.id === courseId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };
  return (
    <div className='min-h-screen w-full bg-gray-800'>
      {isLoading ? (
        <div className='text-center font-bold text-3xl text-gray-600'>Loading</div>
      ) : (
        <>
          {isCartVisible && (
            <Cart 
              cart={cart} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity} 
              totalPrice={getTotalPrice()}
              totalItems={getTotalItems()}
              setIsCartVisible={setIsCartVisible}
            />
          )}
  
          <div className='container mx-auto px-4 py-2'>
            <CartButton 
              setIsCartVisible={setIsCartVisible}
              cart={cart}
            />
            <CourseCatalogue
              courses={courses}
              addToCart={addToCart}
            />
          </div>
        </>
      )}
    </div>
  );
  
}

export default App;