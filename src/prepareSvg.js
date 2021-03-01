import { drawAreaHeight, drawAreaWidth } from './index';

export const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

const prepareSvg = () => {
    svg.setAttribute('width', drawAreaWidth);
    svg.setAttribute('height', drawAreaHeight);
    document.body.appendChild(svg);
};

export default prepareSvg;