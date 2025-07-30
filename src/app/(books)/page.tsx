import {booksServices} from "@/services/booksServices";
import {Alert, Box, Heading} from "@chakra-ui/react";
import {NextPage} from "next";
import BooksList from "./booksList";
import Filters from "./filters";
import Categories from "@/components/categories/categories";
import {Suspense} from "react";
import BooksCardsSkeleton from "./booksCardsSkeleton";
import {AlertPortal} from "@/components/alertPortal/alertPortal";
import {categories} from "@/utils/categories";
import CategoryTitle from "./categoryTitle";

export const revalidate = 3600;

interface Props {
	searchParams: Promise<{category?: string}>;
}

const Page: NextPage<Props> = async ({searchParams}) => {
	const {category} = await searchParams;
	return (
		<Box mt={4}>
			<CategoryTitle category={category} />
			<Box mt={18} mb={33}>
				<Categories categories={categories} />
			</Box>

			<Filters />
			<Suspense key={category} fallback={<BooksCardsSkeleton />}>
				<AsyncBookList category={category ? category : "all"} />
			</Suspense>
		</Box>
	);
};

async function AsyncBookList({category}: {category: string}) {
	const {
		data: books,
		ok,
		error,
	} = await (category === "all"
		? booksServices.getAllBooks({limit: 12, order: "newest"})
		: booksServices.getBooksByCategory(category));

	return (
		<>
			<AlertPortal isOpen={!ok} message={error || "Произошла ошибка"} />
			{books ? <BooksList category={category} initialBooks={books} /> : <Heading>Нет книг</Heading>}
		</>
	);
}

export default Page;
