import { Button, Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";

interface Props {
	categories: { text: string; value: string; popular?: boolean }[];
}

const Categories: NextPage<Props> = ({ categories }) => {
	return categories ? (
		<Flex gap={3} flexWrap={"wrap"}>
			{categories.map((category) => {
				return (
					<Link
						key={category.value}
						href={`/?category=${category.value}`}
						scroll={false}
						prefetch={category.popular}
					>
						<Button
							variant={"subtle"}
							_hover={{ bg: "red.500", color: "white" }}
							key={category.value}
						>
							{category.text}
						</Button>
					</Link>
				);
			})}
		</Flex>
	) : (
		<Heading size={"sm"}>Нет категорий</Heading>
	);
};

export default Categories;
