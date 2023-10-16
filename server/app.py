
 

import os
from dotenv import load_dotenv
from flask import Flask, request, render_template, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from models import Guest, Invitation, Event, User

load_dotenv()  # Load environment variables from .env file

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

app.config['SECRET_KEY'] = 'your_secret_key'   
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
api = Api(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

 

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Authentication routes

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            flash('Login successful', 'success')
            return redirect(url_for('index'))
        else:
            flash('Login failed. Please check your credentials.', 'danger')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out', 'info')
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        user = User(username=username, email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Account created successfully! You can now log in.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

# API Resource Handlers

class UserResource(Resource):
    def get(self, user_id):
        # Get a specific user by ID
        user = User.query.get(user_id)
        if user:
            return {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        else:
            return {'message': 'User not found'}, 404

    def post(self):
        # Create a new user
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')

        if not username or not email:
            return {'message': 'Missing required fields'}, 400

        new_user = User(username=username, email=email)
        db.session.add(new_user)
        db.session.commit()

        return {
            'id': new_user.id,
            'username': new_user.username,
            'email': new_user.email
        }, 201

    def put(self, user_id):
        # Update an existing user
        user = User.query.get(user_id)

        if not user:
            return {'message': 'User not found'}, 404

        data = request.get_json()
        username = data.get('username')
        email = data.get('email')

        if username:
            user.username = username
        if email:
            user.email = email

        db.session.commit()

        return {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }

    def delete(self, user_id):
        # Delete a user by ID
        user = User.query.get(user_id)

        if not user:
            return {'message': 'User not found'}, 404

        db.session.delete(user)
        db.session.commit()

        return {'message': 'User deleted'}, 204

class EventResource(Resource):
    def get(self, event_id):
        # Get a specific event by ID
        event = Event.query.get(event_id)
        if event:
            return {
                'id': event.id,
                'name': event.name,
                'date': str(event.date)
            }
        else:
            return {'message': 'Event not found'}, 404

    def post(self):
        # Create a new event
        data = request.get_json()
        name = data.get('name')
        date = data.get('date')

        if not name or not date:
            return {'message': 'Missing required fields'}, 400

        new_event = Event(name=name, date=date)
        db.session.add(new_event)
        db.session.commit()

        return {
            'id': new_event.id,
            'name': new_event.name,
            'date': str(new_event.date)
        }, 201

    def put(self, event_id):
        # Update an existing event
        event = Event.query.get(event_id)

        if not event:
            return {'message': 'Event not found'}, 404

        data = request.get_json()
        name = data.get('name')
        date = data.get('date')

        if name:
            event.name = name
        if date:
            event.date = date

        db.session.commit()

        return {
            'id': event.id,
            'name': event.name,
            'date': str(event.date)
        }

    def delete(self, event_id):
        # Delete an event by ID
        event = Event.query.get(event_id)

        if not event:
            return {'message': 'Event not found'}, 404

        db.session.delete(event)
        db.session.commit()

        return {'message': 'Event deleted'}, 204

class InvitationResource(Resource):
    def get(self, invitation_id):
        # Get a specific invitation by ID
        invitation = Invitation.query.get(invitation_id)
        if invitation:
            return {
                'id': invitation.id,
                'event_id': invitation.event_id,
                'guest_id': invitation.guest_id,
                'status': invitation.status
            }
        else:
            return {'message': 'Invitation not found'}, 404

    def post(self):
        # Create a new invitation
        data = request.get_json()
        event_id = data.get('event_id')
        guest_id = data.get('guest_id')
        status = data.get('status')

        if not event_id or not guest_id or not status:
            return {'message': 'Missing required fields'}, 400

        new_invitation = Invitation(event_id=event_id, guest_id=guest_id, status=status)
        db.session.add(new_invitation)
        db.session.commit()

        return {
            'id': new_invitation.id,
            'event_id': new_invitation.event_id,
            'guest_id': new_invitation.guest_id,
            'status': new_invitation.status
        }, 201

    def put(self, invitation_id):
        # Update an existing invitation
        invitation = Invitation.query.get(invitation_id)

        if not invitation:
            return {'message': 'Invitation not found'}, 404

        data = request.get_json()
        event_id = data.get('event_id')
        guest_id = data.get('guest_id')
        status = data.get('status')

        if event_id:
            invitation.event_id = event_id
        if guest_id:
            invitation.guest_id = guest_id
        if status:
            invitation.status = status

        db.session.commit()

        return {
            'id': invitation.id,
            'event_id': invitation.event_id,
            'guest_id': invitation.guest_id,
            'status': invitation.status
        }

    def delete(self, invitation_id):
        # Delete an invitation by ID
        invitation = Invitation.query.get(invitation_id)

        if not invitation:
            return {'message': 'Invitation not found'}, 404

        db.session.delete(invitation)
        db.session.commit()

        return {'message': 'Invitation deleted'}, 204

class GuestResource(Resource):
    def get(self, guest_id):
        # Get a specific guest by ID
        guest = Guest.query.get(guest_id)
        if guest:
            return {
                'id': guest.id,
                'name': guest.name,
                'email': guest.email
            }
        else:
            return {'message': 'Guest not found'}, 404

    def post(self):
        # Create a new guest
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')

        if not name or not email:
            return {'message': 'Missing required fields'}, 400

        new_guest = Guest(name=name, email=email)
        db.session.add(new_guest)
        db.session.commit()

        return {
            'id': new_guest.id,
            'name': new_guest.name,
            'email': new_guest.email
        }, 201

    def put(self, guest_id):
        # Update an existing guest
        guest = Guest.query.get(guest_id)

        if not guest:
            return {'message': 'Guest not found'}, 404

        data = request.get_json()
        name = data.get('name')
        email = data.get('email')

        if name:
            guest.name = name
        if email:
            guest.email = email

        db.session.commit()

        return {
            'id': guest.id,
            'name': guest.name,
            'email': guest.email
        }

    def delete(self, guest_id):
        # Delete a guest by ID
        guest = Guest.query.get(guest_id)

        if not guest:
            return {'message': 'Guest not found'}, 404

        db.session.delete(guest)
        db.session.commit()

        return {'message': 'Guest deleted'}, 204

api.add_resource(UserResource, '/api/users', '/api/users/<int:user_id>')
api.add_resource(EventResource, '/api/events', '/api/events/<int:event_id>')
api.add_resource(InvitationResource, '/api/invitations', '/api/invitations/<int:invitation_id>')
api.add_resource(GuestResource, '/api/guests', '/api/guests/<int:guest_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)