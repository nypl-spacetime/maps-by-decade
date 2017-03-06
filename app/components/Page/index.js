/* global __CONFIG__ */

import React from 'react'
import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const mapColor = __CONFIG__.cssVariables.mapColor

const Container = styled.div`
  & h2 {
    border-bottom: solid 5px ${mapColor};
  }

  & h3 {
    border-bottom: solid 2px ${mapColor};
  }

  @media (min-width: ${mobileWidth}) {
    & p,
    & table,
    & h3, & h4 {
      width: 66.666%;
      margin-left: 33.333%
    }
  }

  & p img {
    max-width: 100%;
  }
`

function Page (props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default Page
