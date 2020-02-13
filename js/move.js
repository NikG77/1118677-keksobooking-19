'use strict';

(function () {

  // Перемещение диалогового окна

  var map = document.querySelector('.map');
  var buttonPinMain = map.querySelector('.map__pin--main');


  // var setupSubmit = setup.querySelector('.setup-submit');

  buttonPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    console.log(startCoords, startCoords.x);
    window.utils.showAddress(evt.clientX, evt.clientY);


    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      buttonPinMain.style.top = (buttonPinMain.offsetTop - shift.y) + 'px';
      buttonPinMain.style.left = (buttonPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          buttonPinMain.removeEventListener('click', onClickPreventDefault);
        };
        buttonPinMain.addEventListener('click', onClickPreventDefault);
      }

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
