import React from 'react';
import styles from './BlogCard.module.css';
import Link from 'next/link';

const BlogCard = ({
  title,
  coverphoto,
  createdAt,
  createdBy,
  excerpt,
  slug,
}: any) => {
  return (
    <div className={styles.blogCard}>
      <Link href={'/blog/' + slug}>
        <img
          src={coverphoto}
          alt=""
        />

        <h3>{title}</h3>
        <h6>{excerpt.substr(0, 150) + '\u2026'}</h6>
        <div className={styles.meta}>
          <p>{createdAt.split('T')[0]}</p>
          <p>.</p>
          <p>{createdBy}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
