from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from app import bcrypt

from app import db
db = SQLAlchemy()

# Define the junction table for the many-to-many relationship between User and Event
user_event_association = db.Table(
    'user_event_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)
    admin = db.Column(db.Boolean, default=False)  # Updated to Boolean for admin role
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Define a many-to-many relationship between User and Event
    attended_events = db.relationship('Event', secondary=user_event_association, back_populates='attendees')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('email')
    def validate_email(self, key, email):
        # Add custom email validation logic (e.g., check for valid format)
        if '@' not in email:
            raise ValueError("Invalid email format")
        return email

    def __repr__(self):
        return f'User(id={self.id}, username={self.username}, email={self.email}, admin={self.admin})'

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255))
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Define a many-to-many relationship between User and Event
    attendees = db.relationship('User', secondary=user_event_association, back_populates='attended_events')

    @validates('title')
    def validate_title(self, key, title):
        # Add custom title validation logic (e.g., ensure title is not too long)
        if len(title) > 255:
            raise ValueError("Title is too long")
        return title

    def __repr__(self):
        return f'Event(id={self.id}, title={self.title}, date={self.date}, location={self.location})'

class Invitation(db.Model, SerializerMixin):
    __tablename__ = 'invitations'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    event = db.relationship('Event', backref='invitations')
    user = db.relationship('User', backref='invitations')

    @validates('status')
    def validate_status(self, key, status):
        # Add custom status validation logic (e.g., allow only 'pending' or 'accepted')
        if status not in ('pending', 'accepted'):
            raise ValueError("Invalid status")
        return status

    def __repr__(self):
        return f'Invitation(id={self.id}, event_id={self.event_id}, user_id={self.user_id}, status={self.status})'

class Guest(db.Model, SerializerMixin):
    __tablename__ = 'guests'

    id = db.Column(db.Integer, primary_key=True)
    invitation_id = db.Column(db.Integer, db.ForeignKey('invitations.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    response = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    invitation = db.relationship('Invitation', backref='guests')
    user = db.relationship('User', backref='guest_of_events')

    @validates('response')
    def validate_response(self, key, response):
        # Add custom response validation logic (e.g., allow only 'pending', 'accepted', or 'declined')
        if response not in ('pending', 'accepted', 'declined'):
            raise ValueError("Invalid response")
        return response

    def __repr__(self):
        return f'Guest(id={self.id}, invitation_id={self.invitation_id}, user_id={self.user_id}, response={self.response})'
