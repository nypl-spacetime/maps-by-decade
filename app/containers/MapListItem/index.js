import React from 'react'
import { connect } from 'react-redux'

import MapHeading from 'containers/MapHeading'

import {
  showLightbox
} from 'containers/App/actions'

import { Item, ImageLink, DataContainer } from './styles'

export class MapListItem extends React.Component {

  render () {
    const imageUrl = `http://images.nypl.org/index.php?id=${this.props.map.properties.imageId}&t=f`

    const jsonUriData = encodeURIComponent(JSON.stringify({
      type: 'Feature',
      properties: {
        id: this.props.map.properties.id,
        type: 'st:Map',
        name: this.props.map.properties.name,
        validSince: this.props.map.properties.year,
        validUntil: this.props.map.properties.year,
        data: {
          // description: '',
          nyplDigitalId: this.props.map.properties.imageId,
          uuid: this.props.map.properties.uuid,
          masked: true
          // nyplUrl: '',
          // area: 0.21033
        }
      },
      geometry: this.props.map.geometry
    }))
    const geojsonUrl = `http://geojson.io/#data=data:application/json,${jsonUriData}`

    return (
      <Item>
        <DataContainer>
          <MapHeading map={this.props.map}>
            {this.props.children}
            <a href={`http://maps.nypl.org/warper/maps/${this.props.map.properties.id}`} target='_blank'>Map Warper</a>
            <a href={`http://digitalcollections.nypl.org/items/${this.props.map.properties.uuid}`} target='_blank'>Digital Collections</a>
            <a href={geojsonUrl} target='_blank'>View data on geojson.io</a>
          </MapHeading>
        </DataContainer>
        <ImageLink href='javascript:void(0)' onClick={this.showLightbox.bind(this)}>
          <img src={imageUrl} />
        </ImageLink>
      </Item>
    )
  }

  showLightbox () {
    this.props.showLightbox(true, this.props.index)
  }

}

function mapDispatchToProps (dispatch) {
  return {
    showLightbox: (show, index) => dispatch(showLightbox(show, index))
  }
}

export default connect(null, mapDispatchToProps)(MapListItem)
