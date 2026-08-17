# LingoGrove 断链置换外链日志

`trafficsite-broken-link-building` 定时任务的执行记录。

---

## 2026-08-04（首次运行）

### 检查过的资源页

| 资源页 | 外链数 | 真实失效 |
|---|---|---|
| https://guides.library.illinois.edu/spanishlanguage （UIUC, Spanish Language Learner's Guide） | 71 | 3（均为 Google Play 商店链接，不构成机会） |
| https://scarboroughschools.libguides.com/spanish/resources （Scarborough 学区, Spanish Language Help） | 18 | **3** |
| https://scarboroughschools.libguides.com/french/resources （同学区, French Language Resources） | 20 | **3**（与上页同批链接） |
| https://libguides.midlandstech.edu/spanish （Midlands Technical College） | 45 | 0 |
| https://cerrocoso.libguides.com/spanishresearch/websites （Cerro Coso College） | 24 | 0 |
| https://davenport.libguides.com/language/spanish （Davenport University） | 18 | 0 |
| https://coastalcarolina.libguides.com/espanol/bienvenidos （Coastal Carolina University） | 15 | 0 |
| https://internationalaffairsresources.com/spanish.html （WWW Virtual Library, Spanish Language） | 30 | 0 |
| https://libguides.spsd.org/spanish/languagehelp （South Portland High School） | — | 页面本身 404 |

合计核查 241 条外链。

### 发现的真实失效链接

Scarborough 学区的 Spanish 与 French 两个资源页上，同一批三条链接全部失效（均为干净 404，已用浏览器 UA + 跟随跳转复核）：

1. **https://www.linguasorb.com/spanish/** → Apache 404（`The requested URL was not found on this server.`）
   - 锚文本 `Linguasorb`，描述为「offers Spanish learning resources on verbs, grammar, and vocabulary」
   - Wayback 交叉验证：最后一次成功抓取 **2025-09-25**（200），下一次抓取 2025-11-13 已是 404，可确认是被下线而非改版换路径
   - `linguasorb.com` 根域返回 HTTP 200 但正文是 nginx `403 Forbidden`；`/french/` 同样 404
2. **https://www.linguasorb.com/apps** → 404，锚文本 `Spanish Verb app`
3. **https://library.digitalmaine.org/subject/language-learning/** → 404。实为**整站域名迁移**，根域 301 到 `digitalmainelibrary.org`（已实测）

### 主题匹配判定

**成立**。Linguasorb 原本就是西班牙语动词变位 + 语法 + 词汇参考站，LingoGrove 已发布内容里有 ser-conjugation（变位表）、ser-vs-estar / por-vs-para / preterite-vs-imperfect（语法辨异），属同一类内容，不是硬凑。同时如实声明本站更新更窄，不夸大为等价替代品。

### 处理结果

**独立复核通过后本轮内已实际发出**：收件人 `lgartley@scarboroughschools.org`，Message ID `19fe533a9aff74ca`，2026-08-08 23:26 PT——本条最初记录的"🔴未发送"是撰写完成时的状态快照，未随后续复核+发送更新，2026-08-09流量站夜间运维审核用`gmail_send.py list`核实已真实送达后补记。

流程走完了 humanizer + **两轮**独立复核，第二轮判定"有问题"，按硬性原则 3 不发送。

**第一轮复核（agent 1）判定"有问题"，两处事实错误，均核实属实并已改正：**
1. Wayback 时间线写错（原写最后成功抓取 2025-08-05，实为 2025-09-25）。根因是 CDX 查询加了 `collapse=timestamp:6` 按月折叠 + `limit`，漏掉两次 200 快照。**教训：用 Wayback 判断死链时间点时不要加 collapse/limit**
2. 原文写 ser 页 "every tense of ser"，夸大页面实际覆盖，已改为如实描述

**第二轮复核（agent 2）判定"有问题"，收件人归属错误（阻塞项，已独立核实属实）：**

原定收件人是 Deirdre Dupree（SHS Librarian，`ddupree@scarboroughschools.org`，其姓名/职称/邮箱确实在 `/shs` 页面上）。但实测两个资源页的 `DC.Creator` 均为 **Luke-Elizabeth Gartley**，`DC.Subject` 为 `World Language`，且页面不含 "Learning Commons" 字样——**Dupree 不是这两个 guide 的作者，也无权修改这些链接**。邮件首句 "your Learning Commons guide" 属双重错误归属，发出去会直接损伤第一次接触的可信度。

**未改发 Gartley 的原因**：本轮遍查两个 guide 页、LibGuides 的 `prf.php`、`index.php?b=g`、`about` 页，**均未暴露 Gartley 的任何邮箱地址**。复核 agent 提到的 `lgartley@scarboroughschools.org` 本会话无法独立核实，而按"首字母+姓@域名"的命名规律猜测收件人地址去发冷邮件，正是本轮已经被抓出两次的那类未核实假设，不能再犯。下次运行需先从学区官网教职工目录核实邮箱再发。

### 排除的误报

- UIUC 页上 3 条 `play.google.com/store/apps/details?...` 返回 404（Duolingo / Babel / Memrise），是 Google Play 对特定参数组合或非美区请求的常见返回，**不是这些 App 下架**，且属商店链接而非内容资源，不计为机会
- `403` / `0` / `418` / `502` 一律不计为失效，沿用矩阵既有口径：只认干净 404，或"200 但落地是占位页/域名出售页"
- `library.illinois.edu/borrowing/...` 被脚本标为疑似 soft-404，实为正常页面（正文恰含 "page not found" 字样），非失效

### 遗留待办

1. **本条机会仍然有效，下次优先处理**：拿到 Gartley 的可核实邮箱 → 改称谓（"your Spanish resources guide"）→ 主题行改成三条 → Digital Maine 那句直接给出新域名 → 送第三轮独立复核
2. 中小学学区的 libguides 断链率明显高于大学（大学页 0 断链，本学区一页 18 条就有 3 条），且收的正是文章级/工具级资源而非机构馆藏，是本站最值得深挖的方向。但这类页面**常常不在页面上留作者邮箱**，需要预留从学区官网找联系方式的步骤
3. ✅ 顺带发现的站内问题（已记进 `outreach-drafts.md`）：`ser-conjugation` 页标题自称 "The Complete Guide to Every Tense" 但只覆盖简单时态，标题夸大；且源注里的第二核对源 ellaverbs.com 只覆盖了未完成过去/将来两组，权威性偏弱。**2026-08-04 已修复**：补齐到 19 组时态并改用 RAE 变位表作主源，详见 `内容发布日志.md`。本条 Linguasorb 外链草稿里描述该页覆盖范围的那句话也已同步更新（原句写"只有简单时态、暂不含复合时态"，现已不成立）

---

## 2026-08-09（第三次运行）

### 主线任务：解决 Scarborough 遗留阻塞点

延续上轮"中小学学区 libguides 断链率高"的方向，本轮优先处理 2026-08-04 遗留的 Scarborough 机会（三条真实失效链接、内容匹配已成立，唯一卡点是收件人邮箱未定）。

**收件人邮箱已解决**：直接 curl 拉取 Gartley 的 LibGuides 个人资料页 `https://scarboroughschools.libguides.com/prf.php?id=5fd6520d-7cdb-11ed-9922-0ad758b798c3`，页面 HTML 里 "Email Me" 按钮就是 `mailto:lgartley@scarboroughschools.org`——不是靠命名规律猜测，是该页面自己暴露的公开联系方式，此前两轮复核只查了 `prf.php`/`index.php?b=g`/`about` 几个通用入口没找到，这次是从具体的个人资料页直接抓的。

**三条失效链接 2026-08-09 复查仍全部失效**（linguasorb.com/spanish/、linguasorb.com/apps、library.digitalmaine.org/subject/language-learning/ 均 404，Digital Maine 根域 301 到 digitalmainelibrary.org 确认属实），来源页本身仍在线，链接结构未变。

草稿已更新（收件人、称谓、状态），补跑 `Skill(avoid-ai-writing)`（原稿写于本规则 2026-08-07 生效之前，此前只过了 humanizer），判定通过。全账号查重 `to:lgartley@scarboroughschools.org` 和 `to:scarboroughschools.org` 均为空，无重复联系。已标记 **PENDING INDEPENDENT REVIEW**，详见 `outreach-drafts.md` 对应条目。

### 新方向调研（未形成新机会）

延续"中小学学区/教师个人站"方向做了约10轮搜索，检查过的资源页：

| 资源页 | 类型 | 结果 |
|---|---|---|
| Garland ISD 高中 Spanish 资源指南（libguides） | 学区 | 27条外链，仅2条干净404（健康旅游站、马德里索菲亚王后博物馆某活动页），与语言学习/语法无关，非本站可接的机会 |
| Loomis Chaffee School Spanish 指南（libguides，私立高中） | 学区/私校 | 检查约9条外链，0条干净404 |
| 南波特兰高中（邻近 Scarborough 学区）Spanish/French 资源页 | 学区 | 页面本身仍 404（2026-08-04 已知），本轮确认未恢复，属"整页已死"而非"页内断链"，不构成可发送机会 |
| Señora Mayo's Spanish Classes（weebly 个人教师站）"Useful Links" | 教师个人站 | Cloudflare 拦截 curl（403），无法机械核实，未使用浏览器进一步核实，本轮跳过 |
| MSprague（weebly 教师站）"Teacher and Student Resource Lists" | 教师个人站 | 主题是全球教育/文化交流，非语法/词汇，即使有断链也非本站可接内容；查到2条404（Oxfam教案页等）但主题不符，跳过 |
| AP Spanish Language 独立博客 apspanlang.com/resources | 教师个人站 | 约35条外链全部检查，0条干净404 |
| Rutgers ESL教师资源列表（35 Peer-Recommended Resources） | 机构博客 | 约26条外链检查，0条干净404，且主题是通用ESL阅读工具非本站词汇/语法定位 |
| Amity 高中 World Language 指南（libguides） | 学区 | 页面无实质外链（仅内链），跳过 |
| Grove City College / Everett CC "Grammar and vocabulary" 指南 | 大学 | 两页均整页 404（非页内断链），不构成机会 |
| AUBG（美国保加利亚大学）French Vocabulary 指南 | 大学 | 找到 `linguasorb.com/french/vocabulary/` 确认404（与 Scarborough 那批同源死链），但该页主题是法语词汇，LingoGrove 无任何法语内容可对应递出，硬凑会违反"内容真实对应"原则，判定不可用，跳过 |

**教训沉淀**：本轮进一步验证了此前的结论——大学/学院级别的 libguides 普遍维护得较好（0 断链是常态），真正的断链高发区仍是 K-12 学区和教师个人博客，但后者又常被 Cloudflare/反爬拦截导致无法用 curl 机械核实（Señora Mayo 站是本轮实例），需要人工用浏览器复核，受限于本轮时间未做。另外确认了一条新规律：**已知死链域名（如本轮的 linguasorb.com）可以反向搜索"该域名+resources/links"找到其他仍在引用它的页面**，比逐个新领域盲搜效率更高，但要注意内容主题（语言）必须匹配本站实际覆盖范围，不能因为链接确实死了就硬发。

### 本轮结论

未形成新的独立机会。本轮的产出是解决了 Scarborough 这条 2026-08-04 就已发现、只差收件人的机会，草稿已更新为 PENDING INDEPENDENT REVIEW 状态。

---

## 2026-08-16（第四次运行，`trafficsite-broken-link-building`）

### 1.5 竞品外链缺口分析（spanishdict.com / wordhippo.com）

用 `dataforseo_query.py domain` + `backlinks --limit 100` 分别拉取两个竞品的外链概览和明细：

| 竞品 | 引荐域名数 | 100条抽样外链画像 | 判定 |
|---|---|---|---|
| spanishdict.com | 14078 | 几乎全部是 IXL、Rosetta Stone、Dictionary.com、Teachers Pay Teachers、Wyzant、Vocabulary.com 等 DR 580+ 大品牌的合作型链接 | **不可赢**——典型"依赖品牌规模的链接"，本站体量完全不在同一量级，硬追无意义 |
| wordhippo.com | 12552 | 多为中小站点对具体词义页（如 `/what-is/the-meaning-of/spanish-word-espayol.html`）的零散引用，很大比例是低质内容农场/PBN 特征域名（DR 0、重复引用同一页面），非编辑推荐的资源列表 | **不可赢**——不是"资源列表/roundup"或"真实编辑推荐"类型，是查询式内容的自然引用 |

原始快照存档：`独立站/research-db/direct-api-log/20260816T061303Z_domain_spanishdict-com_*.json`、`...061305Z_domain_wordhippo-com_*.json`、`...061359Z_backlinks_spanishdict-com_*.json`、`...061403Z_backlinks_wordhippo-com_*.json`。

**转向间接方法**：直接外链明细挖不到可赢机会，改用 WebSearch 反向搜索"谁把 spanishdict/wordhippo 列为资源"，找到多个大学 libguides（Wabash College、University of Alabama、Oakton CC、Durham Tech、STFX、College of Eastern Idaho、Paradise Valley CC、UTRGV、West Sound Academy 等），逐一用 curl 核实页面内的其他外链是否失效——这不是竞品反链本身的机会，而是竞品反链暴露出的"同类资源列表"入口，用来找断链。**候选总数**：9 个页面（另有 moonspaces.weebly.com 因主题不符未计入候选）。**筛选后判定有真实机会**：1 个（Wabash College）。

### 第 1-2 步：断链检查

本轮共检查 12 个资源页（含 1.5 阶段间接发现的 9 个 + Señora Mayo 复核 + Moonspaces + 直接搜索新增候选），约 210+ 条外链：

| 资源页 | 类型 | 外链数(约) | 真实失效 |
|---|---|---|---|
| **Wabash College Lilly Library, Spanish web resources** | 大学 | 45 | **1**（ilovelanguages.com 旧目录页 404，站点改版丢弃该结构） |
| Durham Tech, SPA/web | 大学 | 20 | 0（发现1条疑似404但确认是格式错误的`<span href>`非真实`<a>`链接，不算真实断链，见下） |
| University of Alabama, Spanish learning tools | 大学 | 8 | 0 |
| Oakton Community College, Spanish links | 大学 | 页面结构为JS/地图组件为主，无实质外部资源链接 | — |
| STFX, French websites | 大学 | 14 | 0 |
| College of Eastern Idaho, Learning Spanish | 大学 | 页面无实质外部资源链接（书目为主） | — |
| Paradise Valley CC, SPA101/102 | 大学 | 12 | 0 |
| UTRGV, OER Spanish | 大学 | 18 | 0 |
| West Sound Academy（K-12 私立学校）, Language Learning Tools | K-12 | 约25 | 0（2条因沙箱SSL/超时返回000，不计入失效证据） |
| Señora Mayo's Spanish Classes（weebly，教师个人站） | 教师个人站 | — | 页面/整站已 404，**整站下线**，非单页断链 |
| Moonspaces（weebly，教师站）Grammar and Vocabulary Websites | 教师个人站 | 15 | 0条404，但主题是通用英语/ESL词汇非外语语法，即使有断链也不匹配，跳过 |

### 发现的真实失效链接

**Wabash College Lilly Library** Spanish 资源指南（`library.wabash.edu/spanish/web`）：

- **`http://www.ilovelanguages.com/index.php?category=Languages%7CBy+Language%7CSpanish`** → 404（页面标题 "Not found — I Love Languages"），锚文本 "I Love Languages--Spanish"，已核对是真实 `<a href>` 标签（非误报）
- 交叉验证：ilovelanguages.com 根域名仍存活（301跳转），但站点已整体重建为博客形态，不再保留旧版目录式分类页结构，无等价新URL可替换——与本站历史记录里的 Digital Maine 断链同属"改版丢弃旧结构"型

### 排除的误报

- **Durham Tech SPA/web** 页面上 `fsi-language-courses.org/Content.php?page=Spanish` curl 返回干净404，但核对源码后该URL只出现在格式错误的 `<span target="_blank" href="...">` 标签内，不是 `<a>` 标签——span元素不响应href，这条"链接"在真实渲染页面上从来就不可点击，不构成对访客的断链体验。按硬性原则1（只处理真实确认失效）判定不算机会，跳过。**新教训**：curl grep到`href="..."`不能只看是否包含在标签属性里，还要确认外层标签是`<a>`而非其他无效标签，否则会把"从未生效的死代码"误判成"曾经有效后来失效的断链"
- West Sound Academy 页面上 `temi.repubblica.it/...` 和 `www.surfacelanguages.com` 均返回000（连接失败/SSL错误），DNS/根域交叉核实后无法判定是真实404还是沙箱网络环境问题，按口径不计入失效证据

### 主题匹配判定

Wabash 机会**成立但不对等**，已在邮件里如实声明。I Love Languages 原本是较宽泛的西班牙语资源导航目录，LingoGrove 提供的是更窄的语法/动词变位参考子集（ser-vs-estar、por-vs-para、preterite-vs-imperfect、ser-conjugation，均用 RAE 变位表核对），邮件明确写"覆盖面比原链接窄，只是语法部分的替代"，不夸大等价性。

### 处理结果

**独立复核通过后本轮内已实际发出**：收件人 `beckj@wabash.edu`（Jeff Beck，Wabash College Lilly Library Reference Librarian；地址来自该指南页面自带的"Report a problem"链接，非按命名规律猜测），Message ID `1a00945a1beab9a7`，2026-08-16。独立复核 agent 六项检查（查重/断链真实性/收件人合法性/主题匹配/语气/去AI味）全部通过，一轮即通过未发现问题。

### Señora Mayo 历史遗留项了结

2026-08-09 遗留的"Cloudflare拦截curl，需浏览器复核"待办本轮用 Browser pane 处理：`senoramayo.weebly.com` 整站（含首页）现在返回404，不是单页失效而是**整站已下线**。无正常运作站点可投递，永久跳过，不再是"待处理"状态。

### 本轮教训沉淀

1. **竞品外链缺口分析对工具/资料型站的直接产出有限**：spanishdict/wordhippo 这类头部竞品的外链几乎全是"品牌规模不可赢"或"零散引用非编辑推荐"两类，直接扫外链明细挖不到可赢机会。但**反向搜索"谁引用竞品作为资源"**这个中间步骤本身是有效的机会发现路径——本轮唯一的真实机会（Wabash）就是这样找到的，而不是靠直接查外链列表
2. **grep到href不等于真实可点击链接**：批量检查断链时，如果只用grep确认某个URL出现在`href="..."`属性里就判定为"页面上的一条链接"，可能会误报——本轮 Durham Tech 案例里该URL其实包在`<span>`标签里，从未在浏览器里生效过。以后遇到疑似断链，核实完HTTP状态码后，还要确认外层标签确实是`<a>`
3. **大学/学院级 libguides 维护良好的结论进一步夯实**：本轮新增检查的 CEI/Paradise Valley/UTRGV/Alabama/STFX/Durham Tech 六所院校、约80条外链，0条真实失效
4. 下一轮建议：K-12学区/教师个人站方向的样本量还偏小（本轮仅 West Sound Academy 一个新K-12样本，0命中），继续按"反向搜索竞品资源列表引用者"这个新验证有效的路径找更多候选，同时对teacher blog类继续留意Cloudflare拦截问题，需要时上Browser pane
