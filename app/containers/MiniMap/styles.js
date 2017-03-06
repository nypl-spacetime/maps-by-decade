/* global __CONFIG__ */

import styled from 'styled-components'

const outlineColor = __CONFIG__.cssVariables.outlineColor

export const StyledMiniMap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  cursor: pointer;
  border-radius: 3px;

  & .leaflet-container:focus {
    outline: 2px solid;
    outline-color: ${outlineColor};
  }
`

export const Title = styled.h2`
  top: 0;
  position: absolute;
  pointer-events: none;
  z-index: 1000;
  font-family: 'MiloSlab';
  font-weight: bold;
  font-size: 1.8em;

  width: 100%;
  padding: 10px;
  margin: 0;

  text-shadow: 0 0 8px white;
  text-align: center;
`
