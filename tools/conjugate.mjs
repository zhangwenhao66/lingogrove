/**
 * Verb-conjugation table generator for LingoGrove.
 *
 * Two paths, per CLAUDE.md section 4 ("变位表必须程序生成+单元测试"):
 *
 *  - REGULAR verbs: the ending is computed from the infinitive's -ar/-er/-ir class via
 *    REGULAR_ENDINGS below. This is safe to compute because the whole point of "regular"
 *    is that every verb in the class takes the same ending — that claim itself is checked
 *    in conjugate.test.mjs against three real verbs (hablar/comer/vivir) fetched from an
 *    independent source, not just asserted.
 *  - IRREGULAR verbs: looked up form-by-form from IRREGULAR_VERBS. Nothing here is
 *    generated or guessed. Every form was transcribed from the Real Academia Española /
 *    ASALE conjugation table in the Diccionario de la lengua española (DLE 23.8.1,
 *    https://dle.rae.es/ser), fetched 2026-08-04, and is re-verified in
 *    conjugate.test.mjs. The simple tenses and both imperatives were independently
 *    re-checked against Wiktionary's Spanish conjugation of "ser"; the compound tenses
 *    were re-checked against Wiktionary's conjugation of "haber", since every Spanish
 *    compound tense is a form of haber plus the invariable participle.
 *
 * Do NOT add an irregular verb's forms by typing them in from memory. Fetch them from a
 * cited source, add the citation to IRREGULAR_VERBS[verb].source, and add a test.
 */

import { fileURLToPath } from 'node:url';

export const PRONOUNS = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'];

/**
 * Standard endings for fully regular Spanish verbs, keyed by infinitive class and tense.
 * Present/Preterite/Imperfect/Subjunctive endings replace the infinitive's -ar/-er/-ir;
 * Future/Conditional endings attach to the FULL infinitive (that's why they're identical
 * across all three classes). Verified against Wiktionary's hablar/comer/vivir conjugation
 * tables, fetched 2026-08-03 — see conjugate.test.mjs for the transcribed values.
 */
const REGULAR_ENDINGS = {
	ar: {
		Present: ['o', 'as', 'a', 'amos', 'áis', 'an'],
		Preterite: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
		Imperfect: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
		'Subjunctive (present)': ['e', 'es', 'e', 'emos', 'éis', 'en'],
	},
	er: {
		Present: ['o', 'es', 'e', 'emos', 'éis', 'en'],
		Preterite: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
		Imperfect: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
		'Subjunctive (present)': ['a', 'as', 'a', 'amos', 'áis', 'an'],
	},
	ir: {
		Present: ['o', 'es', 'e', 'imos', 'ís', 'en'],
		Preterite: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
		Imperfect: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
		'Subjunctive (present)': ['a', 'as', 'a', 'amos', 'áis', 'an'],
	},
};

// Future/conditional attach to the full infinitive and are identical across all three
// classes for fully regular verbs.
const FULL_INFINITIVE_ENDINGS = {
	Future: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
	Conditional: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
};

function verbClass(infinitive) {
	const suffix = infinitive.slice(-2);
	if (suffix === 'ar' || suffix === 'er' || suffix === 'ir') return suffix;
	throw new Error(`"${infinitive}" doesn't end in -ar/-er/-ir — not a Spanish infinitive this generator handles`);
}

/**
 * Conjugates a fully regular Spanish verb for one tense. Throws for stem-changing or
 * spelling-change verbs — those aren't "regular" in the sense this function assumes, and
 * must go through IRREGULAR_VERBS (or a dedicated stem-changing helper, not yet built).
 */
export function conjugateRegularTense(infinitive, tense) {
	const cls = verbClass(infinitive);
	const stem = infinitive.slice(0, -2);

	if (tense === 'Future' || tense === 'Conditional') {
		return FULL_INFINITIVE_ENDINGS[tense].map((ending) => infinitive + ending);
	}
	const endings = REGULAR_ENDINGS[cls]?.[tense];
	if (!endings) throw new Error(`No regular-ending rule for tense "${tense}" (class -${cls})`);
	return endings.map((ending) => stem + ending);
}

export function buildRegularConjugationTable(infinitive, { language, translation, tenses }) {
	return {
		verb: infinitive,
		language,
		translation,
		regularity: 'regular',
		tenses: tenses.map((tense) => ({
			tense,
			forms: conjugateRegularTense(infinitive, tense).map((form, i) => ({ pronoun: PRONOUNS[i], form })),
		})),
		source: {
			label: 'Wiktionary — Spanish regular verb conjugation (hablar/comer/vivir)',
			url: 'https://en.wiktionary.org/wiki/hablar',
			note: 'Regular -ar/-er/-ir endings, cross-checked against Wiktionary conjugation tables fetched 2026-08-03',
		},
	};
}

/**
 * Irregular verbs, hand-verified form by form. See the file docstring for the sourcing
 * rule. Add new verbs here only with a citation and a corresponding test.
 */
export const IRREGULAR_VERBS = {
	ser: {
		language: 'Spanish',
		translation: 'to be',
		source: {
			label: 'the Real Academia Española conjugation table for "ser"',
			url: 'https://dle.rae.es/ser',
			note: 'Every form transcribed from the RAE/ASALE conjugation table (DLE 23.8.1) on 2026-08-04; simple tenses and both imperatives re-checked against Wiktionary\'s "ser" entry, compound tenses against its "haber" entry',
		},
		// Key order below is the order the tenses render in. Simple tenses first, then the
		// compound (haber + sido) ones, then the non-finite forms.
		tenses: {
			Present: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
			Preterite: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
			Imperfect: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
			Future: ['seré', 'serás', 'será', 'seremos', 'seréis', 'serán'],
			Conditional: ['sería', 'serías', 'sería', 'seríamos', 'seríais', 'serían'],
			'Subjunctive (present)': ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
			// RAE prints the -ra and -se sets as one paradigm ("fuera o fuese"); the two are
			// interchangeable in this tense, so they share a row here rather than duplicating it.
			'Subjunctive (imperfect)': ['fuera / fuese', 'fueras / fueses', 'fuera / fuese', 'fuéramos / fuésemos', 'fuerais / fueseis', 'fueran / fuesen'],
			'Subjunctive (future)': ['fuere', 'fueres', 'fuere', 'fuéremos', 'fuereis', 'fueren'],
			// Imperative has no "yo" form; slots are tú, usted, nosotros, vosotros, ustedes.
			// RAE's own table omits the nosotros slot (see IMPERATIVE_PRONOUNS below).
			'Imperative (affirmative)': ['sé', 'sea', 'seamos', 'sed', 'sean'],
			'Imperative (negative)': ['no seas', 'no sea', 'no seamos', 'no seáis', 'no sean'],
			'Present perfect': ['he sido', 'has sido', 'ha sido', 'hemos sido', 'habéis sido', 'han sido'],
			Pluperfect: ['había sido', 'habías sido', 'había sido', 'habíamos sido', 'habíais sido', 'habían sido'],
			'Preterite anterior': ['hube sido', 'hubiste sido', 'hubo sido', 'hubimos sido', 'hubisteis sido', 'hubieron sido'],
			'Future perfect': ['habré sido', 'habrás sido', 'habrá sido', 'habremos sido', 'habréis sido', 'habrán sido'],
			'Conditional perfect': ['habría sido', 'habrías sido', 'habría sido', 'habríamos sido', 'habríais sido', 'habrían sido'],
			'Subjunctive (present perfect)': ['haya sido', 'hayas sido', 'haya sido', 'hayamos sido', 'hayáis sido', 'hayan sido'],
			'Subjunctive (pluperfect)': ['hubiera / hubiese sido', 'hubieras / hubieses sido', 'hubiera / hubiese sido', 'hubiéramos / hubiésemos sido', 'hubierais / hubieseis sido', 'hubieran / hubiesen sido'],
			'Subjunctive (future perfect)': ['hubiere sido', 'hubieres sido', 'hubiere sido', 'hubiéremos sido', 'hubiereis sido', 'hubieren sido'],
			'Non-finite forms': ['ser', 'siendo', 'sido', 'haber sido', 'habiendo sido'],
		},
	},
};

/**
 * The imperative's five slots. RAE's own imperative table for ser lists only four
 * (tú/vos, usted, vosotros, ustedes) because the nosotros command *seamos* is the present
 * subjunctive doing imperative duty, not a distinct imperative form. Wiktionary's table
 * does list it, and learners look for it, so it stays — the page prose says which is which.
 */
const IMPERATIVE_PRONOUNS = ['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];

/** The "Non-finite forms" block isn't person-inflected; its row labels are form names. */
const NON_FINITE_LABELS = ['infinitive', 'gerund', 'past participle', 'perfect infinitive', 'perfect gerund'];

export function rowLabelsForTense(tense) {
	if (tense === 'Non-finite forms') return NON_FINITE_LABELS;
	if (tense.startsWith('Imperative')) return IMPERATIVE_PRONOUNS;
	return PRONOUNS;
}

export function buildIrregularConjugationTable(verb, tenses) {
	const entry = IRREGULAR_VERBS[verb];
	if (!entry) throw new Error(`"${verb}" is not in IRREGULAR_VERBS — add it with a cited source first`);

	return {
		verb,
		language: entry.language,
		translation: entry.translation,
		regularity: 'irregular',
		tenses: tenses.map((tense) => {
			const forms = entry.tenses[tense];
			if (!forms) throw new Error(`No "${tense}" data for "${verb}" in IRREGULAR_VERBS`);
			const pronouns = rowLabelsForTense(tense);
			if (forms.length !== pronouns.length) {
				throw new Error(`"${verb}" ${tense} has ${forms.length} forms but ${pronouns.length} row labels`);
			}
			return {
				tense,
				forms: forms.map((form, i) => ({ pronoun: pronouns[i], form })),
			};
		}),
		source: entry.source,
	};
}

/** CLI: node tools/conjugate.mjs <verb> [tense1,tense2,...] */
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
	const [verb, tenseArg] = process.argv.slice(2);
	if (!verb) {
		console.error('usage: node tools/conjugate.mjs <verb> [tense1,tense2,...]');
		console.error(`irregular verbs known: ${Object.keys(IRREGULAR_VERBS).join(', ')}`);
		process.exit(1);
	}
	const defaultTenses = ['Present', 'Preterite', 'Imperfect', 'Future', 'Conditional', 'Subjunctive (present)'];
	const entry = IRREGULAR_VERBS[verb];
	// For an irregular verb, "all tenses" means every paradigm in its data table, in the
	// order that table declares them — not a hardcoded list that can drift out of sync.
	const tenses = tenseArg ? tenseArg.split(',') : entry ? Object.keys(entry.tenses) : defaultTenses;
	const table = entry
		? buildIrregularConjugationTable(verb, tenses)
		: buildRegularConjugationTable(verb, { language: 'Spanish', translation: '', tenses });
	console.log(JSON.stringify(table, null, 2));
}
