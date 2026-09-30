import { pickRelatedGuides } from '../../vendor/site-toolkit/packages/related-guides/src/index.ts';

interface RelatableGuide {
	slug: string;
	category: string;
}

/**
 * Related-guides sidebar: same-category rotating window first, then pad from
 * other categories so singleton/small categories (e.g. Conjugations) still get
 * a sidebar and still appear in someone else's. The fallback rotates by each
 * guide's position in the full array, not a fixed slice, so it can't recreate
 * the "always the first N" starvation bug. Used by [slug].astro and by
 * tools/verify-related-guides-coverage.mjs so the two cannot drift apart.
 */
export function pickRelatedGuidesWithFallback<T extends RelatableGuide>(
	guides: T[],
	guide: T,
): { related: T[]; crossCategory: T[]; final: T[] } {
	const related = pickRelatedGuides(guides, guide) as T[];
	const pool = guides.filter((g) => g.slug !== guide.slug && !related.includes(g));
	const remaining = 6 - related.length;
	const globalIndex = guides.findIndex((g) => g.slug === guide.slug);
	const crossCategory =
		remaining > 0
			? Array.from(
					{ length: Math.min(remaining, pool.length) },
					(_, k) => pool[(globalIndex + k) % pool.length],
				)
			: [];
	return { related, crossCategory, final: [...related, ...crossCategory] };
}

export function verifyRelatedGuidesFallbackCoverage<T extends RelatableGuide>(guides: T[]) {
	const linkedTo = new Set<string>();
	const emptySidebar: string[] = [];
	for (const g of guides) {
		const { final } = pickRelatedGuidesWithFallback(guides, g);
		if (final.length === 0) emptySidebar.push(g.slug);
		for (const r of final) linkedTo.add(r.slug);
	}
	const neverLinked = guides.filter((g) => !linkedTo.has(g.slug)).map((g) => g.slug);
	return {
		total: guides.length,
		linkedTo: linkedTo.size,
		coveragePct: guides.length ? (linkedTo.size / guides.length) * 100 : 100,
		emptySidebar,
		neverLinked,
	};
}
