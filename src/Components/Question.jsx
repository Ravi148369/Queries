import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Askquestion from './AskQuestion'

const Question = () => {
    const [question,setQuestion]=useState([])
    const [count,setCount]=useState(0)
    const date=new Date();
    const getData=async()=>{
        await fetch('https://college-cyan.vercel.app/file/get')
        .then(res=>res.json().then(res=>setQuestion(res)))  
        .catch(err=>console.log("error is "+err))
    }
    useEffect(()=>{
        getData()
    },[])
    useEffect(()=>{ 
        setCount(question.length)
    },[question.length])
    return (
      <>
        <div className='questions1'>
          <p>{`Total questions ${count}`}</p>
            {
            question.map((value)=>{
              return(
                <div className='questionlink' key={value._id}>
                    <Link to={`/answer/${value._id}`} className='link'>
                      <h3>{value.question}</h3>
                    </Link>
                    <div className='questionlinkuser'>
                      <Link to={`/answer/${value._id}`}>  
                        <p>{value.desc}</p>
                      </Link>
                      <div>
                        <p>~{value.username}</p>
                        {
                          (value.dateTime.year===date.getFullYear())?
                            (value.dateTime.month===(date.getMonth()+1))?
                              (value.dateTime.date===date.getDate())?
                                (value.dateTime.hour===date.getHours())?
                                  (value.dateTime.minute===date.getMinutes())?
                                    (value.dateTime.second===date.getSeconds())?
                                      <p>asked {date.getSeconds()-value.dateTime.second} seconds ago</p>
                                    :<p>asked {date.getSeconds()-value.dateTime.second} seconds ago</p>
                                  :<p>asked {date.getMinutes()-value.dateTime.minute} minutes ago</p>
                                :<p> asked {date.getHours()-value.dateTime.hour} hours ago</p>
                              :<p>asked {date.getDate()-value.dateTime.date} days ago</p>
                            :<p>asked {(date.getMonth()+1)-value.dateTime.month} month ago</p>
                          :<p>asked {date.getFullYear()-value.dateTime.year} year ago</p>
                        }
                      </div>
                    </div>            
                </div>
                )
              })
            }
        </div>
        <Askquestion/>
      </>
      )
}

export default Question