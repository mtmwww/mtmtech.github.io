 $(document).ready(function() {
    var $links = $('.dropdown-submenu a.test').on("click", function(e) {
      var submenu = $(this).next();
        $subs.not(submenu).hide()
        submenu.toggle();
      //$(this).next('ul').toggle();
      e.stopPropagation();
      e.preventDefault();
    });
    var $subs = $links.next();

  });
