from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, TelField
from wtforms.validators import DataRequired, Email, Length, Regexp

class ContactForm(FlaskForm):
    name = StringField('Full Name', validators=[
        DataRequired(),
        Length(min=2, max=100, message="Name must be between 2 and 100 characters")
    ])
    
    email = StringField('Email', validators=[
        DataRequired(),
        Email(message="Please enter a valid email address")
    ])
    
    phone = TelField('Phone Number', validators=[
        DataRequired(),
        Regexp(r'^\d{3}-\d{3}-\d{4}$', message="Phone number format: XXX-XXX-XXXX")
    ])
    
    package = SelectField('Interested Package', choices=[
        ('', 'Select a Package'),
        ('basic', 'Basic Package ($200)'),
        ('pro', 'Professional Package ($500)'),
        ('enterprise', 'Enterprise Package ($1000)'),
        ('custom', 'Custom Solution')
    ], validators=[DataRequired()])
    
    message = TextAreaField('Message', validators=[
        DataRequired(),
        Length(min=10, max=1000, message="Message must be between 10 and 1000 characters")
    ])
