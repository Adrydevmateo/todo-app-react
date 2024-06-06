import './Todo.style.css'

import IconCheck from '../assets/icons/icon-check.svg'
import IconDelete from '../assets/icons/icon-cross.svg'

interface TodoCompProps {
 txt: string
 OnEditTodo: () => any
 OnDeleteTodo: () => any
}

export default function TodoComp({ txt, OnEditTodo, OnDeleteTodo }: TodoCompProps) {

 return (
  <div className="todo-comp">
   <div className="checkbox-container">
    <button className='checkbox' type='button' onClick={() => OnEditTodo()}>
     <img src={IconCheck} alt="checkbox icon" />
    </button>
   </div>

   <div className="txt-container">
    <strong>{txt}</strong>
   </div>

   <div className="delete-container">
    <button type='button' onClick={() => OnDeleteTodo()}>
     <img src={IconDelete} alt="cross icon" />
    </button>
   </div>
  </div>
 )
}
