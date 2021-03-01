import { borderColor, trianglesAmount, } from './constants';
import {
    getColor,
    getCoordinates,
    getTriangleDimensions,
    printResult,
} from './utils';
import { drawAreaHeight, drawAreaWidth, rTree } from '.';
import { canvas, context } from './prepareCanvas';

const drawLines = (coordinates) => {
    const { width, height } = getTriangleDimensions();
    context.strokeStyle = borderColor;
    context.moveTo(coordinates.x, coordinates.y);
    context.lineTo(coordinates.x + width/2, coordinates.y + height);
    context.lineTo(coordinates.x - width/2, coordinates.y + height);
    context.lineTo(coordinates.x, coordinates.y);
    context.stroke();
    return {
        width,
        height,
        coordinates,
    };
}

const makeTriangle = () => {
    const color = getColor();
    const coordinates = getCoordinates(drawAreaWidth, drawAreaHeight);
    context.fillStyle = color
    context.beginPath();
    const triangleInfo = drawLines(coordinates);
    context.closePath();
    context.fill();
    return triangleInfo;
};

const addToRTree = (config, obj) => {
    const { width, height, coordinates } = config;
    const x = coordinates.x - width/2;
    const y = coordinates.y;
    rTree.insert({x, y, w: width, h: height }, obj);
};

const isWithinTriangle = (triangle, point) => {
    const { width, height, coordinates: { x, y } } = triangle;

    if (point.y === y) {
        return point.x === x;
    }

    let curHeight = height;
    let curWidth = width;

    while(curHeight >= 1) {
        if (point.y === Math.floor(y + curHeight) || point.y === Math.ceil(y + curHeight)) {
            return point.x >= x - curWidth/2 && point.x <= x + curWidth/2;
        }
        if (point.y > y + curHeight) {
            curHeight += curHeight/2;
            curWidth += curWidth/2;
        } else {
            curWidth = curWidth/2;
            curHeight = curHeight/2;
        }
    }
};

export const findTriangle = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const nodes = rTree.search({ x, y, w: 1, h: 1 });
    const triangles = nodes.filter((node) => isWithinTriangle(node, { x, y }));
    printResult(triangles);
};

const drawOnCanvas = () => {
    for (let i = 0; i < trianglesAmount; i++) {
        const triangleInfo = makeTriangle();
        addToRTree(triangleInfo, { id: i, ...triangleInfo });
    }
    canvas.addEventListener('click', findTriangle);
};

export default drawOnCanvas;