import { useParams } from "@solidjs/router";
import { createResource, Show, For, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { fetchStreamById } from "~/api/streams";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default function StreamViewPage() {
  const params = useParams();
  const [stream] = createResource(() => params.id, fetchStreamById);
  const [isCollapsed, setIsCollapsed] = createSignal(false);

  return (
    <div class="container mx-auto h-full max-w-screen-2xl px-4 py-8">
      <Show
        when={!stream.loading}
        fallback={
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div class="space-y-6 lg:col-span-3">
              <div class="aspect-video w-full animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"></div>
              <div class="space-y-4">
                <div class="h-10 w-3/4 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"></div>
                <div class="flex items-center space-x-4">
                  <div class="h-14 w-14 animate-pulse rounded-full bg-gray-100 dark:bg-gray-800"></div>
                  <div class="space-y-2">
                    <div class="h-5 w-40 animate-pulse rounded-md bg-gray-100 dark:bg-gray-800"></div>
                    <div class="h-4 w-32 animate-pulse rounded-md bg-gray-100 dark:bg-gray-800"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:col-span-1">
              <div class="h-full animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"></div>
            </div>
          </div>
        }
      >
        <Show
          when={stream()}
          fallback={
            <div class="py-16 text-center">
              <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                Трансляция не найдена
              </h2>
              <A
                href="/streams"
                class="text-lg text-blue-600 hover:underline dark:text-blue-400"
              >
                Вернуться к списку трансляций
              </A>
            </div>
          }
        >
          {(s) => (
            <div class="flex h-full grid-cols-1 flex-col gap-3 sm:grid sm:grid-cols-3">
              {/* Основной контент */}
              <div
                class={`col-span-2 w-full space-y-8 transition-all duration-300`}
              >
                {/* Видео-плеер */}
                <div class="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={s().thumbnail}
                    alt={s().title}
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div class="absolute bottom-4 left-4 rounded-full bg-red-500/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                    {s().viewers.toLocaleString()} зрителей онлайн
                  </div>
                </div>

                {/* Collapse toggle button */}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed())}
                  class="flex w-full items-center justify-center rounded-lg bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  {isCollapsed() ? (
                    <span class="text-sm font-medium">
                      Развернуть информацию
                    </span>
                  ) : (
                    <span class="text-sm font-medium">Свернуть информацию</span>
                  )}
                </button>

                {/* Информация о стриме - only shown when not collapsed */}
                <Show when={!isCollapsed()}>
                  <div class="space-y-3 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800/70">
                    <h1 class="text-primary text-4xl font-black">
                      {s().title}
                    </h1>

                    <A
                      class="group flex items-center space-x-4"
                      href={`/profile/${s().id}`}
                    >
                      <Avatar class="h-14 w-14 border-2 border-white shadow-md">
                        <AvatarImage src={s().streamer.avatar} />
                        <AvatarFallback class="bg-blue-500 text-white">
                          {s().streamer.name[0]}
                        </AvatarFallback>
                      </Avatar>

                      <p class="text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {s().streamer.name}
                      </p>
                    </A>

                    <div class="flex flex-wrap gap-2">
                      <For each={s().tags}>
                        {(tag) => <Badge variant="success">{tag}</Badge>}
                      </For>
                    </div>
                  </div>
                </Show>
              </div>

              {/* Боковая панель */}
              <div class="col-span-1 w-full grow space-y-8">
                {/* Чат */}
                <div class="flex h-full flex-col rounded-2xl bg-white shadow-lg dark:bg-gray-800/70">
                  {/* Сообщения чата */}
                  <div class="flex-1 space-y-4 overflow-y-auto p-4">
                    <div class="flex items-start space-x-4">
                      <div class="h-10 w-10 rounded-full bg-purple-500"></div>
                      <div>
                        <p class="text-base font-bold text-gray-900 dark:text-white">
                          Streamer
                        </p>
                        <p class="mt-1 rounded-lg bg-gray-100 p-3 text-base dark:bg-gray-700 dark:text-gray-200">
                          Добро пожаловать на стрим!
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-4">
                      <div class="h-10 w-10 rounded-full bg-blue-500"></div>
                      <div>
                        <p class="text-base font-bold text-gray-900 dark:text-white">
                          Viewer123
                        </p>
                        <p class="mt-1 rounded-lg bg-gray-100 p-3 text-base dark:bg-gray-700 dark:text-gray-200">
                          Отличный стрим!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Поле ввода сообщения */}
                  <div class="border-t p-4 dark:border-gray-700">
                    <div class="flex flex-col gap-2">
                      <textarea
                        rows={3}
                        placeholder="Написать сообщение..."
                        class="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      />
                      <Button>Отправить</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Show>
      </Show>
    </div>
  );
}
