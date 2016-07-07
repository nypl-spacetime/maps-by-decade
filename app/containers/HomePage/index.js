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

import Loading from 'containers/Loading';
import DecadeList from 'containers/DecadeList';

import { createSelector } from 'reselect';

import {
  selectLoading
} from 'containers/App/selectors';

import github from 'images/github.svg';

import styles from './styles.css';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    let mainContent;

    if (this.props.loading) {
      mainContent = (
        <CenteredItemPage>
          <Loading />
        </CenteredItemPage>
      );
    } else {
      mainContent = (
        <Article>
          <p>
            All New York City street maps from NYPL's <a href='https://www.nypl.org/about/divisions/map-division'>Lionel Pincus and
            Princess Firyal Map Division</a> — published between 1830 and 1950 — grouped by decade.
          </p>
          <p>
            Maps by Decade shows only <a href="https://en.wikipedia.org/wiki/Scale_(map)#Large_scale.2C_medium_scale.2C_small_scale">large-scale</a> maps (e.g. maps depicting an area smaller than <span title='1.5 km² ≈ 0.6 mi²'>1.5 km²</span>) that are digitized and <a href='http://maps.nypl.org/warper'>georectified</a>,
            and that are in the <a href='http://publicdomain.nypl.org'>public domain</a> or for which the Library holds the copyright. You can find more maps on <a href='http://maps.nypl.org/'>Map Warper</a> and <a href='http://digitalcollections.nypl.org/'>Digital Collections</a>.
          </p>
          <p className={styles.centered}>
            Click on a map for more details.
          </p>
          <DecadeList />
          <p className={styles.footer}>
            <a href='https://github.com/nypl-spacetime/maps-by-decade'>View project on GitHub</a>
            <img src={github} />
          </p>
        </Article>
      );
    }

    return (
      <div className={`${styles.container}`}>
        {mainContent}
      </div>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectLoading(),
  (loading) => ({
    loading
  })
))(HomePage);
