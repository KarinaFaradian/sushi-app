import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
        <h1 className={styles.header}>
            <span>☹️</span>
        <br/>
        Not found...
        </h1>
        <p className={styles.description}>
            We are very sorry for inconvenience!
        </p>
    </div>
  )
}

export default NotFoundBlock;