import styled from 'styled-components'

export const StyledForm = styled.form`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;

  & > * {
    padding-bottom: 1em;
  }

  & input[type=text] {
    width: 100%;
    background-color: white;
    padding: .3em .5em;
    margin-bottom: 1em;
    border-radius: 5px;
    border-style: solid;
    border-width: 2px;
    border-color: #999;
  }

  & label > span:after {
    content: ':';
    margin-right: 0.5em;
  }
`

export const Decades = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  user-select: none;

  & div:first-child {
    border-radius: 40px;
  }

  & label {
    display: inline-block;
    text-align: center;
    // width: 100%;
    padding: 0.5em 0.2em;
    cursor: pointer;
    opacity: 0.5;
  }

  // & input:checked + label {
  //   background-color: rgba(255, 255, 255, 0.5);
  //   opacity: 1;
  // }

  & input:focus ~ label {
    outline-color: #ffd72e;
    outline-style: solid;
  }
`
