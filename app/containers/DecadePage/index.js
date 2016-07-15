import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router'

import { createSelector } from 'reselect';

import L from 'leaflet';

import {
  selectMaps,
  lockSelectedMaps
} from 'containers/App/actions';

import {
  selectTileLayerMaps,
  selectMapOptions,
  selectDecadeGeoJSON,
  selectPreviousDecade,
  selectNextDecade,
  selectLoading,
  selectSelectedMaps,
  selectSelectedMapsLocked,
} from 'containers/App/selectors';

import CenteredItemPage from 'components/CenteredItemPage';

import Loading from 'containers/Loading';
import HoverMap from 'containers/HoverMap';
import Sidebar from 'containers/Sidebar';

import styles from './styles.css';

export class DecadePage extends React.Component {

  previousDecade() {
    if (this.props.previousDecade) {
      this.props.changeRoute(`/${this.props.previousDecade}`);
    }
  }

  nextDecade() {
    if (this.props.nextDecade) {
      this.props.changeRoute(`/${this.props.nextDecade}`);
    }
  }

  backToDecadeList() {
    this.props.changeRoute(`/`);
  }

  decadeToPeriod(decade) {
    return decade + ' - ' + (parseInt(decade) + 9);
  }

  static defaultProps = {
    params: {}
  }

  getMapId = (map) => map.properties.id.split('/')[1];
  getTileUrl = (mapId) => `http://maps.nypl.org/warper/maps/tile/${mapId}/{z}/{x}/{y}.png`;

  tileLayers = {};
  tileLayerMaps = {};

  componentWillReceiveProps(nextProps) {

    if (nextProps.tileLayerMaps !== this.props.tileLayerMaps) {
      if (this.map) {
        for (var newMapId of nextProps.tileLayerMaps.keys()) {
          if (!this.tileLayerMaps[newMapId]) {
            const map = nextProps.tileLayerMaps.get(newMapId);
            var tileUrl = this.getTileUrl(this.getMapId(map));
            var tileLayer = L.tileLayer(tileUrl).addTo(this.map);

            this.tileLayers[newMapId] = tileLayer;
            this.tileLayerMaps[newMapId] = map;
          }
        }

        Object.keys(this.tileLayerMaps).forEach((existingMapId) => {
          if (!nextProps.tileLayerMaps.get(existingMapId)) {
            this.map.removeLayer(this.tileLayers[existingMapId]);
            delete this.tileLayers[existingMapId];
            delete this.tileLayerMaps[existingMapId];
          }
        });
      }

      if (Object.keys(this.tileLayerMaps).length) {
        const bounds = L.geoJson(Object.values(this.tileLayerMaps)).getBounds()
        this.map.fitBounds(bounds);
      }
    }
  }

  static contextTypes = {
    trees: React.PropTypes.object,
  }

  render() {
    let mainContent;

    if (this.props.loading) {
      mainContent = (
        <div className={`${styles.loading}`}>
          <CenteredItemPage>
            <Loading />
          </CenteredItemPage>
        </div>
      );
    } else {
      let previousDecade;
      let nextDecade;

      if (this.props.previousDecade) {
        previousDecade = (
          <div title='Go to previous decade - or press ←' className={`${styles['decade-link']} ${styles.previous}`}>
            <Link to={`/${this.props.previousDecade}`}>← previous</Link>
          </div>
        );
      } else {
        previousDecade = (
          <div />
        );
      }

      if (this.props.nextDecade) {
        nextDecade = (
          <div title='Go to next decade - or press →' className={`${styles['decade-link']} ${styles.next}`}>
            <Link to={`/${this.props.nextDecade}`}>next →</Link>
          </div>
        );
      } else {
        nextDecade = (
          <div />
        );
      }

      let footer;
      const mapCount = this.props.selectedMaps.length
      const map = mapCount === 1 ? 'map' : 'maps';
      if (this.props.selectedMapsLocked) {
        footer = (
          <div className={styles.footer}>
            <div>
              {`${mapCount} ${map} selected — click again to unlock selection`}
            </div>
          </div>
        );
      } else if (mapCount) {
        footer = (
          <div className={styles.footer}>
            <div>
              {`${mapCount} ${map} found — click to lock selection`}
            </div>
          </div>
        );
      }

      const decade = this.props.params.decade;
      const tree = this.context.trees && this.context.trees[decade];

      mainContent = (
        <div className={styles.container}>
          <div className={styles.map}>
            <HoverMap decade={this.props.params.decade} tree={tree}
              groupedGeoJSON={this.props.groupedGeoJSON} allGeoJSON={this.props.allGeoJSON}
              onHoverMaps={this.hoverMaps.bind(this)} options={this.props.mapOptions}
              disableHover={this.props.selectedMapsLocked} mapCreated={this.mapCreated.bind(this)}
              onEachFeatureAll={this.onEachFeatureAll.bind(this)} onEachFeatureGrouped={this.onEachFeatureGrouped.bind(this)} />
            <div className={styles.header}>
              <div className={styles['link-container']}>
                {previousDecade}
              </div>
              <div className={styles.middle}>
                <h2>{this.decadeToPeriod(this.props.params.decade)}</h2>
                <div className={styles.back}>
                  <Link title='Go back to decade list - or press ESC' to={`/`}>Back to decade list</Link>
                </div>
              </div>
              <div className={styles['link-container']}>
                {nextDecade}
              </div>
            </div>
            {footer}
          </div>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
        </div>
      );
    }

    return mainContent;
  }

  componentDidMount() {
    this.boundKeyDown = this.keyDown.bind(this);
    window.addEventListener('keydown', this.boundKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.boundKeyDown);
  }

  hoverMaps(maps) {
    this.props.selectMaps(maps);
  }

  onEachFeatureAll(feature, layer) {
    layer.on({
      click: () => {
        this.props.lockSelectedMaps(!this.props.selectedMapsLocked);
      }
    });
  }

  onEachFeatureGrouped(feature, layer) {
    layer.on({
      click: () => {
        this.props.lockSelectedMaps(false);
      }
    });
  }

  mapCreated(map) {
    map.on('click', () => {
      this.props.lockSelectedMaps(false);
    });

    this.map = map;
  }

  keyDown(event) {
    if (event.keyCode === 37) {
      this.previousDecade();
    } else if (event.keyCode === 39) {
      this.nextDecade();
    } else if (event.keyCode === 27) {
      if (this.props.selectedMapsLocked) {
        this.props.lockSelectedMaps(false);
      } else {
        this.backToDecadeList();
      }
    }
  }
}

function mapStateToProps(state, ownProps) {
  const decade = ownProps.params.decade;
  return createSelector(
    selectMapOptions('singleDecade'),
    selectDecadeGeoJSON('grouped', decade),
    selectDecadeGeoJSON('all', decade),
    selectPreviousDecade(decade),
    selectNextDecade(decade),
    selectLoading(),
    selectSelectedMaps(),
    selectSelectedMapsLocked(),
    selectTileLayerMaps(),
    (mapOptions, groupedGeoJSON, allGeoJSON, previousDecade, nextDecade, loading, selectedMaps, selectedMapsLocked, tileLayerMaps) => ({
      mapOptions, groupedGeoJSON, allGeoJSON, previousDecade, nextDecade, loading, selectedMaps, selectedMapsLocked, tileLayerMaps
    })
  )(state);
}

function mapDispatchToProps(dispatch) {
  return {
    selectMaps: (maps) => dispatch(selectMaps(maps)),
    lockSelectedMaps: (locked) => dispatch(lockSelectedMaps(locked)),
    changeRoute: (url) => dispatch(push(url))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DecadePage);
