// italki affiliate link for language-learning pages.
//
// italki (1-on-1 online lessons with native-speaker tutors) pays a fixed commission
// per new student who buys credits after arriving through our referral link. The
// link is the same for every page; italki attributes the sign-up to us by the ref
// code, so there is nothing per-page to configure.
//
// Rules this file is written against (italki Affiliate Agreement, effective
// 2026-02-11, and our own placement policy):
//   - no paid advertising of any kind may point at italki through this link;
//   - the link appears only in the tutor callout (src/components/TutorPick.astro),
//     never inside article prose, FAQ answers or source lists;
//   - every callout carries a plain-language commission disclosure and the site
//     footer repeats it;
//   - rel="sponsored nofollow" so search engines treat it as a paid link.

export const ITALKI_REF_URL = 'https://www.italki.com/affshare?ref=af33647174';

export const ITALKI_DISCLOSURE =
	'LingoGrove earns a commission if you sign up through this link. It costs you nothing extra.';

/** Languages italki actually has a tutor pool for. Others (Latin, Hawaiian, Yiddish) get no callout. */
const ITALKI_LANGUAGES = new Set([
	'Spanish',
	'French',
	'German',
	'Italian',
	'Portuguese',
	'Japanese',
	'Korean',
	'Chinese',
	'Russian',
	'Arabic',
]);

/** Page families whose readers are actively studying the language. Loanword pages are
 *  read by English speakers curious about a word, not learners, so they get nothing. */
const LEARNER_CATEGORIES = new Set(['Grammar', 'Conjugations', 'Phrases']);

export interface TutorPick {
	language: string;
	heading: string;
	body: string;
	cta: string;
}

export function tutorPick(guide: { category: string; language?: string }): TutorPick | null {
	if (!LEARNER_CATEGORIES.has(guide.category)) return null;
	const language = guide.language;
	if (!language || !ITALKI_LANGUAGES.has(language)) return null;
	return {
		language,
		heading: `Practice this with a ${language} tutor`,
		body:
			`Reading about it gets you halfway. italki lets you book one-on-one ${language} lessons with native-speaker tutors, ` +
			`pay per lesson rather than a subscription, and start with a cheaper trial lesson to see if a teacher suits you.`,
		cta: `Find a ${language} tutor on italki`,
	};
}
