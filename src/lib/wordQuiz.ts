import type { WordQuizItem } from '../data/wordQuiz';

/**
 * Picks a random, non-repeating subset of quiz items so a visitor doesn't see the same
 * ~23-item deck in the same order every time they load /fill-in-the-blank/.
 *
 * Fisher-Yates shuffle-then-slice, not items.sort(() => Math.random() - 0.5) -- the
 * sort-based shuffle is a well-known non-uniform trick (V8's sort isn't a fair coin flip
 * per comparison), Fisher-Yates has no such bias.
 *
 * `rng` defaults to Math.random but is injectable so tests can assert exact, reproducible
 * output instead of only "the result looks statistically plausible".
 */
export function pickQuizSet(
	items: readonly WordQuizItem[],
	count: number,
	rng: () => number = Math.random,
): WordQuizItem[] {
	if (items.length === 0 || count <= 0) return [];

	const pool = items.slice();
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}

	return pool.slice(0, Math.min(count, pool.length));
}

/** Splits a "sentence with ___ blank" into the text before and after the blank. */
export function splitAtBlank(sentence: string): [string, string] {
	const idx = sentence.indexOf('___');
	if (idx === -1) return [sentence, ''];
	return [sentence.slice(0, idx), sentence.slice(idx + 3)];
}
