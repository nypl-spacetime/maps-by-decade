import styled from 'styled-components'

export const TitleContainer = styled.h3`
  margin: 0;
  font-size: 1em;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`

export const Title = styled.span`
  cursor: pointer;
  font-weight: 500;
  margin-right: 0.5em;

  flex: 1;
  min-width: 0;



  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

`

export const Year = styled.span`
  flex-shrink: 0;
`

export const Links = styled.div`
  font-size: 16px;
  padding: 5px;
`
