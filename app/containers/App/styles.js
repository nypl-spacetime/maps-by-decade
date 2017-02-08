import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  flex-direction: column;
  height: 100%;

  font-size: 1.3em;
  line-height: 1.6;
`

export const Contents = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
`
