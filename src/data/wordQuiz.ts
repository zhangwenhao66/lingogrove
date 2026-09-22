export interface WordQuizItem {
	/** Spanish sentence with the target word/form replaced by "___". */
	sentence: string;
	/** English gloss of the full, correct sentence. */
	translation: string;
	/** Exactly two options: the correct word/form and its confusable counterpart. */
	choices: [string, string];
	/** Index into `choices` that is correct. */
	correctIndex: 0 | 1;
	explanation: string;
	sourceSlug: string;
	sourceTitle: string;
}

// Curated from src/data/guides.ts example sentences in seven "confusable pair" Grammar
// articles (por-vs-para, ser-vs-estar, preterite-vs-imperfect, saber-vs-conocer,
// direct-vs-indirect-object-pronouns-spanish, spanish-pronouns, japanese-particles-wa-ga-wo-ni)
// -- see 填空判断题-实施方案_20260806.md for the original four-article scope; the fifth
// (lo/la vs. le/les) was added 2026-09-18, the sixth and seventh (spanish-pronouns'
// conmigo/tú/quienes/esto contrasts and japanese-particles' wa/ga/ni/de contrasts) were
// added 2026-09-22. Neither of the last two is itself framed as a two-word "confusable
// pair" article the way the first five are, but each sets up multiple explicit
// right-form-vs-wrong-form or right-particle-vs-wrong-particle contrasts in its own body
// text, which is what the quiz format actually needs. Every sentence, its translation, and
// its explanation are taken directly from that article's own body/FAQ text; only the blank
// itself (replacing the target word) is a mechanical edit, not new content. Two of the
// original four articles (ser-vs-estar, preterite-vs-imperfect) intentionally include a
// same-verb contrast pair (es/está simpática, es/está aquí) because the article itself uses
// that contrast to teach the distinction.
export const wordQuizItems: WordQuizItem[] = [
	{
		sentence: 'Salimos ___ Madrid mañana.',
		translation: "We're leaving for Madrid tomorrow.",
		choices: ['por', 'para'],
		correctIndex: 1,
		explanation:
			'Para marks destination — the endpoint of the trip, not the road you take to get there.',
		sourceSlug: 'por-vs-para',
		sourceTitle: 'Por vs. Para: The Actual Difference (With Real Examples)',
	},
	{
		sentence: 'Vivimos en Lima ___ tres años.',
		translation: 'We lived in Lima for three years.',
		choices: ['por', 'para'],
		correctIndex: 0,
		explanation: 'Por marks duration — a stretch of time the action fills, not a deadline it\'s aimed at.',
		sourceSlug: 'por-vs-para',
		sourceTitle: 'Por vs. Para: The Actual Difference (With Real Examples)',
	},
	{
		sentence: 'Cerraron la escuela ___ la tormenta.',
		translation: 'They closed the school because of the storm.',
		choices: ['por', 'para'],
		correctIndex: 0,
		explanation:
			'Por marks cause or reason. This is the sense learners get wrong most often in the other direction — gracias por tu ayuda ("thanks for your help") uses por, not para, because the help is the reason for the thanks, not its destination.',
		sourceSlug: 'por-vs-para',
		sourceTitle: 'Por vs. Para: The Actual Difference (With Real Examples)',
	},
	{
		sentence: 'Te llamo ___ teléfono esta noche.',
		translation: "I'll call you by phone tonight.",
		choices: ['por', 'para'],
		correctIndex: 0,
		explanation: 'Por marks means — the channel something travels through.',
		sourceSlug: 'por-vs-para',
		sourceTitle: 'Por vs. Para: The Actual Difference (With Real Examples)',
	},
	{
		sentence: 'El informe es ___ el viernes.',
		translation: 'The report is due by Friday.',
		choices: ['por', 'para'],
		correctIndex: 1,
		explanation:
			"Para marks a deadline — a point in the future the action is aimed at, not a stretch of time it fills.",
		sourceSlug: 'por-vs-para',
		sourceTitle: 'Por vs. Para: The Actual Difference (With Real Examples)',
	},
	{
		sentence: 'Caminamos ___ el centro histórico.',
		translation: 'We walked through the historic center.',
		choices: ['por', 'para'],
		correctIndex: 0,
		explanation:
			"Por marks motion through a place. Contrast this with para's destination sense: caminamos para el centro would mean walking toward downtown as a goal, not wandering through it.",
		sourceSlug: 'por-vs-para',
		sourceTitle: 'Por vs. Para: The Actual Difference (With Real Examples)',
	},
	{
		sentence: '___ de Colombia.',
		translation: 'She is from Colombia.',
		choices: ['Es', 'Está'],
		correctIndex: 0,
		explanation: 'Ser marks identity and origin — where someone is from and what category they belong to.',
		sourceSlug: 'ser-vs-estar',
		sourceTitle: 'Ser vs. Estar: How to Actually Tell Them Apart',
	},
	{
		sentence: 'Ella ___ simpática.',
		translation: 'She is nice, as a trait of who she is.',
		choices: ['es', 'está'],
		correctIndex: 0,
		explanation:
			'Ser marks an inherent characteristic. Swapping in estar here doesn\'t just sound wrong — it changes the claim being made.',
		sourceSlug: 'ser-vs-estar',
		sourceTitle: 'Ser vs. Estar: How to Actually Tell Them Apart',
	},
	{
		sentence: 'Ella ___ simpática hoy.',
		translation: "She's being nice today.",
		choices: ['es', 'está'],
		correctIndex: 1,
		explanation:
			'Estar marks a temporary or perceived condition. This is the direct contrast with ella es simpática — it changes the claim from "this is who she is" to "this is how she\'s acting right now," implying it might not usually be the case.',
		sourceSlug: 'ser-vs-estar',
		sourceTitle: 'Ser vs. Estar: How to Actually Tell Them Apart',
	},
	{
		sentence: 'Madrid ___ en España.',
		translation: 'Madrid is in Spain.',
		choices: ['es', 'está'],
		correctIndex: 1,
		explanation: "Physical location of a place is estar's territory almost without exception.",
		sourceSlug: 'ser-vs-estar',
		sourceTitle: 'Ser vs. Estar: How to Actually Tell Them Apart',
	},
	{
		sentence: 'La fiesta ___ aquí.',
		translation: 'The party is here.',
		choices: ['es', 'está'],
		correctIndex: 0,
		explanation:
			"The location of an event uses ser, while the location of a physical object or person uses estar — a distinction that trips up a lot of learners because both look like \"location\" sentences on the surface.",
		sourceSlug: 'ser-vs-estar',
		sourceTitle: 'Ser vs. Estar: How to Actually Tell Them Apart',
	},
	{
		sentence: 'La puerta ___ abierta.',
		translation: 'The door is open.',
		choices: ['es', 'está'],
		correctIndex: 1,
		explanation:
			'Estar reports the result of a change — someone opened it; estar reports the resulting state, not the identity of the door.',
		sourceSlug: 'ser-vs-estar',
		sourceTitle: 'Ser vs. Estar: How to Actually Tell Them Apart',
	},
	{
		sentence: '___ comiendo.',
		translation: 'I am eating.',
		choices: ['Soy', 'Estoy'],
		correctIndex: 1,
		explanation:
			'Every Spanish progressive construction uses estar plus a gerund, never ser. This one has no exceptions.',
		sourceSlug: 'ser-vs-estar',
		sourceTitle: 'Ser vs. Estar: How to Actually Tell Them Apart',
	},
	{
		sentence: 'El mayordomo ___ las escaleras.',
		translation: 'The butler went down the stairs.',
		choices: ['bajó', 'bajaba'],
		correctIndex: 0,
		explanation:
			'The preterite reports an action as done, viewed from outside as a single, bounded event. Bajó las escaleras reports that the descent was completed.',
		sourceSlug: 'preterite-vs-imperfect',
		sourceTitle: 'Preterite vs. Imperfect: How Spanish Splits the Simple Past',
	},
	{
		sentence: 'Cuando era niño, ___ en el parque todos los días.',
		translation: 'When I was a kid, I used to play in the park every day.',
		choices: ['jugaba', 'jugó'],
		correctIndex: 0,
		explanation:
			'Imperfect is the tense for habitual or repeated actions in the past — a repeated routine with no single completed instance being reported.',
		sourceSlug: 'preterite-vs-imperfect',
		sourceTitle: 'Preterite vs. Imperfect: How Spanish Splits the Simple Past',
	},
	{
		sentence: '___ en México diez años.',
		translation: 'She lived in Mexico for ten years.',
		choices: ['Vivió', 'Vivía'],
		correctIndex: 0,
		explanation:
			'Even a ten-year stretch takes the preterite when the sentence frames it as a closed, completed chapter, not a description of what daily life was like while it was happening.',
		sourceSlug: 'preterite-vs-imperfect',
		sourceTitle: 'Preterite vs. Imperfect: How Spanish Splits the Simple Past',
	},
	{
		sentence: 'Cuando llegué, ella ___.',
		translation: 'When I arrived, she was sleeping.',
		choices: ['dormía', 'durmió'],
		correctIndex: 0,
		explanation:
			'The arrival (llegué) is preterite — a completed, single event — while the sleeping (dormía) is imperfect, already in progress with no marked start or end from the sentence\'s point of view.',
		sourceSlug: 'preterite-vs-imperfect',
		sourceTitle: 'Preterite vs. Imperfect: How Spanish Splits the Simple Past',
	},
	{
		sentence: '___ nadar.',
		translation: 'I know how to swim.',
		choices: ['Sé', 'Conozco'],
		correctIndex: 0,
		explanation:
			'Any "know how to [verb]" construction uses saber plus an infinitive, never conocer. Conocer can\'t take an infinitive as its object at all.',
		sourceSlug: 'saber-vs-conocer',
		sourceTitle: 'Saber vs. Conocer: Spanish Has Two Verbs for "To Know"',
	},
	{
		sentence: '___ a Ana desde hace diez años.',
		translation: "I've known Ana for ten years.",
		choices: ['Conozco', 'Sé'],
		correctIndex: 0,
		explanation:
			'Conocer is for familiarity with people. When the direct object is a specific person, Spanish requires the personal a before it — conozco a Ana, never conozco Ana.',
		sourceSlug: 'saber-vs-conocer',
		sourceTitle: 'Saber vs. Conocer: Spanish Has Two Verbs for "To Know"',
	},
	{
		sentence: '___ que el tren sale a las ocho.',
		translation: 'I know the train leaves at eight.',
		choices: ['Sé', 'Conozco'],
		correctIndex: 0,
		explanation:
			'Saber takes a fact, a piece of data, or a que-clause as its object — something you could, in principle, write down.',
		sourceSlug: 'saber-vs-conocer',
		sourceTitle: 'Saber vs. Conocer: Spanish Has Two Verbs for "To Know"',
	},
	{
		sentence: '___ Lima, pero nunca he estado en Cusco.',
		translation: "I know Lima, but I've never been to Cusco.",
		choices: ['Conozco', 'Sé'],
		correctIndex: 0,
		explanation:
			'Conocer means "have been to / am familiar with" a place, which is why it doesn\'t take the personal a — a city isn\'t a person.',
		sourceSlug: 'saber-vs-conocer',
		sourceTitle: 'Saber vs. Conocer: Spanish Has Two Verbs for "To Know"',
	},
	{
		sentence: '___ que María se casó.',
		translation: 'I found out that María got married.',
		choices: ['Supe', 'Conocí'],
		correctIndex: 0,
		explanation:
			'In the preterite, saber shifts meaning: supe marks the moment the fact entered your head — "I found out" — not an ongoing state of possessing it.',
		sourceSlug: 'saber-vs-conocer',
		sourceTitle: 'Saber vs. Conocer: Spanish Has Two Verbs for "To Know"',
	},
	{
		sentence: '___ a Ana en la fiesta.',
		translation: 'I met Ana at the party.',
		choices: ['Conocí', 'Supe'],
		correctIndex: 0,
		explanation:
			'In the preterite, conocer shifts meaning too: conocí marks the moment acquaintance began — "I met" — not a state of already knowing her.',
		sourceSlug: 'saber-vs-conocer',
		sourceTitle: 'Saber vs. Conocer: Spanish Has Two Verbs for "To Know"',
	},
	// Added 2026-09-18 (LingoGrove COO session, following the same sourcing rule as the
	// four sets above): sentences, translations, and explanations are taken directly from
	// direct-vs-indirect-object-pronouns-spanish's own body/FAQ text; only the blank itself
	// is a mechanical edit. This fifth article was published 2026-08-04, after the original
	// four-article scope was fixed in 填空判断题-实施方案_20260806.md, and fits the same
	// "confusable word pair" format (lo/la vs. le/les) that the quiz was built for.
	{
		sentence: '___ veo.',
		translation: 'I see it. (the park)',
		choices: ['Lo', 'Le'],
		correctIndex: 0,
		explanation:
			'Lo replaces el parque, the exact thing the verb targets, so the pronoun has to be a direct object form.',
		sourceSlug: 'direct-vs-indirect-object-pronouns-spanish',
		sourceTitle: 'Direct vs. Indirect Object Pronouns: Lo/La vs. Le/Les',
	},
	{
		sentence: '___ conozco.',
		translation: 'I know him. (my brother)',
		choices: ['Lo', 'Le'],
		correctIndex: 0,
		explanation:
			'Tu hermano is what the verb conozco acts on directly, so it takes a direct object pronoun, lo, not le.',
		sourceSlug: 'direct-vs-indirect-object-pronouns-spanish',
		sourceTitle: 'Direct vs. Indirect Object Pronouns: Lo/La vs. Le/Les',
	},
	{
		sentence: '___ escribo una carta.',
		translation: 'I write him a letter. (my brother)',
		choices: ['Lo', 'Le'],
		correctIndex: 1,
		explanation:
			'The letter is the direct object here; mi hermano is only the recipient, so he needs the indirect object pronoun, le.',
		sourceSlug: 'direct-vs-indirect-object-pronouns-spanish',
		sourceTitle: 'Direct vs. Indirect Object Pronouns: Lo/La vs. Le/Les',
	},
	{
		sentence: '___ dije la verdad.',
		translation: 'I told her the truth.',
		choices: ['Le', 'La'],
		correctIndex: 0,
		explanation:
			'La dije la verdad is laísmo, using la for an indirect object, and the RAE treats it as a genuine error in every region. Le dije la verdad is the correct form.',
		sourceSlug: 'direct-vs-indirect-object-pronouns-spanish',
		sourceTitle: 'Direct vs. Indirect Object Pronouns: Lo/La vs. Le/Les',
	},
	{
		sentence: '___ compré un regalo.',
		translation: 'I bought him a gift.',
		choices: ['Le', 'Lo'],
		correctIndex: 0,
		explanation:
			'Lo compré un regalo is loísmo, using lo for an indirect object, and the RAE treats it as a genuine error in every region. Le compré un regalo is the correct form.',
		sourceSlug: 'direct-vs-indirect-object-pronouns-spanish',
		sourceTitle: 'Direct vs. Indirect Object Pronouns: Lo/La vs. Le/Les',
	},
	// Added 2026-09-22 (LingoGrove COO session): spanish-pronouns doesn't set up a two-way
	// "right form vs. wrong form" contrast the way the six sets above do, but its own body
	// text names five explicit contrast pairs (conmigo vs. con mí, tú vs. ti after entre,
	// quienes vs. quien for a plural antecedent, esto vs. este for the neutral demonstrative).
	// Sentences, translations, and explanations are taken directly from that article's own
	// body/FAQ text; only the blank itself is a mechanical edit.
	{
		sentence: '¿Vienes ___?',
		translation: 'Are you coming with me?',
		choices: ['conmigo', 'con mí'],
		correctIndex: 0,
		explanation:
			'Con forces a written fusion with mí, ti, and sí, producing conmigo, contigo, and consigo. Con mí is simply not a form Spanish uses; the fused word is mandatory.',
		sourceSlug: 'spanish-pronouns',
		sourceTitle: 'Spanish Pronouns: All Six Families in One Place',
	},
	{
		sentence: 'Lo que hablemos será entre ___ y yo.',
		translation: 'What we talk about will stay between you and me.',
		choices: ['tú', 'ti'],
		correctIndex: 0,
		explanation:
			'Entre is one of a handful of prepositions, along with según, excepto, salvo, and menos, that keep the plain subject-pronoun forms instead of switching to the tonic prepositional set, so it takes tú rather than the ti a learner might expect by analogy with every other preposition.',
		sourceSlug: 'spanish-pronouns',
		sourceTitle: 'Spanish Pronouns: All Six Families in One Place',
	},
	{
		sentence: 'Según ___, somos el enemigo.',
		translation: 'According to you, we\'re the enemy.',
		choices: ['tú', 'ti'],
		correctIndex: 0,
		explanation:
			'Según belongs to the same small group as entre: it takes the ordinary subject-pronoun form tú, not the tonic prepositional form ti that follows most other prepositions.',
		sourceSlug: 'spanish-pronouns',
		sourceTitle: 'Spanish Pronouns: All Six Families in One Place',
	},
	{
		sentence: 'Las personas con ___ hablé.',
		translation: 'The people I spoke with.',
		choices: ['quienes', 'quien'],
		correctIndex: 0,
		explanation:
			'Per the RAE\'s Diccionario panhispánico de dudas, quien has to become quienes when it stands in for a plural antecedent; las personas con quien hablé is now considered incorrect.',
		sourceSlug: 'spanish-pronouns',
		sourceTitle: 'Spanish Pronouns: All Six Families in One Place',
	},
	{
		sentence: 'No entiendo ___.',
		translation: 'I don\'t understand this. (referring to a whole situation, not one object)',
		choices: ['esto', 'este'],
		correctIndex: 0,
		explanation:
			'Esto is one of the neutral demonstratives (esto, eso, aquello), which never take a gender or a plural because they aren\'t standing in for any specific noun. Confusing neutral esto with masculine este is a real error, since este has to agree with a specific noun it replaces.',
		sourceSlug: 'spanish-pronouns',
		sourceTitle: 'Spanish Pronouns: All Six Families in One Place',
	},
	// Added 2026-09-22 (LingoGrove COO session): japanese-particles-wa-ga-wo-ni sets up two
	// explicit contrast pairs in its own body text (wa vs. ga for topic/subject, ni vs. de
	// for state/action at a location). Sentences, translations, and explanations are taken
	// directly from that article's own body text; only the blank itself is a mechanical edit.
	{
		sentence: 'Neko ___ imasu.',
		translation: 'There\'s a cat. (introducing the cat\'s existence as new information)',
		choices: ['ga', 'wa'],
		correctIndex: 0,
		explanation:
			'Ga is the default particle with imasu and arimasu, the existence verbs, when the sentence is introducing something as new information rather than picking it out as an already-established topic. Swapping in wa shifts the sentence toward a contrast with some other implied animal or person.',
		sourceSlug: 'japanese-particles-wa-ga-wo-ni',
		sourceTitle: 'Japanese Particles: Wa, Ga, Wo, and Ni (The Difference English Doesn\'t Mark)',
	},
	{
		sentence: 'Dare ___ kimasu ka?',
		translation: 'Who is coming?',
		choices: ['ga', 'wa'],
		correctIndex: 0,
		explanation:
			'A question asking exactly which specific person almost always takes ga, not wa, because naming exactly which thing is doing something is ga\'s job, not the sentence\'s topic.',
		sourceSlug: 'japanese-particles-wa-ga-wo-ni',
		sourceTitle: 'Japanese Particles: Wa, Ga, Wo, and Ni (The Difference English Doesn\'t Mark)',
	},
	{
		sentence: 'Watashi ___ gakusei desu.',
		translation: 'As for me, I\'m a student.',
		choices: ['wa', 'ga'],
		correctIndex: 0,
		explanation:
			'Wa sets up "me" as the topic, the thing the rest of the sentence is going to say something about, which is exactly the reading a general statement like this calls for.',
		sourceSlug: 'japanese-particles-wa-ga-wo-ni',
		sourceTitle: 'Japanese Particles: Wa, Ga, Wo, and Ni (The Difference English Doesn\'t Mark)',
	},
	{
		sentence: 'Toshokan ___ hon ga aru.',
		translation: 'There\'s a book in the library. (a state, not an action)',
		choices: ['ni', 'de'],
		correctIndex: 0,
		explanation:
			'Ni pins down where someone or something is. The book existing in the library is a state, not an action, so the sentence takes ni rather than de.',
		sourceSlug: 'japanese-particles-wa-ga-wo-ni',
		sourceTitle: 'Japanese Particles: Wa, Ga, Wo, and Ni (The Difference English Doesn\'t Mark)',
	},
	{
		sentence: 'Toshokan ___ hon wo yomu.',
		translation: 'Read a book in the library. (something actively happening at that location)',
		choices: ['de', 'ni'],
		correctIndex: 0,
		explanation:
			'De marks where an action takes place. Reading is something actively happening at that location, so the same physical place that took ni for a state of existence switches to de once it\'s about doing something there.',
		sourceSlug: 'japanese-particles-wa-ga-wo-ni',
		sourceTitle: 'Japanese Particles: Wa, Ga, Wo, and Ni (The Difference English Doesn\'t Mark)',
	},
];
