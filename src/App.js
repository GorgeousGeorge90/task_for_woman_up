import './App.scss';
import Header from "./components/Header/Header";
import {Routes, Route} from 'react-router-dom';
import Main from './components/Main/Main';
import Contacts from './components/Contacts/Contacts';

/**
 * App module
 *
 * @module /app.js
 * @author Doroshin Egor
 * @return {JSX.Element}
 * @constructor
 */


function App() {
  return (
    <div className='app-wrapper'>
        <Header/>
        <Routes>
            <Route path={'/main'} element={<Main/>}/>
            <Route path={'/contacts'} element={<Contacts/>}/>
        </Routes>
    </div>
  );
}

export default App;
