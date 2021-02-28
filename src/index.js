import RTree from 'rtree';
import draw from './draw';
import './styles.css';

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
document.body.appendChild(canvas);
draw();
