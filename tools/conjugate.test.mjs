/**
 * Tests for the verb-conjugation generator.
 *
 * THE ONE RULE FOR THIS FILE: every expected value below is transcribed from a fetched
 * source, never produced by running the generator and pasting the output back. A test
 * written that way passes by construction and would catch nothing.
 *
 * Sources (all fetched 2026-08-03):
 *  - Regular -ar/-er/-ir endings: Wiktionary's Spanish conjugation tables for hablar,
 *    comer, vivir (https://en.wiktionary.org/wiki/hablar, /comer, /vivir).
 *  - Irregular "ser": Wiktionary's Spanish conjugation table for ser
 *    (https://en.wiktionary.org/wiki/ser), cross-checked against ellaverbs.com's
 *    published imperfect/future forms (found via web search), which matched exactly.
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

test('ser affirmative imperative (no yo form)', () => {
	assert.deepEqual(IRREGULAR_VERBS.ser.tenses['Imperative (affirmative)'], ['sé', 'sea', 'seamos', 'sed', 'sean']);
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

test('buildIrregularConjugationTable rejects a tense with no data for the verb', () => {
	assert.throws(() => buildIrregularConjugationTable('ser', ['Imperative (negative)']));
});
