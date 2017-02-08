import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import ReactPaginate from 'react-paginate'

import NoMapsFound from 'components/NoMapsFound'
import MapListItem from 'containers/MapListItem'

import {
  selectGroupBounds
} from 'containers/App/selectors'

import {
  selectMaps
} from 'containers/App/actions'

import { PaginateContainer, StyledList } from './styles'

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
    const features = this.getMaps(this.state.page)

    let paginate

    if (count > 1) {
      paginate = (
        <PaginateContainer>
          <ReactPaginate previousLabel='<' nextLabel='>' key={count} initialPage={0}
            breakLabel={<span>...</span>} breakClassName={'break'}
            pageCount={count} marginPagesDisplayed={2} pageRangeDisplayed={4}
            onPageChange={this.handlePageClick.bind(this)} activeClassName={'active'} />
        </PaginateContainer>
      )
    }

    if (count === 0) {
      return <NoMapsFound groupBounds={this.props.groupBounds} />
    } else {
      return (
        <div>
          <p>
            Found {this.props.features.length} maps:
          </p>
          {paginate}
          <StyledList>
            { features.map((map, index) =>
              <MapListItem key={`${index}-${map.properties.id}`} map={map} index={index} />
            ) }
          </StyledList>
          {paginate}
        </div>
      )
    }
  }

  handlePageClick (data) {
    this.setState({
      page: data.selected
    })
    this.props.selectMaps(this.getMaps(data.selected))
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
