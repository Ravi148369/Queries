import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link,Outlet} from 'react-router-dom'
import './index.css'
const Profile = () => {
    
    const [name,setName]=useState(" ")

    useEffect(()=>{
        axios.post('https://college-cyan.vercel.app/file/getprofile',{
            username:sessionStorage.getItem("username")
        }).then(res=>setName(res.data.Name))
    },[])

  return (
    <div>
        <div className="profile">
            <div className="aligns">
                <img src="/profile.png" alt="not found" width={150}/>
                <div>
                    <h1>{name}</h1>
                </div>  
            </div>
            <div className="yourquery">
                <Link to={'/profile/yourquestions'}>Your Question</Link>
                <div className="outlets">
                    <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile