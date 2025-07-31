"use client";

import {IBook} from "@/types/books.interfaces";
import {Badge, Blockquote, Card, Flex, Heading, Icon, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import notImageBook from "../../../public/notImageBook.jpg";
import {FaHeart} from "react-icons/fa";
import {renderArrayParamsBook} from "@/utils/renderArrayParamsBook";
import {useEffect, useRef} from "react";
import SkeletonBooksRow from "./skeletonBooksRow";

interface Props {
	books: IBook[];
	loadMore: () => void;
	hasMore: boolean;
	loading: boolean;
}

const BooksListRow = ({books, loadMore, hasMore, loading}: Props) => {
	const observerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!observerRef.current || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore();
				}
			},
			{threshold: 1}
		);

		observer.observe(observerRef.current);

		return () => observer.disconnect();
	}, [loadMore, hasMore]);

	return (
		<VStack gap={5} mt={5}>
			{books.map((book) => (
				<Card.Root
					key={book.id}
					_hover={{background: "gray.100", cursor: "pointer"}}
					variant={"elevated"}
					flexDirection={{base: "column", sm: "row"}}
					w={"100%"}
				>
					<Card.Header p={2} display={"flex"} justifyContent={"center"}>
						<Image
							src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : notImageBook}
							alt={"книга"}
							width={100}
							height={200}
							style={{
								maxHeight: "300px",
								objectFit: "cover",
								borderRadius: "20px",
								margin: "0 auto",
							}}
						/>
					</Card.Header>
					<Card.Body>
						<Flex direction={"column"}>
							<Blockquote.Root variant={"solid"}>
								<Blockquote.Content>
									<Heading size={"xl"}>{book.volumeInfo.title}</Heading>
								</Blockquote.Content>
							</Blockquote.Root>
							<Text mt={3} color={"gray"}>
								{renderArrayParamsBook(book.volumeInfo.authors)}
							</Text>
							<Text mt={1}>
								<Badge>{book.volumeInfo.printType}</Badge>
								<Badge colorPalette={"purple"} ml={2}>
									{book.volumeInfo.pageCount ?? "не известно"} стр.
								</Badge>
							</Text>
						</Flex>
					</Card.Body>
					<Card.Footer justifyContent={"space-between"}>
						<Icon transition={".3s"} _hover={{color: "red.500", cursor: "pointer"}} size={"xl"}>
							<FaHeart />
						</Icon>
					</Card.Footer>
				</Card.Root>
			))}
			{hasMore && <div ref={observerRef} style={{height: 1}} />}
			{loading && books.length > 0 && [1, 2, 3].map(() => <SkeletonBooksRow id={999} />)}
		</VStack>
	);
};

export default BooksListRow;
