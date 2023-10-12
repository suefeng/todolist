import React from "react";
import { useTodoShow, useTodosUpdate } from "infrastructure/api/todos";
import { TodoForm } from "./TodoForm";
import {
  useCategoryJoinUpdate,
  useCategoryJoinCreation,
} from "infrastructure/api/category_joins";
import {
  useFrequencyJoinUpdate,
  useFrequencyJoinCreation,
} from "infrastructure/api/frequency_joins";
import {
  useDayJoinUpdate,
  useDayJoinCreation,
} from "infrastructure/api/day_joins";

const EditTodo = ({ todoId }: { todoId: string }) => {
  const { mutate: editTodo } = useTodosUpdate();
  const { mutate: editCategory } = useCategoryJoinUpdate();
  const { mutate: editFrequency } = useFrequencyJoinUpdate();
  const { mutate: editDays } = useDayJoinUpdate();
  const { mutate: createCategory } = useCategoryJoinCreation();
  const { mutate: createFrequency } = useFrequencyJoinCreation();
  const { mutate: createDay } = useDayJoinCreation();
  const {
    data: todoShow,
    isLoading: todoShowLoading,
    isFetching: todoShowFetching,
  } = useTodoShow(todoId);

  type TodoTypes = {
    categories: string;
    description: string;
    frequency: string;
    expiration: string;
    days: string;
  };
  const handleOnSubmit = (values: TodoTypes) => {
    editTodo({
      id: parseInt(todoId),
      expiration: values.expiration,
      description: values.description,
    });
    if (todoShow.categories[0]) {
      editCategory({
        todo_id: parseInt(todoId),
        category_id: parseInt(values.categories),
      });
    } else {
      createCategory({
        todo_id: parseInt(todoId),
        category_id: parseInt(values.categories),
      });
    }
    if (todoShow.frequency) {
      editFrequency({
        todo_id: parseInt(todoId),
        frequency_id: parseInt(values.frequency),
      });
    } else {
      createFrequency({
        todo_id: parseInt(todoId),
        frequency_id: parseInt(values.frequency),
      });
    }
    if (todoShow.days[0]) {
      editDays({
        todo_id: parseInt(todoId),
        day_id: parseInt(values.days),
      });
    } else {
      createDay({
        todo_id: parseInt(todoId),
        day_id: parseInt(values.days),
      });
    }
  };

  let description = "";
  let expiration = "";
  let categories = "";
  let frequency = "";
  let days = "";
  if (todoShowLoading || todoShowFetching) {
  } else {
    description = todoShow.description || "";
    expiration = todoShow.expiration || "";
    categories =
      todoShow.categories.length > 0 ? todoShow.categories[0].id : "";
    frequency =
      todoShow.frequency.length > 0 ? todoShow.frequency.id : "";
    days =
      todoShow.days.length > 0 ? todoShow.days[0].id : "";
  }

  const initialValues = {
    description: description,
    expiration: expiration,
    category: categories,
    frequency: frequency,
    days: days,
  };

  return todoShowLoading || todoShowFetching ? (
    <p>loading</p>
  ) : (
    <TodoForm
      initialValues={initialValues}
      handleOnSubmit={handleOnSubmit}
      buttonText="Edit todo"
    />
  );
};

export default EditTodo;
