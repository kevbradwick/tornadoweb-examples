jQuery ($) ->

    # simple log
    log = (message) -> console?.log message
    error = (message) -> console?.erro message

    messages = $ 'ul#messages'

    websocket = new WebSocket 'ws://localhost:8000/message'

    websocket.onmessage = (event) ->
        log "Receive: #{event.data}"
        li = "<li>#{message}</li>"
        messages.append "<li>#{event.data}</li>"

    websocket.onerror = (event) ->
        error event

    $('input#message').keypress (e) ->
        if e.keyCode is 13
            e.preventDefault()
            log "Sending Message: #{@value}"
            data =
                action: 'add'
                body: @value
            websocket.send JSON.stringify data
            @value = ''