import styled from 'styled-components'

export const StyledMiniMap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  cursor: pointer;
  border-radius: 3px;

  &:hover .leaflet-container,
  & .leaflet-container:focus {
    // border-color: #ffd72e;
  }

  & .leaflet-container:focus {
    // border-color: #ffd72e;
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
