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

export const Header = styled.div`
`

export const Footer = styled.div`
  & > span {
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 6px 13px 4px 13px;
    border-radius: 3px;
  }
`

export const PreviousNext = styled.div`
  width: 120px;

  & a {
    display: inline-block;
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 6px 13px 4px 13px;
    border-radius: 3px;
    pointer-events: all;
  }

  @media (max-width: ${mobileWidth}) {
    width: 50px;

    & span.hide-on-mobile {
      display: none;
    }

    & span::before,
    & span::after {
      margin: 0;
    }
  }
`

export const Previous = styled(PreviousNext)`
  & a {
    float: right;
  }
`

export const Next = styled(PreviousNext)`
  & a {
    float: left;
  }
`

export const Middle = styled.div`
  width: 200px;
  margin: 0 10px;
  pointer-events: none;

  & h2 {
    font-size: 2em;
    font-family: 'MiloSlab';
    font-weight: bold;

    /*TODO: use color variable*/
    text-shadow: 0 0 4px rgb(247, 241, 217);
    text-align: center;
    margin: 0;
  }

  @media (max-width: ${mobileWidth}) {
    & h2 {
      font-size: 1.2em;
    }

    width: 120px;
  }
`

export const Back = styled.div`
  font-size: 16px;
  text-align: center;
  display: block;
  text-decoration: underline;
  pointer-events: all;
`
