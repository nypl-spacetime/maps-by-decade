import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex-basis: 100%;
  min-width: 0;

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
