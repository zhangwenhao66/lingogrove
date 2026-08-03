# LingoGrove 冷邮件草稿

按 `trafficsite-broken-link-building` 等外链任务流程：先过 humanizer，再存这里，再经独立 agent 复核，复核通过才发送。

---

## 2026-08-04 · 断链置换 · Scarborough Public School District（World Language 指南）

- **状态**：🔴 **未发送，留待处理**。两轮独立复核，第二轮判定"有问题"（收件人归属错误），按硬性原则 3 不发送
- **来源页**：https://scarboroughschools.libguides.com/spanish/resources （另 https://scarboroughschools.libguides.com/french/resources 带同样三条链接）
- **收件人**：⚠️ **未定，本轮最大阻塞点**。见下方"待解决"
- **已核实失效链接**（均为干净 404，两页都有）：
  - `https://www.linguasorb.com/spanish/` → Apache 404（`The requested URL was not found on this server.`）。Wayback 最后一次成功抓取 **2025-09-25**（200），下一次抓取 2025-11-13 即 404
  - `https://www.linguasorb.com/apps` → 404，锚文本 `Spanish Verb app`
  - `https://library.digitalmaine.org/subject/language-learning/` → 404。**实为整站域名迁移**：`library.digitalmaine.org` 根域 301 到 `digitalmainelibrary.org`（已实测），不是站内换路径
  - 补充：`linguasorb.com` 根域返回 HTTP 200 但正文是 nginx `403 Forbidden`；`/french/` 同样 404。故只能说"域名仍有响应"，不能说首页正常
- **递出内容**：https://lingogrove.com/ser-conjugation/ （另提 ser vs estar / por vs para / preterite vs imperfect）

### 两轮复核结论

**第一轮（agent 1）判定"有问题"——两处事实错误，均已核实属实并改正：**
1. Wayback 时间线写错（原写"最后成功抓取 2025-08-05"）。根因是 CDX 查询用了 `collapse=timestamp:6`（按月折叠）+ `limit`，漏掉 2025-08-15 与 2025-09-25 两次 200。**教训：查 Wayback 判断死链时间点，不要加 collapse/limit**
2. 原写 ser 页 "every tense of ser"，夸大了页面实际覆盖（表格只有现在时/简单过去/未完成过去/将来/条件/现在虚拟/肯定命令七组）。已改为如实描述并主动声明未覆盖复合时态与虚拟式过去未完成

**第二轮（agent 2）判定"有问题"——收件人归属错误（阻塞项，已独立核实属实）：**

- `/spanish/resources` 与 `/french/resources` 两页的 `DC.Creator` 均为 **Luke-Elizabeth Gartley**，`DC.Subject` 为 `World Language`，**不是** Deirdre Dupree（Dupree 是 SHS Librarian，账号 259542，拥有的是 SHS Learning Commons 下的书目类指南）
- 这两个 guide 也不属于 "SHS Learning Commons"，页面上根本不含该字样。邮件里 "your Learning Commons guide" 对 Dupree 是**双重错误归属**，且发给了无权修改这些链接的人
- 次要问题：主题行写 "Two dead links" 但正文实际报了三条

### 待解决（下次运行接手）

1. **拿到 Gartley 的可核实邮箱**。本轮已查过：两个 guide 页无 profile box、LibGuides 站内 `prf.php` / `index.php?b=g` / `about` 均未暴露任何 Gartley 邮箱地址；复核 agent 提到的 `lgartley@scarboroughschools.org` **本会话未能独立核实**，不能凭 `首字母+姓@域名` 的命名规律直接发冷邮件。下次可从学区官网教职工目录（scarboroughschools.org）核实后再发
2. 换收件人后，正文首句 "your Learning Commons guide" 必须改写（Gartley 确实是这两个 guide 的作者，可直接写 "your Spanish resources guide"）
3. 主题行改为三条链接的说法
4. Digital Maine 那句改为直接给出新域名 `digitalmainelibrary.org`，比"大概搬到站内别处了"更有用也更准确

### 邮件正文（已过 humanizer；已修正前两轮指出的事实错误；收件人称谓待改）

Subject: Three dead links on the Spanish resources guide

Hi [待定：Luke-Elizabeth Gartley],

I was checking Spanish resource pages for dead links and ran into a few on your Spanish resources guide (scarboroughschools.libguides.com/spanish/resources).

The Linguasorb entry points to linguasorb.com/spanish/, which now returns a 404. The Internet Archive's last working capture of it is from late September 2025, and the next one in November came back 404, so that section looks like it was pulled rather than moved. The domain still responds, but /spanish/ and /french/ are both gone. The "Spanish Verb app" link (linguasorb.com/apps) is a 404 as well.

Both of those links also sit on your French resources page. The Digital Maine Library link on both pages (library.digitalmaine.org/subject/language-learning/) is dead too, though that one is just a domain move: the whole site now lives at digitalmainelibrary.org.

On the Linguasorb slot: I run a Spanish reference site called LingoGrove. The nearest thing I have to what Linguasorb was doing is https://lingogrove.com/ser-conjugation/, which has a conjugation table for ser across the simple tenses, with the forms checked against Wiktionary and a second source instead of written from memory. It does not cover the compound tenses or the imperfect subjunctive yet. There are also shorter pages on ser vs estar, por vs para, and preterite vs imperfect.

I should say it's a new site and much narrower than Linguasorb was, so it may well not be worth a slot on your guide. The dead links seemed worth passing along regardless.

Owen Zhang
lingogrove.com

### ⚠️ 顺带发现的站内问题（不属本任务范围）

`lingogrove.com/ser-conjugation/` 的页面标题自称 **"The Complete Guide to Every Tense"**，但表格只覆盖七组简单时态，缺虚拟式过去未完成（fuera/fuese）、将来虚拟、全部复合完成时态、否定命令。**标题本身夸大了覆盖范围**，建议内容审计任务修正标题或补齐时态。

另：该页源注写"cross-checked against ellaverbs.com for imperfect/future forms"——第二来源只覆盖了未完成过去/将来两组，且 ellaverbs.com 是商业动词练习博客而非 RAE 这类权威源。"经第二来源交叉核对"这个说法偏薄，建议改用 RAE 或 Wiktionary 之外的权威语法源重新核一遍。
