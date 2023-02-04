import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
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

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'English',
  },
  {
    key: '2',
    label: '中文',
  },
];

const naviItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'Home',
  },
  { key: '2', label: 'Group tour' },
  { key: '3', label: 'Weekend tour' },
  { key: '4', label: 'Private tour' },
  { key: '5', label: 'Custom tour' },
  { key: '6', label: 'Theme tour' },
  { key: '7', label: 'Study aboard' },
  { key: '8', label: 'Visa' },
  { key: '9', label: 'Enterprise tour' },
  { key: '10', label: 'High end tour' },
  { key: '11', label: 'Outbound tour' },
  { key: '12', label: 'Inbound tour' },
  { key: '13', label: 'Free tour' },
  { key: '14', label: 'Destination' },
  { key: '15', label: 'Travel agent' },
  { key: '16', label: 'Blog' },
];

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <div className={styles['app-header']}>
        {/** Header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text> Let travel more easy</Typography.Text>
            <Dropdown.Button
              style={{
                marginLeft: 15,
                display: 'inline',
              }}
              menu={{ items, selectable: true, defaultSelectedKeys: ['1'] }}
              icon={<GlobalOutlined />}
            >
              Language
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button type="primary">Sign up</Button>
              <Button style={{ marginLeft: 10 }}>Sign in</Button>
            </Button.Group>
          </div>
        </div>

        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            React Travel
          </Typography.Title>
          <Input.Search
            placeholder="Search..."
            className={styles['search-input']}
          />
        </Layout.Header>

        <Menu
          mode="horizontal"
          className={styles['main-menu']}
          items={naviItems}
        />
      </div>
    </div>
  );
};

export default App;
