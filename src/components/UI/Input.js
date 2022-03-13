import { useState } from 'react'
import { Fragment } from 'react'
import styles from './Input.module.css'

const Input = (props) => {
    const [userText,setUserText] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        const randomId = Math.floor(Math.random() * 151) + 1;
        props.onAdd(userText, randomId)
    }

    const textAreaHandler = (e) =>{
        setUserText(e.target.value)
    }
    return(<Fragment>
        <form onSubmit={submitHandler} className={styles.input}>
            <label>A thing to do</label>
            <textarea onChange={textAreaHandler}/>
            <button>Confirm</button>
        </form>
    </Fragment>)
}

export default Input