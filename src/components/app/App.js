
import {lazy, Suspense, useState} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router';

import AppHeader from "../appHeader/AppHeader";
import {Catalog, MainPage, Contacts, Delivery} from "../pages";
import Spinner from '../spinner/Spinner';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import CartSide from '../cartSide/CartSide';

const addOrUpdateProducts = async (products) => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(products),
      });
  
      if (!response.ok) {
        throw new Error('Не вдалося оновити продукти');
      }
  
      const data = await response.json();
      console.log('Продукти успішно оновлені/додані:', data);
    } catch (error) {
      console.error('Помилка:', error);
    }
  };
  
  // Приклад використання:
  const products = [
    {
      id: '00847',
      category: 'Бусини',
      name: '12мм кругла бежевий',
      count: 182,
      price: 3.2,
      unit: 'шт',
    },
    {
      id: '00249',
      category: 'Бусини',
      name: '12мм кругла білий',
      count: 205,
      price: 3.2,
      unit: 'шт',
    },
  ];
  
//   addOrUpdateProducts(products);
    

  
const App = () => {
    
    const cartInitial = JSON.parse(localStorage.getItem("cart")) || { items: [], qty: 0, totals: { subtotal: 0, grand_total: 0, shipping: 0, discount: 0 } };
    const [cart, setCart] = useState(cartInitial);


    console.log('render App')
    return (
        <Router>
            <div className="app">
                <AppHeader count={cart.qty}/>
                <CartSide cart={cart}/>
                <main>
                    <div className="container-full">
                        <Suspense fallback={<Spinner/>}> 
                            <Breadcrumbs/>
                            <Routes>
                                <Route path="/" element={<MainPage/>}/> 
                                <Route path="/catalog" element={<Catalog setCart={setCart}/>}/> 
                                <Route path="/payment-and-delivery" element={<Delivery/>}/> 
                                <Route path="/contact" element={<Contacts/>}/> 
                            </Routes>
                        </Suspense>
                    </div>
                </main>
            </div>
           
        </Router>
    )
}

export default App;