import { db } from "../config";
import { addDoc, collection, setDoc, doc, onSnapshot } from 'firebase/firestore'

export async function createBoard(userId, userDisplayName, board) {
  const boardRef = await addDoc(collection(db, 'boards'), {...board})
  await setDoc(doc(db, `workspaces/${board.workspaceId}/boards`, boardRef.id.trim()), {title: board.title, isClosed: board.isClosed})
  await setDoc(doc(db, `users/${userId}/boardMemberOf`, boardRef.id.trim()), {title: board.title})
  await setDoc(doc(db, `boards/${boardRef.id.trim()}/members`, userId), {
    displayName: userDisplayName,
    isAdmin: true
  })
}

export async function populateBoardDetailById(boardId, callBack) {

  onSnapshot(doc(db, `boards/${boardId}`), querySnapshot => {
    callBack({id: querySnapshot.id.trim(), ...querySnapshot.data()})
  })

}

export async function populateBoardMemberListById(boardId, callBack) {
  
  onSnapshot(collection(db, `boards/${boardId}/members`), querySnapshot => {
    const members = []
    querySnapshot.forEach(member => {
      members.push({id: member.id.trim(), ...member.data()})
    })
    callBack(members)
  })

}