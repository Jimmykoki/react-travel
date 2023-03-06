import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import {
  Input,
  Layout,
  Typography,
  Menu,
  MenuProps,
  Button,
  Dropdown,
} from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
//import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { withRouter, RouteComponentProps } from '../../helpers/withRouter';
import store, { RootState } from '../../redux/store';
import { withTranslation, WithTranslation } from 'react-i18next';
import { changeLanguageActionsCreator } from '../../redux/language/languageActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// 从redux中取出state
// 输出从组件绑定的数据
// 管理state的状态
const mapStateToProps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.languageList,
  };
};

//两种映射状态 操作state的方法
const mapDispatchToProps = (dispatch: Dispatch) => {
  // 返回类型是一个对象，每一个字段都是dispatch的处理函数action
  return {
    changeLanguage: (code: 'zh' | 'en') => {
      const action = changeLanguageActionsCreator(code);
      dispatch(action);
    },
  };
};

type PropsType = RouteComponentProps & // react-route 路由props类型
  WithTranslation & // i18n props类型
  ReturnType<typeof mapStateToProps> & // redux store类型
  ReturnType<typeof mapDispatchToProps>; // redux dispatch类型

class HeaderComponent extends React.Component<PropsType> {
  handleMenuClick = (e) => {
    // this.setState({ language: e.key });
    console.log(e.key);
    if (e.key === 'zh' || e.key === 'en') {
      this.props.changeLanguage(e.key);
      // const action = changeLanguageActionsCreator(e.key);
      // store.dispatch(action);
    }
  };

  render() {
    const { navigate, t } = this.props;
    const items: MenuProps['items'] = this.props.languageList.map((l) => {
      return { key: l.code, label: l.name };
    });
    const naviItems: MenuProps['items'] = [
      { key: '1', label: t('header.home_page') },
      { key: '2', label: t('header.weekend') },
      { key: '3', label: t('header.group') },
      { key: '4', label: t('header.backpack') },
      { key: '5', label: t('header.private') },
      { key: '6', label: t('header.cruise') },
      { key: '7', label: t('header.hotel') },
      { key: '8', label: t('header.local') },
      { key: '9', label: t('header.theme') },
      { key: '10', label: t('header.custom') },
      { key: '11', label: t('header.study') },
      { key: '12', label: t('header.visa') },
      { key: '13', label: t('header.enterprise') },
      { key: '14', label: t('header.high_end') },
      { key: '15', label: t('header.outdoor') },
      { key: '16', label: t('header.insurance') },
    ];
    return (
      <div className={styles['app-header']}>
        {/** Header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t('header.slogan')}</Typography.Text>
            <Dropdown.Button
              style={{
                marginLeft: 15,
                display: 'inline',
              }}
              menu={{ items, selectable: true, onClick: this.handleMenuClick }}
              icon={<GlobalOutlined />}
              size="small"
            >
              {this.props.language === 'zh' ? '中文' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']} size="middle">
              <Button onClick={() => navigate('/register')} type="primary">
                {t('header.register')}
              </Button>
              <Button
                onClick={() => navigate('/signin')}
                style={{ marginLeft: 10 }}
              >
                {t('header.signin')}
              </Button>
            </Button.Group>
          </div>
        </div>

        <Layout.Header className={styles['main-header']}>
          <span onClick={() => navigate('/')}>
            <img src={logo} alt="" className={styles['App-logo']} />
            <Typography.Title level={3} className={styles.title}>
              {t('header.title')}
            </Typography.Title>
            <Input.Search
              placeholder="Search..."
              className={styles['search-input']}
            />
          </span>
        </Layout.Header>

        <Menu
          mode="horizontal"
          className={styles['main-menu']}
          items={naviItems}
        />
      </div>
    );
  }
}

// mapDispatchProps的return对象会被connection自动注入到组件的props属性中
export const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withRouter(HeaderComponent)));
