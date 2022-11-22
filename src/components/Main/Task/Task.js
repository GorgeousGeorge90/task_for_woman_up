import './Task.scss';
import {useEffect, useRef, useState} from 'react';
import {storage} from './../../../firebase';
import {ref, uploadBytes, listAll, getDownloadURL, deleteObject} from 'firebase/storage';
import Modal from '../../../common/Modal/Modal';
import dayjs from "dayjs";


/**
 *
 * Компонент для отрисовки задачи
 * получает все необходимые параметры (props)
 * от родительского компонета.
 *
 * @param task {Object}
 * @param deleteTask {function} функция для удаления задачи
 * @param completeTask {function} функция для завершения задачи
 * @param changeTask {function} функция для изменения содержимого задачи
 * @return {JSX.Element}
 * @constructor
 */

const Task = ({task, deleteTask, completeTask, changeTask})=> {

    /**
     *
     * Используем хук useState чтобы создать
     * state для управления содержимым задачи
     *
     */

    const [textState, setTextState] = useState({
        text: task.description,
        editMode: false,
    })

    /**
     *
     * Используем хук useState для
     * управление открытием/закрытием модального окна
     *
     */

    const [open, setOpen] = useState(false)

    /**
     *
     * Используем хук useState для
     * управления состоянием наших изображений
     *
     */

    const [fileState, setFileState] = useState({
        file: null,
        filesList: [],
    })

    window.fileState = fileState

    const filesListRef = ref(storage, `files/${task.id}`)

    /**
     *
     * Функция для закгрузки изображения через
     * специальные инстументы Firebase Storage
     *
     * @return {Promise<void>}
     */

    const uploadFile = async () => {
        if (fileState.file === null) return;
        const fileRef = ref(storage, `files/${task.id}/${fileState.file.name}`)
        const snapshot = await uploadBytes(fileRef, fileState.file)
        const url = await getDownloadURL(snapshot.ref)
                setFileState(fileState => {
                    const newEl = {
                        name:fileState.file.name,
                        url,
                    }
                    return {
                        ...fileState,
                        file:null,
                        filesList: [...fileState.filesList,newEl],
                    }
                })
            alert('File upload!')
    }

    /**
     *
     * Функция для  удаления через
     * специальные инстументы Firebase Storage
     *
     * @param name {string} название задачи
     * @return {Promise<void>}
     */

    const deleteFile = async name => {
        const desertRef = ref(storage, `files/${task.id}/${name}`)
        await deleteObject(desertRef)
            setFileState(fileState => {
                return {
                    ...fileState,
                    filesList: fileState.filesList.filter(file => file.name !== name)
                }
            })
        alert('File has been deleted!')
    }

    const effect = useRef(false)

    /**
     *
     * С помощью хука useEffect и нативных возможностей Firebase Store
     * подтягиваем существующие изображения
     *
     *
     */

    useEffect( () => {
            async function fetchData() {
                if (effect.current === false) {
                    const response = await listAll(filesListRef)
                    response.items.forEach(async item=> {
                        const url = await getDownloadURL(item)
                        setFileState(fileState => {
                            const newEl = {
                                name: item.name,
                                url,
                            }
                            return {
                                ...fileState,
                                filesList: [...fileState.filesList, newEl],
                            }
                        })
                    })
                }
            }
            fetchData()
            return () => effect.current = true
        },[])

         /**
          *
          * Объект, содержащий методы:
          * для активации режима редактирования описания задачи
          * для деактивиции режива радактирвоания описания задачи
          *
          *
          * @type {{activate: EditMode.activate, deactivate: EditMode.deactivate}}
          */

         const EditMode = {
            activate:() => {
                setTextState({...textState, editMode: true})
            },
            deactivate:() => {
                setTextState({...textState, editMode: false})
                changeTask(task.id, textState.text)
            },
        }

    /**
     *
     * Функция для измения описания задачи
     *
     * @param e
     */

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