import styled from 'styled-components'

export const Container = styled.div`
  top: 0;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & h2 {
    font-size: 1.6em;
  }
`

export const Dialog = styled.div`
  overflow: hidden;
  width: 500px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 45px rgba(0, 0, 0, .5);
`

export const Line = styled.div`
  height: .5em;
  background-color: rgba(0, 0, 0, 0.2);
`

export const Contents = styled.div`
  padding: .5em 1em 1em 1em;

  & button {
    margin: 0 auto;
    display: block;
  }
`
