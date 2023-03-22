import React from 'react';
import styles from './MainLayout.module.css';
import { Header, Footer } from '../../components';

// have to define the children type for React18
interface PropsType {
  children: React.ReactNode;
}

export const MainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <Header />
      {/** page contents */}
      <div className={styles['page-content']}>{children}</div>
      <Footer />
    </>
  );
};
