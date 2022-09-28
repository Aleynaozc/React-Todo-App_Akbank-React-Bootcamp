import React from 'react'

function Buttons(props) {
  return (
    <>
      <button
        className="addBtn"
        type="button"
        onClick={() => props.setModalOpen(true)}
      >Ekle
      </button>
      <button
        className="addBtn"
        type="button"
        onClick={() => props.setCategoryModalOpen(true)}
      >
        Kategori Ekle/Sil
      </button>
      <button
        className="addBtn"
        type="button"
        onClick={() => props.setStatusModalOpen(true)}
      >Durum Ekle/Sil
      </button>
    </>
  )
}

export default Buttons