import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Profile from './Components/Profile';
import Question from './Components/Question';
import YourQuestions from './Components/YourQuestions';
import Login from './Components/Login';
import Answer from './Components/Answer';
import CreateAccount from './Components/CreateAccount';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<CreateAccount/>}/>
        <Route path='/' element={<App/>}>
          <Route path='/' element={<Question/>}/>
          <Route path='profile' element={<Profile/>}>
            <Route path='yourquestions' element={<YourQuestions/>}/>
          </Route>
          <Route path='answer/:id' element={<Answer/>}/>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
