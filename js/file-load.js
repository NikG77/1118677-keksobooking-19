'use strict';
// Загрузка изображений помещений
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var NUMBER_MAX_IMG = 2;

  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var preview = document.querySelector('.ad-form__photo');

  var i = 1;
  var newElementImg = [];


  var onFileImageTypeChange = function () {

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      var onFileImageTypeLoad = function () {
        newElementImg[i] = document.createElement('img');
        newElementImg[i].dataset.index = i;
        newElementImg[i].alt = 'Фотография жилья N' + (i);
        newElementImg[i].width = '60';
        newElementImg[i].height = '60';
        newElementImg[i].src = reader.result;
        preview.appendChild(newElementImg[i]);
        i++;
      };

      reader.addEventListener('load', onFileImageTypeLoad);
      reader.readAsDataURL(file);

      if (i > NUMBER_MAX_IMG) {
        fileChooser.removeEventListener('change', onFileImageTypeChange);
        reader.removeEventListener('load', onFileImageTypeLoad);
      }

    }
  };
  fileChooser.addEventListener('change', onFileImageTypeChange);

})();
