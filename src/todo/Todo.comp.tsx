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
