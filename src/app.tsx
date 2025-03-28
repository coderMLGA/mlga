import "./app.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";

export default function App() {
  return (
    <Router
      root={(props) => (
        <div class="flex h-full flex-col">
          <Header />

          <main class="flex-grow">
            <Suspense>{props.children}</Suspense>
          </main>

          <Footer />
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
