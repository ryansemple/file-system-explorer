import {
	alertId,
	dataIdAttribute,
	fileClass,
	fileIconClass,
	folderIconClass,
	hideClass,
	noFolderIsSelectedMessage,
	noWrapClass,
	pointerClass,
	selectedClass,
	sidebarContentId,
	sidebarId,
	sidebarItemChildrenClass,
	sidebarItemClass,
	sidebarItemHeaderClass,
	tabIndexAttribute,
	tableId
} from './strings';
import ITreeNode from './types/ITreeNode';
import TreeNodeType from './types/TreeNodeType';
import { formatBytes, formatDate } from './utility/formatting';
import { insertElements, insertPosition } from './utility/html';

const elementIsSidebarContent = (element: Element): boolean =>
	element.id === sidebarContentId;

export const setAlertMessage = (message: string | null): void => {
	const alertMessageParagraph: Element | null = document.querySelector(
		`#${alertId} p`
	);

	if (alertMessageParagraph) {
		alertMessageParagraph.textContent = message;
	}
};

const populateSidebarRecursive = (
	treeNodes: ITreeNode[],
	htmlContainer: HTMLDivElement
): void => {
	for (let i: number = 0; i < treeNodes.length; i++) {
		const treeNode: ITreeNode = treeNodes[i];

		if (treeNode.type === TreeNodeType.File) {
			continue;
		}

		const sidebarItem: HTMLDivElement = document.createElement('div');
		sidebarItem.classList.add(sidebarItemClass);
		const sidebarItemHeader: HTMLDivElement = document.createElement('div');
		sidebarItemHeader.classList.add(sidebarItemHeaderClass);
		sidebarItemHeader.setAttribute(dataIdAttribute, treeNode.id);
		sidebarItemHeader.setAttribute(tabIndexAttribute, '0');
		sidebarItemHeader.insertAdjacentText(insertPosition, treeNode.name);
		sidebarItem.insertAdjacentElement(insertPosition, sidebarItemHeader);

		if (treeNode.children) {
			const children: HTMLDivElement = document.createElement('div');
			children.classList.add(sidebarItemChildrenClass, hideClass);
			populateSidebarRecursive(treeNode.children, children);
			sidebarItem.insertAdjacentElement(insertPosition, children);
		} else {
			sidebarItem.classList.add(fileClass);
		}

		htmlContainer.insertAdjacentElement(insertPosition, sidebarItem);
	}
};

export const addClassToSidebarAncestors = (
	element: Element,
	classToMatch: string,
	classToAdd: string
): void => {
	if (elementIsSidebarContent(element)) {
		return;
	}

	const parentElement: HTMLElement = element.parentElement as HTMLElement;

	if (
		parentElement.classList.contains(classToMatch) &&
		!parentElement.classList.contains(classToAdd)
	) {
		parentElement.classList.add(classToAdd);
	}

	addClassToSidebarAncestors(parentElement, classToMatch, classToAdd);
};

export const removeClassFromSidebarAncestors = (
	element: Element,
	classToMatch: string,
	classToRemove: string
): void => {
	if (elementIsSidebarContent(element)) {
		return;
	}

	const parentElement: HTMLElement = element.parentElement as HTMLElement;

	if (
		parentElement.classList.contains(classToMatch) &&
		parentElement.classList.contains(classToRemove)
	) {
		parentElement.classList.remove(classToRemove);
	}

	removeClassFromSidebarAncestors(parentElement, classToMatch, classToRemove);
};

export const populateSidebar = (treeNodes: ITreeNode[]): void => {
	populateSidebarRecursive(
		treeNodes,
		//document.getElementById(sidebarId) as HTMLDivElement
		document.getElementById(sidebarContentId) as HTMLDivElement
	);

	const selectedSidebar: Element | null = document.querySelector(
		`.${sidebarItemHeaderClass}.${selectedClass}`
	);

	setAlertMessage(selectedSidebar ? null : noFolderIsSelectedMessage);
};

const returnTableColumn = (
	content: string,
	alignment: string,
	type: TreeNodeType,
	addIcon: boolean = false
): HTMLTableCellElement => {
	const column: HTMLTableCellElement = document.createElement('td');
	column.insertAdjacentText(insertPosition, content);
	column.classList.add(alignment);

	if (addIcon) {
		if (type === TreeNodeType.File) {
			column.classList.add(fileIconClass);
		} else {
			column.classList.add(folderIconClass);
		}

		column.classList.add(noWrapClass);
	}

	return column;
};

const triggerSidebarItemHeaderClick = (id: string): void => {
	const clickEvent: MouseEvent = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: false
	});

	document
		.querySelector(`#${sidebarId} [${dataIdAttribute}='${id}']`)
		?.dispatchEvent(clickEvent);
};

export const populateContent = (treeNodes: ITreeNode[]): void => {
	const tableBody: HTMLTableElement | null = document.querySelector(
		`#${tableId} tbody`
	);

	if (!tableBody) {
		return;
	}

	tableBody.innerHTML = '';

	for (let i: number = 0; i < treeNodes.length; i++) {
		const treeNode: ITreeNode = treeNodes[i];
		const tableRow: HTMLTableRowElement = document.createElement('tr');
		insertElements(tableRow, [
			returnTableColumn(treeNode.name, 'left', treeNode.type, true),
			returnTableColumn(formatDate(treeNode.modified), 'left', treeNode.type),
			returnTableColumn(
				treeNode.size ? formatBytes(treeNode.size) : '',
				'right',
				treeNode.type
			)
		]);

		tableBody.insertAdjacentElement(insertPosition, tableRow);
		tableRow.setAttribute(tabIndexAttribute, '0');

		if (treeNode.type === TreeNodeType.Folder) {
			tableRow.classList.add(pointerClass);

			tableRow.addEventListener('click', (_: Event) => {
				triggerSidebarItemHeaderClick(treeNode.id);
			});

			tableRow.addEventListener('keypress', (event: any): void => {
				if (event.key === 'Enter') {
					triggerSidebarItemHeaderClick(treeNode.id);
				}
			});
		}
	}
};
