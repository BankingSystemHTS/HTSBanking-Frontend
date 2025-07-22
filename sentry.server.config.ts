// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handlesa request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { nodeProfilingIntegration } = require("@sentry/profiling-node");


import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://e588daea38fa86fdcce62713824da169@o4509713861705728.ingest.us.sentry.io/4509713865179139",
  integrations: [nodeProfilingIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  profileSessionSampleRate: 1.0,
  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: "trace",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  
});
// Profiling happens automatically after setting it up with `Sentry.init()`.
// All spans (unless those discarded by sampling) will have profiling data attached to them.
Sentry.startSpan({
  name: "My Span",
}, () => {
  // The code executed here will be profiled
});