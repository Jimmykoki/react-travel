import React from 'react';
import { Layout, Typography } from 'antd';

export const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ backgroundColor: '#f5f5f5' }}>
      <Typography.Title level={5} style={{ textAlign: 'center' }}>
        Copyright © 2020 React Travel. All Rights Reserved
      </Typography.Title>
    </Layout.Footer>
  );
};
