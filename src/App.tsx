import React from 'react';
import styles from './App.module.css';
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
  BusinessPartner,
} from './components';
import { Row, Col, Typography } from 'antd';
import { productList1, productList2, productList3 } from './mockup';

import sideImage from './assets/images/side-image.png';
import sideImage2 from './assets/images/side-image-2.png';
import sideImage3 from './assets/images/side-image-3.png';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Header />
      {/* Content */}
      <div className={styles['page-content']}>
        <Row style={{ marginTop: 20 }}>
          <Col span={5}>
            <SideMenu />
          </Col>
          <Col span={19}>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} type="warning">
              Popular Stuff
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList1}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              New Items
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList2}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              Inboard tour
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList3}
        />
        <BusinessPartner />
      </div>

      <Footer />
    </div>
  );
};

export default App;
