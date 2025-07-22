// components/AlertPortal.tsx
"use client";

import { Alert } from "@chakra-ui/react";
import { createPortal } from "react-dom";

interface AlertPortalProps {
	message: string;
	isOpen: boolean;
}

export const AlertPortal = ({ message, isOpen }: AlertPortalProps) => {
	if (!isOpen) return null;

	return createPortal(
		<Alert.Root
			status="error"
			position="fixed"
			right={8}
			top={"6rem"}
			w="fit-content"
			zIndex="toast"
		>
			<Alert.Indicator />
			<Alert.Title>{message}</Alert.Title>
		</Alert.Root>,
		document.body
	);
};
