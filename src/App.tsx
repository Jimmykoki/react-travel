import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage,
} from './pages';
import { useSelector, useAppDispatch } from './redux/hook';
import { getShoppingCart } from './redux/shoppingCart/slice';

const App: React.FC = () => {
  const jwt = useSelector((state) => state.user.token);
  const PrivateRoutes = ({ children }) => {
    if (jwt) {
      return children;
    } else {
      return <Navigate to="/signin" />;
    }
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoutes>
                <ShoppingCartPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/placeOrder"
            element={
              <PrivateRoutes>
                <PlaceOrderPage />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
