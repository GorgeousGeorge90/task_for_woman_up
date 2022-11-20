import styles from './Task.module.scss';
import {useEffect, useState} from 'react';
import {storage} from './../../../firebase';
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage';
import Modal from '../../../common/Modal/Modal';




const Task = ({task, deleteTask, completeTask, changeTask})=> {
    const [textState, setTextState] = useState({
        text: task.description,
        editMode: false,
    })

    const [open, setOpen] = useState(false)

    const [fileState, setFileState] = useState({
        file: null,
        filesList: [],
    })

    const filesListRef = ref(storage, `files/${task.id}`)
    const uploadFile = () => {
        if (fileState.file === null) return;
        const fileRef = ref(storage, `files/${task.id}/${fileState.file.name}`)
        uploadBytes(fileRef, fileState.file).then(()=> {
            // getDownloadURL(snapshot.ref).then(url => {
            //     setFileState(fileState => {
            //         return {
            //             ...fileState,
            //             filesList: [...fileState.filesList, url],
            //         }
            //     })
            //
            // })
            alert('File upload!')
        })
    }

        useEffect(() => {
            listAll(filesListRef).then(response => {
                response.items.forEach(item => {
                    getDownloadURL(item).then(url => {
                        setFileState( fileState => {
                            return {
                                ...fileState,
                                filesList: [...fileState.filesList, url]
                            }
                        })
                    })
                })
            })
        }, [])

        const activateEditMode = () => {
            setTextState({...textState, editMode: true})
        }
        const deactivateEditMode = () => {
            setTextState({...textState, editMode: false})
            changeTask(task.id, textState.text)
        }

        const onChange = e => {
            setTextState({...textState, text: e.currentTarget.value})
        }

        return (
            <div className={styles.content}>
                <h3 onClick={() => completeTask(task.id)}>Title:{task.title}</h3>
                <span>
                {
                    textState.editMode ? <input
                            onBlur={deactivateEditMode}
                            autoFocus={true}
                            value={textState.text}
                            onChange={onChange}
                        />
                        : <span onDoubleClick={activateEditMode}> Description:{task.description}</span>
                }

                </span>
                <span>&#128345;{task.date}</span>
                <span>
                    <input type={'file'} onChange={event => setFileState({...fileState, file: event.target.files[0]})}/>
                    <button onClick={uploadFile}>UploadFile</button>
                </span>
                <div>
                    <button onClick={()=> setOpen(true)}>Open/Close</button>
                    <Modal filesList={fileState.filesList} open={open} onClose={()=>setOpen(false)}/>
                </div>
                <span onClick={() => deleteTask(task.id)}>&#128465;</span>
            </div>
        )
    }

export default Task