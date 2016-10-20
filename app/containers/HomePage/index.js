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
  selectLoading,
  selectGeoJSON
} from 'containers/App/selectors';

import logo from 'images/maps-by-decade.png';

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
      const mapCount = this.props.geojsonAll.features.length.toString().split('').reverse().join('').match(/.{1,3}/g).join(',').split('').reverse().join('');
      return (
        <div className={`${styles.container}`}>
          <Article>
            <img className={styles.logo} src={logo} />
            <p>
              New York City street maps from the New York Public Library's <a href='https://www.nypl.org/about/divisions/map-division'>Lionel Pincus and Princess Firyal Map Division</a> — published between 1810 and 1950 — grouped by decade.
            </p>
            <p>
              Maps by Decade shows {mapCount} large-scale maps (i.e. maps depicting an area smaller than 5 km²) that are digitized, georectified, and in the public domain (or of which the Library holds the copyright). You can browse 20,000 more maps and atlases in <a href='http://digitalcollections.nypl.org/'>Digital Collections</a>, the Library's database of its digitized collections. Or visit <a href='http://maps.nypl.org/'>Map Warper</a>, NYPL's online tool for rectifying public domain maps.
            </p>
            <p className={styles.centered}>
              Click on a map for more details or <a href='https://github.com/bertspaan/maps-by-decade'>view the source code and data on Github</a>.
            </p>
            <DecadeList />
          </Article>
        </div>
      );
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectLoading(),
  selectGeoJSON('all'),
  (loading, geojsonAll) => ({
    loading, geojsonAll
  })
))(HomePage);
