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

    addressElement.querySelector('.map__pin').style = locationUnion;
    addressElement.querySelector('img').src = address.author.avatar;
    addressElement.querySelector('img').alt = address.offer.title;
    addressElement.querySelector('.map__pin').dataset.index = i;
    // добавляет класс hiden меткам
    // addressElement.classList.add('hiden');
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
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(createPin(data[i], i));
      }
      similarPinElement.appendChild(fragment);
    }
  };
})();

