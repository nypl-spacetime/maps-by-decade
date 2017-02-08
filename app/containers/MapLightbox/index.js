import React from 'react'
import { connect } from 'react-redux'

import Lightbox from 'react-image-lightbox'

import { createSelector } from 'reselect'

import {
  selectSelectedMaps,
  selectShowLightbox,
  selectLightboxIndex,
  selectLightboxImages,
  selectLightboxTitle
} from 'containers/App/selectors'

import {
  lightboxPrev,
  lightboxNext,
  showLightbox
} from 'containers/App/actions'

import { Button } from './styles'

export class MapLightbox extends React.Component {

  render () {
    if (this.props.lightboxShown) {
      const images = this.props.lightboxImages
      const thumbnails = this.props.lightboxThumbnails
      const index = this.props.lightboxIndex

      const map = this.props.selectedMaps[index]

      const buttons = [
        <Button className='external-link white' href={`http://maps.nypl.org/warper/maps/${map.properties.id}`} target='_blank'>Map Warper</Button>,
        <Button className='external-link white' href={`http://digitalcollections.nypl.org/items/${map.properties.uuid}`} target='_blank'>Digital Collections</Button>
      ]

      let prevSrc
      let nextSrc
      if (images.length > 1) {
        nextSrc = images[(index + 1) % images.length]
        prevSrc = images[(index + images.length - 1) % images.length]
      }

      return (
        <Lightbox
          imageTitle={this.props.lightboxTitle}
          mainSrc={images[index % images.length]}
          nextSrc={nextSrc}
          prevSrc={prevSrc}
          mainSrcThumbnail={thumbnails[index % thumbnails.length]}
          prevSrcThumbnail={thumbnails[(index + 1) % thumbnails.length]}
          nextSrcThumbnail={thumbnails[(index + thumbnails.length - 1) % thumbnails.length]}
          toolbarButtons={buttons}
          onCloseRequest={this.closeLightbox.bind(this)}
          onMovePrevRequest={this.lightboxPrev.bind(this)}
          onMoveNextRequest={this.lightboxNext.bind(this)} />
      )
    }

    return null
  }

  closeLightbox () {
    this.props.closeLightbox()
  }

  lightboxPrev () {
    this.props.lightboxPrev()
  }

  lightboxNext () {
    this.props.lightboxNext()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    lightboxPrev: () => dispatch(lightboxPrev()),
    lightboxNext: () => dispatch(lightboxNext()),
    closeLightbox: (show, index) => dispatch(showLightbox(false))
  }
}

export default connect(createSelector(
  selectSelectedMaps(),
  selectShowLightbox(),
  selectLightboxIndex(),
  selectLightboxImages(),
  selectLightboxImages('t'),
  selectLightboxTitle(),
  (selectedMaps, lightboxShown, lightboxIndex, lightboxImages, lightboxThumbnails, lightboxTitle) => ({
    selectedMaps, lightboxShown, lightboxIndex, lightboxImages, lightboxThumbnails, lightboxTitle
  })
), mapDispatchToProps)(MapLightbox)
