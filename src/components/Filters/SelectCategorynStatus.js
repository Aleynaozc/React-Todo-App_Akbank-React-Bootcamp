import React from 'react'


function SelectCategorynStatus(props) {

  function handleFilter(event) {
    props.setFiltered(event.target.value);
  }


  return (
    <>
      <select
        className='filters_select'
        name="category"
        onChange={handleFilter}>

        <option
          value=""
          style={{ fontWeight: 'bold' }}
          selected>
          Hepsini Gör
        </option>

        {props.categoryList?.map((ctgry, index) =>
          <option
            value={ctgry.id}
            key={index}
            id={ctgry.id}>
            {ctgry.title}
          </option>
        )}

      </select>
      <select
        className='filters_select'
        name="statusList"
        onChange={handleFilter}>

        <option
          value=""
          style={{ fontWeight: 'bold' }}>
          Hepsini Gör
        </option>

        {
          props.categoryList.map((statu) =>
            statu.statusList?.map((fi, index) =>
              <option
                value={fi.id}
                id={fi.id}
                key={index}
                style={{ color: fi.color }}
              >
                {fi.text}
              </option>
            ))
        }
      </select>

    </>
  )
}

export default SelectCategorynStatus