import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Attendees } from './pages/Attendees/Attendees';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { NotFound } from './pages/404page/404page';
import { useContext, useEffect } from 'react';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './constants/constants';
import { UserContext } from './contexts/UserContextWrapper';

function App() {

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        headers: {
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
      });
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<PageLayout />} >
          <Route index element={<Attendees />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
