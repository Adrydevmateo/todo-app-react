import './Todo.style.css'

import IconCheck from '../assets/icons/icon-check.svg'
import IconDelete from '../assets/icons/icon-cross.svg'

interface TodoCompProps {
 txt: string
 complete: boolean
 OnEditTodo: () => any
 OnDeleteTodo: () => any
}

export default function TodoComp({ txt, complete, OnEditTodo, OnDeleteTodo }: TodoCompProps) {
 return (
  <div className={`todo-comp ${complete ? 'complete' : ''}`}>
   <div className="col-1">
    <button className='checkbox' type='button' onClick={() => OnEditTodo()}>
     <img src={IconCheck} alt="checkbox icon" width={10} height={10} />
     {/* TODO: use svg */}
     {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" /></svg> */}
    </button>
    <div className="txt-container">
     <strong>{txt}</strong>
    </div>
   </div>

   <div className="col-2">
    <button type='button' onClick={() => OnDeleteTodo()}>
     <img src={IconDelete} alt="cross icon" width={19} height={19} />
    </button>
   </div>
  </div>
 )
}
