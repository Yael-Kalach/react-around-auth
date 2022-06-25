import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from 'react';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import { Route, Routes, Navigate, Router } from 'react-router-dom';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false)
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false)

  React.useEffect(() => {
    api.getUserInformation()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch(console.log)
  }, [])

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => 
          currentCard._id === card._id ? newCard : currentCard));
      })
      .catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(cardEl => cardEl._id !== card._id)
        setCards(newCards);
      })
      .catch(console.log)
  }

  function handleAddPlaceSubmit(data){
    api.createCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then(closeAllPopups)
    .catch((error) => console.log(error));
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleDeletePlaceClick() {
    setIsDeletePlacePopupOpen(!isDeletePlacePopupOpen)
  }

  function closeAllPopups(){
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsToolTipOpen(false)
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api.editUserInformation(data)
      .then((userData) => {
        setCurrentUser(userData)
      })
      .then(closeAllPopups)
      .catch(console.log)
  }

  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then((userData) => {
        setCurrentUser(userData)
      })
      .then(closeAllPopups)
      .catch(console.log)
  }

  function handleLogin() {
    setIsLoggedIn(true)
    setIsRegistrationSuccessful(!isRegistrationSuccessful)
    setIsToolTipOpen(!isToolTipOpen)
  }

  function handleLogout() {
    setIsLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Router>
          <Header />
          <main className="content">
            <ProtectedRoute destination="/main" loggedIn={isLoggedIn} component={Main} >
              <Main 
                onDeletePlaceClick={handleDeletePlaceClick} 
                onEditAvatarClick={handleEditAvatarClick} 
                onEditProfileClick={handleEditProfileClick} 
                onAddPlaceClick={handleAddPlaceClick} 
                avatar={currentUser.avatar}
                name={currentUser.name}
                about={currentUser.about}
                cards={cards.map((card) => (<Card 
                  key={card._id}
                  card={card}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />))} 
              >

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmitCard={handleAddPlaceSubmit} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <PopupWithForm name='delete-card' title='Are you sure?' isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} buttonText='Yes' />

                <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} card={selectedCard} />

              </Main>
            </ProtectedRoute>
            <Routes>
              <Route path="/register" >
                <Register>
                  <InfoToolTip isSuccessful={isRegistrationSuccessful} isOpen={isToolTipOpen} onClose={closeAllPopups} />
                </Register>
              </Route>
              <Route path="/login">
                <Login handleLogin={handleLogin}>
                  <InfoToolTip isSuccessful={isRegistrationSuccessful} isOpen={isToolTipOpen} onClose={closeAllPopups} />  
                </Login> 
              </Route>
              <Route exact path="/">
                {isLoggedIn ? <Navigate to="/main" /> : <Navigate to="/login" />}
              </Route>
            </Routes>
          </main>
        </Router>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
