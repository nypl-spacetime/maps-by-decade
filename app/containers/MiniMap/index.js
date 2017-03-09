import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { createSelector } from 'reselect'

import { decadeToPeriod } from 'utils/utils'

import {
  newMiniMap
} from 'containers/App/actions'

import {
  selectHasTouch,
  selectDecadeGeoJSON,
  selectMapOptions
} from 'containers/App/selectors'

import HoverMap from 'containers/HoverMap'

import { StyledMiniMap, Title } from './styles'

export class MiniMap extends React.Component {

  static contextTypes = {
    trees: React.PropTypes.object
  }

  constructor (props) {
    super(props)

    this.maps = []
  }

  render () {
    const group = this.props.feature.properties.group
    const tree = this.context.trees && this.context.trees[group]

    let mapOptions = Object.assign(this.props.mapOptions, {
      map: Object.assign(this.props.mapOptions.map, {
        dragging: !this.props.hasTouch
      })
    })

    return (
      <StyledMiniMap onKeyDown={this.containerKeyDown.bind(this)}>
        <HoverMap decade={group} tree={tree} onEachFeatureAll={this.onEachFeature.bind(this)}
          onEachFeatureGrouped={this.onEachFeature.bind(this)} hasTouch={this.props.hasTouch}
          groupedGeoJSON={this.props.feature} allGeoJSON={this.props.allGeoJSON}
          mapCreated={this.mapCreated.bind(this)} options={mapOptions} />
        <Title>
          <Link to={group}>
            {decadeToPeriod(group)}
          </Link>
        </Title>
      </StyledMiniMap>
    )
  }

  openDecade (decade) {
    this.props.changeRoute(`/${decade}`)
    // if (mapId) {
    //   this.props.changeRoute(`/${decade}/${mapId}`)
    // } else {
    //   this.props.changeRoute(`/${decade}`)
    // }
  }

  containerKeyDown (e) {
    if (e.keyCode !== 13) {
      return
    }

    this.onClick()
  }

  mapCreated (map) {
    map.on('click', this.onClick.bind(this))
    if (!this.props.hasTouch) {
      this.props.newMiniMap(map)
    }
  }

  onEachFeature (feature, layer) {
    layer.on({
      click: () => {
        const decade = this.props.feature.properties.group
        this.openDecade(decade)
      }
    })
  }

  onClick () {
    const decade = this.props.feature.properties.group
    this.openDecade(decade)
  }
}

function mapStateToProps (state, ownProps) {
  const group = ownProps.feature.properties.group
  return createSelector(
    selectHasTouch(),
    selectDecadeGeoJSON('all', group),
    selectMapOptions('miniMap'),
    (hasTouch, allGeoJSON, mapOptions) => ({
      hasTouch, allGeoJSON, mapOptions
    })
  )(state)
}

function mapDispatchToProps (dispatch) {
  return {
    newMiniMap: (map) => dispatch(newMiniMap(map)),
    changeRoute: (url) => dispatch(push(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniMap)
