import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Card = styled.div`
  border: 2px solid #7fa4c5;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: aliceblue;
`

export default function CardCard({card, index, setCardDetailOpened}) {

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <Card 
          onClick={() => setCardDetailOpened(card)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h4 style={{
            margin: 0
          }}>{card.title}</h4>
          <p>{card.description}</p>
        </Card>
      )}
    </Draggable>
    
  )
}
