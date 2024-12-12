import { useEffect, useState } from 'react';
import Home from './pages/Home';
import { unstable_HistoryRouter as Router, Routes, Route } from 'react-router-dom';
import Messager from './pages/Messenger';
import history from './history';
import { getUser } from './api';
import UserContext from './contexts/UserContext';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUser();
        console.log(res)
        setUserData(res.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
       
      }
    };

    fetchUserData();
  }, []); 
  return (
    <Router history={history}>
      <UserContext.Provider value={userData}>
        <Routes>
          <Route path='/' exact element={<Home setUser={setUserData} />} />
          <Route path='/messager' element={<Messager />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
