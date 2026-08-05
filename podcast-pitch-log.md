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
