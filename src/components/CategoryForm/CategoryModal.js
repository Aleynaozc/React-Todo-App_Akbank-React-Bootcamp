import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';


function CategoryForm(props) {
  const [edit, setEdit] = useState(null)


  const [value, setValue] = useState({
    title: props.defaultValue,
  })

  const [editValue, setEditValue] = useState('')

 
  const handleCategoryChange = (event) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }



  //UPDATE
  const handleClick = () => {
    props.handleAddCategory(value)

  }
  const handleUpdateCategory = (editValue, id) => {
    const newCategoryList = [...props.categoryList]
    newCategoryList.forEach((todo) => {

      if (todo.id === id) {
        todo.title = editValue
      }
    })
    props.setCategoryList(newCategoryList)

  }
  const handleSave = (id) => {
    setEdit(false)
    if (editValue) {
      handleUpdateCategory(editValue, id)
    } else {
      setEditValue()
    }
  }

  return (
    props.categoryModalOpen && (
      <div className='modal' >
        <div id="modalBody" className="modal-body">
          <div className="split left">
            <div className="centered">
              {props.categoryList?.map((ctgry, index) =>
                <li className="todo-item" id={ctgry.id} key={index}>
                  <div className="todo-item-details">
                    {edit === ctgry.id ?
                      (
                        <input
                          type="text"
                          name='editValue'
                          className="todo-item-title"
                          value={editValue}
                          defaultValue={ctgry.title}
                          onChange={(e) => setEditValue(e.target.value)} />
                      ) : (
                        <span className="todo-item-title">{ctgry.title} </span>
                      )
                    }

                  </div>
                  {
                    edit === ctgry.id ? (
                      <button className="delete-btn" type="button"
                        onClick={() => handleSave(ctgry.id)}>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                      </button>

                    )
                      :
                      (
                        <button className="delete-btn" type="button" onClick={() => setEdit(ctgry.id)}>
                          <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                        </button>
                      )
                  }
                  <button className="delete-btn" type="button" onClick={() => props.handleDeleteCat(ctgry.id)} >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </button>

                </li>
              )}
            </div>
          </div>

          <div className="split right">
            <button className='close-btn' type="button" onClick={() => props.setCategoryModalOpen(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="centered">
              <form id="todoForm" className='todoModalForm__container' >
                <input
                  name="title"
                  type="text"
                  className="form-control input"
                  placeholder="Add Category"
                  value={value.title}
                  onChange={handleCategoryChange}
                  autoComplete="off"
                />
                <button
                  className="save-btn"
                  type="button"
                  onClick={handleClick}
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

export default CategoryForm