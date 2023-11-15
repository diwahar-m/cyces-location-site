import Login from './components/Login/index.js'; 
import ListPage from './components/List_page/index';
import ListItem from './components/List_item/index';
import DetailPage from './components/Detail_page/index.js';
import CreatePage from './components/Create_page/index.js';
import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

function App() { 

  
    return( 
         <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/list-page' element={<ListPage/>}/>
            <Route path='/list-item' element={<ListItem/>}/>
            <Route path='/detail-page' element={<DetailPage/>}/>
            <Route path='/create-page' element={<CreatePage/>}/>
          </Routes>
         </Router>
    ) 
    
}

export default App;
