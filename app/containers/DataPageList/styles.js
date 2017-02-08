import styled from 'styled-components'

export const PaginateContainer = styled.div`
  & ul {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 40px;

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
    border-radius: 40px;

    padding: 10px;
    width: 60px;
  }

  & li.active a {
    border-style: solid;
    border-width: 1px;
  }

  & li:not(.disabled) > a {
    cursor: pointer;
  }

  & li:not(.disabled) > a:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  & li.disabled > * {
    opacity: 0.2;
  }
`

export const StyledList = styled.ol`
  margin: 0;
  padding: 0;
`
