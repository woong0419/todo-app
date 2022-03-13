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
        Axios.get('http://localhost:3001/todo').then((res)=>{
            setListApi(res.data)
        })
    },[ctx])

    const todoAddHandler = (text, id) => {
        Axios.post('http://localhost:3001/post', {
            desc: text,
            randomId: id
        }).then((response)=>{
            console.log(response)
        })
    }

    const todoRemoveHandler = (id, mobId) =>{
        let temp = ctx.collections
        temp.push(mobId)
        ctx.collectionHandler(temp)
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
        })
        Axios.put("http://localhost:3001/update", {
            array: JSON.stringify(ctx.collections)
        }).then((response)=>{

        })
    }

    const todoDeleteHandler = (e) => {
        e.preventDefault()
        const id = e.target.parentElement.firstChild.getAttribute('data-key')
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{

        })
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
            {/* {console.log(listApi)} */}
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