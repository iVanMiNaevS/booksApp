import { categories } from "@/utils/categories";
import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { memo } from "react";

interface Props {
	category: string | undefined;
}

const CategoryTitle: NextPage<Props> = memo(({ category }) => {
	const categoryText = categories.find((el) => el.value === category);

	return (
		<Heading size={"4xl"}>
			{categoryText ? categoryText.text : "Все книги"}
		</Heading>
	);
});

export default CategoryTitle;
