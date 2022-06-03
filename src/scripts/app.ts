import fileFoldersData from '../data/file_folders.json';
import '../styles/styles.scss';
import { populateSidebar } from './content';
import { buildTreeNodes } from './data';
import { attachEventListeners } from './eventListeners';
import ITreeNode from './types/ITreeNode';

const treeNodes: ITreeNode[] = buildTreeNodes(fileFoldersData);
populateSidebar(treeNodes);
attachEventListeners(treeNodes);
