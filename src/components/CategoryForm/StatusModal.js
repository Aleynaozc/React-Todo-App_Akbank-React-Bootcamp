import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function StatusModal(props) {
    const [edit, setEdit] = useState(null)
    const [editValue, setEditValue] = useState()
    const uniqueIdGenerator = () => {
        return Math.floor(Math.random() * 100000 + 1);
    };
    const [value, setValue] = useState({

        text: props.defaultValue,
        color: props.defaultValue,

    })

    const handleStatusChange = (event) => {
        //console.log(event.currentTarget.name)
        setValue((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const handleAddStatus = () => {
        props.setCategoryList(
            props.categoryList.map((item) =>
                item.id == value.category
                    ? {
                        ...item,
                        statusList: [
                            ...item.statusList,
                            {
                                id: uniqueIdGenerator(),
                                text: value.text,
                                color: value.color
                            }
                        ]
                    }
                    : { ...item }
            ))
        setValue("")
    }

    const handleUpdateCategory = (editValue, id) => {

        const newCategoryList = [...props.categoryList]
        newCategoryList.map((e) => {
            e.statusList.forEach((b) => {
                if (b.id === id) {
                    b.text = editValue
                }
            })


        })
        props.setCategoryList(newCategoryList)
    }

    const handleSave = (id) => {

        if (editValue) {
            handleUpdateCategory(editValue, id)
        } else {
            setEditValue("")
        }
        setEdit(false)
    }


    return (
        props.statusModalOpen && ( //Eğer modalopen True ise modal göstericek , False ise gösterilmicek.
            <div className='modal' >
                <div id="modalBody" className="modal-body">
                    <div className="split left">
                        <div className="centered">
                            {props.categoryList.map((category) =>
                                category.statusList?.map((fi, index) =>
                                    <li className="todo-item" id={fi.id} key={index} >
                                        <div className="todo-item-details">
                                            {edit === fi.id ?
                                                (
                                                    <input
                                                        type="text"
                                                        name='editValue'
                                                        value={editValue}
                                                        defaultValue={fi.text}
                                                        onChange={(e) => setEditValue(e.target.value)} />

                                                ) : (
                                                    <span className="todo-item-title">{fi.text}</span>
                                                )
                                            }
                                        </div>
                                        {
                                            edit === fi.id ? (
                                                <button
                                                    className="delete-btn"
                                                    type="button"
                                                    onClick={() => handleSave(fi.id)}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </button>

                                            )
                                                :
                                                (
                                                    <button
                                                        className="delete-btn"
                                                        type="button"
                                                        onClick={() => setEdit(fi.id)}>
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </button>
                                                )
                                        }
                                        <button
                                            className="delete-btn"
                                            type="button"
                                            onClick={() => props.handleStDelete(fi.id, category.id)} >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </li>
                                )
                            )
                            }
                        </div>
                    </div>

                    <div className="split right">
                        <button
                            className='close-btn'
                            type="button"
                            onClick={() => props.setStatusModalOpen(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>

                        <div className="centered">
                            <form id="todoForm" className='todoModalForm__container'>
                                <select
                                    className='addCategory'
                                    name="category"
                                    onChange={handleStatusChange}>
                                    <option
                                        style={{ fontWeight: 'bold' }}
                                        selected>
                                        Kategori Seçiniz
                                    </option>
                                    {props.categoryList.map((ctgry, index) =>
                                        <option value={ctgry.id} key={index} id={ctgry.id}>{ctgry.title}</option>
                                    )}
                                </select>
                                <input
                                    name="text"
                                    type="text"
                                    className="form-control input"
                                    placeholder="Add status"
                                    autoComplete="off"
                                    value={value.text}
                                    onChange={handleStatusChange}
                                />
                                <input
                                    name="color"
                                    type="text"
                                    className="form-control input"
                                    placeholder="Add color"
                                    autoComplete="off"
                                    value={value.color}
                                    onChange={handleStatusChange}
                                />
                                <button
                                    className="save-btn"
                                    type="button"
                                    onClick={handleAddStatus}
                                >Ekle
                                </button>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    )
}

export default StatusModal