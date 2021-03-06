import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Helmet from 'react-helmet'

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
          <h2>About this project</h2>
          <p>
            Maps by Decade shows New York City street maps from <a href='https://www.nypl.org/'>The New York Public Library</a>'s
            Lionel Pincus and Princess Firyal <a href='https://nypl.org/locations/divisions/map-division'>Map Division</a>&mdash;published
            between {yearMin} and {yearMax}&mdash;grouped by decade. It contains {mapCount} large-scale maps
            (i.e. maps depicting an area smaller than 5 km²) that are digitized, georectified, and in the
            public domain (or for which the Library holds the copyright).
          </p>

          <h3>Collection Resources</h3>
          <p>
            Maps by Decade represents just a subset of NYPL's full map collection.
            You can browse 20,000 more maps and atlases in our <a href='https://digitalcollections.nypl.org/'>Digital Collections</a>.
          </p>
          <p>
            To plan a research visit to view maps in person or for more information about
            both digitized and non-digitized maps, contact the staff of
            the <a href='https://www.nypl.org/locations/divisions/map-division'>Lionel Pincus and Princess Firyal Map Division</a>.
          </p>

          <h3>Data</h3>
          <p>
            The data for Maps by Decade comes from <a href='http://maps.nypl.org/'>Map Warper</a>,
            our tool for browsing and georectifying thousands of the Library's public domain maps.
            To explore, download and use this dataset (and many others), see
            the <a href='http://spacetime.nypl.org/#data'>Data section</a> on the website of
            the NYC Space/Time Directory.
          </p>
          <p>
            For detailed information about how data from Map Warper is used in Maps by Decade,
            see <a href='https://github.com/nypl-spacetime/maps-by-decade/#data'>GitHub</a>.
          </p>
          <p>
            Screenshot of displaying the outlines of all Map Warper maps in <a href='http://www.qgis.org/'>QGIS</a>:
          </p>
          <p>
            <img src={qgisMapwarper} alt='Displaying the Map Warper dataset in QGIS' />
          </p>

          <h3>Source Code</h3>
          <p>
            The source code for Maps by Decade is available on <a href='https://github.com/nypl-spacetime/maps-by-decade'>GitHub</a>,
            along with more than <a href='https://github.com/nypl-spacetime/'>120 other open repositories</a> that make up the
            NYC Space/Time Directory project.
          </p>

          <h2>Keyboard Navigation</h2>
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
                  Move map east, north, west and south &mdash; hold <kbd>Shift</kbd> for a larger
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

          <h2>Acknowledgements</h2>
          <p>
            Maps by Decade is part of the <a href='http://spacetime.nypl.org/'>NYC Space/Time
            Directory</a>. The goal of this project is to&mdash;through a
            variety of resources&mdash;unlock the potential of historical maps and provide
            opportunities to explore urban history across space and time.
          </p>
          <p>
            Major support for the NYC Space/Time Directory is provided by
            the <a href='http://www.knightfoundation.org/grants/6715'>Knight News Challenge</a>,
            an initiative of the <a href='http://www.knightfoundation.org/'>John S. and James
            L. Knight Foundation</a>.
          </p>
          <p>
            <img src={knightFoundation} alt='Knight Foundation Logo' style={{width: '50%', opacity: 0.88}} />
          </p>
          <h2>Accessibility</h2>
          <p>
            <a href='https://www.nypl.org/'>The New York Public Library</a> strives to ensure that
            everyone has access to the full range of information, programs, and services that it
            offers. When developing NYPL websites and mobile applications, our digital teams seek
            to conform to <a href='https://www.w3.org/TR/WCAG20/'>Web Content Accessibility Guidelines
            (WCAG) 2.0</a> success criteria of at least Level AA. Even when surpassing these
            criteria, we realize that we might not meet the needs of all users. As new techniques
            emerge to address accessibility issues, we are committed to incorporating them into our
            development processes.
          </p>
          <p>
            Some items in our collections present accessibility challenges. In such cases, we look
            at using metadata in different ways to improve accessibility. Additionally, as part of
            our efforts, we actively work on projects that enrich our metadata. As a result, we are
            increasingly able to provide better experiences with our collections for all
            users&mdash;regardless of their abilities.
          </p>
          <p>
            If you encounter any accessibility shortfalls when using Maps by Decade, or would like
            to provide other feedback, please email <a href='mailto:spacetime@nypl.org'>spacetime@nypl.org</a> or
            call <a href='tel:9172756975'>917-275-6975</a> (TTY <a href='tel:2129300020'>212-930-0020</a>).
          </p>
          <p>
            For further information about assistive technologies and accommodations available
            for people with disabilities at the <a href='https://www.nypl.org/locations/'>research
            centers and branch libraries</a> of The New York Public Library, please visit <a href='http://nypl.org/accessibility'>nypl.org/accessibility</a> or email <a href='mailto:accessibility@nypl.org'>accessibility@nypl.org</a>.
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
