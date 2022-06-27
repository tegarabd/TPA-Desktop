import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import CardList from '../cardListComponent/CardList'

const ListItem = styled.div`
  background-color: aliceblue;
  min-width: 20rem;
  padding: 1rem;
  margin-right: 1rem;
`

const ListCard = ({list, index, setCardDetailOpened}) => {
  
  return (
    <Draggable draggableId={list.id} index={index} >
      {(provided) => (
        <ListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3 style={{
            margin: '0 0 1rem 0'
          }}>{list.title}</h3>
          <CardList listId={list.id} setCardDetailOpened={setCardDetailOpened} cards={list.cards} />
        </ListItem>
      )}
    </Draggable>
  )
}

export default ListCard
