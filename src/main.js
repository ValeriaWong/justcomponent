import { createApp } from 'vue'
import App from './App.vue'
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://1ff5d9d5fc5943c4b7108e985199e6e4@o1343302.ingest.sentry.io/6617956",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
createApp(App).mount('#app')
