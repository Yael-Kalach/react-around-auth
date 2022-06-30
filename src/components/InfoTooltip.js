function InfoToolTip( isOpen, onClose) {
    return (
      <div className= {`popup info-popup ${isOpen ? 'popup_visible' : ''}`}>
        <div className="popup__overlay" onClick={onClose}></div>
        <div className="popup__container">
          <button type="button" aria-label="close" className="popup__close-button" onClick={onClose}></button>
          <img className={`info-popup__image ${isSuccessful ? 'info-popup__image_success' : 'info-popup__image_error'}`} />
          <p className="info-popup__caption">{isSuccessful ? `Success! You have now been registered.` : `Oops, something went wrong! Please try again.`}</p>
        </div>
      </div>
    ) 
  }

export default InfoToolTip