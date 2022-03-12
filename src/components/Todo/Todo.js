import { Fragment, useState } from 'react'
import styles from './Todo.module.css'
import pokeBall from '../../img/ball.png'
import monster from '../../img/monster-1.png'

const Todo = (props) => {
    const [highlighted, setHighlighted] = useState(false)
    const btnClass = `${styles.img} ${highlighted ? styles.catch : ''}`

    const btnClickHandler = (e) => {
        e.preventDefault()
        setHighlighted(true);

        const timer = setTimeout(()=>{
            setHighlighted(false)
            props.onRemove(e.target.parentElement.parentElement.getAttribute("data-key"))
        },5000)

        return ()=>{
            clearTimeout(timer)
        }
    }
    
    return (<Fragment>
        <div className={styles.todo} data-key={props.id}>
        <button className={styles.btn} onClick={btnClickHandler}><img className={btnClass} src={pokeBall} alt='poke-ball-img'/></button>
        <p className={styles.text}>{props.desc}</p>
        <img className={styles.monster} src={monster} alt='random-monster'/>
        </div>
    </Fragment>)
}

export default Todo