'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content;

  // Удаляет список дочерних элементы list и cоздает на основе входящего массива arr новый список
  var createFeature = function (features, list) {
    list.innerHTML = '';
    features.forEach(function (data) {
      var newElementLi = document.createElement('li');
      newElementLi.classList.add('popup__feature');
      newElementLi.classList.add('popup__feature--' + data);
      list.appendChild(newElementLi);
    });
  };

  // Создает список фотографий из полученного массива
  var createPhotos = function (arr, photosTemplate) {
    photosTemplate.querySelector('img').src = arr[0];
    for (var i = 1; i < arr.length; i++) {
      var newElementImages = photosTemplate.querySelector('img').cloneNode(true);
      newElementImages.src = arr[i];
      photosTemplate.appendChild(newElementImages);
    }
  };

  // Создает карточку адреса по шаблону #card по полученному объекту
  window.card = {
    createCard: function (addressObject) {
      var addressElement = similarCardTemplate.cloneNode(true);
      var list = addressElement.querySelector('.popup__features');
      var photosTemplate = addressElement.querySelector('.popup__photos');

      addressElement.querySelector('.popup__title').textContent = addressObject.offer.title;
      addressElement.querySelector('.popup__text--address').textContent = addressObject.offer.address;
      addressElement.querySelector('.popup__text--price').textContent = addressObject.offer.price + '₽/ночь';
      addressElement.querySelector('.popup__type').textContent = window.data.typeHouseListMap[addressObject.offer.type];
      addressElement.querySelector('.popup__text--capacity').textContent = addressObject.offer.rooms + ' комнаты для ' + addressObject.offer.guests + ' гостей';
      addressElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + addressObject.offer.checkin + ', выезд до ' + addressObject.offer.checkout;
      addressElement.querySelector('.popup__description').textContent = addressObject.offer.description;
      addressElement.querySelector('.popup__avatar').src = addressObject.author.avatar;

      if (addressObject.offer.features[0]) {
        createFeature(addressObject.offer.features, list);
      } else {
        addressElement.querySelector('.popup__features').remove();
      }

      if (addressObject.offer.photos[0]) {
        createPhotos(addressObject.offer.photos, photosTemplate);
      } else {
        addressElement.querySelector('.popup__photos').remove();
      }

      return addressElement;
    }
  };

})();
