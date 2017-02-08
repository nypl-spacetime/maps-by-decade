import styled from 'styled-components'

export const Container = styled.div`
position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
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
    padding: 6px 13px 6px 13px;
    border-radius: 20px;
  }
`

export const PreviousNext = styled.div`
  width: 120px;

  & > a {
    display: inline-block;
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 6px 13px 6px 13px;
    border-radius: 20px;
    pointer-events: all;
  }
`

export const Previous = styled(PreviousNext)`
  float: right;
`

export const Next = styled(PreviousNext)`
  float: left;
`

export const Middle = styled.div`
  width: 230px;
  pointer-events: none;

  & h2 {
    font-size: 40px;
    font-family: 'MiloSlab';
    font-weight: bold;

    /*TODO: use color variable*/
    text-shadow: 0 0 4px rgb(247, 241, 217);
    text-align: center;
    margin: 0;
  }
`

export const Back = styled.div`
  font-size: 16px;
  text-align: center;
  display: block;
  text-decoration: underline;
  pointer-events: all;
`
