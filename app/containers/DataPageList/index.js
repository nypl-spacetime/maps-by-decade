import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import NoMapsFound from 'components/NoMapsFound'
import MapListItem from 'containers/MapListItem'
import Paginate from 'containers/Paginate'

import { formatNumber } from 'utils/utils'

import {
  selectGroupBounds
} from 'containers/App/selectors'

import {
  selectMaps
} from 'containers/App/actions'

import { StyledList, Found } from './styles'

export class DataPageList extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      perPage: 50
    }
  }

  getMaps (page) {
    const begin = page * this.state.perPage
    const end = (page + 1) * this.state.perPage
    return this.props.features.slice(begin, end)
  }

  componentDidMount () {
    this.props.selectMaps(this.getMaps(this.state.page))
  }

  render () {
    const count = Math.ceil(this.props.features.length / this.state.perPage)
    const page = Math.min(this.state.page, count - 1)
    const features = this.getMaps(page)

    let paginate1
    let paginate2
    if (count > 1) {
      paginate1 = (
        <Paginate page={page} pageCount={count} ariaLive
          onPageChange={this.handlePageClick.bind(this)} />
      )

      paginate2 = (
        <Paginate page={page} pageCount={count}
          onPageChange={this.handlePageClick.bind(this)} />
      )
    }

    if (count === 0) {
      return <NoMapsFound groupBounds={this.props.groupBounds} />
    } else {
      const mapsFound = `${formatNumber(this.props.features.length)} maps found`
      return (
        <div>
          <Found id='data-page-maps-found' aria-atomic='true'
            aria-live='polite' aria-relevant='text additions'>
            {mapsFound}
          </Found>
          {paginate1}
          <StyledList>
            { features.map((map, index) =>
              <MapListItem key={`${index}-${map.properties.id}`} map={map} index={index} />
            ) }
          </StyledList>
          {paginate2}
        </div>
      )
    }
  }

  handlePageClick (page) {
    this.setState({
      page
    })
    this.props.selectMaps(this.getMaps(page))
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectMaps: (maps) => dispatch(selectMaps(maps))
  }
}

export default connect(createSelector(
  selectGroupBounds(),
  (groupBounds) => ({
    groupBounds
  })
), mapDispatchToProps)(DataPageList)
