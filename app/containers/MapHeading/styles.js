import styled from 'styled-components'

export const Title = styled.h3`
  margin: 5px;
  font-size: 1em;

  cursor: pointer;
  font-weight: bolder;
  margin-right: 0.5em;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const Year = styled.span`
  padding-left: 5px;
  font-weight: lighter;

  & strong {
    font-weight: 500
  }
`

export const Links = styled.div`
  padding-left: 20px;
`
