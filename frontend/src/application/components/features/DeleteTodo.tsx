import React from 'react'
import { useTodosDestroy } from 'infrastructure/api/todos';
import Button from 'application/components/Button';

const DeleteTodo = ({ todoId }: { todoId: number }) => {
  const handleOnClick = (event) => {
    useTodosDestroy(todoId);
    event.target.parentNode.remove();
  }
  return <Button onClick={handleOnClick}>Delete</Button>
}

export default DeleteTodo;