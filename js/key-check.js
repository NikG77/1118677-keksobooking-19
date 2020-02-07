'use strict';

// Проверка нажатия клавиш
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MOUSE_MAIN_CLICK = 0;

  window.keyCheck = {
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
    }
  };
})();
