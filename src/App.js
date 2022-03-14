
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Fragment } from 'react'
import MyStatus from './components/Status/MyStatus';
import styles from './App.module.css'
import TodoList from './components/Todo/TodoList';
import Nav from './components/Layout/Nav'
import Deck from './components/Pokedeck/Deck'
import AuthContext from './components/store/auth-context';
import Modal from './components/UI/Modal';

function App() {
  const [collections,setCollections] = useState([])
  const [modalMessage,setModalMessage] = useState()
  const [isImg, setIsImg] = useState(false)
  const [status,setStatus] = useState()

  const statusHandler = (obj) => {
    setStatus(obj)
  }

  const modalHandler = (message, img = false) => {
    setModalMessage(message)
    setIsImg(img)
  }

  const modalDisplayHandler = (e) => {
    e.preventDefault()
    setModalMessage(null)
  }

  const collectionHandler = (cols) => {
    setCollections(cols)
  }

  return (
    <div className={styles.app}>
      <AuthContext.Provider 
        value={{
          collections,
          collectionHandler,
          modalHandler,
          modalMessage,
          status,
          statusHandler
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
        {modalMessage && (
              <Modal
                displayHandler={modalDisplayHandler}
                isImg={isImg}
                // message={modalMessage}
              >{modalMessage}</Modal>
            )}
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
