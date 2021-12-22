import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Register'
import NewPost from './components/NewPost';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/signup' element={<Signup />}/>
        <Route exact path='/add_post' element={<NewPost />}/>
      </Routes>
    </div>
  );
}

export default App;
