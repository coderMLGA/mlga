import { useParams } from "@solidjs/router";
import { createResource, For, createSignal } from "solid-js";
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
    <div class="container mx-auto h-full px-4 py-8">
      <div class="flex h-full grid-cols-1 flex-col gap-3 md:grid md:grid-cols-3">
        {/* Основной контент */}
        <div
          class={`relative col-span-2 w-full space-y-3 overflow-hidden transition-all duration-300`}
        >
          {/* Видео-плеер */}
          <div class="aspect-video w-full overflow-hidden rounded-2xl">
            <img
              src={stream()?.thumbnail}
              alt={stream()?.title}
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Collapse toggle button */}
          <div class="flex justify-between">
            <Badge variant={"error"}>
              {stream()?.viewers.toLocaleString()} зрителей онлайн
            </Badge>
            <Button
              onClick={() => setIsCollapsed(!isCollapsed())}
              variant={"secondary"}
              class="min-w-[200px]"
            >
              {isCollapsed() ? (
                <span class="text-sm font-medium">Свернуть информацию</span>
              ) : (
                <span class="text-sm font-medium">Развернуть информацию</span>
              )}
            </Button>
          </div>
          {/* Информация о стриме - only shown when not collapsed */}
          <div class="flex justify-center">
            <div
              class={`absolute top-0 w-[calc(100%-1rem)] space-y-2 rounded-xl bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out sm:w-[calc(100%-2rem)] sm:space-y-3 sm:rounded-2xl sm:p-6 dark:bg-gray-800/70 ${
                isCollapsed()
                  ? "translate-y-[10px] sm:translate-y-[15px]"
                  : "-translate-y-full"
              } max-h-[250px] overflow-y-scroll`}
            >
              <h1 class="text-primary text-base font-black sm:text-xl md:text-2xl">
                {stream()?.title}
              </h1>

              <A
                class="group flex items-center space-x-2 sm:space-x-4"
                href={`/profile/${stream()?.id}`}
              >
                <Avatar class="h-10 w-10 border-2 border-white shadow-md sm:h-12 sm:w-12 md:h-14 md:w-14">
                  <AvatarImage src={stream()?.streamer.avatar} />
                  <AvatarFallback>{stream()?.streamer.name[0]}</AvatarFallback>
                </Avatar>

                <p class="text-xs sm:text-base">{stream()?.streamer.name}</p>
              </A>

              <div class="flex flex-wrap justify-end gap-1 sm:gap-2">
                <For each={stream()?.tags}>
                  {(tag) => (
                    <Badge variant="success" class="text-xs sm:text-sm">
                      {tag}
                    </Badge>
                  )}
                </For>
              </div>
            </div>
          </div>
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
    </div>
  );
}
