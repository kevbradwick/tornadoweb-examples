(function() {

  jQuery(function($) {
    var error, log, messages, websocket;
    log = function(message) {
      return typeof console !== "undefined" && console !== null ? console.log(message) : void 0;
    };
    error = function(message) {
      return typeof console !== "undefined" && console !== null ? console.erro(message) : void 0;
    };
    messages = $('ul#messages');
    websocket = new WebSocket('ws://localhost:8000/message');
    websocket.onmessage = function(event) {
      var li;
      log("Receive: " + event.data);
      li = "<li>" + message + "</li>";
      return messages.append("<li>" + event.data + "</li>");
    };
    websocket.onerror = function(event) {
      return error(event);
    };
    return $('input#message').keypress(function(e) {
      var data;
      if (e.keyCode === 13) {
        e.preventDefault();
        log("Sending Message: " + this.value);
        data = {
          action: 'add',
          body: this.value
        };
        websocket.send(JSON.stringify(data));
        return this.value = '';
      }
    });
  });

}).call(this);
