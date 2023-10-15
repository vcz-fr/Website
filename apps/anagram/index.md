---
layout: default
active: anagram
---
<div class="card" markdown="1">

## Anagram
### The need

I love anagrams. Scrambling letters and rearranging them to form new words, going so far as to scramble sentences,
paragraphs, whole bodies of work! You can play with anagrams, even hide messages.

My experience with developing anagrams is lacking a tool to analyze texts, sort letters and check whether I'm missing
something in my perfect new anagram. And I want something fast and reliable, especially for languages that use
diacritics.

### How it works

The section below contains three elements: two text boxes and a table. When a text box is modified, we compute the list
of characters it contains and compare it to the list of the other text box. Diacritics and case are normalized before
the comparison.

Happy anagramming!

</div>

<div class="card anagram">
    <p>
        App readiness: <span class="indicator" id="readiness"></span>
    </p>
    <form id="form" action="#">
        <textarea class="a" name="text-a" id="text-a" placeholder="Type your text here" required></textarea>
        <textarea class="b" name="text-b" id="text-b" placeholder="Type your text here" required></textarea>
    </form>
    <hr>
    <table>
        <thead>
            <tr>
                <th>Letter</th>
                <th class="a">#</th>
                <th class="b">#</th>
            </tr>
        </thead>
        <tbody id="response"></tbody>
    </table>
</div>

<div class="card" markdown="1">

## Your turn, now!

You can contribute to these apps too! The best way to contribute is actually to leave some feedback. If you wish to
leave feedback for this application, please click on [this link](https://apps.vcz.fr/apps/feedback/?appid=pjlxtVSLuZ2x).
Thank you for your support!

</div>

<script async defer src="script.js"></script>