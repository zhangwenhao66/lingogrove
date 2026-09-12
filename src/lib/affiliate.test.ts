// Unit tests for src/lib/affiliate.ts.
// Run with: npm test (node --test src/lib/*.test.ts)

import test from 'node:test';
import assert from 'node:assert/strict';
import { tutorPick, ITALKI_REF_URL } from './affiliate.ts';

test('the referral link carries our italki ref code', () => {
	assert.match(ITALKI_REF_URL, /^https:\/\/www\.italki\.com\/affshare\?ref=af\d+$/);
});

test('grammar and conjugation pages in a supported language get a callout', () => {
	const g = tutorPick({ category: 'Grammar', language: 'Spanish' });
	assert.ok(g);
	assert.equal(g.language, 'Spanish');
	assert.match(g.cta, /Spanish tutor/);
	assert.ok(tutorPick({ category: 'Conjugations', language: 'French' }));
	assert.ok(tutorPick({ category: 'Phrases', language: 'Japanese' }));
});

test('loanword pages get no callout even for supported languages', () => {
	assert.equal(tutorPick({ category: 'Loanwords', language: 'German' }), null);
});

test('languages italki does not teach get no callout', () => {
	assert.equal(tutorPick({ category: 'Grammar', language: 'Latin' }), null);
	assert.equal(tutorPick({ category: 'Phrases', language: 'Hawaiian' }), null);
	assert.equal(tutorPick({ category: 'Grammar' }), null);
});
