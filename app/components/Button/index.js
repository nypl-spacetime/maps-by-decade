import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  padding: 10px;
`

// const Underline = styled.span`
//   text-decoration: underline;
// `

// const Arrow = styled.span`
//   text-decoration: none;
// `

// const LeftArrow = styled(Arrow)`
//   &:before {
//     margin-right: 0.5em;
//     content: '←';
//   }
// `

// const RightArrow = styled(Arrow)`
//   &:after {
//     margin-left: 0.5em;
//     content: '→';
//   }
// `

function Button (props) {
  return (
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  )
}

export default Button
