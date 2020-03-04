'use strict';
// Создает метку на основе шаблона #pin по полученному объекту
(function () {
  var PIN = {
    WIDTH: 40,
    HEIGHT: 40
  };

  var similarPinTemplate = document.querySelector('#pin').content;

  // Создает pin с адресом, аватором на img и alt для img
  var createPin = function (address, i) {
    var addressElement = similarPinTemplate.cloneNode(true);
    var locationUnion = 'left: ' + (address.location.x - PIN.WIDTH / 2) + 'px; ' + 'top: ' + (address.location.y - PIN.HEIGHT) + 'px; ';
    var newPin = addressElement.querySelector('.map__pin');
    var newPinImg = addressElement.querySelector('img');

    newPin.style = locationUnion;
    newPinImg.src = address.author.avatar;
    newPinImg.alt = address.offer.title;
    newPin.dataset.index = i;

    return addressElement;
  };

  // Выводит в разметку созданные метки
  window.pin = {
    renderPins: function (data) {
      var similarPinElement = document.querySelector('.map').querySelector('.map__pins');
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      // Удаляет старые метки из разметки
      mapPins.forEach(function (mapPin) {
        similarPinElement.removeChild(mapPin);
      });

      var fragment = document.createDocumentFragment();
      data.forEach(function (element, index) {
        fragment.appendChild(createPin(element, index));
      });
      similarPinElement.appendChild(fragment);
    }
  };
})();

