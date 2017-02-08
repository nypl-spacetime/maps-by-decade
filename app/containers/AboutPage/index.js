import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Page from 'components/Page'
import Footer from 'components/Footer'
import Article from 'components/Article'

import { KeyboardTable } from './styles'

import {
  selectGroupBounds,
  selectMapCount
} from 'containers/App/selectors'

import { formatNumber } from 'utils/utils'

export class AboutPage extends React.Component {
  render () {
    const yearMin = this.props.groupBounds[0]
    const yearMax = this.props.groupBounds[1]
    const mapCount = formatNumber(this.props.mapCount)

    return (
      <Page>
        <Article>
          <h4>About Maps by Decade</h4>
          <p>
            Maps by Decade shows New York City street maps from the New York Public Library's <a href='https://www.nypl.org/about/divisions/map-division'>Lionel Pincus and Princess Firyal Map Division</a> — published between {yearMin} and {yearMax} — grouped by decade.
          </p>
          <p>
            Maps by Decade shows {mapCount} large-scale maps (i.e. maps depicting an area smaller than 5 km²) of New York City that are digitized, georectified, and in the public domain (or of which the Library holds the copyright). You can browse 20,000 more maps and atlases in NYPL's <a href='http://digitalcollections.nypl.org/'>Digital Collections</a>, the Library's database of its digitized collections. Or visit <a href='http://maps.nypl.org/'>Map Warper</a>, our online tool for rectifying public domain maps.
          </p>
          <h4>Collection Resources</h4>
          <p>
            Maps by Decade is just a subset from NYPL's full map collection. To view more digitized maps, visit our Digital Collections. To arrange for viewing maps in-person, for more information on the full collection of digitized and non-digitized maps, or for additional questions, contact the staff of the <a href='https://www.nypl.org/locations/divisions/map-division'>Lionel Pincus and Princess Firyal Map Division</a>.
          </p>
          <h4>Keyboard</h4>
          <KeyboardTable>
            <thead>
              <tr>
                <th>Key</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <kbd>←</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd>
                </td>
                <td>
                  Move map east, north, west and south — hold <kbd>Shift</kbd> for a larger distance
                </td>
              </tr>
              <tr>
                <td>
                  <kbd>+</kbd> <kbd>-</kbd>
                </td>
                <td>
                  Zoom map in and out
                </td>
              </tr>
              <tr>
                <td>
                  <kbd>[</kbd> <kbd>]</kbd>
                </td>
                <td>
                  Go to previous decade, go to next decade
                </td>
              </tr>
              <tr>
                <td><kbd>Enter</kbd></td>
                <td>
                  Select maps
                </td>
              </tr>
              <tr>
                <td><kbd>Esc</kbd></td>
                <td>
                  Deselect maps, go back one level
                </td>
              </tr>
            </tbody>
          </KeyboardTable>

          <h4>Data</h4>
          <p>
            Coming soon!
          </p>

          <h4>GitHub</h4>
          <p>
            The source code of Maps by Decade is available on <a href='https://github.com/nypl-spacetime/maps-by-decade'>GitHub</a>.
          </p>
        </Article>
        <Footer />
      </Page>
    )
  }
}

export default connect(createSelector(
  selectGroupBounds(),
  selectMapCount(),
  (groupBounds, mapCount) => ({
    groupBounds, mapCount
  })
))(AboutPage)
