import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/auth.js';
import InfoToolTip from './InfoToolTip'

function Register (props){
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register(setPassword, setEmail).then((res) => {
      if (res.statusCode === 200) {
        navigate.push('/login');
      } else {
        if (res.statusCode === 400) {
          console.log('one of the fields was filled in incorrectly');
        }
      }
    });
  }    
  
  
  return (
    <div>
      <form name="form" onSubmit={handleSubmit} className="registration-form">
        <h2 className="registration-form__title">Sign up</h2>
        <fieldset className="registration-form__fieldset">
          <input id="email-input" type="email" name="email" placeholder="Email" value={email} onChange={onChangeEmail} className="registration-form__input_type_name registration-form__input" required minLength="2" maxLength="40" />
          <span id="email-input-error" className="registration-form__error"></span>
          <input id="password-input" type="password" name="password" placeholder="Password" value={password} onChange={onChangePassword} className="registration-form__input_type_about registration-form__input" required minLength="2" maxLength="40" />
          <span id="password-input-error" className="registration-form__error"></span>
          <button type="submit" aria-label="save" className="registration-form__button">Sign up</button>
        </fieldset>
        <Link to="/signin" className="registration-form__link">Already a member? Log in here!</Link>
      </form>
      <InfoToolTip isSuccessful={props.isSuccessful} isOpen={props.isOpen} onClose={props.onClose} />
    </div>
  )
  
}
  
export default Register;