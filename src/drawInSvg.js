import { borderColor, trianglesAmount } from './constants';
import { svg } from './prepareSvg';
import { getColor, getCoordinates, getTriangleDimensions } from './utils';
import { drawAreaWidth, drawAreaHeight } from '.';

const addPointToPolygon = (polygon, coordinates) => {
    const point = svg.createSVGPoint();
    point.x = coordinates.x;
    point.y = coordinates.y;
    polygon.points.appendItem(point);
};

const makePolygon = () => {
    const coordinates = getCoordinates(drawAreaWidth, drawAreaHeight);
    const { width, height } = getTriangleDimensions();
    const color = getColor();
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    addPointToPolygon(polygon, coordinates);
    addPointToPolygon(polygon, {
        x: coordinates.x - width/2,
        y: coordinates.y + height,
    });
    addPointToPolygon(polygon, {
        x: coordinates.x + width/2,
        y: coordinates.y + height,
    });
    polygon.setAttribute(
        'style',
        `fill:${color};stroke:${borderColor};stroke-width:1`,
    );
    svg.appendChild(polygon);
};

const drawInSvg = () => {
    for (let i = 0; i < trianglesAmount; i++) {
        makePolygon();
    }
};

export default drawInSvg;