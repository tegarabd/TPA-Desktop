import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import ListCard from '../listCardComponent/ListCard'
import ListForm from '../listFormComponent/ListForm'

const ListWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  align-items: flex-start;
  justify-content: flex-start;
  height: calc(100vh - 12rem - 20px);
`

function ListList({lists, setCardDetailOpened}) {
  return (
    <Droppable droppableId='all-list' direction='horizontal' type='list'>
      {(provided) => (
        <ListWrapper
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {lists.map((list, index) => 
            <ListCard key={list.id} list={list} index={index} setCardDetailOpened={setCardDetailOpened} />
          )}
          {provided.placeholder}
          <ListForm lists={lists} />
        </ListWrapper>
      )}
    </Droppable>
    
  )
}

export default ListList