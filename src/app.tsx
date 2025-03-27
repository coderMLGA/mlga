import "./app.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

export default function App() {
  return (
    <Router
      base="/mlga/"
      root={(props) => {
        return (
          <Suspense>
            <main class="bg-accent h-full">{props.children}</main>
          </Suspense>
        );
      }}
    >
      <FileRoutes />
    </Router>
  );
}
