## Rewriting markdeck

In 2021, I decided to rewrite markdeck completely.

    But why would someone rewrite such a piece of software?

I saw severall problems with the old implementation:
1. docker-heavy

    Hey, docker is cool and can do a lot of things.

Yes, but it is also a pain to maintain and a security risk.
(And much too big for my liking: more than 1gb in total for just a slide renderer?!)

2. too slow

More than 4secs for a simple text change in the example project was to long.
I wanted to reduce the rendering time to somewhere below 1sec.

3. too indirect

The micro services were connected via the shared filesystem: 
the user saves an *.md file, the pandoc service watches for these changes, 
starts the html rendering via pandoc, 
the liveserver get notified about changed index.html,
notifies its clients,
the pdf render get notified, too,
starts the pdf rendering, headless, via decktape, ...

    And these services were really communicating via changed files on disk? _wow_

Yes.

So I decided to rewrite the "main event loop" of the pandoc service in a new language, rust.
In this process, I learned a lot about rust (the hard way, sometimes... I still dont like life cycle anotations).
...
