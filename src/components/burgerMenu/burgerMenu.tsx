"use client";

import {
	Drawer,
	CloseButton,
	Button,
	Portal,
	IconButton,
	Icon,
	Box,
} from "@chakra-ui/react";
import NavLink from "../navLink/navLink";
import Image from "next/image";
import burgerMenu from "../../../public/burger-menu.svg";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";
const links = [
	{ text: "избранное", href: "/h" },
	{ text: "книги", href: "/" },
];

export default function BurgerMenu() {
	return (
		<Drawer.Root>
			<Drawer.Trigger asChild>
				<IconButton bg={"white"}>
					<Image src={burgerMenu} alt="burger icon" width={40} />
				</IconButton>
			</Drawer.Trigger>
			{/* <Portal> */}
			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content bg={"#222"}>
					<Drawer.Header>
						<Drawer.Title color={"white"}>Books App</Drawer.Title>
					</Drawer.Header>
					<Drawer.Body>
						<NavLink href={"/search"}>
							<Icon mr={2} mt={-1} aria-label="Search database">
								<LuSearch color="white" />
							</Icon>
							Поиск
						</NavLink>
						{links.map((link) => {
							return (
								<NavLink key={link.text} href={link.href}>
									{link.text}
								</NavLink>
							);
						})}
					</Drawer.Body>
					<Drawer.CloseTrigger asChild>
						<CloseButton
							color={"white"}
							size="sm"
							_hover={{ color: "black" }}
						/>
					</Drawer.CloseTrigger>
				</Drawer.Content>
			</Drawer.Positioner>
			{/* </Portal> */}
		</Drawer.Root>
	);
}
