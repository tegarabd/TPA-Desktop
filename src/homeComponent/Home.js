import BoardList from "../boardListComponent/BoardList";
import Template from "../templateComponent/Template";
import WorkspaceForm from "../workspaceFormComponent/WorkspaceForm";
import WorkspaceList from "../workspaceListComponent/WorkspaceList";

export default function Home() {

  return (
    <Template
      side={
        <>
          <h2>Workspaces</h2>
          <WorkspaceList/>
          <h2>Boards</h2>
          <BoardList />
        </>
      }
      main={
        <>
          <h2>Add Workspace</h2>
          <WorkspaceForm/>
        </>
      }
    />
  )
}
