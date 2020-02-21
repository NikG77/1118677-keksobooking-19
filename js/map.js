'use strict';

(function () {
  var URL_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL_FORM = 'https://js.dump.academy/keksobooking';

  var mapPinActive;
  var PIN_MAIN = {};

  var map = document.querySelector('.map');
  var buttonPinMain = map.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');
  var formFieldset = document.querySelectorAll('.fieldset');
  var formButton = form.querySelectorAll('.ad-form__submit');

  var formFilters = document.querySelector('.map__filters');
  var formFiltersSelect = formFilters.querySelectorAll('select');
  var formFiltersFieldset = formFilters.querySelector('fieldset');

  // Добавляет в form .map__filters всем select и fieldset disabled
  var disableFilterForm = function () {
    disablePartForm(formFiltersSelect);
    disablePartForm(formFiltersFieldset);
  };

  // Удаляет в form .map__filters всем select и fieldset disabled
  var activateFilterForm = function () {
    activatePartForm(formFiltersSelect);
    activatePartForm(formFiltersFieldset);
  };

  // Добавляет в 'ad-form' всем  input и select disabled
  var disableInputForm = function () {
    disablePartForm(formFieldset);
  };

  var disablePartForm = function (partForm) {
    for (var i = 0; i < partForm.length; i++) {
      partForm[i].disabled = true;
    }
  };

  // Удаляет из 'ad-form' fieldset disabled
  var activateInputForm = function () {
    activatePartForm(formFieldset);
  };

  var activatePartForm = function (partForm) {
    for (var i = 0; i < partForm.length; i++) {
      partForm[i].disabled = false;
    }
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

  // Выводит на экран карточку объявления
  var renderCards = function (i) {
    window.map.openCardStatus = true;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.createCard(window.map.addressDataCopy[i]));
    map.insertBefore(fragment, map.querySelector('.map__filters-container'));
  };

  // Сохраняет базу данных адресов из базы даннных после успешного получения
  // с сервера и проверки на наличия св-ва  offer
  var onLoad = function (onloadData) {
    var j = 0;
    for (var i = 0; i < onloadData.length; i++) {
      if (onloadData[i]['offer']) {
        window.map.addressData[j] = onloadData[i];
        j++;
      }
    }

    // Создает новый массив с заданным кол-вом меток NUMBER_PIN_SHOW
    window.map.addressDataCopy = window.map.addressData.slice();

    // Отрисовывает метки из базы данных
    window.pin.renderPins(window.map.addressDataCopy.slice(0, window.data.NUMBER_PIN_SHOW));
    activateFilterForm();
  };

  // Закрывает popup: удаляет показанное объявление из разметки,
  // удаляет обработчик ESC, удаляет класс map__pin--active и меняет
  // статус возможности открытия объявления
  var closePopup = function () {
    document.querySelector('.popup').remove();
    document.removeEventListener('keydown', onPopupEscPress);
    window.map.openCardStatus = false;
    mapPinActive.classList.remove('map__pin--active');
  };

  // Обработчик закрытия окна карточки ESC
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  // Выводит карточку на экран, активному элементу дает класс map__pin--active
  // и запоминает статус возможного открытия окна
  var showCard = function (evt) {
    var mapPinTest = evt.target.closest('button');
    if (mapPinTest && mapPinTest.tagName.toLowerCase() === 'button') {
      var dataIndex = mapPinTest.dataset.index;
      if (dataIndex) {
        if (window.map.openCardStatus) {
          closePopup();
        }
        renderCards(dataIndex);
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

  // Активизирует карту, показывает обновленный адрес со сдвигом на метку
  var openMap = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    // Меняем флаг открытия окна
    window.data.flagOpenMap = true;

    // Получает данные с сервера
    window.backend.load(URL_DATA, onLoad, onError);

    activateInputForm();
    window.utils.showAddress();

    // Запоминаем расположение основной метки
    PIN_MAIN.X = buttonPinMain.style.left;
    PIN_MAIN.Y = buttonPinMain.style.top;

    // Обработчики закрытия окна - не оставляю из-за повторного открытия
    buttonPinMain.removeEventListener('keydown', onOpenMapEnterPress);
    buttonPinMain.removeEventListener('mousedown', onOpenMapMouseMainClick);
  };

  // Слушаем карточку объявления при клике на метку на блок map__pins через делегирование
  var setupOpenCard = map.querySelector('.map__pins');
  setupOpenCard.addEventListener('click', showCard);

  // Слушаем карточку объявления пo tab
  setupOpenCard.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, showCard);
  });


  window.utils.showAddress();
  disableInputForm();
  disableFilterForm();

  // Обработчик открытия окна по Enter
  var onOpenMapEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, openMap);
  };

  // Обработчик открытия окна по сlick
  var onOpenMapMouseMainClick = function (evt) {
    window.utils.isMouseMainClickEvent(evt, openMap);
  };

  // Слушает метку при нажатие основной кнопки мыши
  buttonPinMain.addEventListener('mousedown', onOpenMapMouseMainClick);

  // Слушает метку при нажатие Enter
  buttonPinMain.addEventListener('keydown', onOpenMapEnterPress);

  // Сбрасывает форму и все данные
  var resetForm = function () {
    if (window.map.openCardStatus) {
      closePopup();
    }
    window.data.flagOpenMap = false;
    // Перезаписыват изначальный аватар
    document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';

    var preview = document.querySelector('.ad-form__photo');
    var previewImg = preview.querySelectorAll('img');
    // Удаляет загруженные фото из DOM
    previewImg.forEach(function (element) {
      preview.removeChild(element);
    });

    buttonPinMain.style.left = PIN_MAIN.X;
    buttonPinMain.style.top = PIN_MAIN.Y;

    form.reset();
    formFilters.reset();

    disableInputForm();
    disableFilterForm();
    window.pin.renderPins([]);

    window.utils.showAddress();
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    // Слушает метку при нажатие основной кнопки мыши
    buttonPinMain.addEventListener('mousedown', onOpenMapMouseMainClick);

    // Слушает метку при нажатие Enter
    buttonPinMain.addEventListener('keydown', onOpenMapEnterPress);
  };

  // Обработчик отправки формы
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    formButton.textContent = 'Данные отправляются ...';
    window.backend.save(URL_FORM, new FormData(form), window.unloadhandlers.onLoadForm, window.unloadhandlers.onErrorForm);

  });

  var formReset = form.querySelector('.ad-form__reset');
  // Обработчик сброса формы
  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });


  window.map = {
    closePopup: closePopup,
    resetForm: resetForm,
    openCardStatus: false,
    addressData: [],
    addressDataCopy: [],
  };

})();
