import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Register'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/signup' element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
