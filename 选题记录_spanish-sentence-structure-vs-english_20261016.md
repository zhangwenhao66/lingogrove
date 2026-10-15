# 动笔前选题记录 — lingogrove 新增长尾文章

**记录日期与位置**：2026-10-16，`lingogrove-content-publishing` 运行。
**页面**：https://lingogrove.com/spanish-sentence-structure-vs-english/（新增，slug `spanish-sentence-structure-vs-english`）
**本轮性质**：B-132 长尾新增（Graph 分区 / Grammar 类），走两档页级准入 + 点击理由 C1。

> **记录形成时间的如实说明**：本文件是**补录**（2026-10-16 01:0x 写入）。但驱动本轮选题的**实质记录在动笔之前就已落盘**——准入证据 JSON
> `独立站/research-db/longtail-pool/admission/lingogrove-spanish-sentence-structure-vs-english-20261016.json`
> 在撰写正文**之前**生成，且其中已包含查询组、SERP 逐页证据、集群、增量、去重、链接、点击理由与反证 `serp_answer`。
> 本文件只是把「验收口径 / 读者下一步」两项补齐并集中成文，**不声称其形成于动笔前**。

## 查询组与依据
- **主查询**：`spanish sentence structure vs english`（DataForSEO，location 2840 / en，metrics checked 2026-10-16，统计期 last_updated 2026-09-16，月量 170 / KD 0 / CPC $9.71 / competition 0.05 LOW）
- **同一意图承接变体**：`spanish sentence structure compared to english`（合并变体，用于准入代表词校验；本轮不拆页）
- **来源**：候选来自 `独立站/research-db/longtail-pool/LingoGrove-长尾候选池.csv`（verdict=`弱`，strong 1 / ugc 3 / aio 弱引用，serp_date 2026-10-10）；本轮**现场补取完整前 10 与 metrics**
- **意图标签**：informational（语法辨异 / 语言对比），**非 navigational**
- **集群**：Spanish syntax / sentence structure。同簇已发布：`spanish-prepositions`、`spanish-conjunctions`、`direct-vs-indirect-object-pronouns-spanish`、`spanish-pronouns`、`verbs-like-gustar`、`spanish-question-words`
- **变体是否查证**：主查询与合并变体均来自本次真实 SERP / metrics 调用（非假设）。队列文件里另有 `spanish sentence structure`（2400/月，v2 档 B）——那是**另一个词**，本轮未占用它，也未据它借量

## 验收口径
- **URL/slug**：`/spanish-sentence-structure-vs-english/`（新增页）
- **指标**：该 URL 在新页上线后于 GSC / Bing 的曝光与点击；目标查询组 = 主查询 + 合并变体
- **数据来源**：GSC API、Bing Webmaster、DataForSEO（准入用）
- **修改前基线**：新页，**无基线**（GSC/Bing 尚无该 URL 记录，记「尚无记录」，不填 0）
- **复盘窗口**：沿用本站现有页龄窗口与 `选词分档校准日志.md` 的既有校准节奏；6 周内不做标题改写，避免干扰评估
- **样本不足或拉不到数据记未检查**，不编造「几个月进前 20/30」的承诺，不因未达标自动改写或加产能

## 读者下一步
- **输入/问题**：读者想知道英语句子和西班牙语句子在语序上到底差在哪——既然两边都是主语—动词—宾语，为什么西语句子读起来还是不一样？具体卡点是宾语代词该放动词前还是动词后（以及附着时要不要改拼写、加不作重音符）、主语代词什么时候必须省略、疑问句是否要倒装
- **本页交付**：5 类句式 × 3 维度的槽位对照表（英语槽位 / 西语槽位 / 触发变序的规则），外加「西语宾语代词放哪」的机械判定规则与附着拼写变化
- **下一步目标页**：正文内链指向 `/spanish-pronouns/`、`/direct-vs-indirect-object-pronouns-spanish/`、`/spanish-question-words/`（三者为同簇承接页，均已 grep 确认 slug 真实存在）。读者读完本页后最自然的下一步是查具体代词形或疑问词，故指向这三页而非另开新页

## 用户任务与结果验收
- **用户带着什么输入/问题来** → 带着「英西句子结构到底哪里不同」这个问题来（含宾语代词位置这一具体操作卡点）
- **本页交付什么可验证结果** → 一张可直接对照的槽位表 + 一条可手算执行的代词位置判据（限定动词前 / 不定式·动名词·肯定祈使后 / 否定祈使回到动词前），每条附 RAE 原文例句
- **怎样确认完成** → 读者能用判据独立判断任一句子的代词位置；表内每一格有已核例句佐证

## 前置闸门执行情况（2026-10-16）
- 页型集中度闸门 `page_mix_audit.py --advise lingogrove`：**✅ 页型结构安全，任何页型均可发**
- 骨架级停止新增名单：本站触发项为**动词变位类**（`-endings` / `ser-conjugation`），本页属句式对照，**不在停止骨架内**
- Google 更新窗口 `google-update-status.json`（checked 2026-10-15）：`active=false`、`recent_end_within_7d=true` → 按规则只发独立调研的一次性内容；**本页为一次性调研内容，非模板/程序化页型**
- 主表历史标注复核：`流量站词库/LingoGrove-关键词库.md` 第 895 行 `spanish sentence structure`（2400/0/$2.20，2026-09-02 相邻词补库）**无跳过/壁垒标注**
- 蚕食检查：站内 82 篇无同意图页（`grep` 全部 slug/title 后确认）；队列文件该词的 v2 档位为 B，B-132 长尾流程**豁免 v2 A/B/C 档过滤**
