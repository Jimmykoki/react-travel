import React from 'react';
import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout.Footer style={{ backgroundColor: '#f5f5f5' }}>
      <Typography.Title level={5} style={{ textAlign: 'center' }}>
        {t('footer.detail')}
      </Typography.Title>
    </Layout.Footer>
  );
};
