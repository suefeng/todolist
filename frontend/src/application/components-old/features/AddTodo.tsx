import { useTodosCreation } from "infrastructure/api/todos";
import { useCategoryJoinCreation } from "infrastructure/api/category_joins";
import { useFrequencyJoinCreation } from "infrastructure/api/frequency_joins";
import { useDayJoinCreation } from "infrastructure/api/day_joins";
import { Todo } from "domain/entities/Todo";
import { TodoForm } from "./TodoForm";

const AddTodo = ({ onTodoSave }: { onTodoSave: Function }) => {
  const { mutateAsync: createTodo } = useTodosCreation();
  const { mutateAsync: createCategory } = useCategoryJoinCreation();
  const { mutateAsync: createFrequency } = useFrequencyJoinCreation();
  const { mutateAsync: createDay } = useDayJoinCreation();

  const handleOnSubmit = async (values: Todo) => {
    const todo = await createTodo({
      description: values.description,
      expiration: values.expiration,
    });
    await createCategory({ category_id: values.category, todo_id: todo.id });
    await createFrequency({ frequency_id: values.frequency, todo_id: todo.id });
    await createDay({ day_id: values.day, todo_id: todo.id });
    setTimeout(() => {
      onTodoSave();
    }, 1000);
  };

  const initialValues = {
    description: "",
    expiration: "",
    category: "",
    frequency: "",
    day: "",
  };

  return (
    <TodoForm
      initialValues={initialValues}
      handleOnSubmit={handleOnSubmit}
      buttonText="Create todo"
    />
  );
};

export default AddTodo;
