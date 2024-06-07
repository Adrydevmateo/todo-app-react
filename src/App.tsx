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
import { TSortedBy, TTodo } from './todo/Todo.types'

function App() {
 const [sortedBy, setSortedBy] = useState<TSortedBy>('all')
 const [todoCollection, setTodoCollection] = useState<Array<TTodo>>([])
 const [totalTodoMsg, setTotalTodoMsg] = useState('Nothing to do')

 useEffect(() => {
  SortingLogic()
 }, [sortedBy])

 function SortingLogic() {
  const allTodoCollection = GetAllTodo()
  if (sortedBy === 'all') {
   const allTodoCollectionLength = allTodoCollection.length
   setTotalTodoMsg(() => allTodoCollectionLength ? `${allTodoCollectionLength} tasks` : 'Nothing to do')
   setTodoCollection(() => allTodoCollection)
   return
  }

  const incompleteTodoCollection = allTodoCollection.filter(f => f.complete === false)
  if (sortedBy === 'incomplete') {
   const incompleteTodoCollectionLength = incompleteTodoCollection.length
   setTotalTodoMsg(() => incompleteTodoCollectionLength ? `${incompleteTodoCollectionLength} incomplete` : 'Nothing to do')
   setTodoCollection(() => incompleteTodoCollection)
   return
  }

  const completeTodoCollection = allTodoCollection.filter(f => f.complete === true)
  if (sortedBy === 'complete') {
   const completeTodoCollectionLength = completeTodoCollection.length
   setTotalTodoMsg(() => completeTodoCollectionLength ? `${completeTodoCollectionLength} completed` : 'Nothing completed')
   setTodoCollection(() => completeTodoCollection)
   return
  }
 }

 const HandleSortBy = (sorted: TSortedBy) => {
  setSortedBy(() => sorted)
 }

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

  SortingLogic()

  form.reset()
 }

 const HandleUpdateTodo = (todo: TTodo) => {
  EditTodo(todo.id, !todo.complete)
  SortingLogic()
 }

 const HandleDeleteTodo = (id: string) => {
  DeleteTodo(id)
  SortingLogic()
 }

 const SetColorScheme = (scheme: 'white' | 'dark') => {
  if (scheme === 'white') document.body.classList.remove('color-scheme-dark')
  else document.body.classList.add('color-scheme-dark')
 }

 return (
  <>
   <header>
    <img id='bg-mobile-light' src={BgMobileLight} alt="light background" width={375} height={200} />
    <img id='bg-mobile-dark' src={BgMobileDark} alt="dark background" width={375} height={200} loading='lazy' />
    <img id='bg-desktop-light' src={BgDesktopLight} alt="light background" width={1440} height={300} />
    <img id='bg-desktop-dark' src={BgDesktopDark} alt="dark background" width={1440} height={300} loading='lazy' />
   </header>

   <main>
    <div className="heading-box">
     <h1>TODO</h1>
     <img id='icon-moon' src={IconMoon} alt="sun icon" onClick={() => SetColorScheme('dark')} />
     <img id='icon-sun' src={IconSun} alt="sun icon" loading='lazy' onClick={() => SetColorScheme('white')} />
    </div>

    <form id="main-form" onSubmit={HandleFormSubmit}>
     <input type="text" name="todo" id="create-todo-input" placeholder='Create a new todo...' />
    </form>

    {/* TODO: Add vertical scroll to see the to-do */}
    <ol id='todo-list'>
     {todoCollection.map((todo, i) => (
      <li className='todo-list-item' key={i}>
       <TodoComp txt={todo.txt} complete={todo.complete} OnEditTodo={() => HandleUpdateTodo(todo)} OnDeleteTodo={() => HandleDeleteTodo(todo.id)} />
      </li>
     ))}
     <li className='todo-list-footer'>
      <strong>{totalTodoMsg}</strong>
      <button type='button'><b>Clear Completed</b></button>
     </li>
    </ol>

    <div className="controllers">
     <button className={`${sortedBy === 'all' ? 'active' : ''}`} type="button" onClick={() => HandleSortBy('all')}><b>All</b></button>
     <button className={`${sortedBy === 'incomplete' ? 'active' : ''}`} type="button" onClick={() => HandleSortBy('incomplete')}><b>Active</b></button>
     <button className={`${sortedBy === 'complete' ? 'active' : ''}`} type="button" onClick={() => HandleSortBy('complete')}><b>Completed</b></button>
    </div>
   </main>
  </>
 )
}

export default App