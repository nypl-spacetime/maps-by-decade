import React from 'react'
import styled from 'styled-components'

export const Heading = styled.h4`
  margin-bottom: 10px;
  font-size: 1em;
`

export default function DataPageHeading (props) {
  return (
    <Heading>
      {props.children}
    </Heading>
  )
}
