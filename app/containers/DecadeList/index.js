import React from 'react';
import { connect } from 'react-redux';

import MiniMap from 'containers/MiniMap';

import { createSelector } from 'reselect';

import {
  selectGeoJSON
} from 'containers/App/selectors';

import styles from './styles.css';

export class DecadeList extends React.Component {
  render() {
    return (
      <ul className={styles.list}>
        { this.props.groupedGeoJSON.features.map((feature, i) => (
          <li key={i} className={styles['item-wrapper']}>
            <div className={styles.item}>
              <div className={styles.container}>
                <MiniMap feature={feature} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(createSelector(
  selectGeoJSON('grouped'),
  (groupedGeoJSON) => ({
    groupedGeoJSON
  })
))(DecadeList);
