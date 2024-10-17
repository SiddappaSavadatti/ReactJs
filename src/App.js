import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

import Admin from './components/Admin';
import { GlobalProvider } from './components/GlobalContext'; 

function App() {
  return (
  
    <div className="App">
    <GlobalProvider>
     <Routes>
      <Route path='/' element={<Login/>}/> 
      <Route path='admin/*' element={<Admin/>}/> 
      <Route path='/Home' element={<Home/>}/> 
     </Routes>
    </GlobalProvider>

    </div>
  );
}

export default App;
