import React, { useState } from 'react'
import { createCard } from '../firebase/firestore/cardRepository'

export default function CardForm({listId}) {

  const [card, setCard] = useState({
    title: '',
    listId
  })

  const handleFieldChange = e => {
    setCard({
      ...card,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (card.title === '') return;
    setCard({
      title: '',
      listId: listId
    })
    createCard(listId, card)
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }} >
      <input
        id='title'
        type='text'
        name='title'
        onChange={handleFieldChange}
        placeholder='Add new card'
        required
        value={card.title} />
      <input
        type='submit'
        value='Add' />
    </form>
  )
}
