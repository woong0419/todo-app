
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Fragment } from 'react'
import MyStatus from './components/Status/MyStatus';
import styles from './App.module.css'
import TodoList from './components/Todo/TodoList';
import Nav from './components/Layout/Nav'
import Deck from './components/Pokedeck/Deck'
import AuthContext from './components/store/auth-context';
import { useState } from 'react';

function App() {
  const [collections,setCollections] = useState([])

  const collectionHandler = (cols) => {
    setCollections(cols)
  }

  return (
    <div className={styles.app}>
      <AuthContext.Provider 
        value={{
          collections,
          collectionHandler
        }}
      >
      <Router>
         <h1 className={styles.title}>PokéMon Todo-List</h1>
          <Routes>
            <Route exact path='/' element={<Fragment>
              <MyStatus />
              <TodoList />
            </Fragment>}/>
            <Route exact path='/deck' element={<Fragment>
              <Deck />
            </Fragment>}/>
          </Routes>
        <Nav />
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
