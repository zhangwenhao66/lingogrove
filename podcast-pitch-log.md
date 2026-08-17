# LingoGrove 播客嘉宾出镜（podcast guest-pitch）日志

首次为 LingoGrove 跑此任务（此前仅在 seo-geo-trinity 的 alpha/beta/gamma/delta 四站验证过同一方法论）。流程：读站内真实内容定切入角度 → 搜索+核实候选播客（近3个月内更新+嘉宾契合度）→ 仅对双关过审的候选撰稿 → humanizer 去AI味 → 全新独立 agent 复核 → 复核通过才发送。

---

## 2026-08-04

**切入角度**（源自 `src/data/guides.ts` 里的 Ser Conjugation 指南 + `tools/conjugate.test.mjs`）：LingoGrove 的动词变位表是脚本生成、非手打，每个生成形态都有单元测试对照真实抓取的权威来源（主要是 Wiktionary 的变位表），对不规则动词（如西语 ser）还额外用第二来源交叉核对了部分时态。这是一个真实、可回溯、有具体数据支撑的角度，不是空泛的"我们做语言内容"。

**核查了 10 档播客**（语言学习/词源学/语言学方向）：

| 播客 | 判定 | 原因 |
|---|---|---|
| A Language I Love Is...（Danny Bate） | 跳过 | 太久没更新（最新一集 2026-03-17，近5个月，此前月更已明显放缓） |
| StoryLearning Podcast（Olly Richards） | 跳过 | 周更很活跃，但近8集仅2集有嘉宾；且 Contact 页明确写"因量太大不再回复app推广类请求"，与本次自荐邮件性质雷同，强行发风险大于收益 |
| How to Learn a Language（Lindsay Dow） | 跳过 | 结构性不契合：绝大多数是独白集，嘉宾环节"偶尔"才有 |
| The Level Up English Podcast（Michael Lavers） | 跳过 | 受众方向相反（面向学英语的非母语者，LingoGrove 面向英语母语者了解其他语言） |
| Lexitecture（Ryan & Amy） | 跳过 | 无外部嘉宾环节（两位固定主播对谈）+ 更新已放缓到月更都难（最新 2026-03-13） |
| **Words for Granted（Ray Belli）** | **✅ 双关过审，撰稿** | 最新一集 2026-07-27，稳定月更访谈格式，嘉宾含非顶流的领域实践者，主持人公开邀请邮件联系 |
| The Fluent Show（Kerstin Cable） | 跳过 | 节目已完结 |
| Lingthusiasm（McCulloch & Gawne） | 跳过 | 活跃但嘉宾门槛偏学术/出版履历，与 Owen 的独立站运营者身份不匹配，不强凑 |
| Anywhere Immersion（John Fotheringham） | 跳过 | 无法确认2026年是否仍在更新（能查到的最近参照停在2024年） |
| Subtitle（Cox & Pillay） | 跳过 | 最新一集 2026-04-22，距今约3.5个月，超出新鲜度门槛；且是叙事纪录片式制作，非常规开放投稿栏目 |

**诚实小结**：10档里只有1档同时满足"近3个月活跃"+"嘉宾契合不需要编造背景"两条。语言学习/词源播客生态明显两极化——要么是固定主播独白/对谈没有外部嘉宾位（Lexitecture、How to Learn a Language 的大多数集数），要么嘉宾门槛是学术出版履历（Lingthusiasm）或节目方已明确表态排斥自荐推广类邮件（StoryLearning）。这个赛道比 seo-geo-trinity 那批 CX/客服播客更窄一些。

### 已撰稿：Words for Granted（Ray Belli）

- 收件人：wordsforgranted@gmail.com
- 锚点集数：2026-07-27《The Oxford Comma Debate: Interview with Jay Stookesberry》
- 全文见 `outreach-drafts.md` 对应条目，已过 humanizer 自查（无 em dash/AI高频词/排比三连/虚构履历）
- 邮件里的核验方法论表述已刻意收窄，避免夸大：写的是"cross-checked **part of** the paradigm against a second source"，因为实测第二来源 ellaverbs.com 只覆盖了 ser 的未完成过去/将来两组时态，不是全量交叉核对

### 独立复核

- 启动了全新独立 agent（仅给邮件正文+复核清单，无本任务推理过程），未卡死，正常在约37秒内完成，未触发看门狗停止流程
- 复核结论逐条：
  1. **14天内是否已联系过该收件人** —— 如实答"无法确认，没有发信记录访问权限"，未默认"干净"
  2. **数据点回溯** —— 逐条核对 `src/data/guides.ts`（ser 变位指南 FAQ/正文）与 `tools/conjugate.test.mjs`（生成器单元测试头部注释），确认：脚本生成非手打属实；每个生成形态有自动化测试对照真实抓取来源（主要Wiktionary）属实；"cross-checked part of the paradigm"这句刻意收窄的表述准确——第二来源 ellaverbs.com 确实只覆盖了未完成过去/将来两组，不是全量，邮件没有夸大；esse/sedere 词源说法与 guides.ts 第703-704行近乎逐字对应，且该页本身标注来源为 Spanish Linguist
  3. **契合度** —— 判定"合理，不算硬凑"：Words for Granted 最新一集正是在讨论"谁来决定语法上的'正确'"，本次切入角度（权威来源冲突时怎么判断、不规则动词为什么打破规则化生成、AI工具陈述语法事实的自信程度与可验证程度之间的落差）是对同一问题的自然延伸，不是泛泛的"来聊聊我的产品"
  4. **AI味自查** —— 重新通读原文，确认无 em dash、无排比三连、无夸大重要性词汇（testament/underscores/crucial/pivotal等）、无假装坦诚的开场白、无"不只是X，而是Y"句式、结尾具体且带个人色彩（提到 Stookesberry 那一集"good one"）而非泛泛套话，判定为真实人类写作风格
- **最终判定：can send**

### 发送结果

- ✅ 已发送。收件人 wordsforgranted@gmail.com，Message ID `19fc93f4445938ba`
- 因 lingogrove 的 Gmail Send-As 别名（contact@lingogrove.com）尚未完成 Mailjet SMTP 密码验证，本次发送省略了 `--from lingogrove`，走默认主账号 0009888@gmail.com 发出（邮件签名仍写 contact@lingogrove.com 作为回信地址，收件人回复会落到主账号收件箱）
- `outreach-drafts.md` 对应条目状态已同步更新为"已发送"

---

## 2026-08-16（第二轮）

**已确认冷却中，本轮不重复联系**：wordsforgranted@gmail.com（Words for Granted，2026-08-04 发出，14天冷却期到 08-18 才解除，本轮 08-16 仍差2天，跳过）。

**新切入角度**（源自 `src/data/guides.ts` 里 2026-08-16 当天刚发布的 `irregular-preterite-verbs-spanish` 一文，与 8/4 用过的 ser 变位表+esse/sedere 词源角度完全不同）：西班牙语"不规则"过去式动词看似要死记硬背，但常见的大多数其实只分三个词干家族——u-stem（estar→estuv-、tener→tuv-、poder→pud- 等8个动词共享同一套无重音符号词尾）、i-stem（hacer→hic-、querer→quis-、venir→vin-）、j-stem（decir→dij-、traer→traj-、以及全部 -ducir 动词，这组词尾在 ellos 形式上还有个独有例外：去掉 i 变成 -eron，所以是 dijeron 不是 dijieron）。三组共享的原因是它们都继承自拉丁语本身就不规则的完成时词干，不是现代西语的随机产物。另外两个真正的例外 dar/ver 各自成因不同，而 ir 和 ser 在过去式里合并成完全相同的一套变位（fui, fuiste, fue...），只能靠句子语境区分。这些结论均可在 `guides.ts` 第3042-3146行逐条回溯，且文中明确标注了来源（CliffsNotes、StudySpanish.com、SpanishDict、RAE 正字法页面）。

**核查了约18档候选播客**（语言学习/词源学/语言学/多语言方向，均为本轮新搜索，与首轮10档不重复）：

| 播客 | 判定 | 原因 |
|---|---|---|
| Because Language（Daniel Midgley 等，Talk the Talk 的延续） | 跳过 | 活跃（7月有更新），但近几期嘉宾清一色是出版书籍的作者/学者（Danny Bate、Valerie Fridland、Christopher Summerfield 等），嘉宾门槛需要出版履历，与独立站作者身份不匹配 |
| The Vocal Fries | 跳过 | 活跃（7/27最新），但主题是"语言歧视/社会语言学"，跟 LingoGrove 的语法/翻译对照内容方向不同，强凑角度会显得牵强 |
| Talk the Talk（原版） | 跳过 | 已停更，团队转型为 Because Language |
| Etymoleon（Leon Bailey-Green） | 跳过 | 活跃（周更），但确认是单人主持无嘉宾环节 |
| Very Bad Words | 跳过 | 无法确认2026年活跃度（搜索结果停留在较早期集数，最新一集日期查不到） |
| The Allusionist（Helen Zaltzman） | 跳过 | 近期嘉宾同样是出版作者/教授（Lauren Gawne、John Grindrod），专业制作+This American Life网络关系，非开放自荐渠道 |
| Actual Fluency Podcast（Kris Broholm） | 跳过 | 无法确认近期活跃，能查到的最新信息停在2024年底 |
| Fluent in 3 Months / Language & Travel Hacking（Benny Lewis） | 跳过 | 最新一集约2026年3月，距今超3个月新鲜度门槛 |
| Words Unravelled（RobWords & Jess Zafarris） | 跳过 | 活跃（7月有更新），但主体是双主持人对谈格式，仅偶尔有嘉宾，且嘉宾同样是出版作者/教授（Danny Bate、Valerie Fridland），门槛不匹配 |
| Grammar Girl | 跳过 | 近期嘉宾是语言学研究者/教授（Charles Kemp、Sali Tagliamonte），学术履历门槛 |
| Lexicon Valley（John McWhorter 等） | 跳过 | 主持人本身是哥伦比亚大学语言学教授，订阅制+学术基调，非开放外部嘉宾自荐渠道 |
| SlatorPod / Translation Media 等翻译行业播客 | 跳过 | 主题是翻译/本地化行业新闻与商业动态，受众是语言服务业从业者，跟 LingoGrove 面向英语母语者的语法/词源内容方向不匹配，强行投稿属于硬凑 |
| Connected By Language（Tandem App 自有播客） | 跳过 | 品牌方自制播客，嘉宾似乎从自家社区/语言导师中挑选，找不到明确的外部自荐联系方式（只有 Linktree），且内容格式是"探索一个国家"主题式，跟语法/变位角度不搭 |
| Craft of Language Learning（Ronald Johnson） | 跳过 | 嘉宾门槛友好（曾采访 Armchair Linguist、The Polyglot Files 等独立内容创作者，不要求学术出版履历），本来是本轮最接近的候选，但核实到最新一集是 2026-04-18，距今约4个月，超出3个月新鲜度门槛，跳过 |
| Linguistics Now（Vicky Loras） | 跳过 | 活跃（6/17最新），但嘉宾是大学教授/法务语言学专家（David Britain、Erez Levon、James R. Fitzgerald），学术/专业履历门槛，且主题偏研究性/法务语言学，非本站方向 |
| A Way with Words / Wayword Radio | 跳过 | 结构是听众来电问答为主，非嘉宾自荐渠道 |

**诚实小结**：本轮比首轮搜索范围更广（覆盖了语言学研究类、词源类、多语言/polyglot类、翻译行业类共约18档），但零候选同时通过"近3个月活跃"+"嘉宾门槛不需要出版/学术履历"两条门槛。核心模式跟首轮一致且更明显：这个赛道的活跃播客几乎全部要求嘉宾有出版书籍或大学教职背景（Because Language、Words Unravelled、Allusionist、Grammar Girl、Linguistics Now 均是此类），少数嘉宾门槛友好的（Craft of Language Learning）活跃度不够，品牌自制播客（Connected By Language）找不到可用的外部投稿渠道。没有强行拉低标准去凑一个不够格的候选。

**本轮结论：不撰稿、不发送**。未进入 humanizer/avoid-ai-writing 检查、outreach-drafts.md 追加、独立复核、gmail_send.py 发送等后续步骤，因为没有候选通过前置门槛。

**待Owen处理事项**：无。本轮是纯粹的赛道供给不足（活跃播客的嘉宾门槛集体偏学术/出版履历），不是任何身份验证/人机验证/人脉渠道类问题，不需要 Owen 介入，未写入 `独立站/待Owen处理事项.md`。
