'use strict';

// Проверка нажатия клавиш
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MOUSE_MAIN_CLICK = 0;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    isMouseMainClickEvent: function (evt, action) {
      if (evt.button === MOUSE_MAIN_CLICK) {
        action();
      }
    },
    // Показывает адрес текущей метки
    showAddress: function (x, y) {
      document.querySelector('#address').value = Math.round(x) + ', ' + Math.round(y);
    },
    // Спрятать элемент, добавив класс  'hidden'
    hideElement: function (hideClass) {
      document.querySelector(hideClass).classList.add('hidden');
    },
    // Показать элемент, убрав класс  'hidden'
    showElement: function (showClass) {
      document.querySelector(showClass).classList.remove('hidden');
    }
  };
})();
