"use client";

import {
	Box,
	Container,
	Flex,
	HStack,
	Icon,
	IconButton,
	useBreakpointValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import iconBook from "../../../public/bookIcon.png";
import Link from "next/link";
import NavLink from "../navLink/navLink";
import BurgerMenu from "../burgerMenu/burgerMenu";
import { LuSearch } from "react-icons/lu";

interface Props {}

const Header: NextPage<Props> = ({}) => {
	const links = [
		{ text: "избранное", href: "/h" },
		{ text: "книги", href: "/" },
	];
	const isDesktop = useBreakpointValue({ base: false, md: true });
	return (
		<Box py={6} bg="#222">
			<Container>
				<Flex alignItems={"center"} justifyContent={"space-between"}>
					<IconButton bg={"white"} p={3}>
						<Link href={"/"}>
							<Image width={40} src={iconBook} alt="iconBooks" />
						</Link>
					</IconButton>
					{isDesktop ? (
						<HStack gap={4}>
							<Link href={"/search"}>
								<Icon aria-label="Search database">
									<LuSearch color="white" />
								</Icon>
							</Link>
							{links.map((link) => {
								return (
									<NavLink key={link.text} href={link.href}>
										{link.text}
									</NavLink>
								);
							})}
						</HStack>
					) : (
						<BurgerMenu />
					)}
				</Flex>
			</Container>
		</Box>
	);
};

export default Header;
