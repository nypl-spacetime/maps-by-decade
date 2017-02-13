import styled from 'styled-components'

export const StyledMiniMap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;

  cursor: pointer;
  border-radius: 3px;

  & .leaflet-container {
    border-color: rgb(196, 224, 232);
    border-style: solid;
    border-width: 2.5px;
  }

  &:hover .leaflet-container,
  & .leaflet-container:focus {
    border-color: #ffd72e;
  }
`

export const Title = styled.h2`
  position: absolute;
  pointer-events: none;
  z-index: 1000;
  font-family: 'MiloSlab';
  font-weight: bold;
  font-size: 1.5em;

  width: 100%;
  padding: 10px;
  margin: 0;

  /*TODO: use color variable*/
  text-shadow: 0 0 8px rgb(196, 224, 232);
  text-align: center;
`
