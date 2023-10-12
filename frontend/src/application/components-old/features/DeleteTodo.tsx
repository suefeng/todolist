import React from 'react'
import { useTodosDestroy } from 'infrastructure/api/todos';
import Button from 'application/components/Button';

const DeleteTodo = ({ todoId }: { todoId: string }) => {
  const handleOnClick = (event:React.BaseSyntheticEvent) => {
    useTodosDestroy(todoId);
    event.target.parentNode.remove();
  }
  return <Button id="delete" onClick={handleOnClick}>Delete</Button>
}

export default DeleteTodo;