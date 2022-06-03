import { formatBytes, formatDate } from '../formatting';

test('formatDate should properly format a date', () => {
	const date: Date = new Date(2017, 4, 25);
	const dateFormatted: string = formatDate(date);

	expect(dateFormatted).toBe('May 25, 2017');
});

test('formatBytes should properly format bytes with B suffix', () => {
	const bytes: number = 87;
	const bytesFormatted: string = formatBytes(bytes);

	expect(bytesFormatted).toBe('87 B');
});

test('formatBytes should properly format bytes with KB suffix', () => {
	const bytes: number = 3002;
	const bytesFormatted: string = formatBytes(bytes);

	expect(bytesFormatted).toBe('2.93 KB');
});

test('formatBytes should properly format bytes with MB suffix', () => {
	const bytes: number = 7361042;
	const bytesFormatted: string = formatBytes(bytes);

	expect(bytesFormatted).toBe('7.02 MB');
});

test('formatBytes should properly format bytes with GB suffix', () => {
	const bytes: number = 9993610423;
	const bytesFormatted: string = formatBytes(bytes);

	expect(bytesFormatted).toBe('9.31 GB');
});

test('formatBytes should properly format bytes with TB suffix', () => {
	const bytes: number = 77777777776666;
	const bytesFormatted: string = formatBytes(bytes);

	expect(bytesFormatted).toBe('70.74 TB');
});

test('formatBytes should properly format bytes with PB suffix', () => {
	const bytes: number = 8000000000000000;
	const bytesFormatted: string = formatBytes(bytes);

	expect(bytesFormatted).toBe('7.11 PB');
});
