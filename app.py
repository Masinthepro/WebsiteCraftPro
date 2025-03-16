import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.security import generate_password_hash

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Configure database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///website.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}
db.init_app(app)

# Import routes after app initialization to avoid circular imports
from forms import ContactForm
import models

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/packages')
def packages():
    return render_template('packages.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    if request.method == 'POST' and form.validate_on_submit():
        # Save the contact message
        new_contact = models.Contact(
            name=form.name.data,
            email=form.email.data,
            phone=form.phone.data,
            package=form.package.data,
            message=form.message.data
        )
        db.session.add(new_contact)
        db.session.commit()
        
        flash('Your message has been sent! We will contact you shortly.', 'success')
        return redirect(url_for('contact_success'))
    
    return render_template('contact.html', form=form)

@app.route('/contact/success')
def contact_success():
    return render_template('contact_success.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    return render_template('500.html'), 500
