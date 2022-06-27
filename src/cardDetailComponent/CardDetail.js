import React from 'react'
import styled from 'styled-components'
import StyledButton from '../utilityComponent/StyledButton'

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 70rem;
  height: 50rem;
  padding: 2rem;
  background-color: white;
`


function CardDetail({card, closeModal}) {
  return (
    <Wrapper>
      <Container>
        <StyledButton onClick={closeModal}>Close</StyledButton>
        <h1>{card.title}</h1>
      </Container>
    </Wrapper>
  )
}

export default CardDetail