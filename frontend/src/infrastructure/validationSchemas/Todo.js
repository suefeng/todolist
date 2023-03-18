import * as Yup from "yup";

export const todosValidations = Yup.object({
  description: Yup.string().required("A description is required"),
});
