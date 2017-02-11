import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'

import { createSelector } from 'reselect'

import {
  selectHasTouch,
  selectSelectedMaps,
  selectTileLayerMaps,
  selectMapOptions,
  selectSelectedMapsLocked
} from 'containers/App/selectors'

import {
  lockSelectedMaps
} from 'containers/App/actions'

import ArrowLink from 'components/ArrowLink'
import SelectedMap from 'containers/SelectedMap'
import MapLightbox from 'containers/MapLightbox'
import { Container, List, Instructions, GoBack } from './styles'

export class Sidebar extends React.Component {

  render () {
    if (!this.props.selectedMaps || this.props.selectedMaps.length === 0) {
      let text
      if (this.props.hasTouch) {
        text = 'Drag map to see details; tap to lock selection.'
      } else {
        text = 'Move mouse over map to see details, or use your arrow keys; click to lock selection.'
      }

      return (
        <Instructions>
          <span>
            ←
          </span>
          <span>
            {text} See the <Link to='/about'>About page</Link> for more information.
          </span>
        </Instructions>
      )
    }

    return (
      <Container ref='sidebar'>
        <GoBack>
          <ArrowLink direction='left' onClick={this.goBack.bind(this)}
            title='Go back to map - or press Escape' >
            Go back to map
          </ArrowLink>
        </GoBack>
        <List tabIndex={0}>
          { this.props.selectedMaps.map((map, index) => (
            <SelectedMap map={map} index={index} key={map.properties.id}
              tilesOnMap={this.props.tileLayerMaps.get(String(map.properties.id)) !== undefined} />
          ))}
        </List>
        <MapLightbox />
      </Container>
    )
  }

  goBack () {
    this.props.lockSelectedMaps(false)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    lockSelectedMaps: (locked) => dispatch(lockSelectedMaps(locked)),
    changeRoute: (url) => dispatch(push(url))
  }
}

export default connect(createSelector(
  selectHasTouch(),
  selectSelectedMaps(),
  selectTileLayerMaps(),
  selectMapOptions('miniMap'),
  selectSelectedMapsLocked(),
  (hasTouch, selectedMaps, tileLayerMaps, options, selectedMapsLocked) => ({
    hasTouch, selectedMaps, tileLayerMaps, options, selectedMapsLocked
  })
), mapDispatchToProps)(Sidebar)
