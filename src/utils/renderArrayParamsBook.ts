export function renderArrayParamsBook(array: string[]) {
	return array
		? array.map((el, index) => {
				if (array.length > 1) {
					if (index !== array.length - 1) {
						return el + ", ";
					} else {
						return el;
					}
				} else {
					return el;
				}
		  })
		: "не известно";
}
