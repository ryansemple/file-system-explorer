import { returnNewId } from '../id';

test('returnNewId should return a unique and valid uuid.', () => {
	const id: string = returnNewId();
	const validIdLength: number = 36;
	const dash: string = '-';
	const validDashIndexes: number[] = [8, 13, 18, 23];

	for (let i: number = 0; i < validDashIndexes.length; i++) {
		const currentDashIndex: number = validDashIndexes[i];
		expect(id[currentDashIndex]).toBe(dash);
	}

	expect(id.length).toBe(validIdLength);
});
