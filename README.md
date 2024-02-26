
# Support Ticket System

## Description
This project is a support ticket system that allows users to create and manage support requests. It includes features such as creating support requests, commenting on requests, and processing requests by support agents.

## Table of Contents
1. [Installation and Configuration](#installation-and-configuration)
2. [Database Setup](#database-setup)
3. [Assumptions](#assumptions)
4. [Requirements Not Covered](#requirements-not-covered)
5. [Configuring Source Code](#configuring-source-code)
6. [Issues Faced](#issues-faced)
7. [Feedback](#feedback)
8. [License](#license)

## Installation and Configuration
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/support-ticket-system.git
   ```
2. Install dependencies:
   ```bash
   cd support-ticket-system
   npm install
   ```
3. Seed database
   ```bash
   npx ts-node src/scripts/dbSetup.ts
   ```
4. Run the project
   ```bash
   npm start
   ```
   
## Database Setup
1. Ensure you have MongoDB installed and running locally.
2. Create a new database named `support-ticket-system` or any desired name.
3. Configure the MongoDB connection string in the project's configuration file (`.env`  or similar).

## Assumptions
- Support agents can only comment on and process support requests.
- The system does not include user roles or permissions management.

## Requirements Not Covered
- Frontend/UI implementation.
- Email notifications for support request updates.

## Configuring Source Code
1. Set up environment variables for sensitive information such as database credentials and JWT secret.
2. Ensure MongoDB connection configuration is correct in the project's configuration file.
3. Customize any other settings or configurations as needed for your environment.

## Issues Faced
No major issues were encountered during the development of this project.

## Feedback
Overall, the project was implemented smoothly. However, improvements could be made in terms of error handling and input validation.

## License
This project is licensed under the [MIT License](LICENSE).

# customer-support-ticket-system
