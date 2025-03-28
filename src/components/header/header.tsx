import { A } from "@solidjs/router";
import { createEffect, createSignal, onMount, Show } from "solid-js";

import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { useHeader } from "./useHeader";

export const Header = () => {
  const [isDark, setIsDark] = createSignal(false);

  // Применяем тему при загрузке
  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
  });

  // Обновляем класс при изменении темы
  createEffect(() => {
    document.documentElement.classList.toggle("dark", isDark());
    localStorage.setItem("theme", isDark() ? "dark" : "light");
  });
  const { handleLogout, isAuth } = useHeader();

  return (
    <header class="bg-background sticky top-0 z-50 w-full border-b backdrop-blur">
      <div class="container mx-auto flex h-14 items-center">
        {/* Логотип и название */}
        <div class="mr-4 flex">
          <A href="/" class="mr-6 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-6 w-6 fill-red-500 text-red-500"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span class="hidden font-bold sm:inline-block">MLGA</span>
          </A>
        </div>

        <div class="flex flex-1 items-center justify-end space-x-4">
          <Show when={isAuth()} fallback={<div>Не авторизован</div>}>
            <div>Авторизован</div>
          </Show>

          <ul class="flex items-center gap-2">
            <li>
              <Toggle pressed={isDark()} onChange={() => setIsDark(!isDark())}>
                {() => {
                  return (
                    <Show
                      when={isDark()}
                      fallback={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="h-5 w-5"
                        >
                          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                        </svg>
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-5 w-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Show>
                  );
                }}
              </Toggle>
            </li>
            <Show when={isAuth()}>
              <li>
                <Button as={A} href="/profile" size="sm">
                  Профиль
                </Button>
              </li>
            </Show>
            <Show when={!isAuth()}>
              <li>
                <Button as={A} href="/auth/login" size="sm">
                  Войти
                </Button>
              </li>
              <li>
                <Button
                  as={A}
                  href="/auth/registration"
                  variant="secondary"
                  size="sm"
                >
                  Регистрация
                </Button>
              </li>
            </Show>
            <Show when={isAuth()}>
              <Button
                onClick={handleLogout}
                as="li"
                size="sm"
                variant="destructive"
              >
                Выход
              </Button>
            </Show>
          </ul>
        </div>
      </div>
    </header>
  );
};
