import ITreeNode from './types/ITreeNode';
import { JsonType } from './types/JsonType';
import TreeNodeType from './types/TreeNodeType';
import { returnNewId } from './utility/id';

export const buildTreeNodes = (treeNodesJson: JsonType[]): ITreeNode[] => {
	const treeNodes: ITreeNode[] = [];

	for (let i: number = 0; i < treeNodesJson.length; i++) {
		const treeNodeJson: JsonType = treeNodesJson[i];
		let children: ITreeNode[] | undefined;

		if (treeNodeJson.children) {
			children = buildTreeNodes(treeNodeJson.children);
		}

		const isFile: boolean = treeNodeJson.type === 'file';

		const treeNode: ITreeNode = {
			type: isFile ? TreeNodeType.File : TreeNodeType.Folder,
			name: treeNodeJson.name,
			modified: new Date(treeNodeJson.modified),
			id: returnNewId()
		};

		if (isFile) {
			treeNode.size = treeNodeJson.size;
		}

		if (children) {
			treeNode.children = children;
		}

		treeNodes.push(treeNode);
	}

	return treeNodes;
};
