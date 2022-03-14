import { useState, useContext } from 'react'
import { Fragment } from 'react'
import { useEffect } from 'react'
import styles from './MyStatus.module.css'
import xp from '../../img/xp.png'
import AuthContext from '../store/auth-context'
import Axios from "axios"

const MyStatus = () => {
    const ctx = useContext(AuthContext);
    //const [myData, setMyData] = useState()
    const [exp, setExp] = useState()
    //const exp = (ctx.status.Xp / ctx.status.reqXp)

    useEffect(()=>{
        Axios.get('http://localhost:3001/char').then((res)=>{
            //setMyData(res.data)
            ctx.collectionHandler(JSON.parse(res.data[0].collections))
            ctx.statusHandler(res.data[0])
            setExp(Math.round(23-(res.data[0].Xp/res.data[0].reqXp * 23)))
        })
        
    },[ctx.modalMessage])

    const expBar = () => {
        let text = ''
        for (let i = 0; i < exp; i++) {
            text = text + 'x'
        }
        return text
    }

    return (
    <Fragment>
        {(ctx.status && exp) && (<>
        <div className={styles.status}>
        <div className={styles.textBox}>
            <div className={styles.nameBox}>
                <h3>No.{ctx.status.id}</h3>
                <h3>{ctx.status.name}</h3>
            </div>
            <div className={styles.lvBox}>
                <h3>LV:{ctx.status.lvl}</h3>
                <img className={styles['xp-bar']} src={xp} alt='xp-bar'/>
                <div className={styles.block}>{expBar()}</div>
            </div>
        </div>
        <img className={styles.img} src={ctx.status.img} alt='Charmander-png'/>
        </div>
        </>)}
    </Fragment>
    )
}

export default MyStatus