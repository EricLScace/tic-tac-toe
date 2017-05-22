(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['gameGrid'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Game board -->\n<div class=\"row\">\n  <div id=\"0\" class=\"game-grid col-xs-2 col-xs-offset-3\"></div>\n  <div id=\"1\" class=\"game-grid col-xs-2 game-grid-column\"></div>\n  <div id=\"2\" class=\"game-grid col-xs-2\"></div>\n</div>\n\n<div class=\"row\">\n  <div id=\"3\" class=\"game-grid col-xs-2 col-xs-offset-3 game-grid-row\"></div>\n  <div id=\"4\" class=\"game-grid col-xs-2 game-grid-center\"></div>\n  <div id=\"5\" class=\"game-grid col-xs-2 game-grid-row\"></div>\n</div>\n\n<div class=\"row\">\n  <div id=\"6\" class=\"game-grid col-xs-2 col-xs-offset-3\"></div>\n  <div id=\"7\" class=\"game-grid col-xs-2 game-grid-column\"></div>\n  <div id=\"8\" class=\"game-grid col-xs-2\"></div>\n</div>\n";
},"useData":true});
templates['player'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Player while in game -->\n<div class=\"row\">\n\n  <div class=\"player-name col-xs-offset-3 col-xs-5\">\n  </div>\n\n  <div class=\"player-actions col-xs-3\">\n  </div>\n</div>\n";
},"useData":true});
templates['signInRegister'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Log-in HTML -->\n<div class=\"player1 col-xs-offset-1 col-xs-3\">\n  <form id=\"sign-in\">\n    <fieldset>\n      <p>Log in:</p>\n\n      <input type=\"text\"\n      name=\"credentials[email]\" placeholder=\"player name\">\n      <br>\n\n      <input type=\"password\"\n      name=\"credentials[password]\" placeholder=\"password\">\n      <br>\n\n      <input type=\"submit\" name=\"submit\" value=\"Log in\">\n    </fieldset>\n  </form>\n</div>\n\n<!-- Register HTML -->\n<div class='player1 col-xs-3'>\n  <form id=\"sign-up\">\n    <fieldset>\n      <p>…or register:<p>\n\n      <input type='text'\n      name='credentials[email]' placeholder='player name'>\n\n      <input type='password'\n      name='credentials[password]' placeholder='password'>\n\n      <input type='password'\n      name='credentials[password_confirmation]' placeholder='confirm password'>\n\n      <input type=\"submit\" name=\"submit\" value=\"Register\">\n    </fieldset>\n  </form>\n</div>\n";
},"useData":true});
})();