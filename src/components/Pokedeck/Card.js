
import  Axios  from 'axios'
import { useEffect } from 'react'
import { Fragment,useState,useContext } from 'react'
import styles from './Card.module.css'
import AuthContext from '../store/auth-context'

const Card = (props) => {
    const ctx = useContext(AuthContext);
    const url = props.url
    const [mobId,setMobId] = useState()
    const [mobImg,setMobImg] = useState()
    let isCollected = false;

    useEffect(()=>{
        Axios.get(url).then((res)=>{
            setMobId(res.data.id)
            setMobImg(res.data.sprites.front_default)
        })
    },[])

    // eslint-disable-next-line array-callback-return
    ctx.collections.map((val) => {
        if(+val === mobId){
            isCollected = true
        }    
    })

    return(<Fragment>
        {mobId && (<>
        <div>
            <img className={`${styles['deck-img']} ${isCollected && styles['collected']}`} src={mobImg} alt='pokemon-img'/>
        </div>
        </>)}
    </Fragment>)
}

export default Card