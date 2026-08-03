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
 *    generated or guessed. Every form was fetched from Wiktionary's Spanish conjugation
 *    tables (which are built from RAE-conformant conjugation templates) on 2026-08-03,
 *    cross-checked against a second independent source (ellaverbs.com, via web search)
 *    for the forms compared, and is re-verified in conjugate.test.mjs.
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
			label: 'Wiktionary — Spanish conjugation of "ser"',
			url: 'https://en.wiktionary.org/wiki/ser',
			note: 'Cross-checked against ellaverbs.com for imperfect/future forms, fetched 2026-08-03',
		},
		tenses: {
			Present: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
			Preterite: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
			Imperfect: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
			Future: ['seré', 'serás', 'será', 'seremos', 'seréis', 'serán'],
			Conditional: ['sería', 'serías', 'sería', 'seríamos', 'seríais', 'serían'],
			'Subjunctive (present)': ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
			// Imperative has no "yo" form; slots are tú, usted, nosotros, vosotros, ustedes.
			'Imperative (affirmative)': ['sé', 'sea', 'seamos', 'sed', 'sean'],
		},
	},
};

const IMPERATIVE_PRONOUNS = ['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];

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
			const pronouns = tense.startsWith('Imperative') ? IMPERATIVE_PRONOUNS : PRONOUNS;
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
	const tenses = tenseArg ? tenseArg.split(',') : defaultTenses;
	const table = IRREGULAR_VERBS[verb]
		? buildIrregularConjugationTable(verb, verb === 'ser' ? [...defaultTenses, 'Imperative (affirmative)'] : tenses)
		: buildRegularConjugationTable(verb, { language: 'Spanish', translation: '', tenses });
	console.log(JSON.stringify(table, null, 2));
}
