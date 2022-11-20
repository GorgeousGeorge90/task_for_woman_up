import {useEffect, useMemo} from 'react';
import {createPortal} from 'react-dom';
import styles from './Modal.module.scss';


const modalRootElement = document.querySelector('#modal')

const Modal = ({open, onClose, filesList})=> {

    const element = useMemo(()=> {
        const element = document.createElement('div')
        return element
    },[])

    useEffect(()=>{
        if (open) {
            modalRootElement.appendChild(element)

            return ()=> modalRootElement.removeChild(element)
        }
    })

    if (open) {
        return createPortal(
            <div className={styles.content} onClick={onClose}>
                <div className={styles.cards}>
                {
                    filesList.map(file=>{
                        return <p><img key={filesList.indexOf(file)} src={file} alt='pic'/></p>
                    })
                }
                </div>
            </div>,
            element
        )
    }

    return null
}

export default Modal