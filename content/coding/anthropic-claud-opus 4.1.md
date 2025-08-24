---
title: "The Chaos of Anthropic"
date: 2025-08-19T22:00:00+02:00
draft: false
author: "r-log"
---

I was excited to try Claude Opus 4.1, expecting a premium experience for its premium price. I wanted to see if the model's capabilities justified the cost, but what I found was a frustrating and expensive journey with disappointing results.

---
## Performance Issues

My primary goal was to use Opus 4.1 for creating a website. Unfortunately, the model often failed to understand key nuances in my prompts, requiring constant and costly corrections, and on top of that it wanted to use the commands non-stop which I specificaly said not to use.

For example, when I asked for a minor change in the feature it would constantly add something I didn't specify .

---
## The High Price of Prompts

The most jarring part of this experience was the cost. The model's inability to deliver a satisfactory output on the first try meant I had to send multiple prompts, making a simple task unreasonably expensive.

To create a simple Hugo website, I ended up spending **$40**. The usage statistics were revealing: **1.4k input tokens** and a staggering **70k output tokens**. The context window used was **101.9k** out of a 1 million token limit, with cache sizes ranging from **800k to 12.8m**. This high output token count reflects the numerous corrections and re-generations required to get something usable. This trial quickly turned into a financial burden with little to show for it.

---
## A Look at the Competition: Gemini 2.5 Pro Shines

For context, I performed the same task with Google's Gemini 2.5 Pro, and the difference was striking. Where Claude struggled, Gemini excelled, delivering a better result for a fraction of the cost.

Here's a direct comparison:

| Metric          | Claude Opus 4.1 | Gemini 2.5 Pro |
| --------------- | --------------- | -------------- |
| **Total Cost**  | $40             | $2             |
| **Input Tokens**| 1.4k            | 520k           |
| **Output Tokens**| 70k             | 20k            |
| **Context Used**| 101.9k / 1M     | 108k / 1M      |
| **Cache**       | 800k - 12.8M    | 3.4M           |

Gemini 2.5 Pro not only cost **20 times less** but also performed the task flawlessly. It kept everything aligned with my requests, made no mistakes, and understood the nuances of my prompts from the start. The higher input token count for Gemini suggests it was able to take in more context and produce a more accurate, concise output, avoiding the costly back-and-forth I experienced with Claude.

---
## Conclusion

In the end, my experience with Claude Opus 4.1 was a lesson in the reality of cutting-edge AI. The promise of superior performance was overshadowed by poor output and an unsustainable cost structure. Gemini 2.5 Pro proved that a higher price tag doesn't guarantee better performance. For developers and creators looking for a reliable and cost-effective AI partner, it's clear that some models offer significantly more value than others. My forty dollars spent on Claude felt wasted, while the two dollars on Gemini felt like a bargain for a job well done.
