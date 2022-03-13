import { Fragment, useState,useContext } from 'react'
import styles from './Todo.module.css'
import pokeBall from '../../img/ball.png'
import AuthContext from '../store/auth-context'


const Todo = (props) => {
    const ctx = useContext(AuthContext);
    const [highlighted, setHighlighted] = useState(false)
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.mobId}.png`;
    const btnClass = `${styles.img} ${highlighted ? styles.catch : ''}`
    let isCollected = false;

    const btnClickHandler = (e) => {
        e.preventDefault()
        setHighlighted(true);

        const timer = setTimeout(()=>{
            setHighlighted(false)
            const id = e.target.parentElement.parentElement.getAttribute("data-key")
            const mobId = e.target.parentElement.parentElement.getAttribute("data-key2")
            props.onRemove(id, mobId)
        },5000)

        return ()=>{
            clearTimeout(timer)
        }
    }

    ctx.collections.map((val) => {
        if(+val === props.mobId){
            isCollected = true
        }    
    })
    
    return (<Fragment>
        <div className={styles.todo} data-key={props.id} data-key2={props.mobId}>
        <button className={styles.btn} onClick={btnClickHandler}><img className={btnClass} src={pokeBall} alt='poke-ball-img'/></button>
        <p className={styles.text}>{props.desc}</p>
        <img className={`${styles.monster} ${isCollected && styles['collected']}`} src={img} alt='random-monster'/>
        {console.log(ctx.collections, props.mobId, isCollected)}
        </div>
    </Fragment>)
}

export default Todo