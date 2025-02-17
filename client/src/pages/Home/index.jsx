import React, {useEffect, useState} from 'react'
import SignInForm from '../../components/SignInForm'
import SignUpForm from '../../components/SignUpForm'
import styles from './style.module.css';
import history from '../../history';
import { connect } from 'react-redux';

function Home(props) {
    const [formView, setFormView] = useState(true);
    const [userData, setUserData] = useState(null)

    const changeView = () => {
        setFormView(!formView)
    }
    const sendUser = (data) =>{
      // console.log(data) 
      props.setUser(data.data.data)
      history.push('/messager')
      // console.log(data)
      localStorage.setItem('accessToken', data.data.tokens.accessToken)
      localStorage.setItem('refreshToken', data.data.tokens.refreshToken)
    }

    useEffect(()=>{

    }, [userData]);
    if(props.userData){
      history.push('/messager')
    }
  return (
    <main className={styles.main}>
        <button onClick={changeView}>{formView ? 'видно' : 'не видно'}</button>
        {formView ? <SignInForm callBack={sendUser}/> : <SignUpForm callBack={sendUser}/>}
    </main>
  )
}

const mapStateToProps = ({userData, error}) => ({userData, error})

export default connect(mapStateToProps)(Home);