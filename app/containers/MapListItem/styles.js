/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 10px;

  @media (max-width: ${mobileWidth}) {
    & {
      flex-direction: column;
    }
  }
`

export const ImageLink = styled.a`
  padding: 5px;
  box-sizing: border-box;
  flex-shrink: 0;
  cursor: zoom-in;
  height: 140px;
  max-width: 300px;
  overflow: hidden;
  margin-left: 10px;

  @media (max-width: ${mobileWidth}) {
    margin-left: 0;
  }
`

export const DataContainer = styled.div`
  width: 100%;
  overflow: hidden;
`
