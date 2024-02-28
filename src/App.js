import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [list, setList] = useState([]);

  const addList = (value) => {
    const now = new Date();
    const formattedDate = now.toISOString().substring(0, 10); // 'YYYY-MM-DD' 형식으로 날짜 포맷

    let newList = {
      id : list.length,
      title : `${value}`,
      day : formattedDate,
    };
    setList( [...list, newList] );
  };

  const deleteList = (id) => {
    setList(list.filter(list => list.id !== id));
  };

  return (
    <div className="App">
      <div className="black-nav">
        <div>내가할일</div>
      </div>

      <UserInput list={list} addList={addList} deleteList={deleteList}/>
    </div>
  );
}

function UserInput ({list, addList, deleteList}) {
  
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <form>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={(event) => { event.preventDefault(); addList(value); setValue('');}}>추가</button>
      {list.map((item) => (
        <List key={item.id} id={item.id} title={item.title} day={item.day} deleteList={deleteList} />
      ))}
    </form>
  );
}

function List({id, title , day, deleteList}) {
  
  return(
    <div className='modal'>
        <h2>{title}</h2>
        <p>{day}</p>
        <button onClick={(event) => {event.preventDefault(); deleteList(id);}}>삭제</button>
    </div>
  )
}

export default App;
