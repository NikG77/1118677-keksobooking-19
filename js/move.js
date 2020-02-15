'use strict';

(function () {
  // Перемещение диалогового окна

  var map = document.querySelector('.map');
  var buttonPinMain = map.querySelector('.map__pin--main');
  var offsetX = buttonPinMain.offsetWidth / 2;
  var offsetY = buttonPinMain.offsetHeight;


  // var setupSubmit = setup.querySelector('.setup-submit');

  buttonPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      /*
      var limitSizeX = function (x, min, max) {
        var indents = map.getBoundingClientRect().x;
        console.log('indentsX', indents);
        var minX = min + indents + offsetX;
        var maxX = max + indents - offsetX;
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

      var limitSizeY = function (y, min, max) {
        var minY = min - offsetY;
        var maxY = max - offsetY;
        var newY;
        if (y < minY) {
          newY = minY;
        } else if (y > maxY) {
          newY = maxY;
        } else {
          newY = y;
        }
        console.log('координата y ', y);
        return newY;
      };

      var finishX = limitSizeX(moveEvt.clientX, 0, 1200);
      var finishY = limitSizeY(moveEvt.clientY, 300, 500);
      */

      var finishX = moveEvt.clientX;
      var finishY = moveEvt.clientY;

      var shift = {
        x: startCoords.x - finishX,
        y: startCoords.y - finishY
      };

      startCoords = {
        x: finishX,
        y: finishY
      };

      console.log('buttonPinMain.offsetLeft=', buttonPinMain.offsetLeft);
      console.log('buttonPinMain.offsetTop=', buttonPinMain.offsetTop);
      var limitSize = function (x, min, max, offset) {
        // var indents = map.getBoundingClientRect().x;
        // console.log('indentsX', indents);
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

      var PinMainY = limitSize(buttonPinMain.offsetTop - shift.y, 130, 650, offsetY);
      var PinMainX = limitSize(buttonPinMain.offsetLeft - shift.x, 0, 1200, offsetX);


      buttonPinMain.style.top = PinMainY + 'px';
      buttonPinMain.style.left = PinMainX + 'px';

      // console.log('финиш ' + startCoords.x, startCoords.y);
      window.utils.showAddress(startCoords.x, startCoords.y);

      console.log('после buttonPinMain.offsetLeft=', buttonPinMain.offsetLeft);
      console.log('после buttonPinMain.offsetTop=', buttonPinMain.offsetTop);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // При закрытии окна сбрасывает сдвиг смещения окна
  /*
  var onCloseDialog = function () {
    setup.style.top = null;
    setup.style.left = null;
  };
  */

  // setupClose.addEventListener('click', onCloseDialog);
  // setupSubmit.addEventListener('click', onCloseDialog);

})();
