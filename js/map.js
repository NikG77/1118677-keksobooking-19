'use strict';

(function () {
  var NUMBER_DATA = 8;
  var MAIN_PIN_SIZE_X = 65;
  var MAIN_PIN_SIZE_Y = 65;
  var MAIN_POINTER_Y = 22;

  var map = document.querySelector('.map');

  // Выдает рандомное число в диапозоне от minNumber до maxNumber
  var getRandomRange = function (minNumber, maxNumber) {
    return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
  };

  var addressData;
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

  var addressData;
  var onLoad = function (onloadData) {
    addressData = onloadData;
  };

  // метод отрисовки карточки можно закомментировать до тех пор, пока вы не доберётесь до 2-й части задания, чтобы eslint не ругался.
  // Добавляет в DOM созданные карточки до NUMBER_DATA элемента
  var renderCards = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_DATA; i++) {
      fragment.appendChild(window.card.createCard(addressData[i]));
    }
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  };

  // Создает NUMBER_DATA рандомных объявлений
  // addressData = window.data.createAddressData(NUMBER_DATA);

  // Получает данные с сервера
  window.backend.load(onLoad, onError);

  // Выводит pin на экран
  window.pin.renderPins(addressData);

  // Выводит объявление в разметку
  renderCards();

  // Задание 4.2
  var locationX = Math.round(getRandomRange(0, 1200) + MAIN_PIN_SIZE_X / 2);
  var locationY = Math.round(getRandomRange(130, 630) + MAIN_PIN_SIZE_Y / 2);

  var form = document.querySelector('.ad-form');
  var buttonMap = map.querySelector('.map__pin');

  var formInput = form.querySelectorAll('input');
  var formSelect = form.querySelectorAll('select');
  var formTextarea = form.querySelector('textarea');
  var formButton = form.querySelectorAll('.ad-form__submit');

  // Активизирует карту, показывает обновленный адрес со сдвигом на метку
  var openMap = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    activateInputForm();
    locationY += Math.round(MAIN_PIN_SIZE_Y / 2 + MAIN_POINTER_Y);
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
  buttonMap.addEventListener('mousedown', function (evt) {
    window.keyCheck.isMouseMainClickEvent(evt, openMap);
  });

  // Активирует метку при нажатие Enter
  buttonMap.addEventListener('keydown', function (evt) {
    window.keyCheck.isEnterEvent(evt, openMap);
  });

})();
