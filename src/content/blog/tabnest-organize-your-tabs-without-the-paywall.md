---
title: "TabNest: your tabs, organized, without the paywall"
description: "TabNest is a free, open-source Chrome extension that organizes your tabs and keeps your data in your own Google Drive. It's free because this shouldn't cost money, and open source so you don't have to take our word for any of it."
pubDate: 2026-08-27
---

This one started with too many tabs and too many computers. I keep a browser
open on a laptop and a desktop, and somewhere along the way "a few tabs I'll get
to" turned into a few hundred I'd never find again. I wanted them organized, and I
wanted the same organization to show up wherever I was working.

The tools for this exist. The good ones all want a subscription. And once you look
at what they actually do — store a tidy list of links and sync it between your own
machines — paying a monthly fee for it starts to feel absurd. That's not a service.
That's a feature your browser has with bookmarks. It shouldn't be behind a paywall,
so I built one that isn't.

TabNest is free. Not free-with-an-upgrade, not free-until-you-have-real-work — free,
with no subscriptions, no paywalled features, and no ads. There is no paid tier
sitting in the corner waiting for you to outgrow the free one. There isn't a plan to
add one.

It's also open source, which is the part that matters most. "Privacy-friendly" is
something every extension claims and almost none let you check. TabNest is built so
you can check. Your data lives in your own Google Drive, not on a server of ours —
we don't have one for your tabs. Sync is opt-in; turn it off and everything works
locally. When it is on, TabNest can only touch the files it created, never the rest
of your Drive. It never asks for your browsing history. Your data is plain JSON you
can export and read.

You don't have to trust any of those sentences. The whole point of shipping it open
source is that you can read the code that backs them up. Transparency you can't
verify is just a nicer word for "trust us," and we'd rather show the receipts.

Here's how it works. TabNest replaces Chrome's new tab page with a place to put
things. The structure is three layers deep and takes about ten seconds to learn:

- **Workspaces** are the top level — "Work," "Personal," "Side Projects." You switch
  between them; they don't bleed into each other.
- **Categories** divide a workspace into sections — "Research," "Reading," "Shopping", etc.
- **Groups** live inside categories and hold the actual stuff: saved tabs and notes.
  A group is the unit you save and restore, so you can close twelve tabs as one named
  thing and reopen them all later, or one at a time.

Search spans everything (`Cmd/Ctrl+K`), and if you
turn on Drive sync, the same workspaces follow you to your other machines.

That's the pitch. It organizes the tab pile, it doesn't cost anything, and it keeps
your data yours in a way you can actually confirm. If that's a problem you have, it's
[free to go try](https://chromewebstore.google.com/detail/tab-nest/necndpocofifkmoekdgbocklmmnldegp) —
and [free to go read how it's built](https://github.com/OffBy1-tech/TabNest).
