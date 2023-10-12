import React from "react";
import { Field } from "formik";
import FormikForm from "application/components/form/FormikForm";
import Input from "application/components/formik/Input";
import Textarea from "application/components/formik/Textarea";
import Select from "application/components/formik/Select";
import { todosValidations } from "infrastructure/validationSchemas/Todo";
import { useCategories } from "infrastructure/api/categories";
import { useFrequencies } from "infrastructure/api/frequencies";
import { useDays } from "infrastructure/api/days";
import { Category } from "domain/entities/Category";
import { Frequency } from "domain/entities/Frequency";
import { Day } from "domain/entities/Day";

type Props = {
  buttonText: string;
  initialValues: Object;
  handleOnSubmit: Function;
};

export const TodoForm = ({
  buttonText,
  initialValues,
  handleOnSubmit,
}: Props) => {
  const {
    data: categories,
    isLoading: loadingCategories,
    isFetching: fetchingCategories,
  } = useCategories();
  const {
    data: frequencies,
    isLoading: loadingFrequencys,
    isFetching: fetchingFrequencys,
  } = useFrequencies();
  const {
    data: days,
    isLoading: loadingDays,
    isFetching: fetchingDays,
  } = useDays();

  return (
    <FormikForm
      validationSchema={todosValidations}
      initialValues={initialValues}
      handleOnSubmit={handleOnSubmit}
      buttonText={buttonText}
    >
      {(errors?: object, touched?: object) => (
        <>
          <div>
            <Field
              id="description"
              name="description"
              labelText="description"
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
                labelText="expiration"
                touched={touched}
                errors={errors}
                as={Input}
                type="date"
              />
            </div>
            {loadingCategories && fetchingCategories ? (
              "loading"
            ) : (
              <div className="flex-1 my-3">
                <Field
                  touched={touched}
                  errors={errors}
                  as={Select}
                  id="category"
                  name="category"
                  labelText="categories"
                >
                  <option className="bg-white hover:bg-sky-400" value="">
                    select a category
                  </option>
                  {categories.length > 0
                    ? categories.map((option: Category) => (
                        <option
                          className="bg-white hover:bg-sky-400"
                          key={option.id}
                          value={option.id}
                        >
                          {option.name}
                        </option>
                      ))
                    : "loading"}
                </Field>
              </div>
            )}
            {loadingFrequencys && fetchingFrequencys ? (
              "loading"
            ) : (
              <div className="flex-1 my-3">
                <Field
                  touched={touched}
                  errors={errors}
                  as={Select}
                  id="frequency"
                  name="frequency"
                  labelText="frequency"
                >
                  <option className="bg-white hover:bg-sky-400" value="">
                    select a frequency
                  </option>
                  {frequencies.length > 0
                    ? frequencies.map((option: Frequency) => (
                        <option
                          className="bg-white hover:bg-sky-400"
                          key={option.id}
                          value={option.id}
                        >
                          {option.name}
                        </option>
                      ))
                    : "loading"}
                </Field>
              </div>
            )}
            {loadingDays && fetchingDays ? (
              "loading"
            ) : (
              <div className="flex-1 my-3">
                <Field
                  touched={touched}
                  errors={errors}
                  as={Select}
                  id="days"
                  name="days"
                  labelText="days"
                >
                  <option className="bg-white hover:bg-sky-400" value="">
                    select a day
                  </option>
                  {days.length > 0
                    ? days.map((option: Day) => (
                        <option
                          className="bg-white hover:bg-sky-400"
                          key={option.id}
                          value={option.id}
                        >
                          {option.name}
                        </option>
                      ))
                    : "loading"}
                </Field>
              </div>
            )}
          </div>
        </>
      )}
    </FormikForm>
  );
};
