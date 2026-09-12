// Unit tests for src/lib/conjugationDrill.ts.
// Run with: npm test (node --test src/lib/*.test.ts, alongside the existing tools/*.test.mjs glob)

import test from 'node:test';
import assert from 'node:assert/strict';
import {
	buildDeck,
	checkAnswer,
	expandAlternatives,
	normalizeAnswer,
	pickDrillSet,
	shuffle,
	stripAccents,
} from './conjugationDrill.ts';
import type { ConjugationTable } from '../data/guides.ts';

const sampleTable: ConjugationTable = {
	verb: 'hablar',
	language: 'Spanish',
	translation: 'to speak',
	regularity: 'regular',
	source: { label: 'test', url: 'https://example.com/' },
	tenses: [
		{
			tense: 'Present',
			forms: [
				{ pronoun: 'yo', form: 'hablo' },
				{ pronoun: 'tú', form: 'hablas' },
				{ pronoun: 'él/ella/usted', form: 'habla' },
			],
		},
		{
			tense: 'Preterite',
			forms: [
				{ pronoun: 'yo', form: 'hablé' },
				{ pronoun: 'él/ella/usted', form: 'habló' },
			],
		},
		{
			tense: 'Subjunctive (imperfect)',
			forms: [{ pronoun: 'yo', form: 'hablara / hablase' }],
		},
	],
};

function fakeRng(sequence: number[]): () => number {
	let i = 0;
	return () => sequence[i++ % sequence.length];
}

// --- buildDeck ---------------------------------------------------------------------

test('buildDeck: one question per (tense, pronoun) cell, in table order', () => {
	const deck = buildDeck(sampleTable);
	assert.equal(deck.length, 6);
	assert.deepEqual(deck[0], { tense: 'Present', pronoun: 'yo', form: 'hablo' });
	assert.deepEqual(deck[3], { tense: 'Preterite', pronoun: 'yo', form: 'hablé' });
	assert.deepEqual(deck[5], { tense: 'Subjunctive (imperfect)', pronoun: 'yo', form: 'hablara / hablase' });
});

test('buildDeck: skips cells with an empty form', () => {
	const table: ConjugationTable = {
		...sampleTable,
		tenses: [{ tense: 'Present', forms: [{ pronoun: 'yo', form: '' }, { pronoun: 'tú', form: '  ' }, { pronoun: 'él', form: 'x' }] }],
	};
	assert.equal(buildDeck(table).length, 1);
});

test('buildDeck: empty table gives an empty deck', () => {
	assert.deepEqual(buildDeck({ ...sampleTable, tenses: [] }), []);
});

// --- shuffle / pickDrillSet --------------------------------------------------------

test('shuffle: does not mutate the input and keeps every element', () => {
	const items = [1, 2, 3, 4, 5];
	const before = items.slice();
	const out = shuffle(items, fakeRng([0.9, 0.1, 0.5]));
	assert.deepEqual(items, before);
	assert.deepEqual(out.slice().sort(), before);
});

test('shuffle: deterministic with an injected rng', () => {
	const out = shuffle(['a', 'b', 'c', 'd', 'e'], fakeRng([0]));
	assert.deepEqual(out, ['b', 'c', 'd', 'e', 'a']);
});

test('pickDrillSet: count < deck returns exactly count distinct questions', () => {
	const deck = buildDeck(sampleTable);
	const set = pickDrillSet(deck, 4);
	assert.equal(set.length, 4);
	const keys = set.map((q) => `${q.tense}|${q.pronoun}`);
	assert.equal(new Set(keys).size, 4);
});

test('pickDrillSet: count >= deck returns the whole deck, none dropped', () => {
	const deck = buildDeck(sampleTable);
	const set = pickDrillSet(deck, 10);
	assert.equal(set.length, 6);
	assert.deepEqual(
		new Set(set.map((q) => `${q.tense}|${q.pronoun}`)),
		new Set(deck.map((q) => `${q.tense}|${q.pronoun}`)),
	);
});

test('pickDrillSet: zero / negative count / empty deck all return []', () => {
	const deck = buildDeck(sampleTable);
	assert.deepEqual(pickDrillSet(deck, 0), []);
	assert.deepEqual(pickDrillSet(deck, -1), []);
	assert.deepEqual(pickDrillSet([], 10), []);
});

test('pickDrillSet: reproducible with an injected rng', () => {
	const deck = buildDeck(sampleTable);
	const a = pickDrillSet(deck, 3, fakeRng([0.3, 0.7, 0.1]));
	const b = pickDrillSet(deck, 3, fakeRng([0.3, 0.7, 0.1]));
	assert.deepEqual(a, b);
});

// --- expandAlternatives ------------------------------------------------------------

test('expandAlternatives: plain cell comes back as a single trimmed entry', () => {
	assert.deepEqual(expandAlternatives('hablo'), ['hablo']);
	assert.deepEqual(expandAlternatives('  no seas '), ['no seas']);
});

test('expandAlternatives: two single-word variants', () => {
	assert.deepEqual(expandAlternatives('fuera / fuese'), ['fuera', 'fuese']);
});

test('expandAlternatives: shared trailing participle is added to the short variant', () => {
	assert.deepEqual(expandAlternatives('hubiera / hubiese sido'), ['hubiera sido', 'hubiese sido']);
});

test('expandAlternatives: shared leading word is added to the later variant', () => {
	assert.deepEqual(expandAlternatives('no fuera / fuese'), ['no fuera', 'no fuese']);
});

test('expandAlternatives: variants with equal word counts are kept as written', () => {
	assert.deepEqual(expandAlternatives('he sido / he estado'), ['he sido', 'he estado']);
});

// --- normalizeAnswer / stripAccents ------------------------------------------------

test('normalizeAnswer: trims, collapses whitespace, case-folds', () => {
	assert.equal(normalizeAnswer('  Hemos   Sido '), 'hemos sido');
});

test('normalizeAnswer: NFD and NFC input compare equal', () => {
	assert.equal(normalizeAnswer('hablé'), normalizeAnswer('hablé'));
});

test('stripAccents: removes acute, grave, diaeresis, circumflex, cedilla', () => {
	assert.equal(stripAccents('hablé'), 'hable');
	assert.equal(stripAccents('où'), 'ou');
	assert.equal(stripAccents('für'), 'fur');
	assert.equal(stripAccents('être'), 'etre');
	assert.equal(stripAccents('ça'), 'ca');
});

test('stripAccents: keeps ñ because it is a distinct letter, not an accent', () => {
	assert.equal(stripAccents('año'), 'año');
	assert.equal(stripAccents('AÑO'), 'AÑO');
});

// --- checkAnswer -------------------------------------------------------------------

test('checkAnswer: exact match is correct', () => {
	assert.equal(checkAnswer('hablo', 'hablo'), 'correct');
});

test('checkAnswer: case, surrounding and doubled whitespace are ignored', () => {
	assert.equal(checkAnswer('  HABLO ', 'hablo'), 'correct');
	assert.equal(checkAnswer('hemos  sido', 'hemos sido'), 'correct');
});

test('checkAnswer: accent-stripped equality is "accents", never correct', () => {
	assert.equal(checkAnswer('hable', 'hablé'), 'accents');
	assert.equal(checkAnswer('eramos', 'éramos'), 'accents');
});

test('checkAnswer: "hablo" for "habló" is an accent slip, not a pass', () => {
	assert.equal(checkAnswer('hablo', 'habló'), 'accents');
	assert.notEqual(checkAnswer('hablo', 'habló'), 'correct');
});

test('checkAnswer: a stray accent on the right letters is also "accents"', () => {
	assert.equal(checkAnswer('habló', 'hablo'), 'accents');
});

test('checkAnswer: different form is wrong', () => {
	assert.equal(checkAnswer('hablas', 'hablo'), 'wrong');
	assert.equal(checkAnswer('sido', 'he sido'), 'wrong');
});

test('checkAnswer: empty or whitespace-only input is wrong', () => {
	assert.equal(checkAnswer('', 'hablo'), 'wrong');
	assert.equal(checkAnswer('   ', 'hablo'), 'wrong');
});

test('checkAnswer: either alternative of a slashed cell is correct', () => {
	assert.equal(checkAnswer('fuera', 'fuera / fuese'), 'correct');
	assert.equal(checkAnswer('fuese', 'fuera / fuese'), 'correct');
	assert.equal(checkAnswer('hubiese sido', 'hubiera / hubiese sido'), 'correct');
	assert.equal(checkAnswer('hubiera sido', 'hubiera / hubiese sido'), 'correct');
});

test('checkAnswer: the raw slashed cell text typed verbatim is accepted', () => {
	assert.equal(checkAnswer('fuera / fuese', 'fuera / fuese'), 'correct');
});

test('checkAnswer: accent slip on an alternative is "accents"', () => {
	assert.equal(checkAnswer('fueramos', 'fuéramos / fuésemos'), 'accents');
});

test('checkAnswer: ñ vs n is wrong, not an accent slip', () => {
	assert.equal(checkAnswer('ano', 'año'), 'wrong');
});

test('checkAnswer: accents-only check also ignores case', () => {
	assert.equal(checkAnswer('Hable', 'hablé'), 'accents');
});

// --- real site data ----------------------------------------------------------------

test('guides: every conjugation table builds a non-empty deck whose forms all self-check as correct', async () => {
	const { guides } = await import('../data/guides.ts');
	const withTables = guides.filter((g) => g.conjugation);
	assert.ok(withTables.length > 0, 'expected at least one guide with a conjugation table');
	for (const g of withTables) {
		const deck = buildDeck(g.conjugation!);
		assert.ok(deck.length > 0, `${g.slug}: empty deck`);
		for (const q of deck) {
			assert.ok(q.tense.length > 0 && q.pronoun.length > 0, `${g.slug}: blank tense/pronoun`);
			for (const alt of expandAlternatives(q.form)) {
				assert.ok(!alt.includes('/'), `${g.slug}: unexpanded slash in "${q.form}"`);
				assert.equal(checkAnswer(alt, q.form), 'correct', `${g.slug}: "${alt}" should pass for "${q.form}"`);
			}
		}
	}
});
