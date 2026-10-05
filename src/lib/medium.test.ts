import assert from "node:assert/strict";
import { test } from "node:test";
import { parseFeed } from "./medium.ts";

const xml = `<rss><channel><item>
<title><![CDATA[what does rust have instead of garbage collector ?]]></title>
<link>https://medium.com/@gxjo/what-does-rust-0bd9bb09c9b2?source=rss-342f227e2bde------2</link>
<category><![CDATA[rust]]></category><category><![CDATA[memory]]></category>
<pubDate>Thu, 17 Sep 2026 18:33:43 GMT</pubDate>
<content:encoded><![CDATA[<p>recently, i started learning rust &amp; what stuck was <strong>memory safety</strong>.</p><figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*rx.png" /><figcaption>ownership</figcaption></figure><p>it’s neat.</p><img src="https://medium.com/_/stat?event=post.clientViewed" width="1" height="1" alt="">]]></content:encoded>
</item></channel></rss>`;

test("parses a Medium RSS item", () => {
  const [post] = parseFeed(xml);
  assert.equal(post.title, "what does rust have instead of garbage collector ?");
  assert.equal(post.href, "https://medium.com/@gxjo/what-does-rust-0bd9bb09c9b2");
  assert.equal(post.date, "2026-09-17T18:33:43.000Z");
  assert.deepEqual(post.tags, ["rust", "memory"]);
  assert.equal(post.excerpt, "recently, i started learning rust & what stuck was memory safety. it’s neat.");
  assert.equal(post.minutes, 1);
  assert.equal(post.image, "https://cdn-images-1.medium.com/max/1024/1*rx.png");
});
