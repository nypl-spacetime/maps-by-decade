/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const StyledHeader = styled.header`
  background-color: rgba(0, 0, 0, 0.2);
  line-height: 1.5;

  padding: 5px;
  flex-shrink: 0;
  flex-wrap: wrap;

  &,
  & a,
  & a:visited {
    text-decoration: none;
  }

  & h1,
  & h2,
  & h3 {
    margin: 0;
    display: inline-block;
  }

  & h1 {
    font-weight: lighter;
    font-size: 40px;
  }

  @media (max-width: ${mobileWidth}) {
    & {
      justify-content: center;
    }

    & > * {
      margin: 0 5px;
    }

    & h1 {
      font-size: 1.5em;
    }
  }
`

export const Logo = styled.a`
  width: 43px;
  height: 43px;
  opacity: 0.8;
  background-size: contain;
  background-position: center;
  margin-top: -3px;
  margin-left: 5px;
  margin-right: 5px;

  & > span {
    border: 0;
    clip: rect(0 0 0 0);
    margin: -1px;
    padding: 0;
    position: absolute;

    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`

export const Subtitles = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: .7em;
  padding-right: .7em;
  border-right: 1px solid #000;

  & > * {
    font-size: 17px;
  }

  & h2 {
    font-weight: normal;
  }

  .& h3 {
    font-weight: 200;
  }

  @media (max-width: ${mobileWidth}) {
    & {
      display: none;
    }
  }
`
