
# Event Management Web Application

Welcome to my Event Management Web Application! This application is designed to help you efficiently organize and manage events, invitations, and guest lists.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Users can securely register, log in, and log out. Passwords are hashed and stored for enhanced security.
- **Event Creation:** Easily create new events by specifying the event name and date.
- **Event Details:** View comprehensive details of individual events, including their name and date.
- **Event List:** Access a well-organized list of all events for convenient reference.
- **Invitation Management:** Create and effectively manage event invitations, including tracking the status of each guest.
- **Guest List:** Maintain a guest list that includes their names and email addresses.

## Technologies

Before getting started, ensure you have the following prerequisites installed on your system:

- Node.js and npm (Node Package Manager)
- Python 3
- Flask (You can install it via `pip install flask`)

### Frontend (Client)

- **React:** The user interface for the client-side application is built using the React JavaScript library.
- **Formik:** Formik is used for managing forms and form state in the React frontend.
- **Yup:** Yup is employed for form validation in conjunction with Formik.
- **Styled-components:** Styled-components is used for styling React components using a CSS-in-JS approach.
- **React Icons:** You can find a wide variety of icon libraries for use in React components through React Icons.
- **React Router:** This library is utilized for handling client-side routing.

### Backend (Server)

- **Flask:** Flask is a Python web framework that serves as the foundation for the server-side application.
- **SQLAlchemy:** A powerful ORM used for managing the database, facilitating efficient data management.
- **Flask-RESTful:** Flask-RESTful is employed to create RESTful APIs in the Flask application, providing a structured and efficient way to interact with data.
- **Flask-Login:** This library is used to handle user authentication and session management, ensuring a secure user experience.
- **Flask-CORS:** Flask-CORS enables Cross-Origin Resource Sharing (CORS) in the Flask backend, allowing seamless communication with the frontend.

### Database

- **SQL Database:** The application relies on a SQLlite database for storing event, user, invitation, and guest data, ensuring data consistency and integrity.

## Installation

Follow these steps to set up and run the application:

1. Clone the repository:

   git clone <git@github.com>:Mohamed-sdz/Phase-4App.git
   cd Phase-4App

2. Create a Python virtual environment and install the required packages. You can use the following commands as a reference:

   pipenv install
   pipenv shell
   pip install -r requirements.txt

3. Create a `.env` file and set the necessary environment variables, including the database URI.

4. Set up the database and run migrations with these commands:

   flask db init
   flask db migrate
   flask db upgrade

5. Install the frontend dependencies and start the development server. Be sure to navigate to the "client" folder and use the following commands:

   cd client
   npm install
   npm start

6. Access the application at [http://localhost:3000](http://localhost:3000) in your web browser.

## Usage

1. Register a new account or log in if you already have one.
2. Utilize the navigation menu to create events, manage invitations, and maintain your guest list.
3. Log out when you're done using the application.

## Contributing

If you'd like to contribute to this project, I welcome your contributions! Here's how you can get started:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your contribution, e.g., `git checkout -b feature/your-feature-name`.
4. Make your changes and commit them with descriptive messages.
5. Push your changes to your forked repository, e.g., `git push origin feature/your-feature-name`.
6. Create a pull request on the original repository to merge your changes.

## License

This project is licensed under the MIT License. For more details, please see the [LICENSE](LICENSE) file.

---
