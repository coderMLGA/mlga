import { JSX, splitProps } from "solid-js";

type TextInputProps = {
  name: string;
  type: "text" | "email" | "tel" | "url" | "date";
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

export function FormField(props: TextInputProps) {
  const [, inputProps] = splitProps(props, ["value", "label", "error"]);
  return (
    <input
      {...inputProps}
      id={props.name}
      value={props.value || ""}
      aria-invalid={!!props.error}
      aria-errormessage={`${props.name}-error`}
      class={`input bg-primary-foreground w-full border border-gray-400 px-3 py-2 ${props.error ? "border-red-500" : ""}`}
    />
  );
}
