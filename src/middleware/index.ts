import { createMiddleware } from "@solidjs/start/middleware";
import { getCookie } from "vinxi/http";

export default createMiddleware({
  onRequest: (event) => {
    const cookie = getCookie(event.nativeEvent, "AUTH");
    event.locals.isAuthenticated = Boolean(cookie);
  },
  //   onBeforeResponse: (event) => {
  //     const endTime = Date.now();
  //     const duration = endTime - event.locals.startTime;
  //     console.log(`Request took ${duration}ms`);
  //   },
});
