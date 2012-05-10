# Tornado Web Examples

This is a collection of apps that demonstrate Tornado Web. It is a code
playground for myself and anyone else interested in testing what Tornado can
do.


## Installation

To install [Tornado](http://www.tornadoweb.org/), simply download or install via
the pip command;

`$ pip install tornado`

or easy_install

`$ easy_install -U tornado`


## Comet Chat

An in memory chat application that uses the long polling (aka comet) technique
on top of Tornado's asynchronous request functionality to demonstrate a
simple chat application.


## Socket Chat

Same principle as Comet Chat but uses the WebSocketHandler to handle client
requests.


## Quick Start

To get each example up and running, cd to the example directory and execute
the application.py module

`$ python application.py`

With the application started go to http://localhost:8000 in a browser to view.