import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import { PageLayout } from './Components/PageLayout';
import { RouteSuspense } from './Components/RouteSuspense/RouteSuspence';

const Form = React.lazy(() => import('./Pages/Form/Form'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Register = React.lazy(() => import('./Pages/Register/Register'));

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = (email) => setUser({ email });

  return (
    <div>
      <Routes>
        <Route path='/' element={<PageLayout user={user}/>}>
          <Route index element={
            <RouteSuspense>
              <Form />
            </RouteSuspense>
          } />
        </Route>
        <Route path='/login' element={
          <RouteSuspense>
            <Login onLogin={handleLogin}/>
          </RouteSuspense>
        } />
        <Route path='register' element={
          <RouteSuspense>
            <Register />
          </RouteSuspense>
        } />
      </Routes>
    </div>
  );
}

export default App;
