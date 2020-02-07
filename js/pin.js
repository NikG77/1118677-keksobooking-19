'use strict';
// Создает метку на основе шаблона #pin по полученному объекту
(function () {
  var PIN_SIZE_X = 40;
  var PIN_SIZE_Y = 40;

  var similarPinTemplate = document.querySelector('#pin').content;
  var similarPinElement = document.querySelector('.map').querySelector('.map__pins');

  var createPin = function (address) {
    var addressElement = similarPinTemplate.cloneNode(true);
    var locationUnion = 'left: ' + (address.location.x - PIN_SIZE_X / 2) + 'px; ' + 'top: ' + (address.location.y - PIN_SIZE_Y) + 'px; ';

    addressElement.querySelector('.map__pin').style = locationUnion;
    addressElement.querySelector('img').src = address.author.avatar;
    addressElement.querySelector('img').alt = address.offer.title;
    return addressElement;
  };

  // Выводит в разметку созданные метки
  window.pin = {
    renderPins: function (addressData) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < addressData.length; i++) {
        fragment.appendChild(createPin(addressData[i]));
      }
      similarPinElement.appendChild(fragment);
    }
  };
})();

