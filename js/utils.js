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
    showAddress: function () {
      var buttonPinMain = map.querySelector('.map__pin--main');
      var offsetX = buttonPinMain.offsetWidth / 2;
      var offsetY = buttonPinMain.offsetHeight;
      var PinMainX;
      var PinMainY;

      if (!window.data.flagOpenMap) {
        offsetY = buttonPinMain.offsetHeight / 2;
      }

      PinMainX = Math.floor(buttonPinMain.offsetLeft + offsetX);
      PinMainY = Math.floor(buttonPinMain.offsetTop + offsetY);

      document.querySelector('#address').value = PinMainX + ', ' + PinMainY;
    },

  };
})();
