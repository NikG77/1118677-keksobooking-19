'use strict';

(function () {
  // var NUMBER_DATA = 8;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var MAIN_PIN = {
    WIDTH: 65,
    HEIGHT: 65,
    POINTER_Y: 22
  };

  var map = document.querySelector('.map');

  // Выдает рандомное число в диапозоне от minNumber до maxNumber
  var getRandomRange = function (minNumber, maxNumber) {
    return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
  };

  // Выводит в созданный div информацию об ошибке
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var renderCards = function (i) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.createCard(addressData[i]));
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  };

  var addressData;

  // Отрисовывает pin из базы даннных после успешного получения с сервера
  var onLoad = function (onloadData) {
    addressData = onloadData;
    window.pin.renderPins(addressData);
  };

  // Получает данные с сервера
  window.backend.load(URL, onLoad, onError);

  // Обработчик закрытия окна карточки
  var onPopupEscPress = function (evt) {
    window.keyCheck.isEscEvent(evt, closePopup);
  };

  // Выводит карточку на экран
  var showCard = function (evt) {
    var dataIndex = evt.target.closest('button').dataset.index;
    if (dataIndex) {
      renderCards(dataIndex);
      document.addEventListener('keydown', onPopupEscPress);
    }
  };

  // Закрывает popup по клавише ESC
  var closePopup = function () {
    document.querySelector('.popup').remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Активирует карточку объявления при клике на метку
  var setupOpenCard = map.querySelector('.map__pins');
  setupOpenCard.addEventListener('click', showCard);

  // Активирует карточку объявления пo tab
  setupOpenCard.addEventListener('keydown', function (evt) {
    window.keyCheck.isEnterEvent(evt, showCard);
  });

  var setupCloseCard = document.querySelector('.popup__close');
  // Закрывает карточку объявления по клику
  setupCloseCard.addEventListener('click', function () {
    closePopup();
  });

  // Задание 4.2
  var locationX = Math.round(getRandomRange(0, 1200) + MAIN_PIN.WIDTH / 2);
  var locationY = Math.round(getRandomRange(130, 630) + MAIN_PIN.HEIGHT / 2);

  var form = document.querySelector('.ad-form');
  var buttonPin = map.querySelector('.map__pin');

  var formInput = form.querySelectorAll('input');
  var formSelect = form.querySelectorAll('select');
  var formTextarea = form.querySelector('textarea');
  var formButton = form.querySelectorAll('.ad-form__submit');

  // Активизирует карту, показывает обновленный адрес со сдвигом на метку
  var openMap = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    activateInputForm();
    locationY += Math.round(MAIN_PIN.HEIGHT / 2 + MAIN_PIN.POINTER_Y);
    showAddress();
  };

  // Добавляет в 'ad-form' всем  input и select disabled
  var disableInputForm = function () {
    disablePartForm(formInput);
    disablePartForm(formSelect);
    disablePartForm(formTextarea);
    disablePartForm(formButton);
  };

  var disablePartForm = function (partForm) {
    for (var i = 0; i < partForm.length; i++) {
      partForm[i].disabled = true;
    }
  };

  // Удаляет из 'ad-form' input и select disabled
  var activateInputForm = function () {
    activatePartForm(formInput);
    activatePartForm(formSelect);
    activatePartForm(formTextarea);
    activatePartForm(formButton);
  };

  var activatePartForm = function (partForm) {
    for (var i = 0; i < partForm.length; i++) {
      partForm[i].disabled = false;
    }
  };

  // Показывает адрес текущей метки
  var showAddress = function () {
    form.querySelector('#address').value = locationX + ', ' + locationY;
  };

  showAddress();
  disableInputForm();

  // Активирует метку при нажатие основной кнопки мыши
  buttonPin.addEventListener('mousedown', function (evt) {
    window.keyCheck.isMouseMainClickEvent(evt, openMap);
  });

  // Активирует метку при нажатие Enter
  buttonPin.addEventListener('keydown', function (evt) {
    window.keyCheck.isEnterEvent(evt, openMap);
  });

})();
