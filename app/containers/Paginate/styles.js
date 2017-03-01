/* global __CONFIG__ */

import styled from 'styled-components'

const mapColor = __CONFIG__.cssVariables.mapColor

export const StyledNav = styled.nav`
  & ol {
    border-radius: 3px;

    list-style-type: none;
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: center;

    margin-bottom: 5px;
  }

  & li {
    display: inline-block;
  }

  & li > * {
    text-align: center;

    display: inline-block
    border-radius: 3px;

    padding: 10px;
    width: 50px;
  }

  & li.active a {
    background-color: ${mapColor};
  }

  & li:not(.disabled) > a {
    cursor: pointer;
  }

  & li:not(.disabled) > a:hover {
    background-color: ${mapColor};
  }

  & li.disabled > * {
    opacity: 0.2;
  }
`
