import { buildTreeNodes } from '../data';
import ITreeNode from '../types/ITreeNode';
import { JsonType } from '../types/JsonType';
import TreeNodeType from '../types/TreeNodeType';

test('buildTreeNodes returns correct collection of ITreeNodes', () => {
	const json: JsonType[] = [
		{
			'type': 'folder',
			'name': 'A',
			'modified': '2010-01-01T04:00:00.000Z',
			'children': [
				{
					'type': 'folder',
					'name': 'G',
					'modified': '2007-01-06T04:00:00.000Z',
					'children': []
				},
				{
					'type': 'folder',
					'name': 'K',
					'modified': '2005-01-22T04:00:00.000Z',
					'children': [
						{
							'type': 'file',
							'name': 'text.txt',
							'modified': '2015-02-01T04:00:00.000Z',
							'size': 77
						}
					]
				},
				{
					'type': 'file',
					'name': 'b.png',
					'modified': '2001-06-01T04:00:00.000Z',
					'size': 999
				},
				{
					'type': 'file',
					'name': 'c.pdf',
					'modified': '2021-03-02T04:00:00.000Z',
					'size': 177
				}
			]
		},
		{
			'type': 'folder',
			'name': 'D',
			'modified': '2007-11-01T07:00:00.000Z',
			'children': []
		}
	];

	const results: ITreeNode[] = buildTreeNodes(json);
	const firstResult: ITreeNode = results[0];
	const firstResultChildren: ITreeNode[] = firstResult.children as ITreeNode[];
	const firstResultFirstChild: ITreeNode = firstResultChildren[0];
	const firstResultSecondChild: ITreeNode = firstResultChildren[1];
	const firstResultSecondChildChildren: ITreeNode[] =
		firstResultSecondChild.children as ITreeNode[];
	const firstResultThirdChild: ITreeNode = firstResultChildren[2];
	const firstResultFourthChild: ITreeNode = firstResultChildren[3];
	const secondResult: ITreeNode = results[1];
	const secondResultChildren: ITreeNode[] =
		secondResult.children as ITreeNode[];

	expect(results.length).toBe(2);

	expect(firstResult.type).toBe(TreeNodeType.Folder);
	expect(firstResult.name).toBe('A');
	expect(firstResult.modified.getDate()).toBe(
		new Date('2010-01-01T04:00:00.000Z').getDate()
	);

	expect(firstResultChildren.length).toBe(4);

	expect(firstResultFirstChild.type).toBe(TreeNodeType.Folder);
	expect(firstResultFirstChild.name).toBe('G');
	expect(firstResultFirstChild.modified.getDate()).toBe(
		new Date('2007-01-06T04:00:00.000Z').getDate()
	);
	expect(firstResultFirstChild.children?.length).toBe(0);

	expect(firstResultSecondChild.type).toBe(TreeNodeType.Folder);
	expect(firstResultSecondChild.name).toBe('K');
	expect(firstResultSecondChild.modified.getDate()).toBe(
		new Date('2005-01-22T04:00:00.000Z').getDate()
	);

	expect(firstResultSecondChildChildren.length).toBe(1);
	expect(firstResultSecondChildChildren[0].type).toBe(TreeNodeType.File);
	expect(firstResultSecondChildChildren[0].name).toBe('text.txt');
	expect(firstResultSecondChildChildren[0].modified.getDate()).toBe(
		new Date('2015-02-01T04:00:00.000Z').getDate()
	);
	expect(firstResultSecondChildChildren[0].size).toBe(77);

	expect(firstResultThirdChild.type).toBe(TreeNodeType.File);
	expect(firstResultThirdChild.name).toBe('b.png');
	expect(firstResultThirdChild.modified.getDate()).toBe(
		new Date('2001-06-01T04:00:00.000Z').getDate()
	);
	expect(firstResultThirdChild.size).toBe(999);

	expect(firstResultFourthChild.type).toBe(TreeNodeType.File);
	expect(firstResultFourthChild.name).toBe('c.pdf');
	expect(firstResultFourthChild.modified.getDate()).toBe(
		new Date('2021-03-02T04:00:00.000Z').getDate()
	);
	expect(firstResultFourthChild.size).toBe(177);

	expect(secondResult.type).toBe(TreeNodeType.Folder);
	expect(secondResult.name).toBe('D');
	expect(secondResult.modified.getDate()).toBe(
		new Date('2007-11-01T07:00:00.000Z').getDate()
	);

	expect(secondResultChildren.length).toBe(0);
});
