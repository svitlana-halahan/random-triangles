import { borderColor, trianglesAmount, } from './constants';
import { getColor, getCoordinates, getTriangleDimensions } from './utils';
import { rTree } from '.';
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
    const coordinates = getCoordinates(canvas);
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
    const { width, height, coordinates } = triangle;
    if (point.y === coordinates.y) {
        return point.x === coordinates.x;
    }

    let curHeight = height;
    let curWidth = width;
    let x = coordinates.x;
    let y = coordinates.y;

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

const printResult = (triangles, time) => {
    const resultContainer = document.querySelector('.results');
    let str = '';
    if (triangles.length === 0) {
        str = 'No triangles detected!\n';
    } else {
        str = triangles.reduce((acc, curValue) => {
            acc += `id: ${curValue.id}\n`;
            return acc;
        }, 'Detected triangles:\n');
    }
    str += `\n Execution time: ${time}`;
    resultContainer.textContent = str;
};

export const findTriangle = (event) => {
    const start = performance.now();
    const x = event.clientX;
    const y = event.clientY;
    const nodes = rTree.search({ x, y, w: 1, h: 1 });
    const triangles = nodes.filter((node) => isWithinTriangle(node, { x, y }));
    const end = performance.now();
    printResult(triangles, end - start);
};

const draw = () => {
    for (let i = 0; i < trianglesAmount; i++) {
        const triangleInfo = makeTriangle();
        addToRTree(triangleInfo, { id: i, ...triangleInfo });
    }
};

export default draw;