import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import L from 'leaflet';
require('leaflet.sync');

import '../../../node_modules/leaflet/dist/leaflet.css';
import styles from './styles.css';

export class Map extends React.Component {

  roundCoordinate = (coordinate) => Math.round(coordinate * 1000000) / 1000000;

  render() {
    return (
      <div className={`${styles.map}`} ref='map' />
    );
  }

  getView = () => {
    if (this.map) {
      var center = this.map.getCenter();
      return {
        center: [
          center.lng,
          center.lat
        ].map(this.roundCoordinate),
        zoom: this.map.getZoom(),
      };
    } else {
      return null;
    }
  }

  getMap = () => this.map;

  componentDidMount = () => {
    var node = findDOMNode(this.refs.map);

    var map = L.map(node, this.props.options);

    if (this.props.mapEvents) {
      Object.keys(this.props.mapEvents).forEach((event) => map.on(event, this.props.mapEvents[event]));
    }

    if (this.props.mapCreated) {
      this.props.mapCreated(map);
    }

    this.map = map;

    window.setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 500);
  }

}

export default connect(null, null, null, { withRef: true })(Map);
