import TreeNodeType from './TreeNodeType';

interface ITreeNode {
	name: string;
	size?: number;
	type: TreeNodeType;
	modified: Date;
	children?: ITreeNode[];
	id: string;
}

export default ITreeNode;
