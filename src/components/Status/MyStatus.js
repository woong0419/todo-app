import { Fragment } from 'react'
import styles from './MyStatus.module.css'
import charmander from '../../img/Charman.png'
import xp from '../../img/xp.png'

const MyStatus = () => {
    return (<Fragment>
        <div className={styles.status}>
        <div className={styles.textBox}>
            <div className={styles.nameBox}>
                <h3>No.3</h3>
                <h3>CHARMANDER</h3>
            </div>
            <div className={styles.lvBox}>
                <h3>LV:13</h3>
                <img className={styles['xp-bar']} src={xp} alt='xp-bar'/>
            </div>
        </div>
        <img className={styles.img} src={charmander} alt='Charmander-png'/>
        </div>
    </Fragment>
    )
}

export default MyStatus