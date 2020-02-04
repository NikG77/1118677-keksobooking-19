'use strict';

var NUMBER_DATA = 8;
var PIN_SIZE_X = 40;
var PIN_SIZE_Y = 40;
var PRICE_MIN = 0;
var PRICE_MAX = 1000;

var type = ['palace', 'flat', 'house', 'bungalo'];
var typeRu = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var similarPinTemplate = document.querySelector('#pin').content;
var similarPinElement = document.querySelector('.map').querySelector('.map__pins');

var similarCardTemplate = document.querySelector('#card').content;

var map = document.querySelector('.map');

// Выдает рандомное число в диапозоне от minNumber до maxNumber
var getRandomRange = function (minNumber, maxNumber) {
  return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
};

// Выдает на основе входящего массива один рандомный элемент массива
var getRandomElement = function (arr) {
  var numberRandom = getRandomRange(0, arr.length - 1);
  return arr[numberRandom];
};

// Выдает на основе входящего массива массив с рандомным кол-вом элементов
var getRandomArray = function (arr) {
  var numberRandom = getRandomRange(0, arr.length);
  var arrClon = arr.slice();
  var arrNew = [];
  var numberArrRandom;

  for (var j = 0; j < numberRandom; j++) {
    numberArrRandom = getRandomRange(0, arrClon.length - 1);
    arrNew[j] = arrClon[numberArrRandom];
    arrClon.splice(numberArrRandom, 1);
  }
  return arrNew;
};

// Создает массив с рандомными объектами адрессов по входящему кол-ву массива
var createAddressData = function (number) {
  var anyAddressData = [];
  for (var i = 0; i < number; i++) {
    anyAddressData[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        address: '600, 350',
        price: getRandomRange(PRICE_MIN, PRICE_MAX),
        type: getRandomElement(type),
        rooms: getRandomRange(0, 10),
        guests: getRandomRange(0, 10),
        checkin: getRandomElement(checkin),
        checkout: getRandomElement(checkout),
        features: getRandomArray(features),
        description: 'строка с описанием',
        photos: getRandomArray(photos)
      },
      location: {
        x: getRandomRange(0, 1200),
        y: getRandomRange(130, 650)
      }
    };
  }
  return anyAddressData;
};

// Создает метку на основе шаблона #pin по полученному объекту
var createPin = function (address) {
  var addressElement = similarPinTemplate.cloneNode(true);
  var locationUnion = 'left: ' + (address.location.x - PIN_SIZE_X / 2) + 'px; ' + 'top: ' + (address.location.y - PIN_SIZE_Y) + 'px; ';

  addressElement.querySelector('.map__pin').style = locationUnion;
  addressElement.querySelector('img').src = address.author.avatar;
  addressElement.querySelector('img').alt = address.offer.title;
  return addressElement;
};

// Выводит в разметку созданные метки
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < addressData.length; i++) {
    fragment.appendChild(createPin(addressData[i]));
  }
  similarPinElement.appendChild(fragment);
};

// Переводит тип адреса с английского на русский
var translateType = function (translateWord) {
  for (var i = 0; i < type.length; i++) {
    if (type[i] === translateWord) {
      return typeRu[i];
    }
  }
  return translateWord;
};

// Удаляет список дочерние элементы list и cоздает на основе входящего массива arr новый список
var createFeature = function (arr, list) {
  list.innerHTML = '';
  for (var i = 0; i < arr.length; i++) {
    var newElementLi = document.createElement('li');
    newElementLi.classList.add('popup__feature');
    newElementLi.classList.add('popup__feature--' + arr[i]);
    list.appendChild(newElementLi);
  }
};

// Создает список фотографий из полученного массива
var createPhotos = function (arr, photosTemplate) {
  photosTemplate.querySelector('img').src = arr[0];
  for (var i = 1; i < arr.length; i++) {
    var newElementImg = photosTemplate.querySelector('img').cloneNode(true);
    newElementImg.src = arr[i];
    photosTemplate.appendChild(newElementImg);
  }
};

// Создает карточку адреса по шаблону #card по полученному объекту
var createCard = function (addressObject) {
  var addressElement = similarCardTemplate.cloneNode(true);
  var list = addressElement.querySelector('.popup__features');
  var photosTemplate = addressElement.querySelector('.popup__photos');

  addressElement.querySelector('.popup__title').textContent = addressObject.offer.title;
  addressElement.querySelector('.popup__text--address').textContent = addressObject.offer.address;
  addressElement.querySelector('.popup__text--price').textContent = addressObject.offer.price + '₽/ночь';
  addressElement.querySelector('.popup__type').textContent = translateType(addressObject.offer.type);
  addressElement.querySelector('.popup__text--capacity').textContent = addressObject.offer.rooms + ' комнаты для ' + addressObject.offer.guests + ' гостей';
  addressElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + addressObject.offer.checkin + ', выезд до ' + addressObject.offer.checkout;
  addressElement.querySelector('.popup__description').textContent = addressObject.offer.description;
  addressElement.querySelector('.popup__avatar').src = addressObject.author.avatar;

  if (addressObject.offer.features[0]) {
    createFeature(addressObject.offer.features, list);
  } else {
    addressElement.querySelector('.popup__features').remove();
  }

  if (addressObject.offer.photos[0]) {
    createPhotos(addressObject.offer.photos, photosTemplate);
  } else {
    addressElement.querySelector('.popup__photos').remove();
  }

  return addressElement;
};

// Выводит в разметку созданные карточки
var renderCards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 1; i++) {
    fragment.appendChild(createCard(addressData[i]));
  }
  map.insertBefore(fragment, map.querySelector('.map__filters-container'));
};

var addressData = createAddressData(NUMBER_DATA);
// renderPins();
// метод отрисовки карточки можно закомментировать до тех пор, пока вы не доберётесь до 2-й части задания, чтобы eslint не ругался.
// renderCards();

// Задание 4.2

var KEY = {
  ESC: 'Escape',
  ENTER: 'Enter'
};
var MAIN_PIN_SIZE_X = 65;
var MAIN_PIN_SIZE_Y = 65;
var MAIN_POINTER_Y = 22;

var locationX = Math.round(getRandomRange(0, 1200) + MAIN_PIN_SIZE_X / 2);
var locationY = Math.round(getRandomRange(130, 630) + MAIN_PIN_SIZE_Y / 2);

var form = document.querySelector('.ad-form');
var buttonMap = map.querySelector('.map__pin');

var formInput = form.querySelectorAll('input');
var formSelect = form.querySelectorAll('select');
var formTextarea = form.querySelector('textarea');
var formButton = form.querySelector('.ad-form__submit');

// Активизирует карту, показывает обновленный адрес со сдвигом на метку
var openMapPin = function () {
  map.classList.remove('map--faded');
  activateInputForm();
  locationY += Math.round(MAIN_PIN_SIZE_Y / 2 + MAIN_POINTER_Y);
  showAddress();
};

// Добавляет в 'ad-form' всем  input и select disabled
var disableInputForm = function () {
  for (var i = 0; i < formInput.length; i++) {
    formInput[i].disabled = true;
  }

  for (var j = 0; j < formSelect.length; j++) {
    formSelect[j].disabled = true;
  }

  formTextarea.disabled = true;
  formButton.disabled = true;
};

// Удаляет из 'ad-form' input и select disabled
var activateInputForm = function () {
  for (var i = 0; i < formInput.length; i++) {
    formInput[i].disabled = false;
  }

  for (var j = 0; j < formSelect.length; j++) {
    formSelect[j].disabled = false;
  }

  formTextarea.disabled = false;
  formButton.disabled = false;
};

// Показывает адрес текущей метки
var showAddress = function () {
  form.querySelector('#address').value = locationX + ', ' + locationY;
};

disableInputForm();
showAddress();


// Активирует метку при нажатие основной кнопки мыши
buttonMap.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    openMapPin();
  }
});

// Активирует метку при нажатие Enter
buttonMap.addEventListener('keydown', function (evt) {
  if (evt.key === KEY.ENTER) {
    openMapPin();
  }
});

// временные данные для тестового ввода
form.querySelector('#title').value = 'Важно!!! Милая, уютная квартирка в центре Токио';
form.querySelector('#price').value = 6000;

var roomNumber = form.querySelector('#room_number');
var capacityPeople = form.querySelector('#capacity');


/* Пытался повесить слушатель на форму на submit но ничего не получилось
form.addEventListener('submit', function (evt) {
  var target = evt.target.roomNumber;
  if (target.value !== capacityPeople.value) {
    target.setCustomValidity('1 комната — «для 1 гостя»');
  } else {
    target.setCustomValidity('');
  }
});
*/

// Работает корректно только если последним меняется кол-во комнат
/*
roomNumber.addEventListener('change', function (evt) {
  var target = evt.target;
  if (+target.value === 1 && +target.value !== +capacityPeople.value) {
    target.setCustomValidity('Допустимо 1 комната — «для 1 гостя»');
  } else if (+target.value === 2 && (+target.value < +capacityPeople.value || +capacityPeople.value === 0)) {
    target.setCustomValidity('Допустимо 2 комнаты — «для 2 гостей» или «для 1 гостя»');
  } else if (+target.value === 3 && (+target.value < +capacityPeople.value || +capacityPeople.value === 0)) {
    target.setCustomValidity('Допустимо 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (+target.value === 100 && +capacityPeople.value !== 0) {
    target.setCustomValidity('Допустимо 100 комнат — «не для гостей»');
  } else {
    target.setCustomValidity('');
  }
});
*/

form.addEventListener('submit', function () {
  if (+roomNumber.value === 1 && +roomNumber.value !== +capacityPeople.value) {
    roomNumber.setCustomValidity('Допустимо 1 комната — «для 1 гостя»');
  } else if (+roomNumber.value === 2 && (+roomNumber.value < +capacityPeople.value || +capacityPeople.value === 0)) {
    roomNumber.setCustomValidity('Допустимо 2 комнаты — «для 2 гостей» или «для 1 гостя»');
  } else if (+roomNumber.value === 3 && (+roomNumber.value < +capacityPeople.value || +capacityPeople.value === 0)) {
    roomNumber.setCustomValidity('Допустимо 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (+roomNumber.value === 100 && +capacityPeople.value !== 0) {
    roomNumber.setCustomValidity('Допустимо 100 комнат — «не для гостей»');
  } else {
    roomNumber.setCustomValidity('');
  }
  // console.log(roomNumber.value, typeof (roomNumber.value), typeof (+roomNumber.value));
  // console.log(capacityPeople.value, typeof (capacityPeople.value));
});

