function InfoToolTip(props) {
    const overlayName = `popup__overlay info-popup__overlay`
    const containerName = `popup__container info-popup__container`
    const closeButtonName = `popup__close-button info-popup__close-button`

  
    return (
      <div className= {`popup info-popup ${props.isOpen ? 'popup_visible' : ''}`}>
        <div className={overlayName} onClick={props.onClose}></div>
        <div className={containerName}>
          <button type="button" aria-label="close" className={closeButtonName} onClick={props.onClose}></button>
          <img className="info-popup__image" />

        </div>
      </div>
    ) 
  }

export default InfoToolTip