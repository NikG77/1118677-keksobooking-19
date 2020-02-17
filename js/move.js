'use strict';

// Перемещение основной метки
(function () {
  var map = document.querySelector('.map');
  var buttonPinMain = map.querySelector('.map__pin--main');
  var offsetX = buttonPinMain.offsetWidth / 2;
  var offsetY = buttonPinMain.offsetHeight;
  var LIMIT = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  buttonPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Ограничает размеры согласно мин максимальным и размера смещения
    var limitSize = function (x, min, max, offset) {
      var minX = min - offset;
      var maxX = max - offset;
      var newX;
      if (x < minX) {
        newX = minX;
      } else if (x > maxX) {
        newX = maxX;
      } else {
        newX = x;
      }
      return newX;
    };

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var PinMainX = limitSize(buttonPinMain.offsetLeft - shift.x, LIMIT.MIN_X, LIMIT.MAX_X, offsetX);
      var PinMainY = limitSize(buttonPinMain.offsetTop - shift.y, LIMIT.MIN_Y, LIMIT.MAX_Y, offsetY);

      buttonPinMain.style.top = PinMainY + 'px';
      buttonPinMain.style.left = PinMainX + 'px';

      window.utils.showAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
