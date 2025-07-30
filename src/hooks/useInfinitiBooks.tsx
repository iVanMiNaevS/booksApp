"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {IBook} from "@/types/books.interfaces";
import {booksServices} from "@/services/booksServices";

export function useInfiniteBooks(category: string, initialBooks: IBook[], limit = 12) {
	const [books, setBooks] = useState<IBook[]>(initialBooks);
	const [startIndex, setStartIndex] = useState(initialBooks.length);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const observerRef = useRef<HTMLDivElement | null>(null);

	const loadMore = useCallback(async () => {
		if (loading || !hasMore) return;
		setLoading(true);

		const response = await booksServices.getBooksPaginated(category, startIndex, limit);

		if (!response.ok || !response.data || response.data.length === 0) {
			setHasMore(false);
		} else {
			setBooks((prev) => {
				const newBooks = response.data!.filter((book) => !prev.some((b) => b.id === book.id));
				return [...prev, ...newBooks];
			});
			setStartIndex((prev) => prev + limit);
		}

		setLoading(false);
	}, [loading, hasMore, category, startIndex, limit]);

	useEffect(() => {
		const target = observerRef.current;
		if (!target || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{threshold: 1}
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [loadMore, hasMore]);

	return {
		books,
		loading,
		hasMore,
		observerRef,
	};
}
