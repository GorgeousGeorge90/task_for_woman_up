import './Task.scss';
import {useEffect, useRef, useState} from 'react';
import {storage} from './../../../firebase';
import {ref, uploadBytes, listAll, getDownloadURL, deleteObject} from 'firebase/storage';
import Modal from '../../../common/Modal/Modal';
import dayjs from "dayjs";




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

    window.fileState = fileState

    const filesListRef = ref(storage, `files/${task.id}`)
    const uploadFile = () => {
        if (fileState.file === null) return;
        const fileRef = ref(storage, `files/${task.id}/${fileState.file.name}`)
        uploadBytes(fileRef, fileState.file).then((snapshot)=> {
            getDownloadURL(snapshot.ref).then(url => {
                setFileState(fileState => {
                    const newEl = {
                        name:fileState.file.name,
                        url,
                    }
                    return {
                        ...fileState,
                        filesList: [...fileState.filesList,newEl],
                    }
                })

            })
            alert('File upload!')
        })
    }

    const deleteFile = name => {
        const desertRef = ref(storage, `files/${task.id}/${name}`)
        deleteObject(desertRef).then(()=> {
            setFileState(fileState => {
                return {
                    ...fileState,
                    filesList: fileState.filesList.filter(file => file.name !== name)
                }
            })
        }).then(() => {
                alert('File has been deleted!')
            })
    }

        const effect = useRef(false)
        useEffect(() => {
            if (effect.current === false) {
                listAll(filesListRef).then(response => {
                    response.items.forEach(item => {
                        getDownloadURL(item).then(url => {
                            setFileState(fileState => {
                                const newEl = {
                                    name:item.name,
                                    url,
                                }
                                return {
                                    ...fileState,
                                    filesList: [...fileState.filesList,newEl],
                                }
                            })
                        })
                    })
                })
                return ()=> effect.current = true
            }
        },[])

        const EditMode = {
            activate:() => {
                setTextState({...textState, editMode: true})
            },
            deactivate:() => {
                setTextState({...textState, editMode: false})
                changeTask(task.id, textState.text)
            },
        }

        const onChange = e => {
            setTextState({...textState, text: e.currentTarget.value})
        }

        const dates = {
            date: dayjs(task.date),
            current: dayjs(Date.now())
        }

        return (
            <div className={ dates.date.diff(dates.current) < 0 ? 'contentTask wasted':'contentTask'}>
                <h4 className={ task.complete ? 'completed': null}   onClick={() => completeTask(task.id)}>{task.title}</h4>
                <span>
                {
                    textState.editMode ? <input
                            onBlur={EditMode.deactivate}
                            autoFocus={true}
                            value={textState.text}
                            onChange={onChange}
                        />
                        : <span className={'description'} onDoubleClick={EditMode.activate}>{task.description}</span>
                }

                </span>
                <span className={'date'}>
                    <p>&#128345;</p>
                    <p>{task.date}</p>
                </span>
                <span>
                    <input type={'file'} onChange={event => setFileState({...fileState, file: event.target.files[0]})}/>
                    <button onClick={uploadFile}>Upload</button>
                </span>
                <span>
                    <button onClick={()=> setOpen(true)}>Files</button>
                    <Modal filesList={fileState.filesList} open={open}
                           onClose={()=>setOpen(false)}
                           deleteFile={deleteFile}
                    />
                </span>
                <span style={{marginRight: '20px'}} onClick={() => deleteTask(task.id)}>&#128465;</span>
            </div>
        )
    }

export default Task