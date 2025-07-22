"use client";
import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";

interface Props {
	children: React.ReactNode;
	href: string;
}

const NavLink: NextPage<Props> = ({ children, href }) => {
	return (
		<Link href={href}>
			<Text
				px={2}
				py={1}
				mt={1}
				transition={"0.3s"}
				color={"white"}
				borderBottom={"2px solid transparent"}
				textTransform={"uppercase"}
				_hover={{
					textDecoration: "none",
					color: "gray.200",
					borderBottom: "2px solid white",
				}}
			>
				{children}
			</Text>
		</Link>
	);
};

export default NavLink;
