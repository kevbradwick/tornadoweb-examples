(function() {

  jQuery(function($) {
    var getMessages, log, messages;
    log = function(message) {
      return typeof console !== "undefined" && console !== null ? console.log(message) : void 0;
    };
    messages = $('ul#messages');
    getMessages = function() {
      return $.ajax({
        url: '//localhost:8000/message',
        type: 'get',
        dataType: 'json',
        success: function(data) {
          var li;
          li = "<li>" + data.message + "</li>";
          messages.append("<li>" + data.message + "</li>");
          return setTimeout(getMessages, 0);
        }
      });
    };
    setTimeout(getMessages, 200);
    return $('input#message').keypress(function(e) {
      var myMessage;
      if (e.keyCode === 13) {
        e.preventDefault();
        myMessage = this.value;
        return $.ajax({
          url: '//localhost:8000/message',
          type: 'post',
          dataType: 'json',
          data: {
            message: this.value
          },
          success: function(data) {
            return $('input#message').val('');
          },
          error: function(data) {
            return log(data);
          }
        });
      }
    });
  });

}).call(this);
