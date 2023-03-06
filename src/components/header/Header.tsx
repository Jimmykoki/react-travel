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
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../redux/hook';
import { useDispatch } from 'react-redux';
import { changeLanguageActionsCreator } from '../../redux/language/languageActions';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const navigate = useNavigate(); // useNavigate is a hook that returns a function to navigate to a new location
  const location = useLocation(); // useLocation is a hook that returns the location object that represents the current URL
  const params = useParams(); // useParams is a hook that returns an object of key/value pairs of URL parameters

  // component connecting with store will result in it's unreusable
  const language = useSelector((state) => state.language);
  const languageList = useSelector((state) => state.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const items: MenuProps['items'] = languageList.map((l) => {
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

  const menuClickHandler = (e) => {
    console.log(e);
    if (e.key === 'zh' || e.key === 'en') {
      dispatch(changeLanguageActionsCreator(e.key));
    }
  };

  return (
    <div className={styles['app-header']}>
      {/** Header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text> {t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{
              marginLeft: 15,
              display: 'inline',
            }}
            menu={{ items, selectable: true, onClick: menuClickHandler }}
            icon={<GlobalOutlined />}
            size="small"
          >
            {language === 'zh' ? '中文' : 'English'}
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
};
