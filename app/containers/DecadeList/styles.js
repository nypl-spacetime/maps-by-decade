/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style-type: none;
  position: relative;
  margin: 0;
  padding: 0;
`

export const ItemWrapper = styled.li`
  position: relative;
  width: calc(33.33% - 6.66px);

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    position: relative;
  }

  @media (max-width: ${mobileWidth}) {
    & {
      width: calc(50% - 5px);
    }
  }

  @media (max-width: 550px) {
    & {
      width: 100%;
    }
  }
`

export const Item = styled.div`
  position: relative;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const ChildContainer = styled(Item)`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;

  & > p {
    margin: 0;
    text-align: center;
  }
`

export const MiniMapContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
`
