import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateAccount = () => {
  const Navigate=useNavigate()
  const [firstname,setFirstName]=useState('')
  const [lastname,setLastName]=useState('')
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const onSubmit=(e)=>{
    axios.post('https://college-cyan.vercel.app/file/login',{
      firstname,
      lastname,
      username,
      password
    }).then(res=>{
      if(res.data.status==='saved'){
        alert('account created successfully')
        Navigate('/login')
      }
      else if(res.data.status==='failed'){
        alert('this username already exist')
      }   
    })
  }
  return (
    <div className='account'>
      <div className="center">
        <h1>Create your Account</h1>
        <div className='form'>
          <div className='name'>
            <input type="text" placeholder='First name' onChange={(e)=>setFirstName(e.target.value)}/>
            <input type="text" placeholder='Last name' onChange={(e)=>setLastName(e.target.value)}/>
          </div>
            <input type="text" placeholder='Username' id='uname' onChange={(e)=>setUsername(e.target.value)}/>
            <div className='name'>
            <input type="password" placeholder='Password' />
            <input type="password" placeholder='Confirm' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <input type="submit" value={"Create Account"} onClick={onSubmit}/> 
        </div>
      </div>
    </div>
  )
}

export default CreateAccount