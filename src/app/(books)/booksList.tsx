import { IBook } from "@/types/books.interfaces";
import {
	Blockquote,
	Button,
	Card,
	Flex,
	Heading,
	Icon,
	Text,
	SimpleGrid,
	Badge,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import notImageBook from "../../../public/notImageBook.jpg";
import { FaHeart } from "react-icons/fa";
import { renderArrayParamsBook } from "@/utils/renderArrayParamsBook";

interface Props {
	books: IBook[];
}

const BooksList: NextPage<Props> = ({ books }) => {
	return (
		<SimpleGrid
			columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
			gap={{ base: 4, md: 6, lg: 8 }}
			px={{ base: 4, md: 0 }}
		>
			{books.map((book, index) => (
				<Card.Root
					transition={"0.3s"}
					_hover={{ background: "gray.100", cursor: "pointer" }}
					variant="elevated"
					key={book.id + index}
				>
					<Card.Header h={"150px"} p={3}>
						<Image
							src={
								book.volumeInfo.imageLinks
									? book.volumeInfo.imageLinks.thumbnail
									: notImageBook
							}
							alt="книга"
							width={100}
							height={150}
							style={{
								maxHeight: "150px",
								objectFit: "cover",
								borderRadius: "20px",
								margin: "0 auto",
							}}
						/>
					</Card.Header>

					<Card.Body>
						<Flex direction="column" height="100%">
							<Blockquote.Root variant="solid">
								<Blockquote.Content>
									<Heading size={{ md: "md", lg: "lg" }}>
										{book.volumeInfo.title}
									</Heading>
								</Blockquote.Content>
							</Blockquote.Root>

							<Badge
								mt={3}
								fontSize={{ md: 12, lg: 13 }}
								w={"fit-content"}
								colorPalette={"pink"}
								textWrap={"wrap"}
							>
								{renderArrayParamsBook(book.volumeInfo.authors)}
							</Badge>

							<Text mt={3} lineClamp={3} fontSize={13} color={"gray.600"}>
								{book.volumeInfo.description || "нет описания"}
							</Text>
						</Flex>
					</Card.Body>

					<Card.Footer justifyContent="end" mt="auto">
						<Icon
							transition=".3s"
							_hover={{ color: "red.700", cursor: "pointer" }}
							size="xl"
							color={"red.500"}
						>
							<FaHeart />
						</Icon>
					</Card.Footer>
				</Card.Root>
			))}
		</SimpleGrid>
	);
};

export default BooksList;
