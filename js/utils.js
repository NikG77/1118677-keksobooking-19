'use strict';

// Проверка нажатия клавиш
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MOUSE_MAIN_CLICK = 0;

  var map = document.querySelector('.map');

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(evt);
      }
    },
    isMouseMainClickEvent: function (evt, action) {
      if (evt.button === MOUSE_MAIN_CLICK) {
        action();
      }
    },
    // Показывает адрес текущей метки
    showAddress: function (x, y) {
      var indents = map.getBoundingClientRect();
      var buttonPinMain = map.querySelector('.map__pin--main');
      var offsetX = buttonPinMain.offsetWidth / 2;
      var offsetY;


      if (window.data.flagOpenMap) {
        console.log('окно открыто');
        offsetY = buttonPinMain.offsetHeight;
      } else {
        console.log('окно закрыто');
        offsetY = buttonPinMain.offsetHeight / 2;
      }

      var indents = map.getBoundingClientRect().x;
      console.log('indentsX', indents);
      console.log('левая Х ', x, 'указательХ ', x + offsetX, 'Yверхняя ', y, 'метка у ', y + offsetY);
      console.log('buttonPinMain.offsetLeft=', buttonPinMain.offsetLeft);
      console.log('buttonPinMain.offsetTop=', buttonPinMain.offsetTop);
      // console.log('вычисляемая середина', Math.round(x - indents.x + offsetX), '  ', Math.round(y - indents.y + offsetY));
      // document.querySelector('#address').value = Math.round(x - indents.x + offsetX) + ',! ' + Math.round(y - indents.x + offsetY);
      document.querySelector('#address').value = Math.round(buttonPinMain.offsetLeft + offsetX) + ', ' + Math.round(buttonPinMain.offsetTop + offsetY);
    },
    // Спрятать элемент, добавив класс  'hidden'
    hideElement: function (hideClass) {
      document.querySelector(hideClass).classList.add('hidden');
    },

    // Показать элемент, убрав класс  'hidden'
    showElement: function (showClass) {
      document.querySelector(showClass).classList.remove('hidden');
    },

    // Выдает рандомное число в диапозоне от minNumber до maxNumber
    getRandomRange: function (minNumber, maxNumber) {
      return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
    },

    // Выдает на основе входящего массива один рандомный элемент массива
    getRandomElement: function (arr) {
      var numberRandom = window.utils.getRandomRange(0, arr.length - 1);
      return arr[numberRandom];
    },

    // Выдает на основе входящего массива массив с рандомным кол-вом элементов
    getRandomArray: function (arr) {
      var numberRandom = window.utils.getRandomRange(0, arr.length);
      var arrClon = arr.slice();
      var arrNew = [];
      var numberArrRandom;

      for (var j = 0; j < numberRandom; j++) {
        numberArrRandom = window.utils.getRandomRange(0, arrClon.length - 1);
        arrNew[j] = arrClon[numberArrRandom];
        arrClon.splice(numberArrRandom, 1);
      }
      return arrNew;
    },

    // Выдает рандомный ключ объекта
    getRandomObject: function (obj) {
      var array = Object.keys(obj);
      return window.utils.getRandomElement(array);
    },
  };
})();
