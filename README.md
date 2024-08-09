
# Best Todo Application

## Overview

[Best Todo Application](https://besttodoapplication.netlify.app) is a full-stack web application designed to help users manage their tasks, goals, and journal entries. The app is built with Express, Vite-React, TailwindCSS, and Toastify, featuring a user-friendly interface and robust functionalities such as cookie-based authorization and authentication, task management, goal tracking, and a rich text editor for journaling.

## Features

### 1. Task Management
- **Create, Edit, and Delete Tasks**: Users can easily create new tasks, edit existing ones, and delete them as needed.
- **Local Storage**: All tasks are stored locally in the browser's local storage, ensuring quick access and retrieval.

### 2. Goal Tracking
- **Create, Edit, and Delete Goals**: Users can manage their goals effectively by adding new goals, editing them, or removing them.
- **Database Storage**: All goals are stored securely in a database, ensuring persistence and reliability across sessions.

### 3. User Profile
- **User Information**: The user page displays the user's name, age, and the total number of goals.
- **Journal Entries**: Users can enter journal entries using a rich text editor, allowing for detailed and formatted entries. Users can also view their past journal entries.

### 4. Authorization & Authentication
- **Cookie-Based Authentication**: The app uses cookies to handle user authorization and authentication, providing a secure and seamless login experience.

## Technologies Used

- **Frontend**: Vite-React, TailwindCSS, Toastify
- **Backend**: Express.js, JWT
- **Database**: Altas-MongoDB
- **Authentication**: Cookie-based

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/best-todo-application.git
   ```
   
2. **Navigate to the project directory**:
   ```bash
   cd best-todo-application
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Backend Setup**:
   - Ensure that your database is set up and configured correctly.
   - Update the `.env` file with your database credentials and any other necessary environment variables.

6. **Build the application**:
   ```bash
   npm run build
   ```

7. **Run the production server**:
   ```bash
   npm start
   ```

## Usage

- **Tasks**: Go to the tasks page to add, edit, or delete tasks. Your tasks will be saved in your browser's local storage.
- **Goals**: Visit the goals page to manage your goals. Your goals will be stored in the database.
- **User Profile**: Access the user page to view your personal details and journal entries. You can write new entries or review past ones.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries, please contact [ayushmanyadav098@gmail.com].
