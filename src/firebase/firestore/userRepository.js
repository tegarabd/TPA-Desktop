import { db } from "../config";
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore' 

export async function addNewUser(userId, username) {
  await setDoc(doc(db, 'users', userId), {
    displayName: username
  })
}

export async function populateUserWorkspaceList(userId, callBack) {

  onSnapshot(collection(db, `users/${userId}/workspaceMemberOf`), querySnapshot => {
    const workspaces = []
    querySnapshot.forEach(workspace => {
      workspaces.push({id: workspace.id.trim(), ...workspace.data()})
    })
    callBack(workspaces)
  })

}

export async function populateUserBoardList(userId, callBack) {

  onSnapshot(collection(db, `users/${userId}/boardMemberOf`), querySnapshot => {
    const boards = []
    querySnapshot.forEach(board => {
      boards.push({id: board.id.trim(), ...board.data()})
    })
    callBack(boards)
  })

}

export async function joinWorkspace(userId, userDisplayName, workspaceId, workspaceTitle) {
  await setDoc(doc(db, doc(`users/${userId}/workspaceMemberOf/${workspaceId}`)), {title: workspaceTitle})
  await setDoc(doc(db, doc(`workspaces/${workspaceId}/members/${userId}`)), {displayName: userDisplayName})
}