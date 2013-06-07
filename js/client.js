$(function() {

var socket = io.connect('http://localhost/');

socket.on('message', function(data) {
    appendMessage(data);
});

//Events assignation
var messageForm = $('#messageForm');
//$(messageForm).submit(function(e) {
$(messageForm).on('submit', function(e) {
    e.preventDefault();
    var msg = $.trim($('#userMessage').val());
    if (msg.length > 0) {
        socket.emit('message', msg);
    }
});

function appendMessage(data) {
    var chatLog = $('#chatLog');
    var msgRow = $('<div/>').html(data);
    $(chatLog).append(msgRow);
}

});
