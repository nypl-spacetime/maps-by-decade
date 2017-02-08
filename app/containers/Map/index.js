import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'

import L from 'leaflet'
require('./Map.KeyboardEsc')
require('leaflet.sync')

const StyledMap = styled.div`
  // width: 100%;
  // height: 100%;
  // background-color: orange;
  bottom: 0;
  top: 0;
  flex-basis: 100%;
`

export class Map extends React.Component {

  roundCoordinate = (coordinate) => Math.round(coordinate * 1000000) / 1000000

  render () {
    return (
      <StyledMap ref='map' />
    )
  }

  getView = () => {
    if (this.map) {
      var center = this.map.getCenter()
      return {
        center: [
          center.lng,
          center.lat
        ].map(this.roundCoordinate),
        zoom: this.map.getZoom()
      }
    } else {
      return null
    }
  }

  getMap = () => this.map

  componentDidMount = () => {
    var node = findDOMNode(this.refs.map)

    var map = L.map(node, Object.assign({}, this.props.options, {
      keyboard: false
    }))

    if (this.props.options.keyboard) {
      map.addHandler('keyboardEsc', L.Map.KeyboardEsc)
    }

    if (this.props.mapEvents) {
      Object.keys(this.props.mapEvents).forEach((event) => map.on(event, this.props.mapEvents[event]))
    }

    if (this.props.mapCreated) {
      this.props.mapCreated(map)
    }

    const zeroOffsetDimension = node.offsetWidth && node.offsetHeight
    if (zeroOffsetDimension) {
      this.offsetDimensionInterval = window.setInterval(() => {
        if (!zeroOffsetDimension) {
          this.map.invalidateSize()
          window.clearInterval(this.offsetDimensionInterval)
        }
      }, 100)
    }
  }

  componentWillUnmount () {
    if (this.offsetDimensionInterval) {
      window.clearInterval(this.offsetDimensionInterval)
    }
  }

}

export default connect(null, null, null, { withRef: true })(Map)
