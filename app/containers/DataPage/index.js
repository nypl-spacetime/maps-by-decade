import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Page from 'components/Page'
import Article from 'components/Article'
import DataPageList from 'containers/DataPageList'
import Filters from 'containers/Filters'
import MapLightbox from 'containers/MapLightbox'

import {
  selectGeoJSON,
  selectFilters
} from 'containers/App/selectors'

import { Container, FiltersContainer, DataPageListContainer } from './styles'

export class DataPage extends React.Component {
  render () {
    const features = this.props.geojsonAll.features
      .filter(this.filterName.bind(this))
      .filter(this.filterDecades.bind(this))
      // .filter(this.filterCoordinates.bind(this))

    return (
      <Page>
        <Helmet title='List' />
        <Article>
          <Container>
            <FiltersContainer>
              <Filters />
            </FiltersContainer>
            <DataPageListContainer>
              <DataPageList features={features} />
            </DataPageListContainer>
          </Container>
        </Article>
        <MapLightbox />
      </Page>
    )
  }

  filterName (feature) {
    if (!this.props.filters.title) {
      return true
    }

    return feature.properties.name.toLowerCase().includes(this.props.filters.title.toLowerCase())
  }

  filterDecades (feature) {
    const filtered = this.props.filters[`decades-${feature.properties.group}`]

    if (filtered === undefined) {
      return true
    }

    return filtered
  }

  // filterCoordinates (feature) {
  //   return true
  // }
}

export default connect(createSelector(
  selectGeoJSON('all'),
  selectFilters(),
  (geojsonAll, filters) => ({
    geojsonAll, filters
  })
))(DataPage)
