import { Route, Routes } from 'react-router-dom';
import { Home, Overview, Auth, Cart, Register, CreateProduct } from './pages';
import { ToastContainer } from 'react-toastify';
import './App.css';

import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { setUser } from './features/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Profile } from './components/Profile/Profile';
import { Product } from './components/Products/Product';
import { Skeleton } from './components/Skeleton/Skeleton';

export const App = () => {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);
  return (
    <div className="min-h-full container text-white">
      <Profile />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<CreateProduct />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/skeleton" element={<Skeleton />} />
      </Routes>
      <ToastContainer autoClose={3000} theme="dark" />
    </div>
  );
};
