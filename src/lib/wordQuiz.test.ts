// Unit tests for src/lib/wordQuiz.ts.
// Run with: npm test (node --test src/lib/*.test.ts, alongside the existing tools/*.test.mjs glob)
//
// Node 22's native TypeScript stripping runs .test.ts files directly, no devDependency
// needed -- same pattern as DayAlmanac/WarCrumbs/WageLark/DialWick's src/lib/*.test.ts.

import test from 'node:test';
import assert from 'node:assert/strict';
import { pickQuizSet, splitAtBlank } from './wordQuiz.ts';
import type { WordQuizItem } from '../data/wordQuiz.ts';

function makeItems(n: number): WordQuizItem[] {
	return Array.from({ length: n }, (_, i) => ({
		sentence: `Sentence ${i} ___.`,
		translation: `Translation ${i}`,
		choices: ['a', 'b'] as [string, string],
		correctIndex: (i % 2) as 0 | 1,
		explanation: `Explanation ${i}`,
		sourceSlug: `slug-${i}`,
		sourceTitle: `Title ${i}`,
	}));
}

function fakeRng(sequence: number[]): () => number {
	let i = 0;
	return () => sequence[i++ % sequence.length];
}

test('pickQuizSet: count >= items.length returns every item, none dropped', () => {
	const items = makeItems(5);
	const result = pickQuizSet(items, 10);
	assert.equal(result.length, 5);
	assert.deepEqual(
		new Set(result.map((r) => r.sourceSlug)),
		new Set(items.map((r) => r.sourceSlug)),
	);
});

test('pickQuizSet: count < items.length returns exactly count items', () => {
	const items = makeItems(23);
	const result = pickQuizSet(items, 10);
	assert.equal(result.length, 10);
});

test('pickQuizSet: returned items are unique, no duplicates from the shuffle', () => {
	const items = makeItems(23);
	const result = pickQuizSet(items, 15);
	const slugs = result.map((r) => r.sourceSlug);
	assert.equal(new Set(slugs).size, slugs.length);
});

test('pickQuizSet: does not mutate the input array', () => {
	const items = makeItems(6);
	const before = items.map((i) => i.sourceSlug);
	pickQuizSet(items, 3, fakeRng([0.9, 0.1, 0.5, 0.5, 0.5]));
	assert.deepEqual(
		items.map((i) => i.sourceSlug),
		before,
	);
});

test('pickQuizSet: count of 0 returns an empty array', () => {
	assert.deepEqual(pickQuizSet(makeItems(5), 0), []);
});

test('pickQuizSet: negative count returns an empty array', () => {
	assert.deepEqual(pickQuizSet(makeItems(5), -3), []);
});

test('pickQuizSet: empty input returns an empty array regardless of count', () => {
	assert.deepEqual(pickQuizSet([], 10), []);
});

test('pickQuizSet: with an injected deterministic rng, the shuffle is reproducible', () => {
	const items = makeItems(5);
	const rng = fakeRng([0, 0, 0, 0]);
	const result = pickQuizSet(items, 5, rng);
	assert.deepEqual(
		result.map((r) => r.sourceSlug),
		['slug-1', 'slug-2', 'slug-3', 'slug-4', 'slug-0'],
	);
});

test('splitAtBlank: splits a sentence around the blank marker', () => {
	assert.deepEqual(splitAtBlank('Salimos ___ Madrid mañana.'), ['Salimos ', ' Madrid mañana.']);
});

test('splitAtBlank: blank at the very start', () => {
	assert.deepEqual(splitAtBlank('___ comiendo.'), ['', ' comiendo.']);
});

test('splitAtBlank: no blank marker returns the whole sentence as the first half', () => {
	assert.deepEqual(splitAtBlank('No blank here.'), ['No blank here.', '']);
});

test('wordQuizItems: every item is well-formed', async () => {
	const { wordQuizItems } = await import('../data/wordQuiz.ts');
	for (const item of wordQuizItems) {
		assert.ok(item.sentence.includes('___'), `${item.sourceSlug}: sentence missing blank marker`);
		assert.equal(item.choices.length, 2);
		assert.ok(item.choices[0].length > 0 && item.choices[1].length > 0);
		assert.ok(item.correctIndex === 0 || item.correctIndex === 1);
		assert.ok(item.explanation.length > 0);
		assert.ok(item.translation.length > 0);
		assert.ok(item.sourceSlug.length > 0);
		assert.ok(item.sourceTitle.length > 0);
	}
});

test('wordQuizItems: the two choices in each item are actually different', async () => {
	const { wordQuizItems } = await import('../data/wordQuiz.ts');
	for (const item of wordQuizItems) {
		assert.notEqual(
			item.choices[0].toLowerCase(),
			item.choices[1].toLowerCase(),
			`${item.sourceSlug}: choices must differ`,
		);
	}
});
