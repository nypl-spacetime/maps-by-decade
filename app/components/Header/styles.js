 /* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const mainColor = __CONFIG__.cssVariables.mainColor

export const StyledHeader = styled.header`
  background-color: ${mainColor};
  line-height: 1.5;
  overflow: hidden;

  padding: 5px;

  // border-bottom-style: solid;
  // border-bottom-width: 1px;
  // border-bottom-color: white;

  &,
  & a,
  & a:visited {
    text-decoration: none;
  }

  & h1 {
    margin: 0;
    display: inline-block;
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

  @media (max-width: 600px) {
    flex-direction: column;

    & div:first-child {
      margin-bottom: 10px;
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
    line-height: 1.2em;
  }

  & div:first-child {
    font-weight: normal;
  }

  & div:last-child {
    font-weight: 200;
  }

  @media (max-width: ${mobileWidth}) {
    & {
      display: none;
    }
  }
`
