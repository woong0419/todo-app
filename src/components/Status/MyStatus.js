import { useState, useContext } from 'react'
import { Fragment } from 'react'
import { useEffect } from 'react'
import styles from './MyStatus.module.css'
import xp from '../../img/xp.png'
import AuthContext from '../store/auth-context'
import Axios from "axios"

const MyStatus = () => {
    const [myData, setMyData] = useState()
    const ctx = useContext(AuthContext);

    useEffect(()=>{
        Axios.get('http://localhost:3001/char').then((res)=>{
            setMyData(res.data)
            ctx.collectionHandler(JSON.parse(res.data[0].collections))
        })
    },[])

    return (
    <Fragment>
        {myData && (<>
        <div className={styles.status}>
        <div className={styles.textBox}>
            <div className={styles.nameBox}>
                <h3>No.{myData[0].id}</h3>
                <h3>{myData[0].name}</h3>
            </div>
            <div className={styles.lvBox}>
                <h3>LV:{myData[0].lvl}</h3>
                <img className={styles['xp-bar']} src={xp} alt='xp-bar'/>
            </div>
        </div>
        <img className={styles.img} src={myData[0].img} alt='Charmander-png'/>
        </div>
        </>)}
    </Fragment>
    )
}

export default MyStatus