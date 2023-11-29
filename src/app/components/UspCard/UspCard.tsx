import Image from 'next/image';
import React from 'react';

import styles from './UspCard.module.css';

interface Props {
  imageUrl: string;
  heading: string;
  description: string;
}

const UspCard = ({ imageUrl, heading, description }: Props) => {
  return (
    <div className={styles.uspCard}>
      <img
        className={styles.icon}
        src={imageUrl}
        alt="Hero Image"
      />
      <h3>{heading}</h3>
      <p>{description}</p>
    </div>
  );
};

export default UspCard;
