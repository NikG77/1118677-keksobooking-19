'use strict';

(function () {
  var PRICE_MIN = 0;
  var PRICE_MAX = 1000;

  var type = ['palace', 'flat', 'house', 'bungalo'];
  // var typeRu = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
  window.data = function (number) {
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
})();

