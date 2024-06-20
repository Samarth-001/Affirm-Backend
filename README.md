# Affirm Integration Service

This repository contains a Node.js application that integrates with Affirm, a financial services company. The application uses Express.js to handle HTTP requests, Winston for logging, and Sentry for error tracking and performance monitoring.

## Table of Contents

- [Affirm Integration Service](#affirm-integration-service)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Logging](#logging)
  - [Error Tracking](#error-tracking)
  - [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed. You can download them from [Node.js official website](https://nodejs.org/).
- PostgreSQL installed and running. You can download it from [PostgreSQL official website](https://www.postgresql.org/).
- An Affirm account with access to API credentials.
- Sentry account for error tracking.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/affirm-integration.git
   cd affirm-integration
   ```
2. Install dependencies:

   ```sh
   npm install
   ```
## Configuration

1. Database Configuration:
   Update the PostgreSQL connection string in `logger.js` :

   ```sh
   new PostgresTransport({
    connectionString: 'postgres://username:password@localhost:5432/database_name',
    tableName: 'logs',
    level: 'info',
    maxsize: 10000000,
    maxFiles: 10
    })
    ```
2. Sentry Configuration:
   Update the Sentry DSN in `instrument.js` :

   ```sh
   Sentry.init({
   dsn: 'https://your-sentry-dsn@o4507459462234112.ingest.sentry.io/4507459473571840',
   integrations: [nodeProfilingIntegration()],
   tracesSampleRate: 1.0,
   profilesSampleRate: 1.0,
   });
   ```
3. Affirm API Configuration:
   Update the Affirm API URL and API key in `app.js` :

   ```sh
   const AFFIRM_API_URL = 'https://sandbox.affirm.com/api/v1/transactions';
   const AFFIRM_API_KEY = 'your-affirm-api-key';
   ```
