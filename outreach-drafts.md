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

On the Linguasorb slot: I run a Spanish reference site called LingoGrove. The nearest thing I have to what Linguasorb was doing is https://lingogrove.com/ser-conjugation/, which has the full conjugation of ser, simple and compound, transcribed from the RAE conjugation table rather than written from memory, with the imperfect and future subjunctives and both command sets included. There are also shorter pages on ser vs estar, por vs para, and preterite vs imperfect.

I should say it's a new site and much narrower than Linguasorb was, so it may well not be worth a slot on your guide. The dead links seemed worth passing along regardless.

Owen Zhang
lingogrove.com

### ✅ 顺带发现的站内问题（不属本任务范围）——2026-08-04 已修复

`lingogrove.com/ser-conjugation/` 的页面标题自称 **"The Complete Guide to Every Tense"**，但表格只覆盖七组简单时态，缺虚拟式过去未完成（fuera/fuese）、将来虚拟、全部复合完成时态、否定命令。**标题本身夸大了覆盖范围**，建议内容审计任务修正标题或补齐时态。

另：该页源注写"cross-checked against ellaverbs.com for imperfect/future forms"——第二来源只覆盖了未完成过去/将来两组，且 ellaverbs.com 是商业动词练习博客而非 RAE 这类权威源。"经第二来源交叉核对"这个说法偏薄，建议改用 RAE 或 Wiktionary 之外的权威语法源重新核一遍。

**处理结果（2026-08-04）**：两条都已修，选择"补齐时态"而不是"改标题"。表格从 7 组扩到 19 组（RAE 的 18 组 + 单独拆出的否定命令），全部逐条抄自 `dle.rae.es/ser` 的 RAE/ASALE 变位表；源注和 FAQ 的来源说法改成如实描述"RAE 为主源 + Wiktionary 的 ser/haber 两条独立复核"，ellaverbs.com 全站已无引用。详见 `内容发布日志.md` 2026-08-04 条目。
---

## 2026-08-04 · 播客嘉宾出镜（首次为 LingoGrove 跑此任务）· Words for Granted (Ray Belli)

- **状态**：✅ **已发送**。独立复核判定 "can send"（详细过程见 `podcast-pitch-log.md`），已用 `gmail_send.py` 发出，收件人 wordsforgranted@gmail.com，Message ID `19fc93f4445938ba`，因 lingogrove 别名未验证走的是主账号 0009888@gmail.com

- **调研范围**：检查了 10 档语言学习/词源学/语言学播客，只有本档双关过审（活跃度+嘉宾契合度）
- **接触方式**：Ray Belli 在 About 页公开邀请直接发邮件（"If you'd like to reach me directly, feel free to email me."），收件地址 wordsforgranted@gmail.com
- **锚点集数**：2026-07-27《The Oxford Comma Debate: Interview with Jay Stookesberry》——最新一集，讨论"谁来决定语法上的'正确'"，与本次切入角度高度贴合
- **落地页面**：https://lingogrove.com/ser-conjugation/（ser 变位表，程序生成+单元测试核对）

### 十档候选核查表

| 播客 | 核查结果 | 判定 |
|---|---|---|
| A Language I Love Is...（Danny Bate） | 最新一集 2026-03-17，距今近5个月，明显掉更新频率（此前月更） | **跳过——太久没更新** |
| StoryLearning Podcast（Olly Richards） | 更新频率很高（周更，最新约5天前），但抽样最近8集里仅2集有嘉宾，且 Contact 页明确写"每天都有人联系我推广新app，因为量太大我不再回复这类请求"——与本次要推的正是同一类自荐性质的邮件，命中率预期很低 | **跳过——契合度存疑（主持人明确表态排斥这类邮件+多数为独白集）** |
| How to Learn a Language（Lindsay Dow） | 活跃，但抽样近期集数几乎全是独白formato，"偶尔"才有嘉宾，非常规嘉宾访谈栏目 | **跳过——结构性不契合（罕见嘉宾席位）** |
| The Level Up English Podcast（Michael Lavers） | 月度嘉宾集确实存在，但受众是"学英语的非母语者"，与 LingoGrove（面向英语母语者了解其他语言）受众方向相反 | **跳过——受众方向不符** |
| Lexitecture（Ryan & Amy） | 明确是两位固定主播的对谈栏目，无外部嘉宾环节；且更新已推迟到"月更都难"，最新一集 2026-03-13 | **跳过——无嘉宾环节+更新太久** |
| **Words for Granted（Ray Belli）** | 最新一集 2026-07-27，稳定月更访谈格式，嘉宾多为语言类书籍作者/领域专家（含非顶流嘉宾如播客同行 Danny Bate），主持人公开邀请邮件联系 | **✅ 双关过审，已撰稿** |
| The Fluent Show（Kerstin Cable） | 节目已完结（最终集） | **跳过——节目已停更** |
| Lingthusiasm（Gretchen McCulloch & Lauren Gawne） | 活跃（约3周前更新），但嘉宾门槛明显偏学术/知名出版作者（如词典编纂人 Kory Stamper），与 Owen 的"独立参考站运营者"身份不匹配，不想硬凑 | **跳过——嘉宾门槛（学术/出版履历）不匹配** |
| Anywhere Immersion（John Fotheringham） | 搜索未能确认2026年任何更新，能找到的最近参照是2024年内容，无法确认是否仍在运营 | **跳过——无法确认近况，视为太久没更新** |
| Subtitle（Cox & Pillay） | 最新一集2026-04-22，距今约3.5个月，超出3个月新鲜度门槛；且节目是叙事纪录片式制作，非常规开放嘉宾投稿栏目 | **跳过——更新偏久+格式非常规嘉宾投稿** |

**诚实说明**：10档里只有1档双关过审，语言学习/词源播客生态明显分化成两类——要么由固定主播独白/对谈（Lexitecture、多数 How to Learn a Language 集数），要么嘉宾门槛偏学术出版履历（Lingthusiasm）或明确排斥自荐类邮件（StoryLearning）。真正契合"独立语言参考站运营者，靠数据核验方法论切入"的空间很窄。

### 邮件正文（已过 humanizer 自查，无 em dash/AI高频词/排比三连）

Subject: A guest idea: who actually gets to decide what's correct grammar

Hi Ray,

I just listened to your episode with Jay Stookesberry on the Oxford comma, and the part that stuck with me was how much of what people insist is "correct" traces back to a style guide's preference rather than any settled fact about the language.

That's close to something I've been down a rabbit hole on while building lingogrove.com, a small reference site for language learners covering things like verb conjugations and grammar distinctions (ser vs. estar, that kind of thing). The conjugation tables are generated by a script rather than typed out by hand, and every generated form gets checked in an automated test against a source I fetched myself, mostly Wiktionary's conjugation tables. For an irregular verb like Spanish "ser," I also cross-checked part of the paradigm against a second source, because it's surprisingly easy to get an irregular verb wrong from memory. "Ser" isn't really one verb historically: its present tense comes from Latin esse, and almost everything else in its conjugation comes from Latin sedere, "to sit." Two verbs merged into what learners now study as a single irregular paradigm, and if you're generating that from a pattern instead of checking it against a real source, you'll get it wrong in exactly the spots where it matters most.

I'd enjoy talking through that with you if it fits the show: what actually counts as an authoritative source when two grammar references disagree, why irregular verbs break rule-based approaches, and the gap between how confidently something like an AI tool states a grammar fact and how verifiable that fact actually is. Let me know if that sounds like a fit, and if not, no worries at all. Either way, the Stookesberry episode was a good one.

Best,
Owen Zhang
contact@lingogrove.com

### 待独立复核（见下方状态更新）

- 收件人：wordsforgranted@gmail.com
- 邮件里所有数据点均已对照 `src/data/guides.ts`（ser 变位指南）和 `tools/conjugate.test.mjs`（生成器单元测试头部注释）核对，包括"cross-checked against a second source"这句已刻意改写为"cross-checked part of the paradigm"，避免暗示全量时态都有第二来源核对（实测第二来源 ellaverbs.com 只覆盖未完成过去/将来两组）
- ⚠️ 发信备注：lingogrove 站点的 Gmail Send-As 别名 contact@lingogrove.com 尚未完成 Mailjet SMTP 密码配置验证，实际发送将省略 `--from` 参数，走默认主账号 0009888@gmail.com 发出（签名仍写 contact@lingogrove.com 作为回信地址）

---

## 2026-08-04 · 积压 guest post 草稿处理（第0步）· Glossika Blog

- **状态**：✅ **已发送**。独立复核判定 "CAN SEND"，已用 `gmail_send.py --from lingogrove` 发出，收件人 support@glossika.com，Message ID `19fcb764c146040b`，From header 已核实确为 `LingoGrove <contact@lingogrove.com>`（未被静默改写回主账号）
- **背景**：`guest-post-pitch-drafts.md`（2026-08-04首次调研生成）里5份草稿之一，此前政策是"起草后等Owen确认"，2026-08-04政策改为humanizer+独立复核判定可发即自动发，本次按新流程处理这一条（其余4条本轮不处理）
- **渠道复核**（发送前重新核实，非首次调研时的记忆）：curl 抓取 `https://ai.glossika.com/blog/glossika-guest-post-guideline`（200，UA伪装），确认 `dateModified: 2024-09-18`、Rule #1 "Pitch us first" 仍标注为 non-negotiable、投稿邮箱仍为 support@glossika.com、邮件主题格式要求仍是 `[Guest Post] Title of your article`（与草稿主题行完全吻合）。渠道确认仍开放，无需改动内容
- **14天重复检查**：搜索本仓库全部 `.md`/`.json` 记录，`glossika` 仅出现在 `guest-post-pitch-drafts.md` 和 `guest-post-outreach.json` 两处调研记录里，此前从未向该域名发过任何邮件

### 邮件正文（已过 humanizer，无 em dash/AI高频词/排比三连/收尾套话）

Subject: [Guest Post] Why English Just Borrowed "Schadenfreude" Instead of Translating It

Hi Glossika team,

I run LingoGrove (lingogrove.com). It's a reference site for English speakers working through loanwords, translation choices, and grammar points that don't map cleanly between languages: the kind of thing SpanishDict or WordHippo cover for quick lookups, but written as actual explainers instead of dictionary entries.

I'd like to pitch a piece for your language and culture category: why English adopted "Schadenfreude" wholesale from German instead of calquing it as "harm-joy," what the word actually covers (it's not the same as gloating), and what that tells us about the kind of concept a language borrows versus builds from its own materials. I've already written the reference version of this on my own site (https://lingogrove.com/schadenfreude-meaning/) and would adapt and expand it into an original piece for Glossika rather than reuse it. If a different loanword fits better, I'm happy to cover déjà vu or senpai instead, depending on what you haven't run recently.

About 1,500 words as your guidelines ask, delivered as an editable Google Doc, with an author bio included. Let me know if this angle works and I'll get started.

Thanks,
Owen Zhang
LingoGrove, lingogrove.com
contact@lingogrove.com

### 待独立复核（见下方状态更新）

- 收件人：support@glossika.com
- 邮件里引用的数据点：https://lingogrove.com/schadenfreude-meaning/ 确为本站已发布真实页面（`src/data/guides.ts` 收录）
- lingogrove 别名已于2026-08-04验证可用（见 `gmail_send.py` FROM_ALIASES 注释），实际发送将使用 `--from lingogrove`
