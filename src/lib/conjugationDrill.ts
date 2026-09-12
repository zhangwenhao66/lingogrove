import type { ConjugationTable } from '../data/guides';

/**
 * Pure logic for the conjugation drill island (src/components/ConjugationDrill.astro).
 *
 * Same split as wordQuiz.ts: everything testable lives here with no DOM access, the
 * component is a thin wrapper. The deck is built at build time straight from the guide's
 * existing `conjugation` table -- no verb forms are typed in here, so the drill can never
 * disagree with the static table printed above it.
 */

export interface DrillQuestion {
	/** e.g. "Present", "Subjunctive (imperfect)" */
	tense: string;
	/** e.g. "yo", "él/ella/usted", or a non-finite label like "gerund" */
	pronoun: string;
	/** The form exactly as it appears in the table, alternatives included ("fuera / fuese"). */
	form: string;
}

export type DrillVerdict = 'correct' | 'accents' | 'wrong';

/** One question per (tense, pronoun) cell of the table, in table order. */
export function buildDeck(table: ConjugationTable): DrillQuestion[] {
	const deck: DrillQuestion[] = [];
	for (const tense of table.tenses) {
		for (const f of tense.forms) {
			if (!f.form || !f.form.trim()) continue;
			deck.push({ tense: tense.tense, pronoun: f.pronoun, form: f.form });
		}
	}
	return deck;
}

/**
 * Fisher-Yates, identical in spirit to pickQuizSet in wordQuiz.ts (see the comment there
 * for why not `sort(() => Math.random() - 0.5)`). Never mutates the input.
 */
export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
	const pool = items.slice();
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	return pool;
}

/** Draws `count` distinct questions (or the whole deck when it is smaller than `count`). */
export function pickDrillSet(
	deck: readonly DrillQuestion[],
	count: number,
	rng: () => number = Math.random,
): DrillQuestion[] {
	if (deck.length === 0 || count <= 0) return [];
	return shuffle(deck, rng).slice(0, Math.min(count, deck.length));
}

/**
 * Table cells can list two accepted variants joined by " / ", e.g. "fuera / fuese" or, for
 * compound tenses, "hubiera / hubiese sido" where the trailing "sido" belongs to both. This
 * expands such a cell into the full spelled-out alternatives so "hubiese sido" is accepted.
 *
 * Rule: the last part is the reference. If it has more words than the first part, the
 * extra trailing words are a shared suffix appended to every shorter part; if the first
 * part has more words, the extra leading words are a shared prefix prepended to the later
 * parts. Cells without " / " come back unchanged.
 */
export function expandAlternatives(form: string): string[] {
	const parts = form.split(' / ').map((p) => p.trim()).filter((p) => p.length > 0);
	if (parts.length <= 1) return [form.trim()];

	const firstWords = parts[0].split(/\s+/);
	const lastWords = parts[parts.length - 1].split(/\s+/);
	const suffix = lastWords.length > firstWords.length ? lastWords.slice(firstWords.length) : [];
	const prefix = firstWords.length > lastWords.length ? firstWords.slice(0, firstWords.length - lastWords.length) : [];

	const out: string[] = [];
	parts.forEach((part, i) => {
		const words = part.split(/\s+/);
		let full: string[];
		if (i === 0) {
			full = [...words, ...suffix];
		} else if (i === parts.length - 1) {
			full = [...prefix, ...words];
		} else {
			// Middle alternatives (three-way cells) are shaped like the shorter side.
			full = words.length < lastWords.length ? [...prefix, ...words, ...suffix] : [...prefix, ...words];
		}
		out.push(full.join(' '));
	});
	return Array.from(new Set(out));
}

/** Trim, collapse inner whitespace, case-fold, and settle on one Unicode composition. */
export function normalizeAnswer(input: string): string {
	return input.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

/**
 * Removes accent marks via NFD decomposition (á -> a, ü -> u, ç -> c) but keeps ñ intact:
 * in Spanish ñ is its own letter, not "n with an accent", so telling a learner who typed
 * "ano" for "año" to "check your accents" would be the wrong lesson.
 */
export function stripAccents(input: string): string {
	// After NFD, ñ is "n" + U+0303 (combining tilde). Keep exactly that pair; drop every
	// other combining mark, then recompose.
	return input
		.normalize('NFD')
		.replace(/([nN]\u0303)|\p{M}+/gu, (match, keep: string | undefined) => (keep ? match : ''))
		.normalize('NFC');
}

/**
 * Grades a typed answer against a table cell.
 *
 * - 'correct': matches one of the cell's alternatives exactly (after trim / whitespace
 *   collapse / case-fold).
 * - 'accents': matches only once accent marks are removed from both sides. This is
 *   deliberately NOT a pass -- "hablo" and "habló" are different tenses, so the learner
 *   is told "close, check your accents" and the score does not move.
 * - 'wrong': anything else, including an empty answer.
 */
export function checkAnswer(input: string, expectedForm: string): DrillVerdict {
	const given = normalizeAnswer(input);
	if (given.length === 0) return 'wrong';

	const accepted = expandAlternatives(expectedForm).map(normalizeAnswer);
	// Also accept the raw cell text ("fuera / fuese") for anyone who copies it verbatim.
	accepted.push(normalizeAnswer(expectedForm));

	if (accepted.includes(given)) return 'correct';

	const givenBare = stripAccents(given);
	if (accepted.some((a) => stripAccents(a) === givenBare)) return 'accents';

	return 'wrong';
}
