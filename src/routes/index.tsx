export default function Home() {
  return (
    <section class="container mx-auto flex h-full flex-col items-center justify-center space-y-1">
      <h1 class="text-4xl font-bold text-red-700">
        Проект закрыт{" "}
        <span class="animate-pulse rounded-sm bg-red-700 px-2 py-1 text-white">
          25 числа
        </span>
      </h1>
      <h3 class="text-muted-foreground text-base text-pretty">
        Вы держитесь здесь, вам всего доброго, хорошего настроения и здоровья.
      </h3>
    </section>
  );
}
