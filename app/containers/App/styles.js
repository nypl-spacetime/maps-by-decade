/* global __CONFIG__ */

import styled from 'styled-components'

const backgroundColor = __CONFIG__.cssVariables.backgroundColor
const mobileWidth = __CONFIG__.cssVariables.mobileWidth

const headerHeight = '58px'
const headerHeightMobile1 = '50px'
const headerHeightMobile2 = '94px'

export const Container = styled.div`
  height: 100%;
  background-color: ${backgroundColor};
`

export const Contents = styled.div`
  overflow-y: auto;

  position: absolute;
  width: 100%;
  top: ${headerHeight};
  bottom: 0;

  @media (max-width: ${mobileWidth}) {
    top: ${headerHeightMobile1};
  }

  @media (max-width: 600px) {
    top: ${headerHeightMobile2};
  }
`
