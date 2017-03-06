import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 999;

  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100px;
`

import image from 'images/crosshair.svg'

function Crosshair (props) {
  return (
    <Container>
      <Image src={image} />
    </Container>
  )
}

export default Crosshair
