/**
 * Tests for the verb-conjugation generator.
 *
 * THE ONE RULE FOR THIS FILE: every expected value below is transcribed from a fetched
 * source, never produced by running the generator and pasting the output back. A test
 * written that way passes by construction and would catch nothing.
 *
 * Sources:
 *  - Regular -ar/-er/-ir endings: Wiktionary's Spanish conjugation tables for hablar,
 *    comer, vivir (https://en.wiktionary.org/wiki/hablar, /comer, /vivir), fetched
 *    2026-08-03.
 *  - Irregular "ser": the Real Academia Española / ASALE conjugation table in the
 *    Diccionario de la lengua española (https://dle.rae.es/ser, DLE 23.8.1), fetched
 *    2026-08-04. Every expected value in the "ser" block below is transcribed from that
 *    table. Two independent re-checks against Wiktionary, fetched the same day:
 *      · the simple tenses and both imperatives matched https://en.wiktionary.org/wiki/ser
 *        exactly (including fuera/fuese, fuere and the negative imperative);
 *      · the compound tenses matched https://en.wiktionary.org/wiki/haber composed with
 *        the participle sido (he/había/hube/habré/habría, haya/hubiera/hubiese/hubiere).
 *    Two differences between the sources, both resolved in favour of RAE and documented
 *    on the page rather than silently averaged away:
 *      · RAE's imperative table has no nosotros slot (seamos is the present subjunctive
 *        used as a command); Wiktionary lists it. We keep the slot and say so.
 *      · RAE prints the imperfect subjunctive as one paradigm, "fuera o fuese";
 *        Wiktionary splits it into two rows. We keep one row, "fuera / fuese".
 *
 * Run with: npm test
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
	buildIrregularConjugationTable,
	buildRegularConjugationTable,
	conjugateRegularTense,
	IRREGULAR_VERBS,
	PRONOUNS,
} from './conjugate.mjs';

// ---------------------------------------------------------------------------
// Regular -ar verb: hablar
// ---------------------------------------------------------------------------

test('hablar (-ar) present', () => {
	assert.deepEqual(conjugateRegularTense('hablar', 'Present'), ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan']);
});

test('hablar (-ar) preterite', () => {
	assert.deepEqual(conjugateRegularTense('hablar', 'Preterite'), ['hablé', 'hablaste', 'habló', 'hablamos', 'hablasteis', 'hablaron']);
});

test('hablar (-ar) imperfect', () => {
	assert.deepEqual(conjugateRegularTense('hablar', 'Imperfect'), ['hablaba', 'hablabas', 'hablaba', 'hablábamos', 'hablabais', 'hablaban']);
});

test('hablar (-ar) future', () => {
	assert.deepEqual(conjugateRegularTense('hablar', 'Future'), ['hablaré', 'hablarás', 'hablará', 'hablaremos', 'hablaréis', 'hablarán']);
});

test('hablar (-ar) conditional', () => {
	assert.deepEqual(conjugateRegularTense('hablar', 'Conditional'), ['hablaría', 'hablarías', 'hablaría', 'hablaríamos', 'hablaríais', 'hablarían']);
});

test('hablar (-ar) present subjunctive', () => {
	assert.deepEqual(conjugateRegularTense('hablar', 'Subjunctive (present)'), ['hable', 'hables', 'hable', 'hablemos', 'habléis', 'hablen']);
});

// ---------------------------------------------------------------------------
// Regular -er verb: comer
// ---------------------------------------------------------------------------

test('comer (-er) present', () => {
	assert.deepEqual(conjugateRegularTense('comer', 'Present'), ['como', 'comes', 'come', 'comemos', 'coméis', 'comen']);
});

test('comer (-er) preterite', () => {
	assert.deepEqual(conjugateRegularTense('comer', 'Preterite'), ['comí', 'comiste', 'comió', 'comimos', 'comisteis', 'comieron']);
});

test('comer (-er) imperfect', () => {
	assert.deepEqual(conjugateRegularTense('comer', 'Imperfect'), ['comía', 'comías', 'comía', 'comíamos', 'comíais', 'comían']);
});

test('comer (-er) future', () => {
	assert.deepEqual(conjugateRegularTense('comer', 'Future'), ['comeré', 'comerás', 'comerá', 'comeremos', 'comeréis', 'comerán']);
});

test('comer (-er) conditional', () => {
	assert.deepEqual(conjugateRegularTense('comer', 'Conditional'), ['comería', 'comerías', 'comería', 'comeríamos', 'comeríais', 'comerían']);
});

test('comer (-er) present subjunctive', () => {
	assert.deepEqual(conjugateRegularTense('comer', 'Subjunctive (present)'), ['coma', 'comas', 'coma', 'comamos', 'comáis', 'coman']);
});

// ---------------------------------------------------------------------------
// Regular -ir verb: vivir
// ---------------------------------------------------------------------------

test('vivir (-ir) present', () => {
	assert.deepEqual(conjugateRegularTense('vivir', 'Present'), ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven']);
});

test('vivir (-ir) preterite', () => {
	assert.deepEqual(conjugateRegularTense('vivir', 'Preterite'), ['viví', 'viviste', 'vivió', 'vivimos', 'vivisteis', 'vivieron']);
});

test('vivir (-ir) imperfect', () => {
	assert.deepEqual(conjugateRegularTense('vivir', 'Imperfect'), ['vivía', 'vivías', 'vivía', 'vivíamos', 'vivíais', 'vivían']);
});

test('vivir (-ir) future', () => {
	assert.deepEqual(conjugateRegularTense('vivir', 'Future'), ['viviré', 'vivirás', 'vivirá', 'viviremos', 'viviréis', 'vivirán']);
});

test('vivir (-ir) conditional', () => {
	assert.deepEqual(conjugateRegularTense('vivir', 'Conditional'), ['viviría', 'vivirías', 'viviría', 'viviríamos', 'viviríais', 'vivirían']);
});

test('vivir (-ir) present subjunctive', () => {
	assert.deepEqual(conjugateRegularTense('vivir', 'Subjunctive (present)'), ['viva', 'vivas', 'viva', 'vivamos', 'viváis', 'vivan']);
});

test('rejects a verb that is not a Spanish infinitive', () => {
	assert.throws(() => conjugateRegularTense('walk', 'Present'));
});

test('rejects a tense with no regular-ending rule (imperative not implemented)', () => {
	assert.throws(() => conjugateRegularTense('hablar', 'Imperative (affirmative)'));
});

// ---------------------------------------------------------------------------
// buildRegularConjugationTable — shape + pronoun pairing
// ---------------------------------------------------------------------------

test('buildRegularConjugationTable pairs each form with the right pronoun', () => {
	const table = buildRegularConjugationTable('hablar', {
		language: 'Spanish',
		translation: 'to speak',
		tenses: ['Present'],
	});
	assert.equal(table.regularity, 'regular');
	assert.equal(table.tenses.length, 1);
	assert.deepEqual(
		table.tenses[0].forms,
		PRONOUNS.map((pronoun, i) => ({ pronoun, form: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'][i] })),
	);
});

// ---------------------------------------------------------------------------
// Irregular verb: ser
// ---------------------------------------------------------------------------

test('ser present', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses.Present, ['soy', 'eres', 'es', 'somos', 'sois', 'son']);
});

test('ser preterite', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses.Preterite, ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron']);
});

test('ser imperfect', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses.Imperfect, ['era', 'eras', 'era', 'éramos', 'erais', 'eran']);
});

test('ser future', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses.Future, ['seré', 'serás', 'será', 'seremos', 'seréis', 'serán']);
});

test('ser conditional', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses.Conditional, ['sería', 'serías', 'sería', 'seríamos', 'seríais', 'serían']);
});

test('ser present subjunctive', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Subjunctive (present)'], ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean']);
});

test('ser imperfect subjunctive (-ra and -se sets share one row)', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Subjunctive (imperfect)'], [
		'fuera / fuese',
		'fueras / fueses',
		'fuera / fuese',
		'fuéramos / fuésemos',
		'fuerais / fueseis',
		'fueran / fuesen',
	]);
});

test('ser future subjunctive', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Subjunctive (future)'], ['fuere', 'fueres', 'fuere', 'fuéremos', 'fuereis', 'fueren']);
});

test('ser affirmative imperative (no yo form)', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Imperative (affirmative)'], ['sé', 'sea', 'seamos', 'sed', 'sean']);
});

test('ser negative imperative', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Imperative (negative)'], ['no seas', 'no sea', 'no seamos', 'no seáis', 'no sean']);
});

// --- Compound tenses: haber + the invariable participle "sido" -------------------------

test('ser present perfect', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Present perfect'], ['he sido', 'has sido', 'ha sido', 'hemos sido', 'habéis sido', 'han sido']);
});

test('ser pluperfect', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses.Pluperfect, ['había sido', 'habías sido', 'había sido', 'habíamos sido', 'habíais sido', 'habían sido']);
});

test('ser preterite anterior', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Preterite anterior'], ['hube sido', 'hubiste sido', 'hubo sido', 'hubimos sido', 'hubisteis sido', 'hubieron sido']);
});

test('ser future perfect', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Future perfect'], ['habré sido', 'habrás sido', 'habrá sido', 'habremos sido', 'habréis sido', 'habrán sido']);
});

test('ser conditional perfect', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Conditional perfect'], ['habría sido', 'habrías sido', 'habría sido', 'habríamos sido', 'habríais sido', 'habrían sido']);
});

test('ser present perfect subjunctive', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Subjunctive (present perfect)'], ['haya sido', 'hayas sido', 'haya sido', 'hayamos sido', 'hayáis sido', 'hayan sido']);
});

test('ser pluperfect subjunctive (-ra and -se sets share one row)', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Subjunctive (pluperfect)'], [
		'hubiera / hubiese sido',
		'hubieras / hubieses sido',
		'hubiera / hubiese sido',
		'hubiéramos / hubiésemos sido',
		'hubierais / hubieseis sido',
		'hubieran / hubiesen sido',
	]);
});

test('ser future perfect subjunctive', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Subjunctive (future perfect)'], [
		'hubiere sido',
		'hubieres sido',
		'hubiere sido',
		'hubiéremos sido',
		'hubiereis sido',
		'hubieren sido',
	]);
});

test('ser non-finite forms', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Non-finite forms'], ['ser', 'siendo', 'sido', 'haber sido', 'habiendo sido']);
});

// --- Coverage: the page's title promises every tense, so the data table must have them ---

test('ser covers every paradigm RAE prints for it', () => {
	// RAE's table for ser: 5 simple indicative + 5 compound indicative, 3 simple
	// subjunctive + 3 compound subjunctive, the imperative, and the non-finite forms.
	// The negative imperative is ours (RAE folds negative commands into the subjunctive).
	assert.deepEqual(Object.keys(IRREGULAR_VERBS.ser.tenses), [
		'Present',
		'Preterite',
		'Imperfect',
		'Future',
		'Conditional',
		'Subjunctive (present)',
		'Subjunctive (imperfect)',
		'Subjunctive (future)',
		'Imperative (affirmative)',
		'Imperative (negative)',
		'Present perfect',
		'Pluperfect',
		'Preterite anterior',
		'Future perfect',
		'Conditional perfect',
		'Subjunctive (present perfect)',
		'Subjunctive (pluperfect)',
		'Subjunctive (future perfect)',
		'Non-finite forms',
	]);
});

test('every compound paradigm is its haber form plus the participle sido', () => {
	// Transcribed from Wiktionary's conjugation of haber, the independent re-check on the
	// compound forms. If a compound row ever drifts, this catches it without re-listing it.
	const HABER = {
		'Present perfect': ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
		Pluperfect: ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
		'Preterite anterior': ['hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron'],
		'Future perfect': ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
		'Conditional perfect': ['habría', 'habrías', 'habría', 'habríamos', 'habríais', 'habrían'],
		'Subjunctive (present perfect)': ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
		'Subjunctive (future perfect)': ['hubiere', 'hubieres', 'hubiere', 'hubiéremos', 'hubiereis', 'hubieren'],
	};
	for (const [tense, auxForms] of Object.entries(HABER)) {
		assert.deepEqual(
			IRREGULAR_VERBS.ser.tenses[tense],
			auxForms.map((aux) => `${aux} sido`),
			`${tense} should be haber + sido`,
		);
	}
});

test('every ser paradigm has the right number of slots for its row labels', () => {
	for (const [tense, forms] of Object.entries(IRREGULAR_VERBS.ser.tenses)) {
		const expected = tense === 'Non-finite forms' || tense.startsWith('Imperative') ? 5 : 6;
		assert.equal(forms.length, expected, `${tense} should have ${expected} slots`);
	}
});

test('buildIrregularConjugationTable assembles ser with correct pronoun labels, including the 5-slot imperative', () => {
	const table = buildIrregularConjugationTable('ser', ['Present', 'Imperative (affirmative)']);
	assert.equal(table.regularity, 'irregular');
	assert.equal(table.verb, 'ser');
	assert.equal(table.translation, 'to be');

	const present = table.tenses.find((t) => t.tense === 'Present');
	assert.deepEqual(present.forms.map((f) => f.pronoun), PRONOUNS);
	assert.deepEqual(present.forms.map((f) => f.form), ['soy', 'eres', 'es', 'somos', 'sois', 'son']);

	const imperative = table.tenses.find((t) => t.tense === 'Imperative (affirmative)');
	assert.equal(imperative.forms.length, 5);
	assert.equal(imperative.forms[0].pronoun, 'tú');
	assert.equal(imperative.forms[0].form, 'sé');
});

test('buildIrregularConjugationTable rejects a verb not in the table', () => {
	assert.throws(() => buildIrregularConjugationTable('estar', ['Present']));
});

test('buildIrregularConjugationTable labels the non-finite block by form name, not pronoun', () => {
	const table = buildIrregularConjugationTable('ser', ['Non-finite forms']);
	assert.deepEqual(table.tenses[0].forms, [
		{ pronoun: 'infinitive', form: 'ser' },
		{ pronoun: 'gerund', form: 'siendo' },
		{ pronoun: 'past participle', form: 'sido' },
		{ pronoun: 'perfect infinitive', form: 'haber sido' },
		{ pronoun: 'perfect gerund', form: 'habiendo sido' },
	]);
});

test('buildIrregularConjugationTable rejects a tense with no data for the verb', () => {
	assert.throws(() => buildIrregularConjugationTable('ser', ['Subjunctive (imperfect perfect)']));
});
