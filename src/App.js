
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import TodoModal from './components/TodoForm/TodoModal';
import TodoList from './components/TodoForm/TodoList';
import CategoryModal from './components/CategoryForm/CategoryModal'
import StatusModal from './components/CategoryForm/StatusModal'
import Buttons from './components/Buttons/Buttons';
import Filters from './components/Filters/SelectCategorynStatus';

function App() {

  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filtered, setFiltered] = useState()

  // MODALS
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  //ID GENERATOR
  const uniqueIdGenerator = () => {
    return Math.floor(Math.random() * 100000 + 1);
  };

  //ADD 
  const handleAddTodo = ({ title, category, statusList }) => {
    
    setList((prev) => [
      ...prev,
      {
        id: uniqueIdGenerator(),
        title,
        category,
        statusList,

      },
    ])
  }
  const handleAddCategory = ({ title }) => {
    setCategoryList((prev) => [
      ...prev,
      {
        id: uniqueIdGenerator(),
        title,
        statusList: [],
      },
    ])
  }

  //DELETE TODO
  const handleDeleteItems = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }
  //DELETE CATEGORY
  const handleDeleteCat = (id) => {
    if (
      window.confirm(
        `Kategoriyi silmek istediğinizden emin misiniz?`
      )
    ) {
      setCategoryList(
        categoryList.filter((category) => category.id !== id)
      );
      setList(list.filter((todo) => Number(todo.category) !== id));
    }
  }

  const handleStDelete = (stId, catId) => {
  
    let deneme;
     categoryList.map((statu) => {
      if (statu.id == catId) {
        deneme = statu.statusList
      }
    })

    const deletedStIndex =
      deneme.findIndex((st) =>
        st.id === stId

      )

    if (deneme.length === 1) {
      alert("Kategoriye ait son durumu silemezsiniz.")
      return
    } else {
      if (deneme.length == [deletedStIndex + 1]) {
        list.map((todo) =>{
          if( todo.statusList.id === stId){
            todo.statusList = deneme[0]
          }
        })
      } 
      else {
        list.map((todo) =>{
          if( todo.statusList.id === stId){
            todo.statusList =  deneme[deletedStIndex + 1]
          }
        })
      }
    }
    setList([...list])

    const newList = categoryList.map((i) => {
      i.statusList = i.statusList.filter((item) => item.id !== stId)
      return i
    })
    setCategoryList(newList)
  }

  //FILTER
  function getFilteredList() {
    if (!filtered) {
      return list;
    }
    return list.filter((item) => item.category === filtered || item.statusList === filtered);
  }

  var filteredList = useMemo(getFilteredList, [filtered, list]);

  return (
    <>
      <div className="container">
        <h1>TODO LIST</h1>

        <TodoModal
          defaultValue=""
          categoryList={categoryList}
          handleAddTodo={handleAddTodo}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />

        <CategoryModal
          setCategoryList={setCategoryList}
          defaultValue=""
          categoryList={categoryList}
          handleDeleteItems={handleDeleteItems}
          handleAddCategory={handleAddCategory}
          categoryModalOpen={categoryModalOpen}
          setCategoryModalOpen={setCategoryModalOpen}
          handleDeleteCat={handleDeleteCat}
        />

        <StatusModal
          defaultValue=""
          handleStDelete={handleStDelete}
          setCategoryList={setCategoryList}
          categoryList={categoryList}
          statusModalOpen={statusModalOpen}
          setStatusModalOpen={setStatusModalOpen}
        />

        <div className='addButtons'>

          <Buttons
            setModalOpen={setModalOpen}
            setCategoryModalOpen={setCategoryModalOpen}
            setStatusModalOpen={setStatusModalOpen}
          />

          <Filters
            categoryList={categoryList}
            setFiltered={setFiltered}
          />

        </div>

        <TodoList
          setList={setList}
          setModalOpen={setModalOpen}
          list={list}
          categoryList={categoryList}
          handleDeleteItems={handleDeleteItems}
          filteredList={filteredList}
        />
      </div>
    </>
  );
}

export default App;
