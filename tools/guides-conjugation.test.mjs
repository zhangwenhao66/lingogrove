/**
 * Drift guard between the generator and the published page.
 *
 * The conjugation tables in src/data/guides.ts are produced by tools/conjugate.mjs and
 * then committed as literal data, so nothing has to run at build time. That copy step is
 * exactly where a page can quietly stop matching its own cited source: a 2026-08-04 audit
 * found the ser page's title promising "every tense" while the committed table held only
 * seven simple ones. These tests assert the committed data is still byte-identical to what
 * the generator produces, so the next drift fails the suite instead of shipping.
 *
 * Run with: npm test
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { buildIrregularConjugationTable, IRREGULAR_VERBS } from './conjugate.mjs';
import { guides } from '../src/data/guides.ts';

const conjugationGuides = guides.filter((g) => g.conjugation);

test('every guide carrying a conjugation table has one the generator can reproduce', () => {
	assert.ok(conjugationGuides.length > 0, 'no guide has a conjugation table — did the field get renamed?');
	for (const guide of conjugationGuides) {
		const verb = guide.conjugation.verb;
		assert.ok(IRREGULAR_VERBS[verb] || /(?:ar|er|ir)$/.test(verb), `"${verb}" is neither a known irregular nor a Spanish infinitive`);
	}
});

test('the committed ser table is exactly what the generator emits, in the same order', () => {
	const guide = guides.find((g) => g.slug === 'ser-conjugation');
	const generated = buildIrregularConjugationTable('ser', Object.keys(IRREGULAR_VERBS.ser.tenses));
	assert.deepEqual(JSON.parse(JSON.stringify(guide.conjugation)), JSON.parse(JSON.stringify(generated)));
});

test('the ser page\'s "every tense" claim is backed by the table it ships', () => {
	// The title is a coverage promise. Anything a reader would reasonably count as a tense
	// of ser has to be present, or the title has to change. Checked against RAE's own
	// paradigm list for the verb (https://dle.rae.es/ser).
	const guide = guides.find((g) => g.slug === 'ser-conjugation');
	assert.match(guide.title, /every tense/i, 'if the title stops promising every tense, relax this test deliberately');

	const shipped = new Set(guide.conjugation.tenses.map((t) => t.tense));
	for (const required of [
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
	]) {
		assert.ok(shipped.has(required), `title promises every tense but "${required}" is missing from the table`);
	}
});

test('conjugation tables cite an authority, not a verb-drill blog', () => {
	// The same audit flagged a source note that leaned on a commercial verb-drill site for
	// part of the table. Sourcing is the whole claim these pages make; keep it checkable.
	const AUTHORITATIVE = [/\bdle\.rae\.es\b/, /\brae\.es\b/, /\bwiktionary\.org\b/];
	for (const guide of conjugationGuides) {
		const { url, label, note } = guide.conjugation.source;
		assert.ok(url && label, `${guide.slug}: conjugation source needs both a label and a url`);
		assert.ok(
			AUTHORITATIVE.some((re) => re.test(url)),
			`${guide.slug}: conjugation source url ${url} is not one of the approved references`,
		);
		assert.ok(note && /\d{4}-\d{2}-\d{2}/.test(note), `${guide.slug}: source note must record the date the forms were fetched`);
	}
});
