import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Header,
  Footer,
  ProductIntro,
  ProductComments,
} from '../../components';
import styles from './DetailPage.module.css';
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
} from 'antd';
import { commentMockData } from './mockup';

type MatchParams = {
  id: string;
};

export const DetailPage: React.FC = () => {
  const { id } = useParams<MatchParams>(); // grab the id from the url
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<any>([]);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://123.56.149.216:8089/api/touristRoutes/${id}`
        );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'error');
        setLoading(false);
      }
    };
    fetchData();
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
    <>
      <Header />
      <div className={styles['page-content']}>
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
      </div>
      <Footer />
    </>
  );
};
