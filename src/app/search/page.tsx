"use client";
import Categories from "@/components/categories/categories";
import { useFetchBooksByValue } from "@/hooks/useFetchBooksByValue";
import {
	Alert,
	Box,
	Heading,
	Input,
	InputGroup,
	Text,
	VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import BooksListRow from "./booksListRow";
import SkeletonBooksRow from "./skeletonBooksRow";
import { AlertPortal } from "@/components/alertPortal/alertPortal";
import { categories } from "@/utils/categories";

interface Props {}

const Page: NextPage<Props> = ({}) => {
	const [searchValue, setSearchValue] = useState("");

	const { books, ok, error, loading } = useFetchBooksByValue(searchValue);

	return (
		<div style={{ maxWidth: "800px", margin: "100px auto" }}>
			<InputGroup flex="1" startElement={<LuSearch />}>
				<Input
					placeholder="Книга"
					onChange={(e) => setSearchValue(e.target.value)}
					value={searchValue}
					variant="flushed"
					size={"2xl"}
				/>
			</InputGroup>

			{loading && (
				<VStack gap={4} mt={6}>
					{[...Array(3)].map((_, i) => (
						<SkeletonBooksRow key={i} id={i} />
					))}
				</VStack>
			)}

			<AlertPortal
				isOpen={!loading && !ok && searchValue.length > 0}
				message={error || "Произошла ошибка"}
			/>

			{!loading &&
				searchValue.length > 0 &&
				(books?.length ? (
					<BooksListRow books={books} />
				) : (
					<Text>Нет книг</Text>
				))}

			{searchValue.trim().length === 0 && (
				<Box pt={10}>
					<Heading size={"2xl"} mb={4}>
						Категории
					</Heading>
					<Categories categories={categories} />
				</Box>
			)}
		</div>
	);
};

export default Page;
