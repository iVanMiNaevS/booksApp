import {useCallback, useEffect, useState} from "react";
import {IBook} from "@/types/books.interfaces";
import {booksServices} from "@/services/booksServices";

export function useInfiniteSearchBooks(searchValue: string, limit = 3) {
	const [books, setBooks] = useState<IBook[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [ok, setOk] = useState(true);
	const [startIndex, setStartIndex] = useState(0);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		if (!searchValue.trim()) {
			setBooks([]);
			setStartIndex(0);
			setHasMore(false);
			setOk(true);
			setError(null);
			return;
		}

		setBooks([]);
		setStartIndex(0);
		setHasMore(false);
		loadMore(true);
	}, [searchValue]);

	const loadMore = useCallback(
		async (isInitial = false) => {
			if (loading || (!isInitial && !hasMore)) return;
			setLoading(true);

			const response = await booksServices.searchBooks(
				searchValue,
				limit,
				isInitial ? 0 : startIndex
			);

			if (!response.ok || !response.data) {
				setOk(false);
				setError(response.error || "Ошибка");
				setHasMore(false);
			} else {
				setBooks((prev) => [...(isInitial ? [] : prev), ...(response.data || [])]);
				setStartIndex((prev) => prev + limit);
				setHasMore(response.data.length === limit);
				setOk(true);
				setError(null);
			}
			setLoading(false);
		},
		[searchValue, startIndex, limit, loading, hasMore]
	);

	return {books, loading, error, ok, hasMore, loadMore};
}
