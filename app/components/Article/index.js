import React from 'react';

import styles from './styles.css';

function Article(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

export default Article;
