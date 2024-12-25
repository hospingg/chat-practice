import { useEffect, useState } from 'react';
import Home from './pages/Home';
import { unstable_HistoryRouter as Router, Routes, Route } from 'react-router-dom';
import Messager from './pages/Messenger';
import history from './history';
import { getUser } from './api';
// import UserContext from './contexts/UserContext';
import { connect } from 'react-redux';

function App(props) {
  // const [userData, setUserData] = useState(null);

  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const res = await getUser();
    //     console.log(res)
    //     if(res){
    //       setUserData(res.data.data);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
       
    //   }
    // };
    console.log('htllo')

    // fetchUserData();
    if(!props.userData && localStorage.getItem('accessToken')){
      getUser()
      .then(({data: {data}}) => {
        const action = {
          type: 'GET_USER',
          payload: data
        }
        props.dispatch(action)
      })
      .catch(error => {
        const action = {
          type: 'GET_USER_ERROR',
          error
        }
        props.dispatch(action)
      })
    }
    
  }, []); 
  // const setUserData = (data) =>{
  //     // props.userData = data
  //     console.log(data)
  //   }

  return (
    <>
    <Router history={history}>
      {/* <UserContext.Provider value={userData}> */}
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/messager' element={<Messager />} />
        </Routes>
      {/* </UserContext.Provider> */}
    </Router>
    {props.error && <p>Opps, i did it again</p>}
    </>
    
  );
}

const mapStateToProps = ({userData, error}) => ({userData, error})

// const mapDispatchToProps = (dispatch) => ({ dispatch }); 


export default connect(mapStateToProps)(App);
