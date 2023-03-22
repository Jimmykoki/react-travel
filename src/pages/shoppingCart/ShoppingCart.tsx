import React from 'react';
import styles from './ShoppingCart.module.css';
import { MainLayout } from '../../layouts/mainLayout';
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCard } from '../../components';
import { useSelector, useAppDispatch } from '../../redux/hook';
import {
  clearShoppingCartItem,
  checkout,
} from '../../redux/shoppingCart/slice';
import { useNavigate } from 'react-router-dom';

export const ShoppingCartPage: React.FC = () => {
  const loading = useSelector((state) => state.shoppingCart.loading);
  const shoppingCartItems = useSelector((stata) => stata.shoppingCart.items);
  const jwt = useSelector((state) => state.user.token) as string;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(typeof shoppingCartItems.map((i) => i.id));

  return (
    <MainLayout>
      <Row>
        <Col span={16}>
          <div className={styles['product-list-container']}>
            <ProductList data={shoppingCartItems.map((i) => i.touristRoute)} />
          </div>
        </Col>
        <Col span={8}>
          <Affix>
            <div className={styles['payment-card-container']}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems
                  .map((i) => i.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={shoppingCartItems
                  .map(
                    (i) =>
                      i.originalPrice *
                      (i.discountPresent ? i.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0) {
                    return;
                  }
                  dispatch(checkout(jwt));
                  navigate('/placeOrder');
                }}
                onShoppingCartClear={() =>
                  dispatch(
                    clearShoppingCartItem({
                      jwt,
                      itemIds: shoppingCartItems.map((i) => i.id),
                    })
                  )
                }
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
};
