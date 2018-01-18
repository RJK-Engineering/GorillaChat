# GorillaChat

## Exercise

Client Server Model Programming exercise

version 1.0

created on 10-01-2018

In this exercise we create a client-side script using HTML, JavaScript and CSS. Our script
will communicate with a test server. We use a simple API to talk with our server. This
exercise doesn’t require any back-end programming knowledge. Just use the API as
explained below and you can for instance create your own chat application!
Use simple HTTP GET and POST requests to read and write data to our back-end
database.

* http://localhost/read_write/api.php?action=write&mykey=12345&value=i%27m%20fine
* http://localhost/read_write/api.php?action=write&mykey=12345&value=im%20fine
* http://localhost/read_write/api.php?action=write&mykey=12345&value=how%20are%20you
* http://localhost/read_write/api.php?action=read&mykey=12345&id=13

Parameter | In/out | Examples        | Description
--------- | ------ | --------------- | -----------
action    | input  | “read”, “write” | string value
mykey     | input  | “12345”         | create your own key to separate your messages from other students messages
id        | input  | 1               | every message has its own unique id. You can request a message by its id. This id is returned for each write request
id        | output | 1               | after a write request the id of the inserted message is returned
value     | input  | “hello”         |

## Extended API

The list action retrieves a list of recently posted messages:

* http://localhost/read_write/api.php?action=list&limit=10

## Extended Functionality

The chat supports the following special commands:
* .list [nr] - Show last [nr] messages (default 10)
* .name [name] - Change your name
* .reset - Clear the chat window

# Also See
This document is written in Markdown format:
https://guides.github.com/features/mastering-markdown/

About CORS (cross domain xml http requests):
https://stackoverflow.com/questions/22143250/xmlhttprequest-cross-domain#22143384
