import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './index.css'
const YourQuestions = () => {
    const [question,setQuestion]=useState([])
    const date=new Date()
    const getData=async()=>{
        await axios.post('https://college-cyan.vercel.app/file/search',{
            username:sessionStorage.username
        }).then(res=>{setQuestion(res.data);console.log(res.data);})
    }
    useEffect(()=>{
      getData()
    },[])
    return (
        <>
        {(question.length!==0)?
          <div className='yourquestions'> 
          {
            question.slice(0).reverse().map(value=>{
              return <div key={value} className='questionss'>
                      <Link to={`/answer/${value._id}`}>
                        <h5>{value.question}</h5>
                        <h6>{value.desc}</h6>
                      </Link>
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
            })
          }
          </div>:<p>No questions</p>
        }</>
    )
}
    


export default YourQuestions