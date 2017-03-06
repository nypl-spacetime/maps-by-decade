import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { createSelector } from 'reselect'

import L from 'leaflet'

import {
  selectMaps,
  lockSelectedMaps
} from 'containers/App/actions'

import {
  selectHasTouch,
  selectTileLayerMaps,
  selectMapOptions,
  selectDecadeGeoJSON,
  selectPreviousDecade,
  selectNextDecade,
  selectSelectedMaps,
  selectSelectedMapsLocked
} from 'containers/App/selectors'

import HoverMap from 'containers/HoverMap'
import MapPageControls from 'components/MapPageControls'

import Sidebar from 'containers/Sidebar'
import NotFoundPage from 'containers/NotFoundPage'

import { Container, MapPane, Pane } from './styles.js'

export class MapPage extends React.Component {

  // This is needed for this.context.trees to work!
  static contextTypes = {
    trees: React.PropTypes.object
  }

  previousDecade () {
    if (this.props.previousDecade) {
      this.props.changeRoute(`/${this.props.previousDecade}`)
    }
  }

  nextDecade () {
    if (this.props.nextDecade) {
      this.props.changeRoute(`/${this.props.nextDecade}`)
    }
  }

  backToDecadeList () {
    this.props.changeRoute(`/`)
  }

  static defaultProps = {
    params: {}
  }

  getTileUrl = (mapId) => `http://maps.nypl.org/warper/maps/tile/${mapId}/{z}/{x}/{y}.png`

  tileLayers = {}
  tileLayerMaps = {}

  componentWillReceiveProps (nextProps) {
    if (nextProps.tileLayerMaps !== this.props.tileLayerMaps) {
      if (this.map) {
        for (var newMapId of nextProps.tileLayerMaps.keys()) {
          if (!this.tileLayerMaps[newMapId]) {
            const map = nextProps.tileLayerMaps.get(String(newMapId))
            var tileUrl = this.getTileUrl(map.properties.id)
            var tileLayer = L.tileLayer(tileUrl).addTo(this.map)
            this.tileLayers[newMapId] = tileLayer
            this.tileLayerMaps[newMapId] = map
          }
        }

        Object.keys(this.tileLayerMaps).forEach((existingMapId) => {
          if (!nextProps.tileLayerMaps.get(String(existingMapId))) {
            this.map.removeLayer(this.tileLayers[existingMapId])

            delete this.tileLayers[existingMapId]
            delete this.tileLayerMaps[existingMapId]
          }
        })
      }

      if (Object.keys(this.tileLayerMaps).length) {
        const bounds = L.geoJson(Object.values(this.tileLayerMaps)).getBounds()
        this.map.fitBounds(bounds)
      }
    }
  }

  render () {
    const decade = this.props.params.decade
    const tree = this.context.trees && this.context.trees[decade]

    if (!this.props.previousDecade && !this.props.nextDecade) {
      return <NotFoundPage />
    }

    return (
      <Container>
        <Helmet title={`${decade}s`} />
        <MapPane active={!this.props.selectedMapsLocked}>
          <MapPageControls previousDecade={this.props.previousDecade} nextDecade={this.props.nextDecade}
            decade={decade} locked={this.props.selectedMapsLocked} selectedCount={this.props.selectedMaps.length} />
          <HoverMap decade={decade} tree={tree} crosshair hasTouch={this.props.hasTouch}
            groupedGeoJSON={this.props.groupedGeoJSON} allGeoJSON={this.props.allGeoJSON}
            onHoverMaps={this.hoverMaps.bind(this)} options={this.props.mapOptions}
            disableHover={this.props.selectedMapsLocked} mapCreated={this.mapCreated.bind(this)}
            onEachFeatureAll={this.onEachFeatureAll.bind(this)} onEachFeatureGrouped={this.onEachFeatureGrouped.bind(this)} />
        </MapPane>
        <Pane active={this.props.selectedMapsLocked}>
          <Sidebar />
        </Pane>
      </Container>
    )
  }

  componentDidMount () {
    this.boundKeyDown = this.keyDown.bind(this)
    window.addEventListener('keydown', this.boundKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.boundKeyDown)
  }

  hoverMaps (maps) {
    this.props.selectMaps(maps)
  }

  onEachFeatureAll (feature, layer) {
    layer.on({
      click: (event) => {
        L.DomEvent.stopPropagation(event)
        this.props.lockSelectedMaps(!this.props.selectedMapsLocked)
      }
    })
  }

  onEachFeatureGrouped (feature, layer) {
    layer.on({
      click: (event) => {
        L.DomEvent.stopPropagation(event)
        this.props.lockSelectedMaps(false)
      }
    })
  }

  mapCreated (map) {
    map.on('click', (event) => {
      if (event.originalEvent.keyCode === 13) {
        // Pressing enter also triggers click on map
        return
      }

      this.props.lockSelectedMaps(false)
    })

    map._container.focus()

    this.map = map
  }

  keyDown (event) {
    if (event.keyCode === 219) {
      this.previousDecade()
    } else if (event.keyCode === 221) {
      this.nextDecade()
    } else if (event.keyCode === 27) {
      if (this.props.selectedMapsLocked) {
        this.props.lockSelectedMaps(false)
      } else {
        this.backToDecadeList()
      }
    } else if (event.keyCode === 13) {
      if (!this.props.selectedMapsLocked && this.props.selectedMaps.length) {
        this.props.lockSelectedMaps(true)
      }
    }
  }
}

function mapStateToProps (state, ownProps) {
  const decade = ownProps.params.decade
  return createSelector(
    selectHasTouch(),
    selectMapOptions('singleDecade'),
    selectDecadeGeoJSON('grouped', decade),
    selectDecadeGeoJSON('all', decade),
    selectPreviousDecade(decade),
    selectNextDecade(decade),
    selectSelectedMaps(),
    selectSelectedMapsLocked(),
    selectTileLayerMaps(),
    (hasTouch, mapOptions, groupedGeoJSON, allGeoJSON, previousDecade, nextDecade, selectedMaps, selectedMapsLocked, tileLayerMaps) => ({
      hasTouch, mapOptions, groupedGeoJSON, allGeoJSON, previousDecade, nextDecade, selectedMaps, selectedMapsLocked, tileLayerMaps
    })
  )(state)
}

function mapDispatchToProps (dispatch) {
  return {
    selectMaps: (maps) => dispatch(selectMaps(maps)),
    lockSelectedMaps: (locked) => dispatch(lockSelectedMaps(locked)),
    changeRoute: (url) => dispatch(push(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage)
