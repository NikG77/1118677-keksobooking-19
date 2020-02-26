'use strict';
// Фильтры
(function () {
  var filters = document.querySelector('.map__filters');
  var filterTypeOfHouse = filters.querySelector('#housing-type');
  var filterPriceOfHouse = filters.querySelector('#housing-price');
  var filterRoomsOfHouse = filters.querySelector('#housing-rooms');
  var filterGuestOfHouse = filters.querySelector('#housing-guests');
  var filterFeaturesOfHouse = filters.querySelector('#housing-features');

  // Фильтрация по типу жилья
  filters.addEventListener('change', function () {
    if (window.map.openCardStatus) {
      window.map.closePopup();
    }
    if (filterTypeOfHouse.value === 'any') {
      window.map.addressDataCopy = window.map.addressData;
    } else {
      window.map.addressDataCopy = window.map.addressData.filter(function (data) {
        return data.offer.type === filterTypeOfHouse.value;
      });
    }

    // Фильтр по цене
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      if (filterPriceOfHouse.value === 'middle' && data.offer.price >= 10000 && data.offer.price < 50000) {
        return true;
      } else if (filterPriceOfHouse.value === 'low' && data.offer.price < 10000) {
        return true;
      } else if (filterPriceOfHouse.value === 'high' && data.offer.price >= 50000) {
        return true;
      }
      return filterPriceOfHouse.value === 'any';
    });

    // Фильтр по числу комнат
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      if (+filterRoomsOfHouse.value === +data.offer.rooms) {
        return true;
      }
      return filterRoomsOfHouse.value === 'any';
    });

    // фильтр по кол-ву гостей
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      if (+filterGuestOfHouse.value === +data.offer.guests) {
        return true;
      }
      return filterGuestOfHouse.value === 'any';
    });


    var filterFeaturesChecked = (filterFeaturesOfHouse.querySelectorAll('input[type="checkbox"]:checked'));

    // Проверяет наличие feature в массиве данных
    var checkFeature = function (array, feature) {
      return array.some(function (item) {
        return item === feature;
      });
    };

    // Фильтр по удобствам
    window.map.addressDataCopy = window.map.addressDataCopy.filter(function (data) {
      var resultOfChecking = true;
      for (var i = 0; i < filterFeaturesChecked.length; i++) {
        resultOfChecking = checkFeature(data.offer.features, filterFeaturesChecked[i].value);
        if (!resultOfChecking) {
          break;
        }
      }
      return resultOfChecking;
    });


    // console.log('На выходе', window.map.addressDataCopy);
    window.pin.renderPins(window.map.addressDataCopy.slice(0, window.data.NUMBER_PIN_SHOW));

  });

})();
