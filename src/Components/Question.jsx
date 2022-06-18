import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Question = () => {
    const [question,setQuestion]=useState([])
    const [count,setCount]=useState(0)
    const date=new Date();
    const [ques,setQues]=useState('')
    const [desc,setDesc]=useState('')
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
    const onClick=()=>{
        axios.post('https://college-cyan.vercel.app/file/submit',{
            ques:ques,
            desc:desc,
            username:sessionStorage.getItem('username'),
            date:{
              year:date.getFullYear(),
              month:(date.getMonth()+1),
              date:date.getDate(),
              hour:date.getHours(),
              minute:date.getMinutes(),
              second:date.getSeconds()
            }
          })
          .then(()=>{alert("Question Submitted");getData()})
          .catch(err=>console.log("error is "+err))
    }
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
        <div className='ask' id='ask'>
          <div className="box">   
              <h1>Ask a public question</h1>
              <div className="askquery">
                  <label htmlFor="title"><h4>Title</h4></label>
                  <label htmlFor="title"><p>Be specific and imagine you’re asking a question to another person</p></label>
                  <input type="text" placeholder='type question here.......' id='title' onChange={e=>setQues(e.target.value)}/>
                  <label htmlFor="desc"><h4>Description</h4></label>
                  <label htmlFor="desc"><p> Include all the information someone would need to answer your question</p></label>
                  <textarea name="ravi" id="desc" cols="60" rows="8" placeholder='type description here......' onChange={e=>setDesc(e.target.value)}></textarea>
                  <div>
                      <button onClick={onClick}>Submit</button>
                  </div>
              </div>
          </div>
        </div>
      </>
      )
}

export default Question