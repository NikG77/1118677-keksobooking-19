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
var translateType = function (x) {
  for (var i = 0; i < type.length; i++) {
    if (type[i] === x) {
      return typeRu[i];
    }
  }
  return x;
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

// document.querySelector('.map').classList.remove('map--faded');
renderPins();
// метод отрисовки карточки можно закомментировать до тех пор, пока вы не доберётесь до 2-й части задания, чтобы eslint не ругался.
// renderCards();

// Задание 4.2

var KEY = {
  ESC: 'Escape',
  ENTER: 'Enter'
};

var form = document.querySelector('form');
var buttonMap = map.querySelector('.map__pin');

var openMapPin = function () {
  map.classList.remove('map--faded');
};

// Добавляет в form всем  input и select disabled
var disableInputForm = function () {
  var formInput = form.querySelectorAll('input');
  for (var i = 0; i < formInput.length; i++) {
    formInput[i].disabled = true;
  }

  var formSelect = form.querySelectorAll('select');
  for (var i = 0; i < formSelect.length; i++) {
    formSelect[i].disabled = true;
  }
};

disableInputForm();

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

var locationX = buttonMap.style.left;
var locationY = buttonMap.style.top;

buttonMap.querySelector('textPath').textContent += ' ' + locationX + ', ' + locationY;
console.log('locationX=', locationX, 'locationY=', locationY);

