import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

import Page from 'components/Page'
import Footer from 'components/Footer'
import Article from 'components/Article'

import { KeyboardTable } from './styles'

import {
  selectGroupBounds,
  selectMapCount
} from 'containers/App/selectors'

import { formatNumber } from 'utils/utils'

import qgisMapwarper from 'images/qgis-mapwarper.png'
import knightFoundation from 'images/knight-foundation.png'

export class AboutPage extends React.Component {
  render () {
    const yearMin = this.props.groupBounds[0]
    const yearMax = this.props.groupBounds[1]
    const mapCount = formatNumber(this.props.mapCount)

    return (
      <Page>
        <Helmet title='About' />
        <Article>
          <h4>About Maps by Decade</h4>
          <p>
            Maps by Decade shows New York City street maps from the New York Public Library's <a href='https://www.nypl.org/about/divisions/map-division'>
            Lionel Pincus and Princess Firyal Map Division</a> &mdash; published between {yearMin} and {yearMax} &mdash;
            grouped by decade.
          </p>
          <p>
            Maps by Decade shows {mapCount} large-scale maps (i.e. maps depicting an area smaller
            than 5 km²) of New York City that are digitized, georectified, and in the public domain
            (or of which the Library holds the copyright). You can browse 20,000 more maps and
            atlases in NYPL's <a href='http://digitalcollections.nypl.org/'>Digital Collections</a>,
            the Library's database of its digitized collections.
            Or visit <a href='http://maps.nypl.org/'>Map Warper</a>, our online tool for rectifying
            public domain maps.
          </p>
          <h4>Collection Resources</h4>
          <p>
            Maps by Decade is just a subset from NYPL's full map collection. To view more digitized
            maps, visit our Digital Collections. To arrange for viewing maps in-person, for more
            information on the full collection of digitized and non-digitized maps, or for additional
            questions, contact the staff of the <a href='https://www.nypl.org/locations/divisions/map-division'>Lionel
            Pincus and Princess Firyal Map Division</a>.
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
                  Move map east, north, west and south — hold <kbd>Shift</kbd> for a larger
                  distance
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
            The data for Maps by Decade comes from the <a href='http://maps.nypl.org/'>NYPL Map Warper</a>, an online tool for browsing and georectifying thousands of the Library's public domain maps.
          </p>
          <p>
            <img src={qgisMapwarper} alt='All Map Warper maps in QGIS' />
          </p>
          <p>
            The data for Maps by Decade is available in <a href='https://en.wikipedia.org/wiki/GeoJSON'>GeoJSON</a>
            in the <a href='https://github.com/nypl-spacetime/maps-by-decade-data'>Maps by Decade Data
            GitHub repository</a>. Among other tools, you can use <a href='http://geojson.io/'>GeoJSON.io</a> to work
            with the dataset.
          </p>
          <p>
            For more datasets, see the Data section of the NYPL Space/Time Directory site. Or for
            examples on how to use the open data from this tool and many others, see
            the <a href='https://github.com/nypl-spacetime/spacetime-data/'>spacetime-data repository</a>.
          </p>

          <h4>GitHub</h4>
          <p>
            The source code for Maps by Decade is available on
            <a href='https://github.com/nypl-spacetime/maps-by-decade'>GitHub</a>,
            along with more than <a href='https://github.com/nypl-spacetime/'>120 other open repositories</a> that make up the
            NYC Space/Time Directory project.
          </p>
          <h4>Acknowledgements</h4>
          <p>
            Maps by Decade is part of the <a href='http://spacetime.nypl.org/'>NYC Space/Time
            Directory</a>, making urban history accessible through a wide variety of resources.
            Major support for the NYC Space/Time Directory is provided by the <a href='http://www.knightfoundation.org/grants/6715'>
            Knight News Challenge</a>,
            an initiative of the <a href='http://www.knightfoundation.org'>John S. and
            James L. Knight Foundation</a>.
          </p>
          <p>
            <img src={knightFoundation} alt='Knight Foundation Logo' />
          </p>
          <h4>Accessibility</h4>
          <p>
            <a href='https://www.nypl.org/'>The New York Public Library</a> strives to ensure
            that anyone can access the information and services it provides. Our digital teams
            seek to conform to <a href='https://www.w3.org/TR/WCAG20/'>Web Content Accessibility
            Guidelines (WCAG) 2.0</a> success criteria of at least Level AA. Even when
            surpassing those criteria, we acknowledge that we might not meet the specific needs
            of all users. As techniques and technologies evolve that better address those needs,
            we are committed to adopting them into our development processes.
          </p>
          <p>
            Maps by Decade, with its collection of digitized street maps, is inherently visual in nature.
            It also includes an interactive, map-based interface that can present challenges from
            an accessibility perspective. To meet WCAG success criteria, we worked to provide text
             alternatives for visual aspects of the Maps by Decade tool. We also made its <Link to='/map'>
             Map</Link> and <Link to='/list'>List</Link> interfaces
             navigable by keyboard, as well as by mouse. These features help fulfill the mission
             of the NYC Space/Time Directory: to allow everyone to travel through time and space
             to explore urban history.
          </p>
          <p>
            If you encounter issues using Maps by Decade or would like to provide feedback regarding
            its accessibility, please email <a href='mailto:spacetime@nypl.org'>spacetime@nypl.org</a>.
          </p>
          <p>
            For further information about assistive technologies and accommodations available for
            people with disabilities at the research centers and branch libraries of
            <a href='https://www.nypl.org/locations/'>The New York Public Library</a>, please
            visit <a href='https://www.nypl.org/accessibility'>nypl.org/accessibility</a> or
            email <a href='mailto:accessibility@nypl.org'>accessibility@nypl.org</a>.
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
