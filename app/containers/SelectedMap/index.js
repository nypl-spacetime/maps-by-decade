import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';

import {
  addTileLayerMap,
  removeTileLayerMap,
  showLightbox
} from 'containers/App/actions';

import styles from './styles.css';

export class SelectedMap extends React.Component {

  getMapId = (map) => map.properties.id.split('/')[1];

  render() {
    const map = this.props.map;

    let tileLink;
    if (this.props.tilesOnMap) {
      tileLink = (
        <a href='javascript:void(0)' onClick={this.removeTileLayerMap.bind(this)}>Remove from map</a>
      );
    } else {
      tileLink = (
        <a href='javascript:void(0)' onClick={this.addTileLayerMap.bind(this)}>View on map</a>
      );
    }

    return (
      <div className={styles.container}>
        <h3 className={styles.title} title={map.properties.name}>{map.properties.name}</h3>
        <img src={`http://images.nypl.org/index.php?id=${map.properties.digital_id}&t=w`} onClick={this.showLightbox.bind(this)}/>
        <ul className={`${styles.links} external-links`}>
          <li>{tileLink}</li>
          <li><a href={`http://maps.nypl.org/warper/maps/${this.getMapId(map)}`} target='_blank'>Map Warper</a></li>
          <li><a href={map.properties.url} target='_blank'>Digital Collections</a></li>
        </ul>
      </div>
    );
  }

  showLightbox() {
    this.props.showLightbox(true, this.props.index);
  }

  addTileLayerMap() {
    this.props.addTileLayerMap(this.props.map);
  }

  removeTileLayerMap() {
    this.props.removeTileLayerMap(this.props.map);
  }

}

function mapDispatchToProps(dispatch) {
  return {
    addTileLayerMap: (feature) => dispatch(addTileLayerMap(feature)),
    removeTileLayerMap: (feature) => dispatch(removeTileLayerMap(feature)),
    showLightbox: (show, index) => dispatch(showLightbox(show, index))
  };
}

export default connect(null, mapDispatchToProps)(SelectedMap);
