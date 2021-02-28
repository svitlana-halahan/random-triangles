import {
    borderColor,
    colors,
    triangleHeightMultiplier,
    trianglesAmount,
    triangleWidthRange,
} from './constants';
import { getRandomNumberInRange } from './utils';
import { rTree } from '.';
import { context, canvas } from './prepareCanvas';

const getCoordinates = (canvas) => {
    const maxTriangleWidth = triangleWidthRange[1];
    const maxTriangleHeight = maxTriangleWidth * triangleHeightMultiplier;
    const coordinates = {};
    coordinates.x = getRandomNumberInRange(maxTriangleWidth/2, canvas.width - maxTriangleWidth/2);
    coordinates.y = getRandomNumberInRange(0, canvas.height - maxTriangleHeight);
    return coordinates;
}

const drawLines = (coordinates) => {
    const triangleWidth = getRandomNumberInRange(...triangleWidthRange);
    const triangleHeight = Math.floor(triangleWidth * triangleHeightMultiplier);
    context.strokeStyle = borderColor;
    context.moveTo(coordinates.x, coordinates.y);
    context.lineTo(coordinates.x + triangleWidth/2, coordinates.y + triangleHeight);
    context.lineTo(coordinates.x - triangleWidth/2, coordinates.y + triangleHeight);
    context.lineTo(coordinates.x, coordinates.y);
    context.stroke();
    return {
        width: triangleWidth,
        height: triangleHeight,
        coordinates,
    };
}

const makeTriangle = () => {
    const color = colors[getRandomNumberInRange(0, colors.length - 1)];
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

const printResult = (triangles) => {
    const resultContainer = document.querySelector('.results');
    if (triangles.length === 0) {
        resultContainer.textContent = 'No triangles detected!';
        return;
    }
    resultContainer.textContent = triangles.reduce((acc, curValue) => {
        acc += `id: ${curValue.id}\n`;
        return acc;
    }, 'Detected triangles:\n');
};

export const findTriangle = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const nodes = rTree.search({ x, y, w: 1, h: 1 });
    const triangles = nodes.filter((node) => isWithinTriangle(node, { x, y }));
    printResult(triangles);
};

const draw = () => {
    for (let i = 0; i < trianglesAmount; i++) {
        const triangleInfo = makeTriangle();
        addToRTree(triangleInfo, { id: i, ...triangleInfo });
    }
};

export default draw;