import { useParams } from "@solidjs/router";
import { createResource, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { fetchStreamerById, fetchStreamerStreams } from "~/api/streamers";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";

export default function ProfilePage() {
  const params = useParams();

  // Загрузка данных
  const [streamer] = createResource(
    () => params.id,
    async (id) => {
      const streamer = await fetchStreamerById(id);
      if (!streamer) throw new Error("Streamer not found");
      return streamer;
    },
  );

  const [streams] = createResource(
    () => params.id,
    async (id) => {
      return await fetchStreamerStreams(id);
    },
  );

  return (
    <div class="container mx-auto max-w-screen-2xl px-4 py-8">
      <div class="mb-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800/70">
        <div class="flex flex-col items-center gap-8 md:flex-row">
          <Avatar class="h-24 w-24 border-4 border-white shadow-xl">
            <AvatarImage src={streamer()?.avatar} />
            <AvatarFallback class="bg-blue-500 text-3xl text-white">
              {streamer()?.name[0]}
            </AvatarFallback>
          </Avatar>

          <div class="flex-1 text-center md:text-left">
            <h1 class="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-black text-transparent">
              {streamer()?.name}
            </h1>
            <p class="mb-6 text-xl text-gray-600 dark:text-gray-300">
              {streamer()?.bio}
            </p>

            <div class="flex justify-center gap-8 md:justify-start">
              <div>
                <span class="text-3xl font-bold text-blue-600">
                  {streamer()?.followers.toLocaleString()}
                </span>
                <span class="ml-2 text-base text-gray-500 dark:text-gray-400">
                  подписчиков
                </span>
              </div>
              <div>
                <span class="text-3xl font-bold text-blue-600">
                  {streamer()?.totalViews}
                </span>
                <span class="ml-2 text-base text-gray-500 dark:text-gray-400">
                  просмотров
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Список трансляций */}
      <h2 class="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-black text-transparent">
        Активные трансляции
      </h2>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <For each={streams()}>
          {(stream) => (
            <A
              href={`/stream/${stream.id}`}
              class="group transition-all hover:scale-105"
            >
              <Card class="h-full overflow-hidden rounded-2xl border-0 bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-gray-800/70 dark:hover:bg-gray-800/90">
                <div class="relative aspect-video">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    class="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div class="absolute bottom-3 left-3 rounded-full bg-red-500/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                    {stream.viewers} зрителей
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="line-clamp-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {stream.title}
                  </h3>
                </div>
              </Card>
            </A>
          )}
        </For>
      </div>

      {/* Стример не найден */}
      <Show when={!streamer.loading && !streamer()}>
        <div class="py-16 text-center">
          <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Стример не найден
          </h2>
          <A
            href="/"
            class="text-lg text-blue-600 hover:underline dark:text-blue-400"
          >
            Вернуться на главную
          </A>
        </div>
      </Show>
    </div>
  );
}
