import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react'
import ReactDom from "react-dom";
import styles from './Modal.module.css'

const Backdrop = props => {
    return <div className={styles.backdrop}
        onClick={props.modalMessageHandler} />
}

const ModalOverlay = props => {
    const [pokemonData, setPokemonData] = useState([])

    const classes = props.isImg ? styles.modal : styles['modal-text']
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.children}.png`

    const getPokemonData = async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        setPokemonData(data)
    }

    useEffect(() => {
        getPokemonData(props.children)
    }, [])

    return <div className={classes}>
        {!props.isImg ? (<div className={styles.content}>{props.children}</div>)
            : (
                <div className={styles['img-box']}>
                    <img src={url} alt='pokemon-img' />
                    {/* <h6>{pokemonData.forms.name}</h6> */}
                    {console.log(pokemonData)}
                </div>
            )}
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {
    return <Fragment>
        {ReactDom.createPortal(<Backdrop modalMessageHandler={props.displayHandler} />, portalElement)}
        {ReactDom.createPortal(<ModalOverlay isImg={props.isImg}>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}

export default Modal