/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;

  @media (max-width: ${mobileWidth}) {
    flex-direction: column;
  }
`

export const Pane = styled.div`
  position: relative;
  display: flex;
  width: 50%;

  @media (max-width: ${mobileWidth}) {
    width: 100%;
    display: ${(props) => props.active ? 'flex' : 'none'};
  }
`
