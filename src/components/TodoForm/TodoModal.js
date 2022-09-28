import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const TodoModal = (props) => {

    const [value, setValue] = useState({
        title: props.defaultValue,


    })

    const handleChange = (event) => {
        setValue((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    let alt = document.getElementById('durum')

    const handleClick = () => {
    
        if (alt.value === "Durum Seçiniz") {
            alert("Durum Seçmelisiniz.")

            return

        } else {
           
            props.handleAddTodo(value)
            props.setModalOpen(false)
        }
    }


    return (

        props.modalOpen && (
            <div className='modal' >
                <div id="modalBody" className="modal-body" style={{ backgroundColor: "#6e25a56c" }}>
                    <form id="todoForm" className='todoModalForm__container' >
                        <button className='close-btn' type="button" onClick={() => props.setModalOpen(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <input
                            name="title"
                            onChange={handleChange}
                            value={value.title}
                            type="text"
                            className="form-control_modal input"
                            placeholder="Title"
                            autoComplete="off"
                        />
                        <select className='form-control_modal' name="category"
                            onChange={handleChange} >
                            <option selected> Kategori Seçiniz</option>
                            {props.categoryList?.map((ctgry, index) =>
                                <option value={ctgry.id} key={index} id={ctgry.id}>{ctgry.title}</option>
                            )}

                        </select>
                        <select className='form-control_modal' name="statusList"
                            onChange={handleChange} id="durum">
                            <option  selected> Durum Seçiniz</option>
                            {props.categoryList.map((statu) => {
                                if (statu.id == value.category) {
                                    return statu.statusList.map((fi, index) =>
                                        <option value={fi.id} key={index} id={fi.id}>{fi.text}</option>

                                    )
                                }
                            })
                            }
                        </select>
                        <button
                            className="save-btn"
                            type='button'
                            onClick={handleClick}
                        >Ekle
                        </button>

                    </form>
                </div>
            </div>
        )

    )

}

export default TodoModal