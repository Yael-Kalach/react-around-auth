function InfoToolTip(props) {
    const overlayName = `popup__overlay info-popup__overlay`
    const containerName = `popup__container info-popup__container`
    const closeButtonName = `popup__close-button info-popup__close-button`

  
    return (
      <div className= {`popup info-popup ${props.isOpen ? 'popup_visible' : ''}`}>
        <div className={overlayName} onClick={props.onClose}></div>
        <div className={containerName}>
          <button type="button" aria-label="close" className={closeButtonName} onClick={props.onClose}></button>
          <img className={`info-popup__image ${props.isSuccessful ? 'info-popup__image_success' : 'info-popup__image_error'}`} />
          <p className="info-popup__caption">{props.isSuccessful ? `Success! You have now been registered.` : `Oops, something went wrong! Please try again.`}</p>
        </div>
      </div>
    ) 
  }

export default InfoToolTip