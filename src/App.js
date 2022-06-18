import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Outlet,Link,useNavigate} from 'react-router-dom'
import './App.css'
const App = () => {
  const navigate=useNavigate()
  const [verify,setVerify]=useState(false)
  const getAuth=async()=>{
    await axios.post('https://college-cyan.vercel.app/file/verify',{
      JWT:sessionStorage.getItem('session')
    }).then(res=>{
      if(res.data.status==="successfull"){
        navigate('/')
        setVerify(true)
      }
      else if(res.data.status==='abort')
        navigate('/login')
    })
  }
  const logOut=()=>{
    sessionStorage.setItem("username",null)
    sessionStorage.setItem("session","null")
    navigate('/login')  
  }
  useEffect(()=>{
    getAuth()
  },[])
  return (
    <>
    {
    (verify===true)?
    <div className='homepage'>
      {/* NavBar Component */}
      <nav>
        <div className='center'>
          <Link to={'/'}><h1>Queries</h1></Link>
          <div>
            <button onClick={logOut}>Log Out</button>
            <i className='material-icons'><Link to={'/profile'}>account_circle</Link></i> 
          </div>
        </div>
      </nav>
      {/* side NavBar Component*/}
      <div className='body'>
        <div className='center'>
          <div className="sideNavBar">
            <Link to={'/'}>Home</Link>
            <Link to={'profile'}>Profile</Link>
            <Link to={'profile/yourquestions'}>Your Questions</Link>
            {/* <Link to={'askquestion#ask'}>Ask Questions</Link> */}
          </div>
          <div className='outlet'>
            <Outlet/>
          </div>  
        </div>
      </div>
    </div>:<></>
    }
    </>
  )
}

export default App