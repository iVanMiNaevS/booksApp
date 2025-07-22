import { Box, Card, HStack, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { NextPage } from "next";

interface Props {}

const BooksCardsSkeleton: NextPage<Props> = ({}) => {
	return (
		<SimpleGrid columns={[1, 2, 3, 4]} gap={10} mt={4}>
			{[...Array(8)].map((_, i) => (
				<Card.Root key={i} variant={"elevated"}>
					<Card.Header>
						<Skeleton height="150px" borderRadius="lg" mb={2} />
					</Card.Header>
					<Card.Body>
						<Skeleton height="50px" width="80%" mb={2} />
						<Skeleton height="20px" width="30%" mb={2} />
						<Skeleton height="50px" width="100%" />
					</Card.Body>
					<Card.Footer>
						<HStack justifyContent={"end"} mt={2} w={"full"}>
							<Skeleton width="32px" height="32px" borderRadius="full" />
						</HStack>
					</Card.Footer>
				</Card.Root>
			))}
		</SimpleGrid>
	);
};

export default BooksCardsSkeleton;
