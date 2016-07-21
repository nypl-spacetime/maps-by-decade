/*
 * Header
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';

import styles from './styles.css';

import nypl from 'images/nypl-white.svg';

export class Header extends React.Component {

  // <div className={`${styles['align-center']}`}>
  //
  //
  //
  //
  //
  //
  //   <h1>
  //     <span className={`orientation-horizontal ${styles['subtitle-spacing']}`}>
  //       <span className={`${styles['main-title']}`}>
  //         <a href='http://spacetime.nypl.org/' target='_blank'>
  //         NYC Space/Time Directory
  //         </a>
  //       </span>
  //       <span>:</span>
  //     </span>
  //     <span>
  //       <Link to='/'>
  //         Maps by Decade
  //       </Link>
  //     </span>
  //   </h1>
  // </div>

  render() {
    var pageClass = this.props.params && this.props.params.decade ? styles.singleDecade : ''
    return (
      <header className={`${styles.header} ${styles['align-center']} ${pageClass}`}>
        <div className={`${styles['align-center']}`}>
          <a style={{backgroundImage: `url(${nypl})`}} className={`${styles.logo}`} href='//nypl.org' target='_blank'>
          </a>
          <div className={styles.subtitles}>
            <h2>
              <a href='http://nypl.org/' target='_blank'>The New York Public Library</a>
            </h2>
            <h3>
              <a href='http://spacetime.nypl.org/' target='_blank'>NYC Space/Time Directory</a>
            </h3>
          </div>
          <h1 className={styles.title}>
            <Link to='/'>
            Maps by Decade
            </Link>
          </h1>
        </div>
      </header>
    );
  }
}

export default Header;
