import tornado.web
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.websocket
import tornado.escape
from tornado import autoreload


class MessageHandler(tornado.websocket.WebSocketHandler):

    callbacks = set()

    def open(self):
        self.callbacks.add(self)

    def on_close(self):
        """
        Post a message here
        """
        self.callbacks.remove(self)

    def on_message(self, message):
        """
        Message received
        """
        parsed = tornado.escape.json_decode(message)
        for cb in self.callbacks:
            cb.write_message(parsed['body'])


class MainHandler(tornado.web.RequestHandler):
    """
    The main handler
    """

    def get(self, *args, **kwargs):
        return self.render('index.html')


class Application(tornado.web.Application):
    """
    This is out application class where we can be specific about  its
    configuration etc.
    """

    def __init__(self):

        handlers = [
            (r'/', MainHandler),
            (r'/message', MessageHandler),
        ]

        # app settings
        settings = {
            'template_path' : 'templates',
            'static_path' : 'static',
            }
        tornado.web.Application.__init__(self, handlers, **settings)


if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = Application()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(8000)
    ioloop = tornado.ioloop.IOLoop.instance()
    autoreload.start(ioloop)
    ioloop.start()