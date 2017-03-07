import React from 'react'

import { StyledNav } from './styles'

// Ideas from http://www.a11ymatters.com/pattern/pagination/

function Item (props) {
  const isCurrent = props.page !== undefined && props.currentPage === props.page
  const tabIndex = (!isCurrent && props.page !== undefined) ? 0 : -1
  const disabled = props.page === undefined
  const href = disabled ? null : 'javascript:void(0)'
  let className = [
    disabled ? 'disabled' : null,
    isCurrent ? 'active' : null
  ].filter((className) => className).join(' ')

  return (
    <li className={className} key={props.page} >
      <a href={href} aria-label={props.label} aria-current={isCurrent} aria-hidden={disabled}
        tabIndex={tabIndex} onClick={props.onClick}>
        {props.children}
      </a>
    </li>
  )
}

export class Paginate extends React.Component {

  createPageClickHandler (page) {
    return () => this.props.onPageChange(page)
  }

  createArray (from, to) {
    if (from > to) {
      return []
    }

    return Array.from(new Array(to - from + 1))
      .map((value, index) => index + from)
  }

  createItem (page) {
    return (
      <Item page={page} label={`Go to page ${page + 1}`} key={page}
        currentPage={this.props.page} onClick={this.createPageClickHandler(page)}>{page + 1}</Item>
    )
  }

  render () {
    let previous
    let firstItems = []
    let firstBreak
    let aroundItems = []
    let lastBreak
    let lastItems = []
    let next

    const itemsAround = 1
    const itemsEdge = 2
    const itemsAroundEdge = 2

    if (this.props.page > 0) {
      const previousPage = this.props.page - 1
      previous = (
        <Item page={previousPage} label={`Previous page, page ${previousPage + 1}`}
          currentPage={this.props.page} onClick={this.createPageClickHandler(previousPage)}>&lt;</Item>
      )
    } else {
      previous = <Item>&lt;</Item>
    }

    if (this.props.page < this.props.pageCount - 1) {
      const nextPage = this.props.page + 1
      next = <Item page={nextPage} label={`Next page, page ${nextPage + 1}`}
        currentPage={this.props.page} onClick={this.createPageClickHandler(nextPage)}>&gt;</Item>
    } else {
      next = <Item>&gt;</Item>
    }

    if (this.props.pageCount < itemsAroundEdge * 2 + itemsAround * 2 + 1 + 2) {
      aroundItems = this.createArray(0, this.props.pageCount - 1)
        .map(this.createItem.bind(this))
    } else {
      let aroundFrom
      let aroundTo

      if (this.props.page === 0) {
        aroundFrom = 0
        aroundTo = itemsAroundEdge
      } else if (this.props.page === this.props.pageCount - 1) {
        aroundFrom = this.props.pageCount - 1 - itemsAroundEdge
        aroundTo = this.props.pageCount - 1
      } else {
        aroundFrom = Math.max(this.props.page - itemsAround, 0)
        aroundTo = Math.min(this.props.page + itemsAround, this.props.pageCount - 1)
      }

      aroundItems = this.createArray(aroundFrom, aroundTo)
        .map(this.createItem.bind(this))

      if (this.props.page - itemsAround > 0) {
        if (this.props.page < itemsAroundEdge + itemsAround * 2 + 1) {
          firstItems = this.createArray(0, this.props.page + itemsAround)
            .map(this.createItem.bind(this))
          aroundItems = []
        } else {
          firstItems = this.createArray(0, itemsEdge - 1)
            .map(this.createItem.bind(this))
          firstBreak = (
            <Item>&hellip;</Item>
          )
        }
      }

      if (this.props.page + itemsAround < this.props.pageCount - 1) {
        if (this.props.page > this.props.pageCount - 1 - (itemsAroundEdge + itemsAround * 2 + 1)) {
          lastItems = this.createArray(this.props.page - itemsAround, this.props.pageCount - 1)
            .map(this.createItem.bind(this))
          aroundItems = []
        } else {
          lastItems = this.createArray(this.props.pageCount - itemsEdge, this.props.pageCount - 1)
            .map(this.createItem.bind(this))
          lastBreak = (
            <Item>&hellip;</Item>
          )
        }
      }
    }

    const currentPage = `Current page: ${this.props.page + 1}`

    return (
      <StyledNav aria-label='Pagination navigation'>
        <div className='only-screen-reader' id='paginate-current-page'
          aria-atomic='true' aria-live='polite' aria-relevant='text additions'>
          {currentPage}
        </div>
        <ol aria-controls='paginate-current-page'>
          {previous}
          {firstItems}
          {firstBreak}
          {aroundItems}
          {lastBreak}
          {lastItems}
          {next}
        </ol>
      </StyledNav>
    )
  }
}

export default Paginate
