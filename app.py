import os
import logging
from flask import Flask, render_template, request, redirect, url_for, flash, session
import smtplib
from email.mime.text import MIMEText
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__, static_folder='./', static_url_path='/', template_folder='./')
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")

# Simple in-memory storage for contact form submissions
# Note: In a production environment, this would be replaced with a database
contact_submissions = []

@app.route('/')
def index():
    return render_template('index.html', template_folder='./')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html', template_folder='./')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html', template_folder='./')

@app.route('/about')
def about():
    return render_template('about.html', template_folder='./')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Extract form data
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        message = request.form.get('message', '').strip()
        package = request.form.get('package', '').strip()
        
        # Simple validation
        errors = {}
        if not name:
            errors['name'] = 'Name is required'
        if not email:
            errors['email'] = 'Email is required'
        elif '@' not in email or '.' not in email:
            errors['email'] = 'Please enter a valid email address'
        if not message:
            errors['message'] = 'Message is required'
            
        # If there are errors, flash messages and return to the form
        if errors:
            for field, error in errors.items():
                flash(f"{error}", 'error')
            return render_template('contact.html', 
                                  name=name, 
                                  email=email, 
                                  phone=phone, 
                                  message=message,
                                  package=package,
                                  template_folder='./')
        
        # Store the submission
        submission = {
            'name': name,
            'email': email,
            'phone': phone,
            'message': message,
            'package': package,
            'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        contact_submissions.append(submission)
        
        # Attempt to send email notification (in a real scenario)
        try:
            # This would be implemented with actual SMTP credentials
            # send_email_notification(submission)
            app.logger.info(f"Form submission received: {submission}")
        except Exception as e:
            app.logger.error(f"Failed to process form submission: {str(e)}")
            flash("Your message was received but we encountered an issue processing it. We'll get back to you soon.", 'warning')
            return render_template('contact.html', template_folder='./')
        
        # Set session variable for confirmation page
        session['submission'] = submission
        flash("Your message has been sent successfully! We'll get back to you soon.", 'success')
        return redirect(url_for('confirmation'))
    
    # GET request - just show the form
    return render_template('contact.html', template_folder='./')

@app.route('/confirmation')
def confirmation():
    # Get submission from session
    submission = session.get('submission')
    if not submission:
        return redirect(url_for('contact'))
    
    # Clear from session after displaying
    session.pop('submission', None)
    return render_template('confirmation.html', submission=submission, template_folder='./')

def send_email_notification(submission):
    """
    Function to send email notification when a form is submitted.
    This is a placeholder - in a real app, you would configure this with actual SMTP credentials.
    """
    # This would use environment variables in production
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    smtp_username = os.environ.get('SMTP_USERNAME', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    
    # Create message
    msg = MIMEText(f"""
    New Contact Form Submission
    ---------------------------
    Name: {submission['name']}
    Email: {submission['email']}
    Phone: {submission['phone']}
    Package: {submission['package']}
    Message: {submission['message']}
    Time: {submission['timestamp']}
    """)
    
    msg['Subject'] = f"New Website Inquiry from {submission['name']}"
    msg['From'] = smtp_username
    msg['To'] = "masin.1752991@gmail.com"
    
    # In production, uncomment this to actually send the email
    # with smtplib.SMTP(smtp_server, smtp_port) as server:
    #     server.starttls()
    #     server.login(smtp_username, smtp_password)
    #     server.send_message(msg)
    
    app.logger.info("Email notification would be sent here")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
