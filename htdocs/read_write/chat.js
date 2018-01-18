// MooTools domready function
window.addEvent('domready', function() {
    AddEvents();
    ListMessages();
    SetUsername('Anonymous');

    // schedule poll
    setTimeout(GetNextMessage, pollingInterval);
});

/* CONFIGURATION */
// var apiUrl = 'http://www.codegorilla.nl/read_write/api.php';
// var apiUrl = 'http://10.11.13.231/read_write/api.php';
var apiUrl = 'http://localhost/read_write/api.php';
var pollingInterval = 2000; // delay (in ms) before polling for next message
var defaultListSize = 10;

function AddEvents() {
    $$('#mykey').addEvents({
        change: function() {
            SetUsername(this.value);
        }
    });
    $$('#value').addEvents({
        keyup: function(e) {
            if (e.code == 13) {
                if (this.value[0] == '.') {
                    ExecuteCommand(this.value);
                } else {
                    SendMessage(this.value);
                }
            }
        }
    });
}

var userName;
var nextId;

function ExecuteCommand(msg) {
    $$('#value').set('value', '');
    var myRegexp = /^\.(\w+)(\s+.*)?/;
    var match = myRegexp.exec(msg);
    if (match) {
        var cmd = match[1];
        var args = match[2];
        if (cmd == 'list') {
            ListMessages(args);
        } else if (cmd == 'name') {
            SetUsername(args);
        } else if (cmd == 'reset') {
            $$('#messages').set('text', '');
        } else {
            DisplayErrorMessage("Invalid command: " + cmd);
        }
    } else {
        DisplayErrorMessage("Error processing command");
    }
}

function SetUsername(name) {
    if (! name) {
        DisplayErrorMessage("No name provided");
        return;
    }
    userName = name;
    $$('#mykey').set('value', userName);
    SendMessage('has entered the chat');
}

function SendMessage(message) {
    if (! message) {
        DisplayErrorMessage("You didn't type anything!");
        return;
    }
    writeRequest.get({
        action: 'write',
        mykey: userName,
        value: message
    });
    DisplayMessage(userName, message);
}

function GetNextMessage() {
    readRequest.get({
        action: 'read',
        id: nextId
    });
    // schedule next poll
    setTimeout(GetNextMessage, pollingInterval);
}

function ListMessages(limit) {
    if (! limit) { limit = defaultListSize; }
    listRequest.get({
        action: 'list',
        limit: limit
    });
}

function DisplayMessage(userName, message) {
    Display(
        '<span class="userName">' + userName + '</span> '
        + message + '<br>'
    );
}

function DisplayErrorMessage(message) {
    Display('<span class="error">' + message + '</span><br>');
}

function Display(html) {
    var div = $$('#messages');
    div.appendHTML(html);
    // scroll to end of div
    div.scrollTo(0, div.getScrollSize()[0].y);
}

var writeRequest = new Request.JSON({
    url: apiUrl,
    method: 'get',
    onRequest: function() {
        $$('#value').set('value', '');
        $$('#sending').set('text', 'sending...');
    },
    onSuccess: function(id) {
        nextId = parseInt(id) +  1;
        $$('#sending').set('text', '');
    },
    onFailure: function() {
        DisplayErrorMessage("Error sending message, please try again");
        $$('#sending').set('text', '');
    }
});

var readRequest = new Request.JSON({
    url: apiUrl,
    method: 'get',
    onSuccess: function(message) {
        if (message) {
            DisplayMessage(message.mykey, message.value);
            nextId = parseInt(message.id) + 1;
        }
    }
});

var listRequest = new Request.JSON({
    url: apiUrl,
    method: 'get',
    onRequest: function() {
        $$('#sending').set('text', 'sending...');
    },
    onSuccess: function(messages, text) {
        $$('#sending').set('text', '');
        if (messages) {
            messages.each(function (msg) {
                DisplayMessage(msg.mykey, msg.value);
            });
        }
    },
    onFailure: function() {
        DisplayErrorMessage("Error sending command, please try again");
        $$('#sending').set('text', '');
    }
});
