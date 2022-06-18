import React,{useEffect,useState} from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'

const Answer = () => {
  const params=useParams()
  const [question,setQuestion]=useState({})
  const [answer,setAnswer]=useState('')
  const date=new Date()
  const getData=async()=>{
    await axios.post("https://college-cyan.vercel.app/file/question",{
      id:params.id
    }).then(res=>{setQuestion(res.data)})
  }
  useEffect(()=>{
    getData()
  },[])
  const onClick= async()=>{
    await axios.post('https://college-cyan.vercel.app/file/answer',{
      _id:params.id,        
      answer:answer,
      dateTime:{
          year:date.getFullYear(),
          month:(date.getMonth()+1),
          date:date.getDate(),
          hour:date.getHours(),
          minute:date.getMinutes(),
          second:date.getSeconds()
      },
      username:sessionStorage.getItem("username")
    }).then(getData())
    getData()
    alert('Your Answer is Submitted')
  }
  return(
    <>
          <div className="questionss1">
            <div className="item">
              <p>{question.question}</p>
              <p>{question.desc}</p>
            </div>
            <div className='ans1'>
              <h2>Answers</h2>
              {
                (question.answer!=null)?
                  question.answer.map(value=>{
                    return(
                      <div key={value.ans} className='item'>
                        <p id='anss'>{value.ans}</p>
                        <div>   
                          <p>{`~${value.username}`}</p>
                          {
                            (value.dateTime.year===date.getFullYear())?
                              (value.dateTime.month===(date.getMonth()+1))?
                                (value.dateTime.date===date.getDate())?
                                  (value.dateTime.hour===date.getHours())?
                                    (value.dateTime.minute===date.getMinutes())?
                                      (value.dateTime.second===date.getSeconds())?
                                        <p>answered {date.getSeconds()-value.dateTime.second} seconds ago</p>
                                      :<p>answered {date.getSeconds()-value.dateTime.second} seconds ago</p>
                                    :<p>answered {date.getMinutes()-value.dateTime.minute} minutes ago</p>
                                  :<p> answered {date.getHours()-value.dateTime.hour} hours ago</p>
                                :<p>answered {date.getDate()-value.dateTime.date} days ago</p>
                              :<p>answered {(date.getMonth()+1)-value.dateTime.month} month ago</p>
                            :<p>answered {date.getFullYear()-value.dateTime.year} year ago</p>
                          }
                        </div>
                      </div>
                    )
                  }):<p></p>
              }
            </div>
            <div className='align'> 
              <div className="ans" id='ans'>
                <label htmlFor="txt"><h2>Want to give an answer : </h2></label>
                <input type="text" id='txt' placeholder='Type your answer here.....' onChange={(e)=>setAnswer(e.target.value)}/>
                <div>
                  <button onClick={onClick}>Submit</button>
                </div>
              </div>
            </div>
        </div>
      </>  
  )
}

export default Answer