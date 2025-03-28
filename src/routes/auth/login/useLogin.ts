import {
  createForm,
  setError,
  SubmitHandler,
  zodForm,
} from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";
import { z } from "zod";

import { signIn } from "~/lib/auth_client";
import { useSetIsAuthenticated } from "~/store/auth/authStore";

const LoginSchema = z.object({
  email: z.string().email("Неверный формат email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

type LoginSchemaForm = z.infer<typeof LoginSchema>;

export const useLogin = () => {
  const setIsAuthenticated = useSetIsAuthenticated();
  const navigate = useNavigate();
  const [loginForm, { Field, Form }] = createForm<LoginSchemaForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodForm(LoginSchema),
    validateOn: "blur",
  });
  const handleSubmit: SubmitHandler<LoginSchemaForm> = async (values) => {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: ({ data: { token } }) => {
          document.cookie = `AUTH=${token}; path=/; max-age=604800; SameSite=Strict; ${
            window.location.protocol === "https:" ? "Secure" : ""
          }`;
          setIsAuthenticated(true);
          navigate("/");
        },
        onError: () => {
          setError(loginForm, "email", "Неверный email или пароль", {
            shouldActive: true,
          });
          setError(loginForm, "password", "Неверный email или пароль", {
            shouldActive: true,
          });
        },
      },
    );
  };
  return { Field, Form, handleSubmit };
};
