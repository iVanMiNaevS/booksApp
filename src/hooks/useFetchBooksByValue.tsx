import { booksServices } from "@/services/booksServices";
import { IBook } from "@/types/books.interfaces";
import { useEffect, useState } from "react";

export const useFetchBooksByValue = (value: string) => {
	const [books, setBooks] = useState<IBook[] | null>(null);
	const [ok, setOk] = useState(true);
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (value.trim() === "") {
			setBooks(null);
			setOk(true);
			setLoading(false);
			return;
		}

		setLoading(true);
		booksServices.searchBooks(value).then((data) => {
			setBooks(data.data || null);
			setOk(data.ok);
			setError(data.error);
			setLoading(false);
		});
	}, [value]);

	return { books, ok, error, loading };
};
