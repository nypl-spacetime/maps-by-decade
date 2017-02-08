import styled from 'styled-components'

export const Buttons = styled.nav`
  & > * {
    display: inline-block;
    padding: 3px 12px;
    opacity: 0.7;
    background-color: rgba(255, 255, 255, 0.5);
  }

  & > *:first-child {
    border-radius: 12px 0 0 12px;
  }

  & > *:last-child {
    border-radius: 0 12px 12px 0;
  }

  & a.selected,
  & a:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.8);
  }
`
