import React from 'react'
import styled from 'styled-components'

const Container = styled.article`
  margin: 0 auto;
  max-width: 900px;
  padding: 10px;
`

function Article (props) {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default Article
