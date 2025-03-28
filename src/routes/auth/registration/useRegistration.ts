import {
  createForm,
  setError,
  SubmitHandler,
  zodForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import z from "zod";

import { signUp } from "~/lib/auth_client";

export const useRegistration = () => {
  const [registerForm, { Form, Field }] = createForm<RegistrationSchemaForm>({
    validateOn: "blur",
    validate: zodForm(RegistrationSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<RegistrationSchemaForm> = async (
    values,
  ) => {
    await signUp.email(
      {
        email: values.email,
        password: values.password,
        name: "",
      },
      {
        onSuccess: () => {
          console.log("Registration successful");
          navigate("/auth/login");
        },
        onError: () => {
          setError(registerForm, "email", "Регистрируйте другой email", {
            shouldActive: true,
          });
        },
      },
    );
  };
  return {
    Form,
    Field,
    handleSubmit,
  };
};

const RegistrationSchema = z
  .object({
    email: z.string().email("Неверный формат email"),
    password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
    confirmPassword: z
      .string()
      .min(8, "Пароль должен быть не менее 8 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegistrationSchemaForm = z.infer<typeof RegistrationSchema>;
