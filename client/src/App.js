import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { PageLayout } from './Components/PageLayout';
import { RouteSuspense } from './Components/RouteSuspense/RouteSuspence';
import { UserContext } from './Components/UserContext/UserContext';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './Constants/Constants';

const Form = React.lazy(() => import('./Pages/Form/Form'));
const Login = React.lazy(() => import('./Pages/Login/Login'));
const Register = React.lazy(() => import('./Pages/Register/Register'));

function App() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        header: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const { id, email } = data;
          setUser({ id, email });
          navigate('/');
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={
            <RouteSuspense>
              <Form />
            </RouteSuspense>
          } />
        </Route>
        <Route path='/login' element={
          <RouteSuspense>
            <Login />
          </RouteSuspense>
        } />
        <Route path='/register' element={
          <RouteSuspense>
            <Register />
          </RouteSuspense>
        } />
      </Routes>
    </div>
  );
}

export default App;
