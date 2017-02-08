import React from 'react'
import { connect } from 'react-redux'

import Article from 'components/Article'

import DecadeList from 'containers/DecadeList'

import { createSelector } from 'reselect'

import {
  selectGeoJSON
} from 'containers/App/selectors'

export class HomePage extends React.Component {

  render () {
    const mapCount = this.props.geojsonAll.features.length.toString().split('').reverse().join('').match(/.{1,3}/g).join(',').split('').reverse().join('')
    return (
      <div>
        <Article>
          <p>
            {mapCount} New York City street maps from the New York Public Library's <a href='https://www.nypl.org/about/divisions/map-division'>Lionel Pincus and Princess Firyal Map Division</a>, grouped by decade.
            Click on a map to browse that decade's maps.
          </p>
          <DecadeList />
        </Article>
      </div>
    )
  }
}

export default connect(createSelector(
  selectGeoJSON('all'),
  (geojsonAll) => ({
    geojsonAll
  })
))(HomePage)
