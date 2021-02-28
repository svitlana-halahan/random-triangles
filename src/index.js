import draw, { findTriangle } from './draw';
import './styles.css';
import RTree from 'rtree';
import prepareCanvas from './prepareCanvas';

export const rTree = RTree();

prepareCanvas();
draw();

document.addEventListener('click', findTriangle);

