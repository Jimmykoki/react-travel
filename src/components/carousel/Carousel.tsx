import React from 'react';
import styles from './Carousel.module.css';
import { Image, Carousel as AntCarousel } from 'antd';

import img1 from '../../assets/images/carousel_1.jpg';
import img2 from '../../assets/images/carousel_2.jpg';
import img3 from '../../assets/images/carousel_3.jpg';

export const Carousel: React.FC = () => {
  return (
    <AntCarousel autoplay className={styles.slider}>
      <Image src={img1} />
      <Image src={img2} />
      <Image src={img3} />
    </AntCarousel>
  );
};
