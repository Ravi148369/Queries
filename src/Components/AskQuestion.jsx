import React,{useState} from 'react'
import axios from 'axios'
import './index.css'
const Askquestion = () => {
    const [ques,setQues]=useState('')
    const [desc,setDesc]=useState(' ')
    const date=new Date()
    // const session=useContext(noteContext)
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
          .then(alert("Question Submitted"))
          .catch(err=>console.log("error is "+err))
    }
  return (
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
  )
}

export default Askquestion