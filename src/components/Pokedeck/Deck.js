import { Fragment, useState } from 'react'
import Card from './Card'
import styles from './Deck.module.css'
import { useEffect } from 'react'
import  Axios  from 'axios'


const Deck =()=>{
    const [deckData,setDeckData] = useState()

    useEffect(()=>{
       Axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').then((res)=>{        
       setDeckData(res.data.results)
       }) 
    },[])

    return(<Fragment>{deckData && (
        <div className={styles.deck}>
            {deckData.map((val,i)=><Card key={i} url={val.url} />
            )}
        </div>
    )}
    </Fragment>)
}

export default Deck