// MooTools domready function
window.addEvent('domready', function() {
    AddEvents();
    SetUsername('Anonymous');
    // LoadMessages();
    GetNextMessage();
});

function AddEvents() {
    $$('#mykey').addEvents({
        change: function() {
            SetUsername(this.value);
        }
    });
    $$('#value').addEvents({
        keyup: function(e) {
            if (e.code == 13) {
                SendMessage(this.value);
            }
        }
    });
}

var userName;
var nextId;

function SetUsername(name) {
    userName = name;
    $$('#mykey').set('value', userName);
    SendMessage('has entered the chat');
}

function SendMessage(message) {
    writeRequest.get({
        action: 'write',
        mykey: userName,
        value: message
    });
    DisplayMessage(userName, message);
}

function DisplayMessage(userName, message) {
    $$('#messages').appendHTML('<b>' + userName + '</b> ' + message + '<br>');
    // $$('#messages').set('text', userName + ' ' + message);
    // alert (userName + ' ' + message);
}

function GetNextMessage() {
    readRequest.get({
        action: 'read',
        id: nextId
    });

    setTimeout(GetNextMessage, 2000);
}

var url = 'http://localhost/read_write/api.php';

var writeRequest = new Request.JSON({
    url: url,
    method: 'get',
    // onRequest: function() {
    // },
    onSuccess: function(json, text) {
        // alert (json);
        nextId = json +  1;
        $$('#value').set('value', '');
    },
    // onFailure: function() {
    //     alert('fail');
    // }
});

var readRequest = new Request.JSON({
    url: url,
    method: 'get',
    onSuccess: function(json, text) {
        if (json) {
            DisplayMessage(json.mykey, json.value);
            nextId = json.id + 1;
        }
    }
});
