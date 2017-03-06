/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const mapColor = __CONFIG__.cssVariables.mapColor

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const Pane = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  position: relative;

  @media (max-width: ${mobileWidth}) {
    width: 100%;
    display: ${(props) => props.active ? 'flex' : 'none'};
  }
`

export const MapPane = styled(Pane)`
  & .map {
    background-color: ${mapColor};
  }
`
