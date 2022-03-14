import styles from './TodoList.module.css'
import Todo from './Todo'
import { Fragment, useEffect, useState, useContext } from 'react'
import Input from '../UI/Input'
import  Axios  from 'axios'
import AuthContext from '../store/auth-context'

const TodoList = () =>{
    const [listApi, setListApi] = useState()
    const [deleteBtnHighlighted, setDeleteBtnHighlighted] = useState(false)
    const [addBtnHighlighted, setAddBtnHighlighted] = useState(false)

    const ctx = useContext(AuthContext);

    useEffect(()=>{
        let isMounted = true;
        Axios.get('http://localhost:3001/todo').then((res)=>{
            if (isMounted){
                 setListApi(res.data)
                }
        })
        return () => { isMounted = false };
    },[ctx.modalMessage])

    const todoAddHandler = (text, id) => {
        Axios.post('http://localhost:3001/post', {
            desc: text,
            randomId: id
        }).then((response)=>{
            ctx.modalHandler('Added')
        })
    }

    const todoRemoveHandler = (id, mobId) =>{
        let temp = ctx.collections
        temp.push(mobId)
        ctx.collectionHandler(temp)
        let tempStatus = {
            Xp: ctx.status.Xp,
            reqXp: ctx.status.reqXp,
            lvl: ctx.status.lvl,
            name: ctx.status.name,
            img: ctx.status.img,
            id: ctx.status.id
        }
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
        })
        if (tempStatus.Xp + 50 >= tempStatus.reqXp) {
           tempStatus.lvl++
           tempStatus.Xp = tempStatus.reqXp - tempStatus.Xp - 50
           tempStatus.reqXp = tempStatus.reqXp + 50 
        }else{
            tempStatus.Xp = tempStatus.Xp + 50
        }

        if (tempStatus.lvl > 35) {
            tempStatus.id = 6
            tempStatus.name = 'CHARIZARD'
            tempStatus.img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
        }else if (tempStatus.lvl > 15) {
            tempStatus.id = 5
            tempStatus.name = 'CHARMELEON'
            tempStatus.img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png'
        }

        Axios.put("http://localhost:3001/update", {
            array: JSON.stringify(ctx.collections),
            xp: tempStatus.Xp,
            reqXp: tempStatus.reqXp,
            lvl: tempStatus.lvl,
            name: tempStatus.name,
            img: tempStatus.img,
            id: tempStatus.id
        }).then((response)=>{
            
        })
        ctx.modalHandler(mobId,true)

    }

    const todoDeleteHandler = (e) => {
        e.preventDefault()
        const id = e.target.parentElement.firstChild.getAttribute('data-key')
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
        })
        ctx.modalHandler('Deleted')
        setDeleteBtnHighlighted(false)
    }

    const deleteClickHandler =()=>{
        setDeleteBtnHighlighted(!deleteBtnHighlighted)
    }
    const addClickHandler =()=>{
        setAddBtnHighlighted(!addBtnHighlighted)
    }
    return (<Fragment>
        <div className={styles.list}>
            
           <h2 className={styles['list-title']}>Today's to-do list</h2>
            {listApi && (<>
            {listApi.map((val, i)=><div key={val.id} className={styles['todo-wrap']}>
                <Todo id={val.id} mobId={val.mobId} desc={val.desc} onRemove={todoRemoveHandler}/>
                <button className={`${styles['delete-btn']} ${deleteBtnHighlighted ? styles.del : ''}`}
                onClick={todoDeleteHandler}>Delete</button>
            </div>
            )}
            </>)}
            <div className={`${styles.input} ${addBtnHighlighted ?  '' : styles['input-hide']}`}>
                <div className={`${styles['input-text']} ${addBtnHighlighted ? styles['input-active'] : ''}`}>
                    <Input onAdd={todoAddHandler}/>
                </div>
            </div>
            <div className={styles.btns}>
                <button className={styles.btn} onClick={addClickHandler}>Add</button>
                <button className={styles.btn} onClick={deleteClickHandler}>Delete</button>
            </div>
        </div>
    </Fragment>)
}

export default TodoList;