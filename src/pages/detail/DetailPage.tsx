import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductIntro, ProductComments } from '../../components';
import styles from './DetailPage.module.css';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import {
  Col,
  Row,
  DatePicker,
  Spin,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from 'antd';
import { commentMockData } from './mockup';
import {
  productDetailSlice,
  getProductDetail,
} from '../../redux/productDetail/slice';
import { useSelector, useAppDispatch } from '../../redux/hook';
import { MainLayout } from '../../layouts/mainLayout';
import { addShoppingCartItem } from '../../redux/shoppingCart/slice';

type MatchParams = {
  id: string;
};

export const DetailPage: React.FC = () => {
  const { id } = useParams<MatchParams>(); // grab the id from the url
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const [product, setProduct] = useState<any>([]);
  const { RangePicker } = DatePicker;

  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

  const dispatch = useAppDispatch();

  const jwt = useSelector((state) => state.user.token) as string;
  const shoppingCartLoading = useSelector(
    (state) => state.shoppingCart.loading
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    }
  }, []);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      />
    );
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <MainLayout>
      <div className={styles['product-intro-container']}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.description}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.discount}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((p: any) => p.url)}
            />
          </Col>
          <Col span={11}>
            <Button
              style={{ marginTop: 50, marginBottom: 30, display: 'block' }}
              type="primary"
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(
                  addShoppingCartItem({ jwt, touristRouteId: product.id })
                );
              }}
            >
              <ShoppingCartOutlined />
              加入购物车
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>

      <Anchor className={styles['product-detail-anchor']}>
        <Menu mode="horizontal">
          <Menu.Item key="1">
            <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Anchor.Link href="#fees" title="费用"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
          </Menu.Item>
        </Menu>
      </Anchor>

      {/** Product introduction Module */}
      <div id="feature" className={styles['product-detail-container']}>
        <Divider orientation="center">
          <Typography.Title level={3}>产品特色</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.features }}></div>
      </div>

      {/** Tour expense*/}
      <div id="fees" className={styles['product-detail-container']}>
        <Divider orientation="center">
          <Typography.Title level={3}>旅行费用</Typography.Title>
        </Divider>
        <div dangerouslySetInnerHTML={{ __html: product.fees }}></div>
      </div>

      {/** Relatived attention */}
      <div id="notes" className={styles['product-detail-container']}>
        <Divider orientation="center">
          <Typography.Title level={3}>旅行须知</Typography.Title>
        </Divider>

        <div dangerouslySetInnerHTML={{ __html: product.notes }}></div>
      </div>

      {/** Users comments*/}
      <div id="comments" className={styles['product-detail-container']}>
        <Divider orientation="center">
          <Typography.Title level={3}>用户评价</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  );
};
