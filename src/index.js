import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './appComponent/App';
import Signin from './authenticationComponent/Signin';
import Signup from './authenticationComponent/Signup';
import Home from './homeComponent/Home';
import AuthProvider, { useAuth } from './authenticationComponent/AuthProvider';
import WorkspacePage from './workspacePageComponent/WorkspacePage';
import BoardPage from './boardPageComponent/BoardPage';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='signin' element={
          <RequireSignout>
            <Signin/>
          </RequireSignout>
        } />
        <Route path='signup' element={
          <RequireSignout>
            <Signup/>
          </RequireSignout>
        } />
        <Route path='home' element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        }/>
        <Route path='userworkspaces/:workspaceId' element={<WorkspacePage/>} />
        <Route path='boards/:boardId' element={<BoardPage/>} />
        <Route 
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          } />
        </Routes>
    </BrowserRouter>
  </AuthProvider>
);

function RequireAuth({children}) {

  const {user} = useAuth()
  
  if (!user) {
    return <Navigate to='/signin' replace />
  }

  return children
}

function RequireSignout({children}) {

  const {user} = useAuth()
  
  if (user) {
    return <Navigate to='/home' replace />
  }

  return children
}