import { A } from "@solidjs/router";

import { Button } from "~/components/ui/button";
import { FormField } from "~/components/ui/formFields/formFields";
import {
  ErrorMessage,
  PasswordInput,
} from "~/components/ui/passwordField/passwordField";

import { useLogin } from "./useLogin";

export default function LoginPage() {
  const { Field, Form, handleSubmit } = useLogin();
  return (
    <div class="flex h-full items-center justify-center bg-gray-100/40 px-4 py-12">
      <div class="w-full max-w-md rounded-lg border bg-white p-5 shadow">
        <div class="space-y-1 p-6">
          <div class="mb-4 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="fill-primary h-10 w-10"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <h3 class="text-center text-2xl font-bold">Вход в аккаунт</h3>
          <p class="text-center text-sm text-gray-500">
            Введите данные для входа на MLGA
          </p>
        </div>
        <fieldset>
          <Form class="space-y-2" onSubmit={handleSubmit}>
            <Field name="email">
              {(field, props) => (
                <>
                  <div class="flex justify-between">
                    <label for="email">Email</label>
                    <ErrorMessage error={field.error} />
                  </div>
                  <FormField
                    {...props}
                    value={field.value}
                    error={field.error}
                    type="email"
                    placeholder="Введите email"
                  />
                </>
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <>
                  <div class="flex justify-between">
                    <label for="password">Пароль</label>
                    <ErrorMessage error={field.error} />
                  </div>
                  <PasswordInput
                    {...props}
                    value={field.value}
                    error={field.error}
                    type="password"
                  />
                </>
              )}
            </Field>
            <A
              href="#"
              class="text-primary block text-right text-sm hover:underline"
            >
              Забыли пароль?
            </A>
            <Button class="mt-[27px] w-full" type="submit">
              Войти
            </Button>
          </Form>
        </fieldset>
        <div class="mt-4 p-6 text-center text-sm">
          <p class="text-gray-500">
            Нет аккаунта?{" "}
            <A href="/auth/registration" class="text-primary hover:underline">
              Зарегистрироваться
            </A>
          </p>
        </div>
      </div>
    </div>
  );
}
