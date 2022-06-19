import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      calGoal: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
    
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      auth.register(this.state.username, this.state.password, this.state.email).then((res) => {
        if (res.statusCode !== 400) {
          this.props.history.push('/login');
        }
      });
    }
  }    
    
  render(){
    <form name="form" onSubmit={this.handleSubmit} className="registration-form">
      <h2 className="registration-form__title">Log in</h2>
      <fieldset className="registration-form__fieldset">
        <input id="email-input" type="email" name="email" placeholder="Email" value={email} onChange={handleChangeName} className="registration-form__input_type_name registration-form__input" required minLength="2" maxLength="40" />
        <span id="email-input-error" className="registration-form__error"></span>
        <input id="password-input" type="password" name="password" placeholder="Password" value={password} onChange={handleChangeAbout} className="registration-form__input_type_about registration-form__input" required minLength="2" maxLength="40" />
        <span id="password-input-error" className="registration-form__error"></span>
        <button type="submit" aria-label="save" className="registration-form__button">{props.buttonText}</button>
      </fieldset>
      <Link to="/register" className="registration-form__link">Not a member yet? Sign up here!</Link>
    </form>
  }
}
  
export default withRouter(Register);