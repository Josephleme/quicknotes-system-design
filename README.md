# QuickNotes System Design & Client Manager

An enterprise-ready system architecture plan and client manager designed to transition the QuickNotes platform from a browser-bound sandbox tool into a distributed production system supporting 1 million users.

## How to Run the API Client Local Application

Follow these steps to run the application locally:
- 1. Clone https://github.com/Josephleme/quicknotes-system-design into your computer using your terminal tools (cmd or bash).
- 2. Navigate directly into the project directory path.
- 3. Open the `index.html` file using any modern browser application.
- 4. Use the interface controls to run test tasks like downloading, saving, and removing notes via the JSONPlaceholder API endpoint connection.

## System Documentation Links

- [REST API Endpoint Matrix Documentation](docs/api-design.md)
- [Relational Data Model Schema Specifications](docs/data-model.md)
- [Production System Architecture Framework](docs/architecture.md)

## What I Learned Throughout This Project

- Asynchronous Operations Integrity: Learned how to coordinate complex web request tasks using clean try-catch blocks and manual response checks, ensuring interface components disable properly to prevent duplicate network calls.
- Intermediary Schema Resolution: Learned how to resolve complex many-to-many relationships into standard one-to-many linkages using intersection table strategies, while utilizing specialized multi-column indexing parameters to speed up timeline generation.
- Decoupled Processing Systems: Learned how to calculate production scale volumetric loads and protect system reliability using message queue architectures, which isolate background operations from the primary request thread.
