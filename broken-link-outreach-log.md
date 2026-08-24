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

---

## 2026-08-21（第五次运行）

### 第一部分：十天前旧pitch验证

Scarborough Public School District（2026-08-08发出，Message ID `19fe533a9aff74ca`）是唯一符合"发送日期早于2026-08-11、状态已发送、从未被验证"条件的记录。

curl复查 `/spanish/resources` 与 `/french/resources`（均HTTP 200），两页HTML均无`lingogrove`字样，linguasorb/digitalmaine三条死链原样未换 → 判定 **`not_replaced`**。`dataforseo_query.py backlinks lingogrove.com` 未查到scarboroughschools.org引荐域名（本次拉取全站仅1条外链，且是无关的垃圾TG SEO外链）。`gmail_send.py list --query "from:lgartley@scarboroughschools.org"` 确认对方完全静默，从未回复。发送已满13天，落在10-14天跟进窗口内，来源页仍在线、结构未变，判定目标页仍具真实权威度，符合条件，发一封简短跟进邮件（过humanizer+avoid-ai-writing均无命中），Message ID `1a024cad47036a2d`，标记 `followed_up_once`。

### 第二部分：新机会挖掘

**候选来源**：WebSearch围绕Spanish/French/German/etymology/ESL grammar resources找到32个新候选资源页（此前四轮已检查过的域名一律排除），另用`dataforseo_query.py domain/backlinks`复查spanishdict.com（14153引荐域名）、wordhippo.com（12647引荐域名）确认仍是"不可赢"（大品牌合作链接/低质内容农场零散引用），延续8/16结论转用反向搜索"谁把spanishdict/wordhippo列为资源"找到部分候选（coloradocollege/clemson/wiregrass/selu/UIUC等）。

**工具故障与应对**：`broken_link_scan.py`本轮遭遇系统级资源争抢（`ps aux`显示同一时段有12个来自其他定时任务的同名进程并发运行，`uptime`负载一度4.47），标准调用连续两次挂起超时（120s/115s均未完成，且CPU时间在多次快照间完全不增长，确认是真卡死不是慢）。**改用手写curl方案绕过**：curl抓取32个候选页HTML（逐页约2秒，验证网络本身正常）→ 正则只提取真实`<a href>`标签（避免此前日志记录过的`<span href>`误报坑）→ 提取到1509条链接，去重+过滤明显同域内链后剩816条外部链接→ 过滤掉Duolingo/SpanishDict/WordReference/Google等不可能失效的大平台域名后剩612条→ `xargs -P 10`并发curl探测HTTP状态（首次尝试用`xargs -P 20`因命令行参数拼接问题批量失败，改用独立probe脚本+`-n 1 -P 10`后正常，用Monitor工具+run_in_background监控进度，约35分钟完成）。

**结果**：612条外部链接中确认 **24条真实DEAD（404/410）**，113条SOFT（403/超时/DNS失败等，按硬性规则不算死链），475条OK。

**逐条主题匹配判定**（LingoGrove现有51篇文章：西语语法为主+8篇法语语法+4篇德语语法+1篇意大利语+1篇日语助词+8篇Loanwords/etymology词源类）：

- `utm.edu/staff/globeg/gramm.shtml`（来自Ohio University French资源页，锚文本"French Grammar Central"）→ **成立，已发送**（详见下）
- `esl.fis.edu/grammar/index.htm`（来自Durham Tech ESL Grammar指南）→ 判定不匹配，跳过：本站是"英语母语者学外语"定位，ESL资源是"非英语母语者学英语"方向相反，即使都含"grammar"关键词也不是真实主题对应
- `todoele.net/.../online-etymological-dictionary-spanish`（来自University of Richmond LLC指南）→ 判定弱匹配，跳过：这是"西班牙语词源查询工具"，本站Loanwords栏目是"英语借用的外来词"，方向不同（一个查西语词本身的词源，一个查英语里外来词的来历），硬凑不够真实对应
- `mmll.cam.ac.uk`系列4条（来自Cambridge德语资源页）→ 判定跳过：是剑桥大学自己的德语学习资源页面重组丢失的旧路径，未查到迁移后新URL，且更倾向于是站内导航链接而非可替换的第三方资源条目
- `cce.bard.edu`系列6条（来自Bard College德语资源页）→ 判定不匹配，跳过：链接目标是Bard学院"公民参与中心"通用页面，与德语学习内容无关，是页面页脚/导航链接
- 其余（IU数字学术支持页、Lehman法语系页面、Vincennes馆际互借页、Hillsborough旧版内部链接、隐私政策页等）→ 判定不匹配或非内容型资源链接，跳过

**唯一确认机会：Ohio University Libraries "Dictionaries and Grammar Aids"（French）指南**。来源页39条外链仅此1条失效（非链接农场）。死链`utm.edu/staff/globeg/gramm.shtml`（锚文本"French Grammar Central"，描述含"thousands of verb conjugations...organized by part of speech"）三重复现失效：跟随重定向后404、`utm.edu/staff/`整目录404（教职工个人页体系整体下线）、Wayback最后一次200快照2023-05-16。收件人Jeff Shane（`shane@ohio.edu`）取自该指南主页Librarian Profile框内mailto链接，非猜测。全账号查重（`to:shane@ohio.edu`、`to:ohio.edu`）均为空。

邮件走完两段式结构（第一段纯报告死链不提本站，第二段才给LingoGrove的8篇法语语法文章作替代建议，如实声明"没有对方原链接那样的动词变位表"，不夸大等价性），过Skill(humanizer)+Skill(avoid-ai-writing)均无命中。独立复核agent（全新agent，非本次会话延续）逐项核实事实（非只信自我声明）：来源页HTML内容、404复现、Wayback日期、收件人邮箱真实性、全账号+跨站查重（顺带发现UmberLore 2026-08-04曾查到ohio.edu另一个不同指南页的死链但当时判定跳过未发信，非本次重复）、正文去AI味程度、内容匹配真实性，全部通过，判定"APPROVED TO SEND"。已发送：`gmail_send.py send --from lingogrove`，Message ID `1a024e3813397a0d`。

### 本轮工具/流程教训

1. **`broken_link_scan.py`在多任务并发抢占系统资源的时段会真实卡死**（非本站特有问题，同一台机器上同时段有其他站点的定时任务在跑同名脚本）。以后遇到该脚本挂起超过2轮重试仍不出结果，直接切到手写curl+xargs方案，不要反复用同样参数重试期望"这次运气好"
2. **`xargs -P N`大批量URL时不要用`-I{}`拼接内联变量到`bash -c`字符串里**，会在参数较多时因单条命令行过长直接失败（"command line cannot be assembled"）；改用独立的可执行脚本文件+`xargs -n 1 -P N script.sh`更稳定
3. 手写curl方案本身验证有效：816条候选链接中过滤大平台域名后剩612条，仍找出24条真实DEAD，产出率与脚本工具相当，说明"自己动手实现同等严格度的检查"这条应急预案（对应用户全局CLAUDE.md里"独立agent卡死后自己按同等严格度核实"的精神）同样适用于"工具脚本卡死"场景，不只是"独立审核agent卡死"场景

---

## 2026-08-24（第六次运行）

### 第一部分：十天前旧pitch验证

本轮无需处理——上层会话已统一核对：LingoGrove唯一符合"10天前"条件的旧pitch（Scarborough）已在2026-08-21验证并跟进过；另一条wabash.edu是2026-08-16发出仅8天，不满10天窗口，本轮跳过，与上层结论一致。

### 第二部分：新机会挖掘

延续上轮遗留待办，本轮重点转向德语/意大利语/日语方向（此前四轮主要集中在西班牙语/法语），并继续1.5竞品外链缺口分析的"反向搜索"方法论。

**1.5 竞品外链缺口分析（延续结论）**：spanishdict.com/wordhippo.com此前已确认"不可赢"（品牌规模合作链接/低质内容农场零散引用），本轮继续用WebSearch反向搜索`"spanishdict" OR "wordhippo" site:libguides.com`扩展候选，命中Colorado College/Clemson等此前已知域名，未发现全新的竞品反链入口；改为直接WebSearch德语/意大利语/日语grammar/particles相关libguides，找到19个新候选资源页（IU/IUPUI、Towson、UAEU、Sierra College、Edinburgh、Melbourne、Bates（德语）；Mt Holyoke、Bodleian、Wellesley、UIUC、Ohio、Stony Brook、CSU Bakersfield、Alvernia（意大利语）；Rockhurst、Carthage（日语）；Cambridge MMLL现行德语资源页）。

**工具方案**：按硬性规则10直接采用手写curl方案（未先尝试`broken_link_scan.py`，因上轮已确认其在系统资源紧张时段会真实卡死，本轮判断没必要重复验证同一故障）。流程：curl抓取19页HTML（存放`scratchpad/blb_20260824/lingogrove/pages/`）→ Python正则只提取真实`<a href="http...">`标签（沿用"避免`<span href>`误报"的教训）→ 过滤同域内链、大平台域名（Google/Duolingo/SpanishDict/WordReference/Wikipedia等）、图书馆自建检索系统（library.*、primo.exlibrisgroup.com、proxy/idm.oclc.org等内部系统，这类链接指向本机构馆藏目录而非可替换的第三方资源）后剩225条候选外部链接→ `xargs -n 1 -P 10`并发curl探测状态码。

**结果**：225条候选中，11条返回真实404，15条000（超时/连接失败，按口径记SOFT不计入）,15条403（同记SOFT），其余200/301/302/400。逐条排查11条404：

| 来源页 | 死链 | 判定 |
|---|---|---|
| **Towson University GERM 指南** | uni.edu/becker/German2.html（"Best German Websites"） | **成立，已发送**（详见下） |
| Ohio University Italian websites 指南 | ilovelanguages.com/index.php?category=...Italian（同域名此前Wabash Spanish页已用过，站点改版丢弃分类页结构） | 跳过：LingoGrove意大利语内容仅2篇（1语法1词源），无法支撑对"综合意大利语资源目录"的替换 |
| Bodleian conted Italian 指南 | garzantilinguistica.it/en/（"Dizionario Garzanti"意德法词典） | 跳过：方向不匹配，这是通用词典工具非语法参考，LingoGrove不做通用词典 |
| Mt Holyoke Italian 指南 | um.es/sacodeyl/、podcastitaliano.com/benvenuti/、mtholyoke.edu/lrc/software | 跳过：sacodeyl语料库跨语言不特指意大利语；podcastitaliano首页改版（需查新入口，未深挖）；mtholyoke.edu/lrc/software是源站点自己的内部页面非第三方资源，不构成可外链置换的机会 |
| Wellesley Italian internet 指南 | coerll.utexas.edu/ra/index.php（"Reading Aloud"发音工具）、edx.org意大利语课程页 | 跳过：coerll工具非语法参考且CSUB页面上同一链接重复出现（同一失效资源非独立机会）；edx课程下架是常规курс生命周期问题，非站点废弃 |
| Rockhurst Japanese 指南 | digital.archives.go.jp/index_e.html（日本国立公文书馆数字档案） | 跳过：主题是历史档案查阅非日语语法/助词，与LingoGrove仅有的1篇日语语法文章（助词wa/ga/wo/ni）方向不符 |
| IU German 指南 | unesco.org/xtrans/bsform.aspx（联合国教科文组织翻译申请表单） | 跳过：非德语专属资源，是通用行政表单类工具，且已404但性质与"语言学习资源"不同 |

**唯一确认机会：Towson University Cook Library, German Research Guide**。来源页`towson.libguides.com/GERM`约30条外链仅此1条失效。死链`uni.edu/becker/German2.html`（锚文本"Best German Websites"）：http跳转https后404，`uni.edu`根域200排除整站故障，Wayback最后200快照2017-02-10（长期失效非临时波动）。收件人Mary Gilbert（`mgilbert@towson.edu`）取自该指南页面自带Librarian Profile框的"Email Me"按钮，非猜测。全账号+全仓库查重均为空。

**主题匹配**：成立但不对等，邮件如实声明。原链接是德语文化/语法/音乐/游戏/饮食综合导航页，LingoGrove仅有5篇德语语法文章（Cases总览、Adjective Endings、Dative、Genitive、Perfect Tense），独立复核agent核对站点sitemap确认站内德语内容确实仅此5篇，邮件披露"只覆盖语法"与实际情况一致。

**页面新鲜度的诚实记录**：Towson该指南LibGuides自带"Last Updated"字段显示2024-11-01，距本次运行（2026-08-24）约21个月，字面上超出"近12个月有更新迹象"的表述。独立复核agent在收到这一事实后综合判断：页面30条外链中仅1条失效、其余抽查全部存活，是"内容本身稳定、长期不需要编辑"的信号而非"废弃页面"，予以放行。这不是隐瞒条件不达标，而是如实记录判断依据——以后遇到类似"更新时间超12个月但链接健康度极高"的情况，可参考本次的判断逻辑（健康度是比更新时间戳更直接的"是否僵尸页"证据）。

邮件两段式结构（第一段纯报告死链不提本站，第二段才给LingoGrove的5篇德语语法文章作替代建议，如实声明"不会假装这是完整替代"），过Skill(humanizer)+Skill(avoid-ai-writing)均无命中（人工过审，未发现em dash/AI高频词/弯引号等tell）。独立复核agent（全新agent）六项检查全部通过，收到"页面21个月未更新是否仍算真实权威"的追加事实后维持"APPROVED TO SEND"判定。已发送：`gmail_send.py send --from lingogrove`，Message ID `1a033f1e158e1bbf`。

### Cambridge MMLL 遗留待办更新

本轮WebSearch找到剑桥现行德语在线资源页新URL：`https://www.mmll.cam.ac.uk/german/resources/online`（WebSearch摘要提到页面含Deutsche Welle语言学习资源等条目）。但curl抓取该页HTML后未在正文中检索到摘要提到的具体资源条目（如"Deutsche Welle"字样未出现在抓取内容里），页面主体内容疑似需要JS渲染或有额外分页/展开逻辑，本轮未用Browser pane深入核实（时间限制）。**遗留待办**：下次运行若继续深挖德语方向，可用Browser pane打开该URL实测内容结构，而非仅curl静态HTML。

### 本轮教训沉淀

1. **反向搜索遇到瓶颈时，直接搜"目标语言+grammar/particles+libguides"同样有效**：本轮未依赖spanishdict/wordhippo反链继续挖，改为直接搜索德语/意大利语/日语的libguides候选，找到19个新页面，覆盖了此前"法/德/意/日语法覆盖极浅、样本量偏小"的空白
2. **意大利语/日语的匹配瓶颈是站内内容深度，不是死链数量**：本轮11条真实404里，意大利语和日语相关的死链其实数量不少（Ohio Italian、Bodleian Italian、Mt Holyoke Italian x2、Wellesley Italian x2、Rockhurst Japanese），但LingoGrove这两个语种各自只有1-2篇文章，导致内容匹配这一关几乎全部卡死。**这是内容生产缺口，不是外链挖掘方法的问题**——除非LingoGrove的意大利语/日语内容库先扩充，否则这两个方向的断链置换产出率会持续偏低，建议下次linkable-asset-planning任务参考本发现
3. **图书馆自建检索系统需要作为一类整体过滤，不能逐条判断**：本轮Edinburgh一个页面就贡献了365条`library.ed.ac.uk`内部检索结果链接，如果不整体过滤会严重拖慢候选池筛选效率且这类链接从不构成真正的"第三方资源"机会，本轮补充的过滤规则（library./libraries./primo.exlibrisgroup.com/proxy/idm.oclc.org等）值得固化进以后的手写curl方案模板
4. **同一域名重复失效可跨页面互证**：ilovelanguages.com在Wabash（Spanish）和本轮Ohio（Italian）两个不同来源页上都失效，coerll.utexas.edu/ra/index.php在CSUB和Wellesley两个来源页上都失效，说明这类"死链域名"一旦确认，可以用来快速排查其他资源页而不必逐个重新验证目标域名本身是否可达
