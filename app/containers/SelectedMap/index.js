import React from 'react'
import { connect } from 'react-redux'

import MapListItem from 'containers/MapListItem'

import {
  addTileLayerMap,
  removeTileLayerMap
} from 'containers/App/actions'

export class SelectedMap extends React.Component {

  render () {
    const map = this.props.map

    let tileLink
    if (this.props.tilesOnMap) {
      tileLink = (
        <a href='javascript:void(0)' onClick={this.removeTileLayerMap.bind(this)}>Remove from map</a>
      )
    } else {
      tileLink = (
        <a href='javascript:void(0)' onClick={this.addTileLayerMap.bind(this)}>View on map</a>
      )
    }

    return (
      <MapListItem map={map} index={this.props.index}>
        {tileLink}
      </MapListItem>
    )
  }

  addTileLayerMap () {
    this.props.addTileLayerMap(this.props.map)
  }

  removeTileLayerMap () {
    this.props.removeTileLayerMap(this.props.map)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addTileLayerMap: (feature) => dispatch(addTileLayerMap(feature)),
    removeTileLayerMap: (feature) => dispatch(removeTileLayerMap(feature))
  }
}

export default connect(null, mapDispatchToProps)(SelectedMap)
