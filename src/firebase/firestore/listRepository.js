import { db } from "../config";
import { addDoc, collection, doc, onSnapshot, setDoc, getDoc, updateDoc } from 'firebase/firestore'

export async function populateBoardListByBoardId(boardId, callBack) {
  onSnapshot(doc(db, `boards/${boardId}`), async querySnapshot => {
    const data = querySnapshot.data()
    if (!data.listOrder || data.listOrder.length <= 0) return
    const promises = querySnapshot.data().listOrder.map(listId => getDoc(doc(db, `lists/${listId}`)))
    const lists = await Promise.all(promises)
    const listsWithCards = lists.map(async (list) => {
      if (!list.data().cardOrder || list.data().cardOrder.length <= 0) return {id: list.id, ...list.data(), cards: []}
      const cardPromises = list.data().cardOrder.map(cardId => getDoc(doc(db, `cards/${cardId}`)))
      const cards = await Promise.all(cardPromises)
      return {id: list.id, ...list.data(), cards: cards.map(card => ({id: card.id, ...card.data()}))}
    })
    callBack(await Promise.all(listsWithCards))
  })

}

export async function createList(boardId, list) {
  const listRef = await addDoc(collection(db, 'lists'), list)
  await setDoc(doc(db, `boards/${boardId}/lists/${listRef.id}`), {title: list.title})
  
  const snapshot = await getDoc(doc(db, `boards/${boardId}`)) 
  if (!snapshot.exists()) {
    console.log('board not found')
    return
  }
  const data = snapshot.data()

  if (!data.listOrder || data.listOrder.length <= 0) {
    data.listOrder = []
  }

  data.listOrder.push(listRef.id)

  await setDoc(doc(db, `boards/${boardId}`), data, {merge: true})
}


export async function reorderList(boardId, listOrder) {
  await updateDoc(doc(db, `boards/${boardId}`), {
    listOrder
  })
}
