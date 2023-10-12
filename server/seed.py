from faker import Faker
from app import db, User, Event, Invitation, Guest
import random
from datetime import datetime, timedelta

fake = Faker()

def seed_users(num_users):
    for _ in range(num_users):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password_hash=fake.password(),
            admin=random.choice([True, False])
        )
        db.session.add(user)
    db.session.commit()

def seed_events(num_events):
    for _ in range(num_events):
        event = Event(
            title=fake.catch_phrase(),
            description=fake.text(),
            date=datetime.now() + timedelta(days=random.randint(1, 30)),
            location=fake.address(),
            organizer_id=random.randint(1, num_users)
        )
        db.session.add(event)
    db.session.commit()

def seed_invitations(num_invitations):
    for _ in range(num_invitations):
        invitation = Invitation(
            event_id=random.randint(1, num_events),
            user_id=random.randint(1, num_users),
            status=random.choice(['pending', 'accepted'])
        )
        db.session.add(invitation)
    db.session.commit()

def seed_guests(num_guests):
    for _ in range(num_guests):
        guest = Guest(
            invitation_id=random.randint(1, num_invitations),
            user_id=random.randint(1, num_users),
            response=random.choice(['pending', 'accepted', 'declined'])
        )
        db.session.add(guest)
    db.session.commit()

if __name__ == '__main__':
    num_users = 10  # Define the number of users you want to create
    num_events = 20  # Define the number of events you want to create
    num_invitations = 50  # Define the number of invitations you want to create
    num_guests = 100  # Define the number of guests you want to create

    # Call the seeding functions with the desired number of entries
    seed_users(num_users)
    seed_events(num_events)
    seed_invitations(num_invitations)
    seed_guests(num_guests)
