import "./app.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

export default function App() {
  return (
    <Router
      base="/mlga"
      root={(props) => (
        <div class="bg-muted flex h-full flex-col">
          <main class="flex-grow">
            <Suspense>{props.children}</Suspense>
          </main>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
