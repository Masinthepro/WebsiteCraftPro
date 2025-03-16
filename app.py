import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
import urllib.parse

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# In-memory storage for contact submissions (in a real app, you'd use a database)
contact_submissions = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        message = request.form.get('message', '').strip()
        package = request.form.get('package', '').strip()
        
        # Simple validation
        if not name or not email or not message:
            flash('Please fill out all required fields.', 'error')
            return render_template('contact.html')
        
        # Email validation
        if '@' not in email or '.' not in email:
            flash('Please enter a valid email address.', 'error')
            return render_template('contact.html')
        
        # Store the submission
        submission = {
            'name': name,
            'email': email,
            'phone': phone,
            'message': message,
            'package': package
        }
        contact_submissions.append(submission)
        
        # Log the submission
        app.logger.info(f"New contact submission: {submission}")
        
        # Flash success message
        flash('Thank you for contacting us! We will get back to you soon.', 'success')
        return redirect(url_for('contact'))
    
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
