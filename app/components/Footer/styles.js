/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const StyledFooter = styled.footer`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  margin-top: 1em;
  margin-bottom: 1em;

  & nav {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 10px;
    text-align: center;
  }

  & nav a,
  & nav a:visited {
    margin: 0 .5em;
  }

  & nav a:hover {
    text-decoration: underline;
  }

  & img {
    margin: 0 auto;
    width: 55px;
  }

  & p {
    text-align: center;
  }

  @media (max-width: ${mobileWidth}) {
    & nav {
      flex-direction: column;
    }
  }
`
