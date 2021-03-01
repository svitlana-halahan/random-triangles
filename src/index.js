import drawOnCanvas, { findTriangle } from './drawOnCanvas';
import './styles.css';
import RTree from 'rtree';
import prepareCanvas from './prepareCanvas';
import prepareSvg from './prepareSvg';
import drawInSvg from './drawInSvg';

export const rTree = RTree();
export const drawAreaWidth = document.documentElement.clientWidth - 300;
export const drawAreaHeight = document.documentElement.clientHeight;

const removeModeSelection = () => {
    const modeSelection = document.querySelector('.mode-select-container');
    modeSelection.remove();
};

const showCanvas = () => {
    removeModeSelection();
    prepareCanvas();
    drawOnCanvas();
};

const showSVG = () => {
    removeModeSelection();
    prepareSvg();
    drawInSvg();
};

window.addEventListener('load', (event) => {
    const canvasBtn = document.getElementById('canvas_btn');
    const svgBtn = document.getElementById('svg_btn');

    canvasBtn.addEventListener('click', showCanvas);
    svgBtn.addEventListener('click', showSVG);
});