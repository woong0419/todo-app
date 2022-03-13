import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

const Nav = () =>{
    return(<Fragment>
        <ul className={styles['ul-wrap']}>
            <li>
                <NavLink className={({ isActive }) => (isActive ? styles.active : '')}
            to="/">
                    Todo-List
                </NavLink>
            </li>
            <li>
                <NavLink className={({ isActive }) => (isActive ? styles.active : '')}
            to="/deck">
                    PokéDeck
                </NavLink>
            </li>
        </ul>
    </Fragment>)
}

export default Nav