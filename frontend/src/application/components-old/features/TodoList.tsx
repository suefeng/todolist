import React from "react";
import Link from "next/link";
import { URLS } from "infrastructure/router/routes";
import { useTodos, useTodosUpdate } from "infrastructure/api/todos";
import Accordion from "application/components/Accordion";
import AddTodo from "./AddTodo";
import DeleteTodo from "./DeleteTodo";
import { TodoDetails } from "./TodoDetails";
import { Todo } from "domain/entities/Todo";

const TodoList = ({
  filter = "",
  type = "",
}: {
  filter?: string;
  type?: string;
}) => {
  const {
    data: todos,
    isLoading: loading,
    isFetching: fetching,
    refetch,
  } = useTodos({ filter: filter, type: type });

  const TodoLink = ({
    filterOption,
    typeOption,
  }: {
    filterOption: string;
    typeOption: string;
  }) => (
    <Link href={URLS.todoFilter(filterOption, typeOption)}>{filterOption}</Link>
  );
  const {mutate: updateTodo} = useTodosUpdate();

  const handleOnChange = (event:MouseEvent, todo:Todo) => {
    let todoStatus = todo.status;
    if (todoStatus === "completed") {
      todo.status = null;
      event.target.value = "";
      todoStatus = null;
    } else {
      todo.status = "completed";
      event.target.value = "completed";
      todoStatus = "completed";
    }
    updateTodo({
      id: todo.id,
      status: todoStatus,
    });
  };

  return (
    <>
      <Accordion title="Add a task" className="mb-5">
        <AddTodo onTodoSave={refetch} />
      </Accordion>
      <ul>
        {loading || fetching ? (
          "loading"
        ) : todos ? (
          todos.map((todo: Todo) => {
            const bgColor = todo.status === 'completed' ? '' : 'bg-sky-100';

            return (
              <li
                key={`todo-${todo.id}`}
                className={`flex items-center gap-3 px-2 ${bgColor} my-1 w-full cursor-pointer rounded-md hover:bg-sky-200`}
              >
                <span className="flex h-7 w-7 cursor-pointer justify-center rounded-full transition duration-300 hover:bg-white">
                  <input
                    id={todo.description}
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => handleOnChange(event, todo)}
                    checked={todo.status === "completed"}
                  />
                </span>
                <TodoDetails
                  status={todo.status}
                  description={todo.description}
                  expiration={todo.expiration}
                  categories={todo.categories}
                  frequency={todo.frequency}
                  days={todo.days}
                  note={todo.note}
                />
                <DeleteTodo todoId={todo.id} />
                <Link className="mx-3" href={URLS.todoEdit(todo.id)}>
                  Edit
                </Link>
              </li>
            )
          })
        ) : (
          <p>There are currently no todos in this category</p>
        )}
      </ul>
    </>
  );
};

export default TodoList;
