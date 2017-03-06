import React from 'react'
import styled from 'styled-components'

import turfInside from 'turf-inside'
import L from 'leaflet'

import Crosshair from 'components/Crosshair'
import Map from 'containers/Map'

const Container = styled.div`
  width: 100%;
  height: 100%;
`

export class HoverMap extends React.Component {

  constructor (props) {
    super(props)

    this.throttleMs = 75
    this.highlightMapsLatLng = null

    this.state = {
      showCrosshair: props.crosshair && props.hasTouch
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.decade !== this.props.decade) {
      if (this.groupedDataLayer) {
        this.groupedDataLayer.clearLayers()
        if (nextProps.groupedGeoJSON) {
          this.groupedDataLayer.addData(nextProps.groupedGeoJSON)
        }
      }

      if (this.allDataLayer) {
        this.allDataLayer.clearLayers()

        if (this.map && this.highlightMapsLatLng) {
          this.updateHighlightedMaps(this.highlightMapsLatLng, nextProps.tree, nextProps.allGeoJSON)
        }
      }
    }
  }

  render () {
    let crosshair
    if (this.props.crosshair && this.state.showCrosshair) {
      crosshair = (
        <Crosshair />
      )
    }

    return (
      <Container>
        <Map mapCreated={this.mapCreated.bind(this)} options={this.props.options.map} />
        {crosshair}
      </Container>
    )
  }

  mapMoving = false

  mapCreated (map) {
    var options = this.props.options.tileLayer

    L.tileLayer(options.tileUrl, options).addTo(map)

    this.groupedDataLayer = L.geoJson(this.props.groupedGeoJSON, {
      style: this.props.options.geojson,
      onEachFeature: this.props.onEachFeatureGrouped
    }).addTo(map)

    this.allDataLayer = L.geoJson(null, {
      style: () => this.selectedStyleForZoom(map.getZoom()),
      onEachFeature: this.props.onEachFeatureAll
    }).addTo(map)

    map.on('movestart', () => {
      this.mapMoving = true
    })

    map.on('move', this.throttle(() => {
      if (this.state.showCrosshair) {
        this.updateHighlightedMaps(map.getCenter())
      }
    }, this.throttleMs * 2))
    map.on('moveend', () => {
      this.mapMoving = false
    })

    map.on('zoomend', this.zoomEnd.bind(this))

    map.on('mousemove', this.throttle((event) => {
      if (this.mapMoving || this.props.disableHover) {
        return
      }

      this.setState({
        showCrosshair: false
      })

      this.updateHighlightedMaps(event.latlng)
    }, this.throttleMs))

    if (this.props.crosshair) {
      const container = map._container
      container.addEventListener('keydown', (event) => {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
          this.setState({
            showCrosshair: true
          })
        }
      })
    }

    if (this.props.mapCreated) {
      this.props.mapCreated(map)
    }

    this.lastZoom = map.getZoom()
    this.map = map
  }

  setHoveredMaps (hoveredMaps) {
    this.allDataLayer.clearLayers()
    if (hoveredMaps.length) {
      this.allDataLayer.addData(hoveredMaps)
    }

    if (this.props.onHoverMaps) {
      this.props.onHoverMaps(hoveredMaps)
    }
  }

  updateHighlightedMaps (latlng, tree, allGeoJSON) {
    this.highlightMapsLatLng = latlng
    const hoveredMaps = this.highlightMaps(latlng, tree || this.props.tree, allGeoJSON || this.props.allGeoJSON)
    this.setHoveredMaps(hoveredMaps)
  }

  // From: https://remysharp.com/2010/07/21/throttling-function-calls
  throttle (fn, threshhold = 250, scope) {
    var last
    var deferTimer

    return function () {
      var context = scope || this

      var now = +new Date()
      var args = arguments

      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, threshhold)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }

  zoomThreshold = 16

  selectedStyleForZoom (zoom) {
    var style = Object.assign({}, this.props.options.geojsonSelected)
    if (zoom >= this.zoomThreshold) {
      style.fillOpacity = 0
    }
    return style
  }

  zoomEnd () {
    const zoom = this.map.getZoom()
    if ((this.lastZoom < this.zoomThreshold && zoom >= this.zoomThreshold) ||
      (this.lastZoom >= this.zoomThreshold && zoom < this.zoomThreshold)) {
      this.allDataLayer.setStyle(this.selectedStyleForZoom(zoom))
    }
    this.lastZoom = zoom
  }

  highlightMaps (latlng, tree, allGeoJSON) {
    if (!tree || !allGeoJSON) {
      return []
    }

    const results = tree.search({
      minX: latlng.lng,
      minY: latlng.lat,
      maxX: latlng.lng,
      maxY: latlng.lat
    })

    if (results.length) {
      const hoveredMaps = results.map((result) => allGeoJSON.features[result.index])
      .filter((feature) => {
        const point = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              latlng.lng,
              latlng.lat
            ]
          }
        }
        return turfInside(point, feature)
      })

      return hoveredMaps
    }

    return []
  }
}

export default HoverMap
