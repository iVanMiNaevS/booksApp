import { Card, Flex, HStack, Skeleton } from "@chakra-ui/react";
import { NextPage } from "next";

interface Props {
	id: number;
}

const SkeletonBooksRow: NextPage<Props> = ({ id }) => {
	return (
		<Card.Root
			variant={"elevated"}
			key={id}
			gap={10}
			style={{ flexDirection: "row" }}
			w={"100%"}
		>
			<Card.Header p={2} display={"flex"} justifyContent={"center"}>
				<Skeleton width={"100px"} height={"120px"} />
			</Card.Header>
			<Card.Body>
				<Flex direction={"column"} gap={2}>
					<Skeleton w={"full"} height={"40px"} />
					<Skeleton w={"1/4"} height={"20px"} />
					<HStack>
						<Skeleton width={"50px"} height={"20px"} />
						<Skeleton w={"50px"} height={"20px"} />
					</HStack>
				</Flex>
			</Card.Body>
			<Card.Footer justifyContent={"space-between"}>
				<Skeleton width="32px" height="32px" borderRadius="full" />
			</Card.Footer>
		</Card.Root>
	);
};

export default SkeletonBooksRow;
