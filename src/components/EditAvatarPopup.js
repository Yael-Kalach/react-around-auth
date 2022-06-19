import React from "react"
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({onUpdateAvatar, isOpen, onClose}){
  const avatarInputRef = React.useRef(null)

  function handleSubmit(e) { 
    e.preventDefault(); 

    onUpdateAvatar({ 
      avatar: avatarInputRef.current.value, 
    }); 
  } 

  return(
    <PopupWithForm name='avatar' title='Change profile picture' isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} buttonText='Save'>
      <input id="avatar-input" ref={avatarInputRef} type="url" name="avatar" placeholder="Avatar link" className="form__input_type_avatar form__input" required />
      <span id="avatar-input-error" className="form__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup