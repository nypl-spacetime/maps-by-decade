/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  flex-basis: 100%;

  overflow-y: scroll;

  padding: 10px;
  box-sizing: border-box;
`

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  max-width: 800px;
`

export const Instructions = styled.div`
  flex-basis: 100%;
  display: flex;
  padding: 10px;
  flex-direction: row;
  align-items: center;

  & > span {
    padding: 10px;
  }
`

export const GoBack = styled.div`
  display: none;

  @media (max-width: ${mobileWidth}) {
    display: block;
  }
`