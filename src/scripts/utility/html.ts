export const insertPosition: InsertPosition = 'beforeend';

export const insertElements = (parent: Element, children: Element[]): void => {
	for (let i: number = 0; i < children.length; i++) {
		const element: Element = children[i];
		parent?.insertAdjacentElement(insertPosition, element);
	}
};

export const cloneClasses = (element: Element): string[] => [
	...element.classList
];

export const removeClassFromElements = (
	elements: HTMLCollectionOf<Element> | NodeListOf<Element>,
	className: string
): void => {
	Array.from(elements).forEach((element: Element): void => {
		element.classList.remove(className);
	});
};

export const addClassToElements = (
	elements: HTMLCollectionOf<Element> | NodeListOf<Element>,
	className: string
): void => {
	Array.from(elements).forEach((element: Element): void => {
		element.classList.add(className);
	});
};
