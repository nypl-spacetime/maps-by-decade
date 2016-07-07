import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createSelector } from 'reselect';

import {
  newMiniMap
} from 'containers/App/actions';

import {
  selectDecadeGeoJSON,
  selectMapOptions
} from 'containers/App/selectors';

import HoverMap from 'containers/HoverMap';

import styles from './styles.css';

export class MiniMap extends React.Component {

  maps = [];

  openDecade = (decade, mapId) => {
    this.props.changeRoute(`/${decade}`);
    // if (mapId) {
    //   this.props.changeRoute(`/${decade}/${mapId}`);
    // } else {
    //   this.props.changeRoute(`/${decade}`);
    // }
  };

  decadeToPeriod(decade) {
  	return decade + ' - ' + (decade + 9);
  }

  static contextTypes = {
    trees: React.PropTypes.object,
  }

  render() {
    const band = this.props.feature.properties.band;
    const tree = this.context.trees && this.context.trees[band];

    return (
      <div className={styles.container}>
        <HoverMap decade={band} tree={tree} onEachFeatureAll={this.onEachFeature.bind(this)}
          groupedGeoJSON={this.props.feature} allGeoJSON={this.props.allGeoJSON}
          mapCreated={this.mapCreated.bind(this)} options={this.props.mapOptions} />
        <h2>{this.decadeToPeriod(band)}</h2>
      </div>
    );
  }

  mapCreated(map) {
    map.on('click', this.onClick.bind(this));
    this.props.newMiniMap(map);
  }

  getMapId = (map) => map.properties.id.split('/')[1];

  onEachFeature(feature, layer) {
    layer.on({
      click: () => {
        const decade = this.props.feature.properties.band;
        this.openDecade(decade, this.getMapId(feature));
      }
    });
  }

  onClick() {
    const decade = this.props.feature.properties.band;
    this.openDecade(decade)
  }
}

function mapStateToProps(state, ownProps) {
  const band = ownProps.feature.properties.band;
  return createSelector(
    selectDecadeGeoJSON('all', band),
    selectMapOptions('miniMap'),
    (allGeoJSON, mapOptions) => ({
      allGeoJSON, mapOptions
    })
  )(state);
}

function mapDispatchToProps(dispatch) {
  return {
    newMiniMap: (map) => dispatch(newMiniMap(map)),
    changeRoute: (url) => dispatch(push(url))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniMap);
