import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;

  & > * {
    position: relative;
    width: 50%;

    display: flex;
  }
`
