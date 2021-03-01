import { drawAreaHeight, drawAreaWidth } from './index';

export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d');

const prepareCanvas = () => {
    canvas.setAttribute('id', 'canvas');
    canvas.width = drawAreaWidth;
    canvas.height = drawAreaHeight;
    document.body.appendChild(canvas);
};

export default prepareCanvas;