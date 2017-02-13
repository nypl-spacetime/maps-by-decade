import React from 'react'
import { connect } from 'react-redux'

import MiniMap from 'containers/MiniMap'

import { createSelector } from 'reselect'

import {
  selectGeoJSON
} from 'containers/App/selectors'

import { List, ItemWrapper, Item, MiniMapContainer, ChildContainer } from './styles'

export class DecadeList extends React.Component {
  render () {
    return (
      <List>
        { this.props.children.map((child, i) => (
          <ItemWrapper key={`child-${i}`}>
            <Item>
              <MiniMapContainer>
                <ChildContainer>
                  {child}
                </ChildContainer>
              </MiniMapContainer>
            </Item>
          </ItemWrapper>
        ))}
        { this.props.groupedGeoJSON.features.map((feature, i) => (
          <ItemWrapper key={`map-${i}`}>
            <Item>
              <MiniMapContainer>
                <MiniMap feature={feature} />
              </MiniMapContainer>
            </Item>
          </ItemWrapper>
        ))}
      </List>
    )
  }
}

export default connect(createSelector(
  selectGeoJSON('grouped'),
  (groupedGeoJSON) => ({
    groupedGeoJSON
  })
))(DecadeList)
