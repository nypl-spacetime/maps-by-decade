import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Article from 'components/Article'
import DecadeList from 'containers/DecadeList'

import { createSelector } from 'reselect'

import {
  selectGroupBounds
} from 'containers/App/selectors'

export class HomePage extends React.Component {

  render () {
    const yearMin = this.props.groupBounds[0]
    const yearMax = this.props.groupBounds[1]
    return (
      <Article>
        <DecadeList>
          <p>
            Maps by Decade shows digitized New York City street maps from the New York Public Library's <a href='https://www.nypl.org/about/divisions/map-division'>Map Division</a> published between {yearMin} and {yearMax}, grouped by decade.
          </p>
          <p>
            Use it to compare urban geography across time, and marvel at the countours of New York City's past. For more information, see the <Link to='/about'>About page</Link>.
          </p>
        </DecadeList>
      </Article>
    )
  }
}

export default connect(createSelector(
  selectGroupBounds(),
  (groupBounds) => ({
    groupBounds
  })
))(HomePage)
