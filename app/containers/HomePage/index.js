/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';

import Article from 'components/Article';
import CenteredItemPage from 'components/CenteredItemPage';
import Footer from 'components/Footer';

import Loading from 'containers/Loading';
import DecadeList from 'containers/DecadeList';

import { createSelector } from 'reselect';

import {
  selectLoading
} from 'containers/App/selectors';

import styles from './styles.css';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    if (this.props.loading) {
      return (
        <div className={`${styles.container}`}>
          <CenteredItemPage>
            <Loading />
            </CenteredItemPage>
        </div>
      );
    } else {
      return (
        <div className={`${styles.container}`}>
          <Article>
            <h1 className={styles.centered}>Maps by Decade</h1>
            <p>
              Every New York City street map from NYPL's <a href='https://www.nypl.org/about/divisions/map-division'>Lionel Pincus and
              Princess Firyal Map Division</a> — published between 1830 and 1950 — grouped by decade.
            </p>
            <p>
              Maps by Decade shows only <b>large-scale maps</b> (i.e. maps depicting an area smaller than <span title='1.5 km² ≈ 0.6 mi²'>1.5 km²</span>) that are digitized, georectified,
              and that are in the public domain (or of which the Library holds the copyright).
              You can browse other maps and atlases in NYPL's <a href='http://digitalcollections.nypl.org/'>Digital Collections</a> and <a href='http://maps.nypl.org/'>Map Warper</a>.
            </p>
            <p className={styles.centered}>
              Click on a map for more details or <a href='https://github.com/nypl-spacetime/maps-by-decade'>view the source code on Github</a>.
            </p>
            <DecadeList />
          </Article>
          <Footer />
        </div>
      );
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectLoading(),
  (loading) => ({
    loading
  })
))(HomePage);
