jQuery ($) ->

    # simple log
    log = (message) -> console?.log message

    messages = $ 'ul#messages'

    getMessages = ->
        $.ajax
            url: '//localhost:8000/message'
            type: 'get'
            dataType: 'json'
            success: (data) ->
                li = "<li>#{data.message}</li>"
                messages.append "<li>#{data.message}</li>"
                setTimeout getMessages, 0 # this send the app into comet mode

    setTimeout getMessages, 200

    $('input#message').keypress (e) ->
        if e.keyCode is 13
            e.preventDefault()
            myMessage = @value
            $.ajax
                url: '//localhost:8000/message'
                type: 'post'
                dataType: 'json'
                data:
                    message: @value
                success: (data) ->
                    $('input#message').val ''
                error: (data) ->
                    log data
