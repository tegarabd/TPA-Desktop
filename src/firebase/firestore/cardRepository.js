import { db } from "../config";
import { addDoc, collection, doc, onSnapshot, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

export async function populateCardByListId(listId, callBack) {

  onSnapshot(doc(db, `lists/${listId}`), async querySnapshot => {
    const data = querySnapshot.data()
    if (!data.cardOrder || data.cardOrder.length <= 0) return
    const promises = data.cardOrder.map(cardId => getDoc(doc(db, `cards/${cardId}`)))
    const cards = await Promise.all(promises)
    callBack(cards.map(card => ({id: card.id, ...card.data()})))
  })

}

export async function createCard(listId, card) {
  const cardRef = await addDoc(collection(db, 'cards'), card)
  setDoc(doc(db, `lists/${listId}/cards`, cardRef.id.trim()), {title: card.title})
  
  const snapshot = await getDoc(doc(db, `lists/${listId}`)) 
  if (!snapshot.exists()) {
    console.log('board not found')
    return
  }
  const data = snapshot.data()

  if (!data.cardOrder || data.cardOrder.length <= 0) {
    data.cardOrder = []
  }

  data.cardOrder.push(cardRef.id.trim())

  await setDoc(doc(db, `lists/${listId}`), data, {merge: true})
}

export async function addCardToList(listId, card) {
  await setDoc(doc(db, `lists/${listId}/cards/${card.id}`), {title: card.title})
}

export async function deleteCardFromList(listId, card) {
  await deleteDoc(doc(db, `lists/${listId}/cards/${card.id}`))
}

export async function reorderCard(listId, cardOrder) {
  
  await updateDoc(doc(db, `lists/${listId}`), {
    cardOrder
  })
}