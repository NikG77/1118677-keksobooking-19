'use strict';

(function () {
  // var NUMBER_DATA = 8;
  var URL = 'https://js.dump.academy/keksobooking/data';

  var openCardStatus = true;
  var addressData = [];

  var mapPinActive;

  var map = document.querySelector('.map');
  var buttonPinMain = map.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');
  var formInput = form.querySelectorAll('input');
  var formSelect = form.querySelectorAll('select');
  var formTextarea = form.querySelector('textarea');
  var formButton = form.querySelectorAll('.ad-form__submit');

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

  // Выводит на экран карточку объявления
  var renderCards = function (i) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.createCard(addressData[i]));
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  };

  // Сохраняет базу данных адресов из базы даннных после успешного получения
  // с сервера и проверки на наличия св-ва  offer
  var onLoad = function (onloadData) {
    var j = 0;
    for (var i = 0; i < onloadData.length; i++) {
      if (onloadData[i]['offer']) {
        addressData[j] = onloadData[i];
        j++;
      }
    }
  };

  // Получает данные с сервера
  window.backend.load(URL, onLoad, onError);

  // Обработчик закрытия окна карточки ESC
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  // Закрывает popup: удаляет показанное объявление из разметки,
  // удаляет обработчик ESC, удаляет класс map__pin--active и меняет
  // статус возможности открытия объявления
  var closePopup = function () {
    document.querySelector('.popup').remove();
    document.removeEventListener('keydown', onPopupEscPress);
    openCardStatus = true;
    mapPinActive.classList.remove('map__pin--active');
  };

  // Выводит карточку на экран, активному элементу дает класс map__pin--active
  // и запоминает статус возможного открытия окна
  var showCard = function (evt) {
    var mapPinTest = evt.target.closest('button');
    if (mapPinTest && mapPinTest.tagName.toLowerCase() === 'button') {
      var dataIndex = mapPinTest.dataset.index;
      if (dataIndex) {
        if (!openCardStatus) {
          closePopup();
        }
        renderCards(dataIndex);
        openCardStatus = false;
        mapPinActive = mapPinTest;
        mapPinActive.classList.add('map__pin--active');

        // Включаю слушатель на закрытие по ESC
        document.addEventListener('keydown', onPopupEscPress);

        var setupCloseCard = document.querySelector('.popup__close');
        // включаю слушатель закрытия карточки объявления по клику
        setupCloseCard.addEventListener('click', function () {
          closePopup();
        });
      }
    }
  };

  // Активирует карточку объявления при клике на метку на блок map__pins через делегирование
  var setupOpenCard = map.querySelector('.map__pins');
  setupOpenCard.addEventListener('click', showCard);

  // Активирует карточку объявления пo tab
  setupOpenCard.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, showCard);
  });

  // Активизирует карту, показывает обновленный адрес со сдвигом на метку
  var openMap = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    // Меняем флаг открытия окна
    window.data.flagOpenMap = true;

    // Отрисовывает метки из базы данных
    window.pin.renderPins(addressData);

    activateInputForm();
    window.utils.showAddress();

    buttonPinMain.removeEventListener('keydown', onOpenMapEnterPress);
    buttonPinMain.removeEventListener('mousedown', onOpenMapMouseMainClick);
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

  window.utils.showAddress();
  disableInputForm();

  // Обработчик открытия окна по Enter
  var onOpenMapEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, openMap);
  };

  // Обработчик открытия окна по Enter
  var onOpenMapMouseMainClick = function (evt) {
    window.utils.isMouseMainClickEvent(evt, openMap);
  };


  // Активирует метку при нажатие основной кнопки мыши
  buttonPinMain.addEventListener('mousedown', onOpenMapMouseMainClick);

  // Активирует метку при нажатие Enter
  buttonPinMain.addEventListener('keydown', onOpenMapEnterPress);


})();
