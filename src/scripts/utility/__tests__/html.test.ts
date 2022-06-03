import {
	addClassToElements,
	cloneClasses,
	insertElements,
	removeClassFromElements
} from '../html';

test('insertElements should properly insert elements into parent', () => {
	document.body.innerHTML = `
		<div id='parent'></div>
		<div id='other'></div>
	`;

	const parent: HTMLElement = document.getElementById('parent') as HTMLElement;

	const child1: Element = document.createElement('div');
	child1.classList.add('class1');

	const child2: Element = document.createElement('div');

	const children: Element[] = [child1, child2];

	insertElements(parent, children);

	const parentChildren: HTMLCollection = parent.children;

	expect(parentChildren.length).toBe(2);
	expect(parentChildren[0].classList.length).toBe(1);
	expect(parentChildren[0].classList[0]).toBe('class1');
	expect(parentChildren[1].classList.length).toBe(0);
});

test('cloneClasses should properly clone classes', () => {
	const selector: HTMLElement = document.createElement('div');
	const classList: DOMTokenList = selector.classList;
	classList.add('bb');
	classList.add('ee');
	const clonedClasses: string[] = cloneClasses(selector);

	expect(clonedClasses.length).toBe(classList.length);
	expect(clonedClasses[0]).toBe('bb');
	expect(clonedClasses[1]).toBe('ee');
});

test('removeClassFromElements should properly remove a given class from elements', () => {
	const className: string = 'bb';

	const child1: Element = document.createElement('div');
	child1.classList.add(className);
	const child2: Element = document.createElement('div');
	child2.classList.add(className);
	const child3: Element = document.createElement('div');
	child3.classList.add(className);
	child3.classList.add('c');

	const docFragment: DocumentFragment = document.createDocumentFragment();
	docFragment.appendChild(child1);
	docFragment.appendChild(child2);
	docFragment.appendChild(child3);
	const elements: HTMLCollectionOf<Element> = docFragment.children;

	removeClassFromElements(elements, className);

	expect(elements[0].classList.contains(className)).toBe(false);
	expect(elements[1].classList.contains(className)).toBe(false);
	expect(elements[2].classList.contains(className)).toBe(false);
	expect(elements[2].classList.contains('c')).toBe(true);
});

test('addClassToElements should properly add a given class to elements', () => {
	const child1: Element = document.createElement('div');
	child1.classList.add('ww');
	const child2: Element = document.createElement('div');
	const child3: Element = document.createElement('div');
	const className: string = 'zz';

	const documentFragment: DocumentFragment = document.createDocumentFragment();
	documentFragment.appendChild(child1);
	documentFragment.appendChild(child2);
	documentFragment.appendChild(child3);
	const elements: HTMLCollectionOf<Element> = documentFragment.children;

	addClassToElements(elements, className);

	expect(elements[0].classList.contains(className)).toBe(true);
	expect(elements[0].classList.contains('ww')).toBe(true);
	expect(elements[1].classList.contains(className)).toBe(true);
	expect(elements[2].classList.contains(className)).toBe(true);
});
