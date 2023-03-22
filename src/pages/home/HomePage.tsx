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
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { getRecommendRoductsListActionCreator } from '../../redux/recommendProduts/recommendProductsActions';
import { MainLayout } from '../../layouts/mainLayout';
import sideImage from '../../assets/images/side-image.png';
import sideImage2 from '../../assets/images/side-image-2.png';
import sideImage3 from '../../assets/images/side-image-3.png';

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProduts.loading,
    error: state.recommendProduts.error,
    productList: state.recommendProduts.productList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecommendProductsList: () => {
      dispatch(getRecommendRoductsListActionCreator());
    },
  };
};

type PropsType = WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {
  async componentDidMount() {
    this.props.getRecommendProductsList();
  }

  render(): React.ReactNode {
    const { t, productList, loading, error } = this.props;

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
      <MainLayout>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
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
      </MainLayout>
    );
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent));
