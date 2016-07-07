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

import nypl from 'images/nypl.svg';

export class Header extends React.Component {

  render() {
    var pageClass = this.props.params && this.props.params.decade ? styles.singleDecade : ''
    return (
      <header className={`${styles.header} ${styles['align-center']} ${pageClass}`}>
        <div className={`${styles['align-center']}`}>
          <a style={{backgroundImage: `url(${nypl})`}} className={`${styles.nypl}`} href='//nypl.org' target='_blank'>
          </a>
          <h1>
            <span className={`orientation-horizontal ${styles['subtitle-spacing']}`}>
              <span className={`${styles['main-title']}`}>
                <a href='http://spacetime.nypl.org/' target='_blank'>
                Space/Time Directory
                </a>
              </span>
              <span>:</span>
            </span>
            <span>
              <Link to='/'>
                Maps by Decade
              </Link>
            </span>
          </h1>
        </div>
        <nav className={`${styles.nav} ${styles['align-center']}`}>
        </nav>
      </header>
    );
  }
}

export default Header;
