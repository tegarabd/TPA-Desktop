import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { populateBoardDetailById, populateBoardMemberListById } from '../firebase/firestore/boardRepository'
import { populateBoardListByBoardId, reorderList } from '../firebase/firestore/listRepository'
import { DragDropContext } from 'react-beautiful-dnd'
import Template from '../templateComponent/Template'
import ListList from '../listListComponent/ListList'
import CardDetail from '../cardDetailComponent/CardDetail'
import { addCardToList, deleteCardFromList, reorderCard } from '../firebase/firestore/cardRepository'

export default function BoardPage() {

  const {boardId} = useParams()
  const navigate = useNavigate()
  const [board, setBoard] = useState()
  const [members, setMembers] = useState([])
  const [lists, setLists] = useState([])
  const [cardDetailOpened, setCardDetailOpened] = useState(null)

  

  useEffect(() => {
    const fetchBoardMetadata = async () => {
      if (boardId) {
        populateBoardDetailById(boardId, setBoard)
        populateBoardMemberListById(boardId, setMembers)
        populateBoardListByBoardId(boardId, setLists)
      }
    }

    fetchBoardMetadata()
  }, [boardId])

  const handleDragEnd = result => {

    if (result.type === 'card') {
      const fromListId = result.source.droppableId
      const fromIndex = result.source.index
      const toListId = result.destination.droppableId
      const toIndex = result.destination.index

      if (fromListId === toListId && fromIndex === toIndex) return

      if (fromListId === toListId) {
        const listIndex = lists.findIndex(list => list.id === fromListId)
        const cards = Array.from(lists[listIndex].cards) 
        cards.splice(toIndex, 0, cards.splice(fromIndex, 1)[0])
        lists[listIndex].cards = cards

        const listsCopy = Array.from(lists)
        listsCopy.splice(listIndex, 1, lists[listIndex])
        setLists(listsCopy)
        reorderCard(fromListId, cards.map(card => card.id))
      }
      else {

        const fromListIndex = lists.findIndex(list => list.id === fromListId)
        const toListIndex = lists.findIndex(list => list.id === toListId)

        const card = lists[fromListIndex].cards[fromIndex]

        const fromListCards = Array.from(lists[fromListIndex].cards)
        const toListCards = Array.from(lists[toListIndex].cards)

        fromListCards.splice(fromIndex, 1)
        toListCards.splice(toIndex, 0, card)

        lists[fromListIndex].cards = fromListCards
        lists[toListIndex].cards = toListCards


        const listsCopy = Array.from(lists)
        listsCopy.splice(fromListIndex, 1, lists[fromListIndex])
        listsCopy.splice(toListIndex, 1, lists[toListIndex])
        setLists(listsCopy)

        reorderCard(fromListId, fromListCards.map(card => card.id))
        reorderCard(toListId, toListCards.map(card => card.id))

        deleteCardFromList(fromListId, card)
        addCardToList(toListId, card)
      }
  
    }
    else if (result.type === 'list') {
      const fromIndex = result.source.index
      const toIndex = result.destination.index

      if (fromIndex === toIndex) return

      const listsCopy = Array.from(lists)
      listsCopy.splice(toIndex, 0, listsCopy.splice(fromIndex, 1)[0])
      setLists(listsCopy)
      reorderList(boardId, listsCopy.map(list => list.id))
  
    }
    
  }

  return (
    <Template
      side={
        <>
          <div className='link' onClick={() => navigate(-1)}>
            <h3 className='linkTitle'>Workspace</h3>
          </div>
          <h2>Members</h2>
          {members.map(member => <p key={member.id} >{member.displayName}</p>)}
        </>
      }
      main={
        <>
          {cardDetailOpened && <CardDetail card={cardDetailOpened} closeModal={() => setCardDetailOpened(null)}/>}
          <div style={{
            height: '6rem'
          }}>
            <h2>{board?.title}</h2>
            <p>{board?.description}</p>
          </div>
          <DragDropContext
            onDragEnd={handleDragEnd}
          >
            <ListList lists={lists} setCardDetailOpened={setCardDetailOpened}  />
          </DragDropContext>
        </>
      }
    />
  )
}
