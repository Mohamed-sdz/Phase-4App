
import os
from models import Guest, Invitation, Event, User
 
from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask import Flask, request, make_response, session, jsonify, abort, render_template

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.environ.get('SESSION_KEY')

CORS(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)
api = Api(app)

# Define your User model 
@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

# Resource handlers
class UserResource(Resource):
    def get(self, user_id):
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
        user = User.query.get(user_id)

        if not user:
            return {'message': 'User not found'}, 404

        db.session.delete(user)
        db.session.commit()

        return {'message': 'User deleted'}, 204

class EventResource(Resource):
    def get(self, event_id):
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
        event = Event.query.get(event_id)

        if not event:
            return {'message': 'Event not found'}, 404

        db.session.delete(event)
        db.session.commit()

        return {'message': 'Event deleted'}, 204

class InvitationResource(Resource):
    def get(self, invitation_id):
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
        invitation = Invitation.query.get(invitation_id)

        if not invitation:
            return {'message': 'Invitation not found'}, 404

        db.session.delete(invitation)
        db.session.commit()

        return {'message': 'Invitation deleted'}, 204

class GuestResource(Resource):
    def get(self, guest_id):
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
        guest = Guest.query.get(guest_id)

        if not guest:
            return {'message': 'Guest not found'}, 404

        db.session.delete(guest)
        db.session.commit()

        return {'message': 'Guest deleted'}, 204

api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(EventResource, '/events', '/events/<int:event_id>')
api.add_resource(InvitationResource, '/invitations', '/invitations/<int:invitation_id>')
api.add_resource(GuestResource, '/guests', '/guests/<int:guest_id>')

if __name__ == '__main__':
    app.run(debug=True)
    app.run(port=5555, debug=True)

