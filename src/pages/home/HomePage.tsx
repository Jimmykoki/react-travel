import React from 'react';
import styles from './HomePage.module.css';
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
  BusinessPartner,
} from '../../components';
import { Row, Col, Typography, Spin } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import axios from 'axios';

import sideImage from '../../assets/images/side-image.png';
import sideImage2 from '../../assets/images/side-image-2.png';
import sideImage3 from '../../assets/images/side-image-3.png';

interface State {
  loading: boolean;
  error: string | null;
  productList: any[];
}

class HomePageComponent extends React.Component<WithTranslation, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      productList: [],
    };
  }

  async componentDidMount() {
    try {
      // waiting GET request
      const { data } = await axios.get(
        'http://123.56.149.216:8089/api/productCollections'
      ); // return a promise
      this.setState({
        loading: false,
        error: null,
        productList: data,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      }
    }
  }

  render(): React.ReactNode {
    const { t } = this.props;
    const { productList, loading, error } = this.state;

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
      return <div>We got some trouble {error}</div>;
    }

    return (
      <>
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
                {t('home_page.hot_recommended')}
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList[0].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                {t('home_page.new_arrival')}
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList[1].touristRoutes}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                {t('home_page.domestic_travel')}
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList[2].touristRoutes}
          />
          <BusinessPartner />
        </div>

        <Footer />
      </>
    );
  }
}

export const HomePage = withTranslation()(HomePageComponent);
