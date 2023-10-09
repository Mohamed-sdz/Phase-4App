# Eventapp

The Event App is a web application that allows users to create and manage events, send invitations to guests, and track RSVPs. It consists of a React frontend and a Flask backend.

## VIDEO DEMO

<https://app.clipchamp.com/editor/fdb1a133-f4b8-4c3a-91af-c596f116d7ce>

## Installation

### Prerequisites

Before you start, make sure you have the following prerequisites installed on your system:

- Node.js and npm (Node Package Manager)
- Python 3
- Flask (You can install it via `pip install flask`)

### Clone the Repository

git clone <<git@github.com>:Mohamed-sdz/Phase-4App.git>
cd Phase-4App

### Backend Setup (Flask)

1. Navigate to the "backend server" folder:

cd backend-server

2.Install the required Python packages:
   pipenv install
   pipenv shell
3.Set up the database:
   Configure your database URI in `app.py`.

4.Initialize the database (create tables):
python app.py db init
python app.py db migrate
python app.py db upgrade
5. Start the Flask backend server:
python app.py

### Frontend Setup (React)

1. Navigate to the "client" folder:
   cd client
2. Install the required dependencies:
   npm install --prefix client
3. Start the React development server:
   npm start --prefix client

## How to Use

1. With both the React frontend and Flask backend running, access the Event App in your web browser.
2. Visit `http://localhost:4000` to interact with the React frontend.
3. The React frontend communicates with the Flask backend running at `http://localhost:5555`.
4. Customize the React components and routes for your specific project requirements.
5. Implement authentication and authorization as needed for your app.

## Technologies Used

### Backend (Server)

- [SQLAlchemy](https://www.sqlalchemy.org/): SQLAlchemy is used for database management and ORM (Object-Relational Mapping).
- [Flask-CORS](https://flask-cors.corydolphin.com/en/latest/): Flask-CORS is utilized to handle Cross-Origin Resource Sharing (CORS) in the Flask backend.
- [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/): Flask-Migrate is used for database migrations in the Flask application.
- [Flask-Bcrypt](https://flask-bcrypt.readthedocs.io/en/latest/): Flask-Bcrypt is used for password hashing and security.
- [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/): Flask-RESTful is used to create RESTful APIs in the Flask application.

### Frontend (Client)

- [React](https://reactjs.org/): React is the JavaScript library used for building the user interface of the client-side application.
- [Formik](https://formik.org/): Formik is used for managing forms and form state in the React frontend.
- [Yup](https://github.com/jquense/yup): Yup is used for form validation in conjunction with Formik.
- [Styled-components](https://styled-components.com/): Styled-components is used for styling React components using a CSS-in-JS approach.
- [React Icons](https://react-icons.github.io/react-icons/): React Icons provides a wide variety of icon libraries for use in React components.

## Contributor's Guide

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your contribution: `git checkout -b feature/your-feature-name`.
4. Make your changes and commit them: `git commit -m "Add your feature description"`.
5. Push your changes to your forked repository: `git push origin feature/your-feature-name`.
6. Create a pull request on the original repository to merge your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Feel free to copy and paste this updated README.md into your project, and make any further adjustments or additions as needed.
