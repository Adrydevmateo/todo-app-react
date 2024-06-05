import { TTodo } from "./Todo.types";

// Create
export function CreateTodo(todo: TTodo): number {
 const allTodo = GetAllTodo()

 if (allTodo.length) {
  allTodo.push(todo)
  localStorage['allTodo'] = JSON.stringify(allTodo)
  return 0
 }

 localStorage['allTodo'] = JSON.stringify([todo])
 return 0
}

// Read
export function GetAllTodo(): Array<TTodo> {
 const data = localStorage['allTodo']
 if (!data) return []
 const allTodo = JSON.parse(data)
 return allTodo
}

// Update
export function EditTodo(id: string, complete: boolean): number {
 const allTodo = GetAllTodo()

 if (allTodo.length) {
  const todoFound = allTodo.find(f => f.id === id)
  if (!todoFound) return 1

  if (todoFound.complete === complete) return 1
  todoFound.complete = complete

  const newAllTodo = allTodo.filter(f => {
   if (f.id === todoFound.id) f.complete = todoFound.complete
   return f
  })

  localStorage['allTodo'] = JSON.stringify(newAllTodo)
  return 0
 }

 return 1
}

// Delete
export function DeleteTodo(id: string): number {
 const allTodo = GetAllTodo()

 if (allTodo.length) {
  const newAllTodo = allTodo.filter(todo => todo.id !== id)
  localStorage['allTodo'] = JSON.stringify(newAllTodo)
  return 0
 }

 return 1
}