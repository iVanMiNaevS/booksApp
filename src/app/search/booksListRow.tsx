import { IBook } from "@/types/books.interfaces";
import {
	Badge,
	Blockquote,
	Button,
	Card,
	Flex,
	Heading,
	Icon,
	Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import notImageBook from "../../../public/notImageBook.jpg";
import { FaHeart } from "react-icons/fa";
import { renderArrayParamsBook } from "@/utils/renderArrayParamsBook";

interface Props {
	books: IBook[];
}

const BooksListRow: NextPage<Props> = ({ books }) => {
	return (
		<Flex gap={15} wrap={"wrap"} mt={5}>
			{books.map((book) => {
				return (
					<Card.Root
						_hover={{ background: "gray.100", cursor: "pointer" }}
						variant={"elevated"}
						flexDirection={{ base: "column", sm: "row" }}
						w={"100%"}
						key={book.id}
					>
						<Card.Header p={2} display={"flex"} justifyContent={"center"}>
							<Image
								src={
									book.volumeInfo.imageLinks
										? book.volumeInfo.imageLinks.thumbnail
										: notImageBook
								}
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
									<Badge>
										{book.volumeInfo.printType}
										{/* {renderArrayParamsBook(book.volumeInfo.categories)} */}
									</Badge>
									<Badge colorPalette={"purple"} ml={2}>
										{book.volumeInfo.pageCount
											? book.volumeInfo.pageCount
											: "не известно"}{" "}
										стр.
									</Badge>
								</Text>
							</Flex>
						</Card.Body>
						<Card.Footer justifyContent={"space-between"}>
							<Icon
								transition={".3s"}
								_hover={{ color: "red.500", cursor: "pointer" }}
								size={"xl"}
							>
								<FaHeart />
							</Icon>
						</Card.Footer>
					</Card.Root>
				);
			})}
		</Flex>
	);
};

export default BooksListRow;
