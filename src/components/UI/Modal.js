import { Fragment } from 'react'
import ReactDom from "react-dom";
import styles from './Modal.module.css'

const Backdrop = props => {
    return <div className={styles.backdrop}
     onClick={props.modalMessageHandler}/>
}

const ModalOverlay = props => {
    const classes = props.isImg ? styles.modal : styles['modal-text']  
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.children}.png`
    return <div className={classes}>
        {!props.isImg ? (<div className={styles.content}>{props.children}</div>) 
        : (<img src={url} alt='pokemon-img' />)}
        
    </div>
}

const portalElement = document.getElementById('overlays')

const Modal = (props) =>{
    return <Fragment>
        {ReactDom.createPortal(<Backdrop modalMessageHandler={props.displayHandler} />, portalElement)}
        {ReactDom.createPortal(<ModalOverlay isImg={props.isImg}>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
}

export default Modal