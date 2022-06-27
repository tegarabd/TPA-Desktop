import { db } from "../config"
import { collection, doc, addDoc, setDoc, onSnapshot, query, where } from 'firebase/firestore'

export async function createWorkspace(userId, userDisplayName, workspace) {
  const workspaceRef = await addDoc(collection(db, 'workspaces'), {...workspace})
  await setDoc(doc(db, `users/${userId}/workspaceMemberOf`, workspaceRef.id.trim()), {title: workspace.title})
  await setDoc(doc(db, `workspaces/${workspaceRef.id.trim()}/members`, userId), {
    displayName: userDisplayName,
    isAdmin: true
  })
}

export async function populateWorkspaceDetailById(workspaceId, callBack) {

  onSnapshot(doc(db, `workspaces/${workspaceId}`), querySnapshot => {
    callBack({id: querySnapshot.id.trim(), ...querySnapshot.data()})
  })

}

export async function populateWorkspaceBoardListById(workspaceId, callBack) {
  
  onSnapshot(collection(db, `workspaces/${workspaceId}/boards`), querySnapshot => {
    const boards = []
    querySnapshot.forEach(board => {
      boards.push({id: board.id.trim(), ...board.data()})
    })
    callBack(boards)
  })

}

export async function populateWorkspaceMemberListById(workspaceId, callBack) {
  
  onSnapshot(collection(db, `workspaces/${workspaceId}/members`), querySnapshot => {
    const members = []
    querySnapshot.forEach(member => {
      members.push({id: member.id.trim(), ...member.data()})
    })
    callBack(members)
  })

}

export async function populatePublicWorkspaceList(callback) {

  onSnapshot( query(collection(db, 'workspaces'), where('visibility', '==', 'public')) , querySnapshot => {
    const publicWorkspaces = []
    querySnapshot.forEach(workspace => {
      publicWorkspaces.push({id: workspace.id, ...workspace.data()})
    })
    callback(publicWorkspaces)
  })

}
