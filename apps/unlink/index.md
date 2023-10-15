---
layout: default
active: unlink
---

<div class="card" markdown="1">

## Unlink
### The need

**Unlink** is there for you when you need to find where a shortened link in pointing to without browsing it yourself. It
will also provide you with a trace of the traversed URLs to reach the final destination and the HTTP status with every
one.

There are two things to note, however:

- Only the first 20 redirections will be reported. This is by itself an outstanding amount;
- Some websites might not behave perfectly. See example below.

### How it works

To **resolve a shortened URL**, input it in the form below, then click on "Resolve". It will be sent to an environment
that exists only during the execution of your request. This environment will follow the redirections by sending HEAD
requests successively until the response is not a redirection anymore or too many redirections have been resolved.

**IMPORTANT:** The URL must be prefixed with the protocol, i.e. `http://` or `https://`. Try out this example:
`https://bit.ly/3h7oOCe`.

Is considered a redirection a response containing a `Location` header and which status code is one of the following:

- 301: Moved Permanently, the classic permanent redirection;
- 302: Found, the classic temporary redirection;
- 307: Temporary Redirect, the newer temporary redirection which preserves the HTTP method;
- 308: Permanent Redirect, the newer permanent redirection which preserves the HTTP method.

If the resolution succeded a message should appear in the read-only box below. This message lists the traversed URLs and
their redirection status, from origin to destination. The last item should represent the final destination of the
shortened URL.

</div>

<div class="card">
    <p>
        App readiness: <span class="indicator" id="readiness"></span>
    </p>
    <form id="form" action="#">
        <input id="url" type="text" name="url" placeholder="URL to resolve" required>
        <input id="action-send" type="button" value="Resolve">
    </form>
    <hr>
    <textarea id="response" placeholder="Response" readonly></textarea>
</div>

<div class="card" markdown="1">

## Your turn, now!

You can contribute to these apps too! The best way to contribute is actually to leave some feedback. If you wish to
leave feedback for this application, please click on [this link](https://apps.vcz.fr/apps/feedback/?appid=jM85ke3GcMUb).
Thank you for your support!

</div>

<script async defer src="script.js"></script>