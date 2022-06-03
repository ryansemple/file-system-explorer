declare module '*.svg' {
	const content: SVGElement;
	export default content;
}

interface String {
	substr(from: number, length?: number): string;
}

//This is needed for typescript to recognize scss files
declare module '*.scss';
