import React from 'react';
import Link from 'next/link';
import { URLS } from 'infrastructure/router/routes';
import { useTodos, useTodosUpdate } from 'infrastructure/api/todos';
import Accordion from 'application/components/Accordion'
import AddTodo from './AddTodo';
import DeleteTodo from './DeleteTodo';

const TodoList = ({ filter = '', type = '' }: { filter?: string, type?: string }) => {
  const {
    data: todos,
    isLoading: loading,
    isFetching: fetching,
    refetch,
  } = useTodos({ filter: filter, type: type });

  type TodoTypes = { categories?: object, description?: string, repeatings?: object, expiration?: string }

  const TodoLink = ({ filterOption, typeOption }: { filterOption: string, typeOption: string }) => (
    <Link href={URLS.todoFilter(filterOption, typeOption)}>{filterOption}</Link>
  )
  const mutation = useTodosUpdate();

  const handleOnChange = (event, todo) => {
    let todoStatus = todo.status
    if (todoStatus === 'completed') {
      todo.status = null;
      event.target.value = '';
      todoStatus = null;
    } else {
      todo.status = 'completed';
      event.target.value = 'completed';
      todoStatus = 'completed';
    }
    mutation.mutate({
      todo_id: todo.id,
      status: todoStatus
    })
  }

  return (
    <>
      <Accordion title="Add a task" className="mb-5">
        <AddTodo onTodoSave={refetch} />
      </Accordion>
      <ul>
        {loading || fetching ? 'loading' : todos ? todos.map((todo: TodoTypes) => (
          <li key={`todo-${todo.id}`} className="flex items-center px-4 bg-sky-100 m-1 w-full rounded-md hover:bg-sky-200 cursor-pointer">
            <span className="rounded-full flex justify-center w-7 h-7 hover:bg-white cursor-pointer">
              <input
                id={todo.description}
                type="checkbox"
                className="cursor-pointer"
                onChange={() => handleOnChange(event, todo)}
                checked={todo.status === 'completed'}
              />
            </span>
            <label htmlFor={todo.description} className="flex w-full py-3 px-4 justify-between cursor-pointer">
              <span>{todo.description}</span>
              <span className="flex gap-3 justify-end w-1/3">
                {todo.categories && todo.categories.map(
                  (category: { name: string; }) => <TodoLink key={category.name} filterOption={category.name} typeOption="category" />
                )}
                {todo.expiration && <TodoLink filterOption={todo.expiration} typeOption="expiration" />}
                {todo.repeatings && todo.repeatings.map(
                  (repeat: { name: string; }) => <TodoLink key={repeat.name} filterOption={repeat.name} typeOption="repeating" />
                )}
              </span>
            </label>
            <DeleteTodo todoId={todo.id} />
            <Link className="mx-3" href={URLS.todoEdit(todo.id)}>Edit</Link>
          </li>
        )) : <p>There are currently no todos in this category</p>}
      </ul>
    </>
  )
}

export default TodoList;