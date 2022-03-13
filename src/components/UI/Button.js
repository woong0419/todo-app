import { Fragment } from 'react'
import styles from './Button.module.css'

const Button = (props) => {
    return(<Fragment>
        <button className={styles.btn}>
            {props.children}
        </button>
    </Fragment>)
}

export default Button