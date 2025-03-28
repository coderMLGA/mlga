import { A } from "@solidjs/router";
import { ParentComponent } from "solid-js";

const Footer: ParentComponent = (props) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="bg-primary text-primary-foreground">
      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between">
          <A href="/" class="mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="text-accent h-8 w-8"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span class="ml-2 text-2xl font-bold">MLGA</span>
          </A>
          <div class="flex justify-center">{props.children}</div>
          <div class="text-center text-sm md:text-right">
            <p>© {currentYear} MLGA</p>
            <p class="mt-1">Все права защищены</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
