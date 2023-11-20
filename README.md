# ToDo List App

This is a simple React web application that serves as a to-do list. It was created as a learning project to explore the concepts of `useState` and `useEffect` in React.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can access the live version of this to-do list application at [https://to-do-list-41918.web.app/](https://to-do-list-41918.web.app/).

## Features

- Create, edit, and delete tasks on the to-do list.
- Mark tasks as completed or uncompleted.
- Persist tasks using `localStorage` to retain data between sessions.
- Create entire new to-do lists.
- Copy existing to-do lists to create duplicates.
- Delete all but one existing to-do list.
- Simple and intuitive responsive user interface.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pdiegel/React-ToDo-List-App.git
   ```

2. **Navigate to the project directory**:

    ```bash
    cd your-repo
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

## Usage

1. **Start the development server**:

    ```bash
    npm start
    ```

    This will start the development server and open the to-do list app in your default web browser. You can add, edit, and manage your tasks.

2. **Build for production**:

    ```bash
    npm run build
    ```

    This command creates an optimized production build of your to-do list app in the build directory.

## Folder Structure

The project structure should look something like this:

```java
to-do-list/
  ├── public/
  │   ├── index.html
  │   └── ...
  ├── src/
  │   ├── components/
  │   │   ├── TodoList.jsx
  │   │   ├── TodoList.css
  │   │   └── ...
  │   ├── App.js
  │   ├── index.js
  │   └── ...
  ├── .gitignore
  ├── package.json
  ├── README.md
  └── ...
```

You can customize the structure to match your project's needs.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository and create your branch: git checkout -b feature-name.
2. Make your changes and commit them: git commit -m 'Add some feature'.
3. Push to your branch: git push origin feature-name.
4. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.
