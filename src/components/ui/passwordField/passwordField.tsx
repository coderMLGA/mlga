import { createSignal, JSX, Match, splitProps, Switch } from "solid-js";

export function ErrorMessage(props: { error: string }): JSX.Element {
  return <span class="text-[12px] text-red-500">{props.error}</span>;
}

type TextInputProps = {
  name: string;
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  // eslint-disable-next-line no-unused-vars
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

export function PasswordInput(props: TextInputProps): JSX.Element {
  const [showPassword, setShowPassword] = createSignal(false);
  const [, inputProps] = splitProps(props, ["value", "label", "error"]);
  return (
    <div class="relative">
      <input
        {...inputProps}
        type={showPassword() ? "text" : "password"}
        class={`input bg-primary-foreground w-full border border-gray-400 px-3 py-2 ${props.error ? "border-red-500" : ""}`}
        placeholder="Введите пароль"
        id={props.name}
      />
      <button
        aria-label={showPassword() ? "Скрыть пароль" : "Показать пароль"}
        type="button"
        class="absolute top-0 right-0 h-full px-3 py-2 text-gray-500"
        onClick={() => setShowPassword(!showPassword())}
      >
        <Switch>
          <Match when={showPassword()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" x2="22" y1="2" y2="22" />
            </svg>
          </Match>
          <Match when={!showPassword()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Match>
        </Switch>
      </button>
    </div>
  );
}
