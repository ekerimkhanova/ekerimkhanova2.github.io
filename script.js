//Переменные

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];


const placesList = document.querySelector('.places-list');

const root = document.querySelector('.root');

const button = document.querySelector('.user-info__button');
const popup = document.querySelector('.popup');

const editButton = document.querySelector('.user-info__edit');
const editPopup = document.querySelector('.edit-popup');

const buttonClose = document.querySelector('.popup__close');
const editButtonClose = document.querySelector('.edit-popup__close');

const addForm = document.forms.new;
const nameInput = addForm.elements.name;
const linkInput = addForm.elements.link;

const editNew = document.forms.edit;
const editname = editNew.elements.editname;
const editabout = editNew.elements.editabout;

const popupButton = document.querySelector('.button.popup__button');
const editPopupButton = document.querySelector('.button.edit-popup__button');

const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');


//Классы

class Card {

    constructor(name, link) {
        this.name = name;
        this.link = link;

        this.cardElement = this.create();

        this.cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like.bind(this));

        this.cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this.remove.bind(this));
 
    }
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    create() {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');

        const placeCardImage1 = document.createElement('div');
        placeCardImage1.classList.add('place-card__image');
        placeCard.append(placeCardImage1);
        placeCardImage1.style.backgroundImage = `url(${this.link})`;

        function images(imageLink) {

            const imagePopup = document.createElement('div');
            imagePopup.classList.add('image-popup');
            root.append(imagePopup);

            const imagePopupImage = document.createElement('div');
            imagePopupImage.classList.add('image-popup__image');
            imagePopupImage.setAttribute('style', `background-image: url(${imageLink}`);
            imagePopup.append(imagePopupImage);

            const imagePopupClose = document.createElement('img');
            imagePopupClose.setAttribute('src', './images/close.svg');
            imagePopupClose.classList.add('image-popup__close');
            imagePopupImage.append(imagePopupClose);

            imagePopupClose.addEventListener("click", function (event) {
                if (event.which == 1) {
                    imagePopup.classList.toggle('image-popup');
                    root.removeChild(imagePopup);
                }

            });

        };

        placeCardImage1.addEventListener("click", function (event) {
  
            if (event.target.classList.contains('place-card__delete-icon')) {
                return;
            }
            else {
                const a = event.target.getAttribute('style');
                const b = a.slice(22, -1);
                images(b);
            }

        });

        const placeCardDeleteIcon1 = document.createElement('button');
        placeCardDeleteIcon1.classList.add('place-card__delete-icon');
        placeCardImage1.append(placeCardDeleteIcon1);

        const placeCardDescription1 = document.createElement('div');
        placeCardDescription1.classList.add('place-card__description');
        placeCard.append(placeCardDescription1);

        const placeCardName1 = document.createElement('h3');
        placeCardName1.classList.add('place-card__name');
        placeCardDescription1.append(placeCardName1);
        placeCardName1.textContent = this.name;

        const placeCardLikeIcon1 = document.createElement('button');
        placeCardLikeIcon1.classList.add('place-card__like-icon');
        placeCardDescription1.append(placeCardLikeIcon1);

        return placeCard;
    }
    remove() {
        this.cardElement.remove();

    }

};


class CardList {
    constructor(container, initialCards) {
        this.container = container;
        this.initialCards = initialCards;
        this.link = initialCards.link; 
        this.name = initialCards.name; 
        this.render();

    }
    addCard(card) {

        const newcard = new Card(card.name, card.link);

        this.container.appendChild(newcard.cardElement);

    }
    render() {

        for (let i = 0; i < this.initialCards.length; i++) {
            this.addCard(this.initialCards[i]);
        }
    }

};

let cardsList = new CardList(placesList, initialCards);

class Popup {

    constructor() {

        this.wrap = document.querySelector('.popup');
        this.wrapEdit = document.querySelector('.edit-popup');

    }

    open() {
        if (event.target.classList.contains('user-info__button')) {
            this.wrap.classList.add('popup_is-opened');
        }
        else if (event.target.classList.contains('user-info__edit')) {
            this.wrapEdit.classList.add('edit-popup_is-opened');
        }
    }

    close() {

        if (event.target.classList.contains('popup__close')) {
            this.wrap.classList.remove('popup_is-opened');
        }
        else if (event.target.classList.contains('edit-popup__close')) {
            this.wrapEdit.classList.remove('edit-popup_is-opened');
        }
    }
};

let popupMethods = new Popup();

//Функции

function validateForm(event) {

    const validator = event.target.name === 'link' ?
        validateLinkInput :
        validateTextInput;

    validator(event.target);

    if (!addForm.checkValidity()) {
        popupButton.setAttribute('disabled', 'disabled');
        popupButton.classList.remove('button_black', 'popup__button_black');

    }
    else {
        popupButton.removeAttribute('disabled');
        popupButton.classList.add('button_black', 'popup__button_black');

    }
    if (!editNew.checkValidity()) {

        editPopupButton.setAttribute('disabled', 'disabled');
        editPopupButton.classList.remove('button_black', 'edit-popup__button_black');
    }
    else {
        editPopupButton.removeAttribute('disabled');
        editPopupButton.classList.add('button_black', 'edit-popup__button_black');
    }

};

function validateTextInput(textInput) {
    let error = '';

    if (!textInput.checkValidity()) {

        if (textInput.validity.valueMissing) {
            error = 'Это обязательное поле'
        }
        if (textInput.validity.tooShort || textInput.validity.tooLong) {
            error = 'Должно быть от 2 до 30 символов'
        }
    }
    textInput.nextElementSibling.textContent = error;

}

function validateLinkInput(linkInput) {
    let error = '';

    if (!linkInput.checkValidity()) {

        if (linkInput.validity.valueMissing) {
            error = 'Это обязательное поле'
        }
        if (linkInput.validity.typeMismatch) {
            error = 'Здесь должна быть ссылка'
        }
    }
    linkInput.nextElementSibling.textContent = error;

};

//Обработчики

button.addEventListener("click", function () {
    popupMethods.open(); // применяем класс  Popup
});


buttonClose.addEventListener("click", function () {
    popupMethods.close(); // применяем класс  Popup
});

addForm.addEventListener('submit', function () {
    event.preventDefault();
    if (nameInput.value.length === 0 || linkInput.value.length === 0) {

        popupButton.setAttribute('disabled', 'disabled');

    }
    else {
        popupButton.classList.remove('button_black', 'popup__button_black');
        cardsList.addCard({ name: nameInput.value, link: linkInput.value }); //применяем класс CardList и класс Card
        popup.classList.toggle('popup_is-opened');
        addForm.reset();
    };

});

addForm.addEventListener('input', validateForm);
editNew.addEventListener('input', validateForm);
editNew.addEventListener('submit', function (event) {
    event.preventDefault();

    if (editname.value.length === 0 || editabout.value.length === 0) {

        editPopupButton.setAttribute('disabled', 'disabled');

    }
    else {
        userInfoName.textContent = editname.value;
        userInfoJob.textContent = editabout.value;
        editPopupButton.classList.remove('button_black', 'edit-popup__button_black');
        editPopup.classList.toggle('edit-popup_is-opened');
        editNew.reset();
    };

});

editButton.addEventListener("click", function () {
    popupMethods.open(); // применяем класс  Popup
    editname.value = userInfoName.textContent;
    editabout.value = userInfoJob.textContent;
}
);

editButtonClose.addEventListener("click", function () {
    popupMethods.close(); // применяем класс  Popup
    editNew.reset();

});
