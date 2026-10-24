---
title: Designing for the Canada to Ghana corridor
description: Bandwidth, devices and payment habits differ more than most briefs assume. What changes when a site has to work properly in both markets.
category: Market
date: 2026-10-22
readTime: 7 min read
lead: >
  A site that works in Toronto can fail quietly in Accra, and the failure rarely
  shows up in the places people look. Here is what actually differs, and what to
  do about each one.
---

Most briefs that mention two markets mean translation and a currency switcher. For Canada and Ghana, neither is usually the issue. The differences that matter are quieter, and they show up in whether the site gets used rather than whether it loads.

## Bandwidth is the obvious one, and it is still underestimated

Mobile data in Ghana is widely available and genuinely usable. It is also metered in a way that changes behaviour. A visitor who knows a page costs them data behaves differently from one on uncapped home fibre. They do not wait for a hero video. They do not scroll through a gallery to find the information they came for.

The practical rules this produces:

- **Put the answer above the fold.** Service times, prices, the phone number, what you actually sell. Not a brand statement with the useful content three screens down.
- **Set a weight limit for the whole page, not per image.** We target under 200 kilobytes for a first view on a content page. That is a constraint you design within, not something you optimise toward afterwards.
- **Never auto-play video.** It is the single most expensive default on the web and the least likely to be wanted.
- **Test on a throttled connection before launch.** Not a simulation of 4G. Actual Slow 3G in devtools, which is closer to a weak signal than most developers expect.

A site built this way is also faster in Toronto. Nobody has ever complained that a page loaded too quickly.

## Devices skew smaller, older and more varied

Android dominates, and the long tail is longer. A design that assumes a recent iPhone will meet a lot of 360 pixel wide screens running a browser two versions behind.

This is less about feature support than it sounds. Modern CSS degrades reasonably. The real problems are physical:

- Touch targets that work on a 390 pixel screen with a thumb, not a mouse. Forty-four pixels minimum, and genuinely spaced.
- Text that holds up at 16 pixels on a smaller screen in daylight. Thin weights disappear outdoors.
- Forms that do not require precision. Fewer fields, bigger inputs, no multi-step wizard where a single page would do.

## Payment habits are the difference people miss entirely

This is where a North American default does the most damage. Card penetration in Ghana is low. Mobile money is not an alternative payment method, it is the primary one for a large share of transactions.

If you are selling, that changes the checkout entirely. If you are not selling, it still changes things, because it changes what a visitor expects a transaction to feel like. A flow that assumes a card and a billing address reads as a flow not built for them.

The pattern that works is less a payment integration and more an acknowledgement. Say what you accept, early and plainly. If the real answer is that someone will message you and arrange it, say that too. Clarity beats sophistication here.

## WhatsApp is infrastructure, not a social icon

In Canada, a WhatsApp link in a footer is a nice extra. In Ghana it is frequently the main channel, and treating it as a secondary one costs you conversations.

That has structural consequences:

- A persistent, visible WhatsApp control, not one buried with the social icons.
- A message that arrives with context. A link that opens a conversation with the product or page already referenced saves both sides three exchanges.
- An actual expectation of response time, stated. People will message at ten at night. Tell them when you reply.

On the Syndei Embassy site we built the WhatsApp control into the hero and the persistent frame rather than the footer, because for that congregation it is how conversation already happens. The site opens into the existing habit instead of asking people to adopt a new one.

## What does not need to change

Worth saying, because the temptation is to overcorrect.

Visual sophistication travels. There is no version of this where you simplify the design because of the market. The work we are proudest of in Ghana is not visually conservative, and treating the audience as though it needs to be would be both wrong and obvious.

Typography travels. Editorial layout travels. Good photography travels, and matters more, not less, when bandwidth is tight, because you get fewer images so each one carries more.

## The underlying principle

Design for the harder context and the easier one comes free. A site that loads fast on metered mobile data in Accra, works on a 360 pixel Android screen, states plainly how payment works and opens into WhatsApp is not a compromised version of a Toronto site. It is a better one, running in both places.

The reverse is not true. A Toronto-first site shipped into Ghana degrades in ways that are invisible from Toronto, which is exactly why they persist.
