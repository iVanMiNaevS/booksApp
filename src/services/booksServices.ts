import { AxiosError } from "axios";
import api from "./api";
import { IBook } from "@/types/books.interfaces";

type BookApiResponse = {
	data?: IBook[];
	ok: boolean;
	error?: string;
};

type BookApiParams = {
	endpoint?: string;
	query?: string;
	maxResults?: number;
	startIndex?: number;
	orderBy?: "relevance" | "newest";
	langRestrict?: string;
	subject?: string;
};

const fetchBooks = async (params: BookApiParams): Promise<BookApiResponse> => {
	try {
		const {
			endpoint = "volumes",
			query = "",
			maxResults = 20,
			startIndex = 0,
			orderBy = "relevance",
			langRestrict = "",
			subject = "",
		} = params;

		let q = query;
		if (subject) {
			q = `subject:${subject}`;
		} else if (!query) {
			q = "*";
		}

		const url =
			`/${endpoint}?q=${encodeURIComponent(q)}` +
			`&maxResults=${maxResults}` +
			`&startIndex=${startIndex}` +
			`&orderBy=${orderBy}` +
			(langRestrict ? `&langRestrict=${langRestrict}` : "");

		const res = await api.get(url);
		return { data: res.data.items, ok: true };
	} catch (e) {
		const error = e as AxiosError;
		return {
			ok: false,
			error: error.message || "Ошибка загрузки книг",
		};
	}
};

export const booksServices = {
	getAllBooks: async (
		options: {
			limit?: number;
			order?: "relevance" | "newest";
			lang?: string;
		} = {}
	) => {
		return fetchBooks({
			query: "*",
			maxResults: options.limit,
			orderBy: options.order,
			langRestrict: options.lang,
		});
	},

	getBooksByCategory: async (category: string, limit: number = 12) => {
		return fetchBooks({
			subject: category,
			maxResults: limit,
		});
	},

	searchBooks: async (query: string, limit: number = 5) => {
		return fetchBooks({
			query: `intitle:${query}`,
			maxResults: limit,
		});
	},

	getBooksPaginated: async (
		category: string,
		startIndex: number,
		limit: number = 12
	) => {
		if (category === "all") {
			return fetchBooks({
				query: "*",
				maxResults: limit,
				startIndex,
				orderBy: "newest",
			});
		}
		return fetchBooks({
			subject: category,
			maxResults: limit,
			startIndex,
		});
	},
};
