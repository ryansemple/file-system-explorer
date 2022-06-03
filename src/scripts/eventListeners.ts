import {
	addClassToSidebarAncestors,
	populateContent,
	removeClassFromSidebarAncestors,
	setAlertMessage
} from './content';
import {
	darkmodeCheckboxId,
	darkmodeSwitchId,
	dataIdAttribute,
	dragId,
	explorerId,
	folderIsEmptyMessage,
	hideClass,
	lightClass,
	noFolderIsSelectedMessage,
	openClass,
	panelId,
	selectedClass,
	sidebarId,
	sidebarItemChildrenClass,
	sidebarItemClass,
	sidebarItemHeaderClass,
	tableId
} from './strings';
import ITreeNode from './types/ITreeNode';
import {
	addClassToElements,
	cloneClasses,
	removeClassFromElements
} from './utility/html';

export const attachEventListeners = (treeNodes: ITreeNode[]): void => {
	const container: HTMLElement | null = document.getElementById(explorerId);
	const sidebar: HTMLElement | null = document.getElementById(sidebarId);
	const panel: HTMLElement | null = document.getElementById(panelId);
	const dragHandle: HTMLElement | null = document.getElementById(dragId);
	const table: HTMLElement | null = document.getElementById(tableId);
	const html: HTMLElement = document.getElementsByTagName('html')[0];
	const darkmodeCheckbox: HTMLElement | null =
		document.getElementById(darkmodeCheckboxId);
	const darkmodeSwitch: HTMLElement | null =
		document.getElementById(darkmodeSwitchId);
	const sidebarItemHeaders: HTMLCollectionOf<Element> =
		document.getElementsByClassName(sidebarItemHeaderClass);
	let isResizing: boolean = false;

	darkmodeCheckbox?.addEventListener('change', (_: Event): void => {
		html.classList.toggle(lightClass);
	});

	darkmodeSwitch?.addEventListener('keypress', (event: any): void => {
		if (event.key === 'Enter') {
			const clickEvent: MouseEvent = new MouseEvent('click', {
				view: window,
				bubbles: true,
				cancelable: false
			});

			darkmodeCheckbox?.dispatchEvent(clickEvent);
		}
	});

	dragHandle?.addEventListener('mousedown', (_: Event): void => {
		document.body.style.cursor = 'w-resize';
		isResizing = true;
	});

	document.addEventListener('mouseup', (_: Event): void => {
		document.body.style.removeProperty('cursor');
		isResizing = false;
	});

	document.addEventListener('mouseup', (_: Event): void => {
		document.body.style.removeProperty('cursor');
		isResizing = false;
	});

	document.addEventListener('mousemove', (event: MouseEvent): void => {
		if (!isResizing) {
			return;
		}

		if (!container || !sidebar || !panel || !dragHandle || !table) {
			return;
		}

		const handleBoundingRect: DOMRect = dragHandle.getBoundingClientRect();
		const xChange: number = event.clientX - handleBoundingRect.left;
		const leftBoundingRect: DOMRect = sidebar.getBoundingClientRect();
		const rightBoundingRect: DOMRect = panel.getBoundingClientRect();
		const leftWidth: number = leftBoundingRect.width;
		const newLeftWidth: number = leftWidth + xChange;
		const newRightWidth: number = rightBoundingRect.width - xChange;

		sidebar.style.width = `${newLeftWidth}px`;
		panel.style.width = `${newRightWidth}px`;
	});

	const setSelectedTreeNodeIdRecursive = (
		id: string,
		treeNodes: ITreeNode[]
	): void => {
		for (let i: number = 0; i < treeNodes.length; i++) {
			const treeNode: ITreeNode = treeNodes[i];

			if (treeNode.id === id && treeNode.children) {
				populateContent(treeNode.children);
				return;
			}

			if (treeNode.children) {
				setSelectedTreeNodeIdRecursive(id, treeNode.children);
			}
		}
	};

	const setSelectedTreeNodeId = (id: string | null): void => {
		if (!id) {
			populateContent([]);
		}

		setSelectedTreeNodeIdRecursive(id as string, treeNodes);
	};

	const sidebarItemOnClick = (event: Event): void => {
		event.stopPropagation();

		const { currentTarget } = event;
		const targetElement: HTMLDivElement = currentTarget as HTMLDivElement;
		const parentElement: HTMLElement =
			targetElement.parentElement as HTMLElement;
		const directChildren: Element = parentElement.querySelector(
			`.${sidebarItemChildrenClass}`
		) as HTMLElement;
		const targetClasses: string[] = cloneClasses(targetElement);

		const sidebarChildrenItems: HTMLCollectionOf<Element> =
			document.getElementsByClassName(sidebarItemChildrenClass);

		const sidebarItems: HTMLCollectionOf<Element> =
			document.getElementsByClassName(sidebarItemClass);

		const sidebarItemHeaders: HTMLCollectionOf<Element> =
			document.getElementsByClassName(sidebarItemHeaderClass);

		const newId: string = targetElement.getAttribute(dataIdAttribute) ?? '';

		const shouldClose: boolean = targetClasses.includes(selectedClass);

		setSelectedTreeNodeId(shouldClose ? null : newId);

		addClassToElements(sidebarChildrenItems, hideClass);
		removeClassFromElements(sidebarItems, openClass);
		removeClassFromElements(sidebarItemHeaders, selectedClass);

		directChildren.classList.toggle(hideClass, shouldClose);
		parentElement.classList.toggle(openClass, !shouldClose);
		targetElement.classList.toggle(selectedClass, !shouldClose);

		removeClassFromSidebarAncestors(
			directChildren,
			sidebarItemChildrenClass,
			hideClass
		);

		addClassToSidebarAncestors(parentElement, sidebarItemClass, openClass);

		const selectedSidebar: Element | null = document.querySelector(
			`.${sidebarItemHeaderClass}.${selectedClass}`
		);

		setAlertMessage(selectedSidebar ? null : noFolderIsSelectedMessage);

		if (selectedSidebar) {
			const tableBodyRows: Element | null = document.querySelector(`tbody tr`);

			setAlertMessage(tableBodyRows ? null : folderIsEmptyMessage);
		}
	};

	window.addEventListener('resize', (_: UIEvent): void => {
		if (!panel || !sidebar) {
			return;
		}

		sidebar.style.width = '25%';
		panel.style.removeProperty('width');
	});

	Array.from(sidebarItemHeaders).forEach((element: Element): void => {
		element.addEventListener('click', (event: Event): void =>
			sidebarItemOnClick(event)
		);

		element.addEventListener('keypress', (event: any): void => {
			if (event.key === 'Enter') {
				sidebarItemOnClick(event);
			}
		});
	});
};
