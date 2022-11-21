import {useEffect, useMemo} from 'react';
import {createPortal} from 'react-dom';
import styles from './Modal.module.scss';


const modalRootElement = document.querySelector('#modal')

const Modal = ({open, onClose, filesList, deleteFile})=> {

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

    const deleteOldFile = (event,name) => {
        event.stopPropagation()
        deleteFile(name)
    }

    if (open) {
        return createPortal(
            <div className={styles.content} onClick={onClose}>
                <div className={styles.cards}>
                {
                    filesList.map(file=>{
                        return <p>
                                  <img key={filesList.indexOf(file)} src={file.url} alt='pic'/>
                                  <span onClick={event=>deleteOldFile(event,file.name)}>&#128465;</span>
                               </p>
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