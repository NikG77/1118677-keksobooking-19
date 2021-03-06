'use strict';
// Фильтры
(function () {
  var PRICE_MIDLE = {
    MIN: 10000,
    MAX: 50000,
  };

  var filters = document.querySelector('.map__filters');
  var filterTypeOfHouse = filters.querySelector('#housing-type');
  var filterPriceOfHouse = filters.querySelector('#housing-price');
  var filterRoomsOfHouse = filters.querySelector('#housing-rooms');
  var filterGuestOfHouse = filters.querySelector('#housing-guests');
  var filterFeaturesOfHouse = filters.querySelector('#housing-features');


  var updateFilters = function () {
    var filterFeaturesChecked = filterFeaturesOfHouse.querySelectorAll('input[type="checkbox"]:checked');

    // Закрываем объявление. если оно открыто
    if (window.map.openCardStatus) {
      window.map.closePopup();
    }

    // Фильтрация по типу жилья
    var filterByType = function (data) {
      return filterTypeOfHouse.value === 'any' || filterTypeOfHouse.value === data.offer.type;
    };

    // Проверка на соответсвия low цене
    var checkMinPrice = function (data) {
      return filterPriceOfHouse.value === 'low' && data.offer.price < PRICE_MIDLE.MIN;
    };

    // Проверка на соответсвиt middle цене
    var checkMiddlePrice = function (data) {
      return filterPriceOfHouse.value === 'middle' && data.offer.price >= PRICE_MIDLE.MIN && data.offer.price < PRICE_MIDLE.MAX;
    };

    // Проверка на соответсвиt high цене
    var checkHighPrice = function (data) {
      return filterPriceOfHouse.value === 'high' && data.offer.price >= PRICE_MIDLE.MAX;
    };

    // Фильтр по цене
    var filterByPrice = function (data) {
      return filterPriceOfHouse.value === 'any' || checkMiddlePrice(data) || checkMinPrice(data) || checkHighPrice();
    };

    // Фильтр по числу комнат
    var filterByRoom = function (data) {
      return filterRoomsOfHouse.value === 'any' || +filterRoomsOfHouse.value === +data.offer.rooms;
    };

    // фильтр по кол-ву гостей
    var filterByGuest = function (data) {
      return filterGuestOfHouse.value === 'any' || +filterGuestOfHouse.value === +data.offer.guests;
    };

    // Фильтр по удобствам
    var filterByFeatures = function (data) {
      var resultOfChecking = true;
      for (var i = 0; i < filterFeaturesChecked.length; i++) {
        resultOfChecking = data.offer.features.some(function (item) {
          return item === filterFeaturesChecked[i].value;
        });
        if (!resultOfChecking) {
          break;
        }
      }
      return resultOfChecking;
    };

    window.map.addressDataCopy = window.map.addressData.filter(function (data) {
      return filterByType(data) && filterByPrice(data) && filterByRoom(data) && filterByGuest(data) && filterByFeatures(data) ? true : false;
    });

    window.pin.renderPins(window.map.addressDataCopy.slice(0, window.data.NUMBER_PIN_SHOW));
  };


  var onSelectFilters = window.debounce(function () {
    updateFilters();
  });

  filters.addEventListener('change', onSelectFilters);

})();
