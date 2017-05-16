/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 999;

  & > * {
    user-select: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`

export const Box = styled.div`
  text-align: center;

  & > * {
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 6px 13px 6px 13px;
    border-radius: 3px;
  }

  & > a {
    pointer-events: all;
  }
`

export const PreviousNext = styled.div`
  width: 120px;

  & a {
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 6px 13px 6px 13px;
    border-radius: 3px;
    pointer-events: all;
  }

  @media (max-width: ${mobileWidth}) {
    width: 50px;

    & span::before,
    & span::after {
      margin: 0;
    }
  }
`

export const Previous = styled(PreviousNext)`
  order: 0;
  & a {
    float: right;
  }
`

export const Next = styled(PreviousNext)`
  order: 2;
  & a {
    float: left;
  }
`

export const Middle = styled.div`
  order: 1;
  width: 220px;
  margin: 0 10px;
  pointer-events: none;

  @media (max-width: ${mobileWidth}) {
    width: 140px;
  }
`

export const Title = styled.h2`
  font-size: 2.5rem;
  font-family: 'MiloSlab';
  font-weight: bold;

  text-shadow: 0 0 4px white;
  text-align: center;
  margin: 0;

  @media (max-width: ${mobileWidth}) {
    & {
      font-size: 1.8em;
    }
  }
`
