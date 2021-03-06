/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  display: flex;

  @media (max-width: ${mobileWidth}) {
    flex-direction: column;
  }
`

export const FiltersContainer = styled.div`
  width: calc(33.33% - 10px);
  flex-shrink: 0;
  margin-right: 10px;

  @media (max-width: ${mobileWidth}) {
    width: auto;
    margin-right: 0;
    margin-bottom: 10px;
  }
`

export const DataPageListContainer = styled.div`
  min-width: 0;
`
