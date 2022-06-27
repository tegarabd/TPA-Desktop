import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import CardCard from '../cardCardComponent/CardCard'
import CardForm from '../cardFormComponent/CardForm'

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default function CardList({listId, setCardDetailOpened, cards}) {

  return (
    <Droppable droppableId={listId} type='card'>
      {(provided) => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {cards.map((card, index) => <CardCard key={card.id} index={index} card={card} setCardDetailOpened={setCardDetailOpened}/>)}
          {provided.placeholder}
          <CardForm listId={listId}/>
        </CardWrapper>
      )}
      
    </Droppable>
  )
}
