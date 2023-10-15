---
layout: default
active: feedback
---
<div class="card" markdown="1">

## Feedback
### The need

**Feedback** is a tool that enables you to leave feedback to content I participated in. The feedback form has been
designed for simplicity: an application identifier and your message! All feedback will be read, that is a promise!

It is not recommended using this tool to send sensitive data as it will be exchanged with two third party service
providers. If you need to exchange sensitive info, please send the necessary information to proceed (email and PGP key).

### How it works

To **send your feedback**, input your application identifier and your text in the form below, then click on "Send". Both
will be sent to an environment that exists only during the execution of your request. Then, provided the identifier
leads to an actual application, the message will then be forwarded to its corresponding topic. It is then up to me to
read it.

If the process succeded a message should appear in the read-only box below.

</div>

<div class="card">
    <p>
        App readiness: <span class="indicator" id="readiness"></span>
    </p>
    <form id="form" action="#">
        <input id="appid" type="text" name="appid" placeholder="Application identifier" required>
        <textarea name="msg" placeholder="Type your message here" required></textarea>
        <input id="action-send" type="button" value="Send">
    </form>
    <hr>
    <input id="response" placeholder="Response" readonly />
</div>

<div class="card" markdown="1">

## Your turn, now!

You can contribute to these apps too! The best way to contribute is actually to leave some feedback. If you wish to
leave feedback for this application, please click on [this link](https://apps.vcz.fr/apps/feedback/?appid=crl4HX7hHtGc).
Thank you for your support!

</div>

<script async defer src="script.js"></script>