// instrument.js

const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

Sentry.init({
  dsn: 'https://b9c05893f95a79d4752629be96738d0e@o4507459462234112.ingest.us.sentry.io/4507459473571840',
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

module.exports = Sentry;
