import './App.css'
import TodoComp from './todo/Todo.comp'

import BgMobileDark from './assets/images/bg-mobile-dark.jpg'
import BgMobileLight from './assets/images/bg-mobile-light.jpg'
import BgDesktopDark from './assets/images/bg-desktop-dark.jpg'
import BgDesktopLight from './assets/images/bg-desktop-light.jpg'

import IconSun from './assets/icons/icon-sun.svg'
import IconMoon from './assets/icons/icon-moon.svg'

import { CreateTodo, DeleteAllCompletedTodo, DeleteTodo, EditTodo, GetAllTodo } from './todo/Todo'
import { FormEvent, useEffect, useState } from 'react'
import { TSortedBy, TTodo } from './todo/Todo.types'

function App() {
 const [sortedBy, setSortedBy] = useState<TSortedBy>('all')
 const [todoCollection, setTodoCollection] = useState<Array<TTodo>>([])
 const [showWholeList, setShowWholeList] = useState(false)
 const [totalTodoMsg, setTotalTodoMsg] = useState('Nothing to do')
 const [seeMsg, setSeeMsg] = useState('See more')

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

 const HandleClearCompleted = () => {
  DeleteAllCompletedTodo()
  SortingLogic()
 }

 const SetColorScheme = (scheme: 'white' | 'dark') => {
  if (scheme === 'white') document.body.classList.remove('color-scheme-dark')
  else document.body.classList.add('color-scheme-dark')
 }

 const ToggleShowWholeList = () => {
  setShowWholeList(() => {
   const newShowWholeListValue = !showWholeList
   if (newShowWholeListValue) setSeeMsg(() => 'See Less')
   else setSeeMsg(() => 'See More')
   return newShowWholeListValue
  })

  setTimeout(() => {
   if (!showWholeList) Scroll({ to: 'bottom' })
  }, 100);
 }

 interface IScroll {
  to: 'top' | 'bottom',
  behavior?: 'auto' | 'instant' | 'smooth'
 }

 const Scroll = (scroll: IScroll) => {
  let to = (scroll.to === 'bottom') ? document.body.scrollHeight : 0
  window.scrollTo({ top: to, behavior: scroll.behavior || 'smooth' })
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

    <ol id='todo-list' className={showWholeList ? 'show-whole-list' : ''}>
     <div id='todo-list-vertical-scroll-container'>
      {todoCollection.map((todo, i) => (
       <li className='todo-list-item' key={i}>
        <TodoComp txt={todo.txt} complete={todo.complete} OnEditTodo={() => HandleUpdateTodo(todo)} OnDeleteTodo={() => HandleDeleteTodo(todo.id)} />
       </li>
      ))}
     </div>
     <li className='todo-list-footer'>
      <strong>{totalTodoMsg}</strong>
      <button type='button' onClick={() => HandleClearCompleted()}><b>Clear Completed</b></button>
     </li>
    </ol>

    <div className="controllers">
     <button className={`${sortedBy === 'all' ? 'active' : ''}`} type="button" onClick={() => HandleSortBy('all')}><b>All</b></button>
     <button className={`${sortedBy === 'incomplete' ? 'active' : ''}`} type="button" onClick={() => HandleSortBy('incomplete')}><b>Active</b></button>
     <button className={`${sortedBy === 'complete' ? 'active' : ''}`} type="button" onClick={() => HandleSortBy('complete')}><b>Completed</b></button>
    </div>

    <div id='show-whole-list-container' className="show-whole-list">
     <button type='button' onClick={() => ToggleShowWholeList()}>{seeMsg}</button>
    </div>
   </main>
   <button type='button' id='btn-go-top' className={showWholeList ? 'show-scroll-btn' : ''} onClick={() => Scroll({ to: 'top' })}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11 11.8V15q0 .425.288.713T12 16t.713-.288T13 15v-3.2l.9.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7l-2.6-2.6q-.3-.3-.7-.3t-.7.3l-2.6 2.6q-.275.275-.275.7t.275.7t.7.275t.7-.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
   </button>
   <button type='button' id='btn-go-bottom' className={showWholeList ? 'show-scroll-btn' : ''} onClick={() => Scroll({ to: 'bottom' })}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m11 12.2l-.9-.9q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.6 2.6q.3.3.7.3t.7-.3l2.6-2.6q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275l-.9.9V9q0-.425-.288-.712T12 8t-.712.288T11 9zm1 9.8q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
   </button>
  </>
 )
}

export default App