$(document).ready(function() {

  if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
    skrollr.init({
      forceHeight: false
    });
  }

  $('#main')
    .transition('fade up in', 2000);
});
