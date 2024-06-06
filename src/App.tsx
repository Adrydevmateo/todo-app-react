import './App.css'
import TodoComp from './todo/Todo.comp'

import BgMobileDark from './assets/images/bg-mobile-dark.jpg'
import BgMobileLight from './assets/images/bg-mobile-light.jpg'
import BgDesktopDark from './assets/images/bg-desktop-dark.jpg'
import BgDesktopLight from './assets/images/bg-desktop-light.jpg'

import IconSun from './assets/icons/icon-sun.svg'
import IconMoon from './assets/icons/icon-moon.svg'
import { CreateTodo, DeleteTodo, EditTodo, GetAllTodo } from './todo/Todo'
import { FormEvent, useEffect, useState } from 'react'
import { TTodo } from './todo/Todo.types'

function App() {
 const [todoCollection, setTodoCollection] = useState<Array<TTodo>>([])

 useEffect(() => {
  setTodoCollection(() => GetAllTodo())
 }, [])

 const HandleFormSubmit = (e: FormEvent) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const todoValue = formData.get('todo') as string

  const newTodo = {
   id: crypto.randomUUID(),
   txt: todoValue,
   complete: false,
  }

  CreateTodo(newTodo)

  setTodoCollection(() => GetAllTodo())

  form.reset()
 }

 const HandleUpdateTodo = (todo: TTodo) => {
  EditTodo(todo.id, !todo.complete)
  setTodoCollection(() => GetAllTodo())
 }

 const HandleDeleteTodo = (id: string) => {
  DeleteTodo(id)
  setTodoCollection(() => GetAllTodo())
 }

 return (
  <>
   <header id='banner'>
    <img id='bg-mobile-light' src={BgMobileLight} alt="light background" width={375} height={200} />
    <img id='bg-mobile-dark' src={BgMobileDark} alt="dark background" width={375} height={200} loading='lazy' />
    <img id='bg-desktop-light' src={BgDesktopLight} alt="light background" width={1440} height={300} />
    <img id='bg-desktop-dark' src={BgDesktopDark} alt="dark background" width={1440} height={300} loading='lazy' />
   </header>

   <main>
    <div className="header">
     <h1>TODO</h1>
     <img id='icon-moon' src={IconMoon} alt="sun icon" />
     <img id='icon-sun' src={IconSun} alt="sun icon" loading='lazy' />
    </div>

    <form id="form" onSubmit={HandleFormSubmit}>
     <input type="text" name="todo" id="create-todo-input" />
    </form>

    <ol className='todo-list'>
     {todoCollection.map((todo, i) => (
      <li className='todo-container' key={i}>
       Complete: {`${todo.complete}`}
       <TodoComp txt={todo.txt} OnEditTodo={() => HandleUpdateTodo(todo)} OnDeleteTodo={() => HandleDeleteTodo(todo.id)} />
      </li>
     ))}
     <li className='todo-list-footer'>
      <strong>5 items left</strong>
      <strong>Clear Completed</strong>
     </li>
    </ol>

    <div className="controllers">
     <button type="button">All</button>
     <button type="button">Active</button>
     <button type="button">Completed</button>
    </div>
   </main>
  </>
 )
}

export default App