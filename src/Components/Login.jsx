import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

  let navigate=useNavigate()
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const onSubmit=()=>{ 
    axios.post('https://college-cyan.vercel.app/file/authenticate',{
      username,
      password
    })  
    .then(res=>{
      if(res.data.authenticate==='successful'){
        sessionStorage.setItem("username",username)
        sessionStorage.setItem("session",res.data.JWT)
        navigate('/')
      }
      else{
        alert("username or password is incorrect")
      } 
      })
    .catch(err=>console.log(err))
  }
  return (
    <div className='login'>
        <div className="logincenter">
            <div className="form">
                <h1>Login</h1>
                <div>
                    <label htmlFor="uname">Username :</label>
                    <input type="text" placeholder='username' id='uname' onChange={(e)=>setUsername(e.target.value)}/>
                    <label htmlFor="pass">Password :</label>
                    <input type="password" placeholder='password' id='pass' onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={onSubmit}>Login</button>
                </div>
                <hr />
                <Link to={'/signup'}>Create New Account</Link>
            </div>
        </div>
    </div>
  )
}

export default Login