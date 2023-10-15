---
layout: default
active: fowler
---
<div class="card" markdown="1">

## Fowler
### The need

**Fowler** is an encryption and decryption tool using Web cryptography technologies. Its usage of experimental
technologies also implies that this tool will only work on the latest browser versions and might stop working in the
future whenever one of the experimental technologies gets deprecated.

It is not recommended using this tool for sensitive matters, even though it will run in your environment, even offline.
The encryption and decryption algorithms are public, which means that anyone with sufficient computing power and time
can decrypt your messages.

### How it works

To **encrypt a message**, input your encryption key and your text in the form below, then click on "Encrypt". The key
and the message will be locally encrypted. The message will be returned on the read-only box below. Clicking that box
will automatically select the text for you. Make sure your recipient receives **both the key and the encrypted
message**. Separately if possible.

To **decrypt a message**, input the encrypted text and the decryption key that have been sent to you by the sender, then
click on "Decrypt". The key and the encrypted message locally decrypted. The message will be returned on the read-only
box below. Clicking that box will automatically select the text for you, even though this should not matter.

</div>

<div class="card">
    <p>
        App readiness: <span class="indicator" id="readiness"></span>
    </p>
    <input id="key" type="text" placeholder="Encryption key" />
    <textarea id="message" placeholder="Type your message here"></textarea>
    <input id="action-enc" type="button" value="Encrypt!" />
    <input id="action-dec" type="button" value="Decrypt!" />
    <textarea id="response" placeholder="The response will be displayed here" readonly></textarea>
</div>

<div class="card" markdown="1">

## Your turn, now!

You can contribute to these apps too! The best way to contribute is actually to leave some feedback. If you wish to
leave feedback for this application, please click on [this link](https://apps.vcz.fr/apps/feedback/?appid=b0GlOIPeLX00).
Thank you for your support!

</div>

<script async defer src="script.js"></script>
