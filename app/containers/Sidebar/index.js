import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router'

import Lightbox from 'react-image-lightbox';

import { createSelector } from 'reselect';

import {
  selectSelectedMaps,
  selectMapOptions,
  selectSelectedMapsLocked,
  selectShowLightbox,
  selectLightboxIndex,
  selectLightboxImages,
  selectLightboxTitle
} from 'containers/App/selectors';

import {
  showLightbox,
  lightboxPrev,
  lightboxNext
} from 'containers/App/actions';

import SelectedMap from 'containers/SelectedMap';

import styles from './styles.css';

export class Sidebar extends React.Component {

  getMapId = (map) => map.properties.id.split('/')[1];

  render() {
    if (!this.props.selectedMaps || this.props.selectedMaps.length === 0) {
      return (
        <div className={styles.instructions}>
          <span>← Hover over maps for details</span>
        </div>
      );
    }

    let lightbox;
    if (this.props.lightboxShown) {
      const images = this.props.lightboxImages;
      const thumbnails = this.props.lightboxThumbnails;
      const index = this.props.lightboxIndex;
      const map = this.props.selectedMaps[index];

      const buttons = [
        <a className={styles['lightbox-button']} href={`http://maps.nypl.org/warper/maps/${this.getMapId(map)}`} target='_blank'>Map Warper</a>,
        <a className={styles['lightbox-button']} href={map.properties.url} target='_blank'>Digital Collections</a>
      ]

      let prevSrc;
      let nextSrc;
      if (images.length > 1) {
        nextSrc = images[(index + 1) % images.length];
        prevSrc = images[(index + images.length - 1) % images.length];
      }

      lightbox = (
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
      );
    }

    return (
      <div className={styles.container} ref='sidebar'>
        <ul className={styles.list}>
          { this.props.selectedMaps.map((map, index) => (
            <li key={map.properties.id}>
              <SelectedMap map={map} index={index}/>
            </li>
          ))}
        </ul>
        {lightbox}
      </div>
    );
  }

  closeLightbox() {
    this.props.showLightbox(false);
  }

  lightboxPrev() {
    this.props.lightboxPrev()
  }

  lightboxNext() {
    this.props.lightboxNext()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    showLightbox: (show) => dispatch(showLightbox(show)),
    lightboxPrev: () => dispatch(lightboxPrev()),
    lightboxNext: () => dispatch(lightboxNext())
  };
}

export default connect(createSelector(
  selectSelectedMaps(),
  selectMapOptions('miniMap'),
  selectSelectedMapsLocked(),
  selectShowLightbox(),
  selectLightboxIndex(),
  selectLightboxImages(),
  selectLightboxImages('t'),
  selectLightboxTitle(),
  (selectedMaps, options, selectedMapsLocked, lightboxShown, lightboxIndex, lightboxImages, lightboxThumbnails, lightboxTitle) => ({
    selectedMaps, options, selectedMapsLocked, lightboxShown, lightboxIndex, lightboxImages, lightboxThumbnails, lightboxTitle
  })
), mapDispatchToProps)(Sidebar);
