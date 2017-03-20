/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  box-sizing: border-box;
`

export const List = styled.ul`
  margin: 5px;
  padding: 0;
  list-style-type: none;

  max-width: 800px;
`

export const Instructions = styled.div`
  height: 100%;
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
  padding: 5px 10px;
  margin-right: 1.5em;

  @media (max-width: ${mobileWidth}) {
    display: flex;
    justify-content: center;
  }
`
