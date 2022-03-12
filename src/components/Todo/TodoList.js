import styles from './TodoList.module.css'
import Todo from './Todo'
import { Fragment } from 'react'

const TodoList = () =>{
    let ListApi = [
        {
            id: 0,
            desc: 'study abt nextJs and graphQl'
        },{
            id: 1,
            desc: 'dish wash before GF get home'
        },{
            id: 2,
            desc: 'Front-end side of toy project'
        }
    ]

    const todoRomoveHandler = (id) =>{
        ListApi = ListApi.filter((todo)=> 
            todo.id !== +id)
        console.log(ListApi)
    }
    return (<Fragment>
        <div className={styles.list}>
           <h2 className={styles['list-title']}>Today's to-do list</h2>
            {ListApi.map((val)=>
                <Todo id={val.id} desc={val.desc} onRemove={todoRomoveHandler}/>
            )}
        </div>
    </Fragment>)
}

export default TodoList;