import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div class="w-full max-w-md space-y-6 rounded-xl bg-white p-8 text-center shadow-lg">
        <div class="text-9xl font-bold text-red-500">404</div>
        <h1 class="text-3xl font-bold text-gray-900">Страница не найдена</h1>
        <p class="text-gray-600">
          Похоже, вы пытаетесь получить доступ к странице, которой не
          существует.
        </p>

        <div class="pt-6">
          <div class="mt-4 flex justify-center space-x-4">
            <A
              href="/"
              class="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium text-white"
            >
              Главная
            </A>
          </div>
        </div>
      </div>
    </main>
  );
}
