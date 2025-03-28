import { StreamList } from "~/components/streamList";

export default function Home() {
  return (
    <section>
<div class="mt-5 text-center text-2xl font-bold text-red-500">В разработке</div>
<div class="text-center font-bold text-red-500">Открытие <span class="animate-pulse rounded bg-red-500 px-3 py-1 text-white">25 числа</span></div>
      <StreamList />
    </section>
  );
}
