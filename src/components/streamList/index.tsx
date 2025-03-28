import { For, Show, createResource } from "solid-js";
import { A } from "@solidjs/router";
import { fetchStreams } from "~/api/streams";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

export const StreamList = () => {
  const [streams] = createResource(fetchStreams);

  return (
    <div class="container mx-auto max-w-screen-2xl px-4 py-8">
      <section class="mb-12 text-center">
        <h1 class="text-primary mb-4 text-5xl">Make Livacha Great Again</h1>
        <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          Откройте для себя захватывающие трансляции от талантливых стримеров
        </p>
      </section>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <For each={streams()}>
          {(stream, index) => (
            <A
              href={`/stream/${stream.id}`}
              class="group transition-all hover:scale-105"
            >
              <Card class="flex h-full flex-col overflow-hidden rounded-2xl border-0 bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-gray-800/70 dark:hover:bg-gray-800/90">
                <div class="relative">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    class="h-56 w-full object-cover transition-transform group-hover:scale-110"
                    loading={index() < 4 ? "eager" : "lazy"}
                  />
                  <div class="absolute bottom-3 left-3 rounded-full bg-red-500/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                    {stream.viewers.toLocaleString()} зрителей
                  </div>
                </div>
                <CardHeader class="grow p-2">
                  <div class="flex items-start space-x-4">
                    <Avatar class="h-12 w-12 border-2 border-white shadow-md">
                      <AvatarImage src={stream.streamer.avatar} />
                      <AvatarFallback class="bg-blue-500 text-white">
                        {stream.streamer.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div class="flex-1">
                      <p class="text-base text-gray-500 dark:text-gray-300">
                        {stream.streamer.name}
                      </p>
                      <h3 class="line-clamp-2 text-base font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {stream.title}
                      </h3>
                    </div>
                  </div>
                </CardHeader>
                <CardContent class="p-5 pt-0">
                  <div class="flex flex-wrap items-center justify-end gap-2">
                    <For each={stream.tags.slice(0, 5)}>
                      {(tag) => <Badge variant="success">{tag}</Badge>}
                    </For>
                  </div>
                </CardContent>
              </Card>
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
