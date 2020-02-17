'use strict';
// Работает с фильтрами
(function () {
  var filters = document.querySelector('.map__filters');
  var housingTypeFilter = filters.querySelector('#housing-type');

  housingTypeFilter.addEventListener('change', function (evt) {
    evt.preventDefault();

  });

})();
