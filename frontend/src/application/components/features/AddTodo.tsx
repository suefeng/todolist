import { Field } from 'formik';
import FormikForm from 'application/components/formik/FormikForm';
import Input from 'application/components/formik/Input';
import Textarea from 'application/components/formik/Textarea';
import Select from 'application/components/formik/Select';
import { todosValidations } from 'infrastructure/validationSchemas/Todo';
import { useTodosCreation } from 'infrastructure/api/todos';
import { useCategories } from 'infrastructure/api/categories';
import { useRepeatings } from 'infrastructure/api/repeatings';
import { useCategoryJoinCreation } from 'infrastructure/api/category_joins';
import { useRepeatingJoinCreation } from 'infrastructure/api/repeating_joins';

const AddTodo = ({ onTodoSave }: { onTodoSave: Function }) => {
  const { mutateAsync: createTodo } = useTodosCreation();
  const { mutateAsync: createCategory } = useCategoryJoinCreation();
  const { mutateAsync: createRepeating } = useRepeatingJoinCreation();
  const { data: categories, isLoading: loadingCategories, isFetching: fetchingCategories } = useCategories();
  const { data: repeatings, isLoading: loadingRepeatings, isFetching: fetchingRepeatings } = useRepeatings();

  const handleOnSubmit = async (values: Object) => {
    const todo = await createTodo({ description: values.description, expiration: values.expiration });
    await createCategory({ category_id: values.category, todo_id: todo.id });
    await createRepeating({ repeating_id: values.repeating, todo_id: todo.id });
    setTimeout(() => {
      onTodoSave();
    }, 1000)
  }

  return (
    <FormikForm
      validationSchema={todosValidations}
      initialValues={{ description: '', expiration: '', category: '', repeating: '' }}
      handleOnSubmit={handleOnSubmit}
      buttonText="Add todo"
    >
      {(errors?: object, touched?: object) => (
        <>
          <div>
            <Field
              id="description"
              name="description"
              touched={touched}
              errors={errors}
              as={Textarea}
            />
          </div>
          <div className="flex flex-row gap-3">
            <div className="my-3 flex-1">
              <Field
                id="expiration"
                name="expiration"
                touched={touched}
                errors={errors}
                as={Input}
                type="date"
              />
            </div>
            {loadingCategories && fetchingCategories ? 'loading' : (
              <div className="flex-1 my-3">
                <Field
                  touched={touched}
                  errors={errors}
                  as={Select}
                  id="category"
                  name="category"
                >
                  <option className="bg-white hover:bg-sky-400" value="">select</option>
                  {
                    categories.length > 0 ? categories.map((option: object) =>
                      <option className="bg-white hover:bg-sky-400" key={option.id} value={option.id}>{option.name}</option>
                    ) : 'loading'
                  }
                </Field>
              </div>
            )}
            {loadingRepeatings && fetchingRepeatings ? 'loading' : (
              <div className="flex-1 my-3">
                <Field
                  touched={touched}
                  errors={errors}
                  as={Select}
                  id="repeating"
                  name="repeating"
                >
                  <option className="bg-white hover:bg-sky-400" value="">select</option>
                  {
                    repeatings.length > 0 ? repeatings.map((option: object) =>
                      <option className="bg-white hover:bg-sky-400" key={option.id} value={option.id}>{option.name}</option>
                    ) : 'loading'
                  }
                </Field>
              </div>
            )}
          </div>
        </>
      )}
    </FormikForm>
  )
}

export default AddTodo;