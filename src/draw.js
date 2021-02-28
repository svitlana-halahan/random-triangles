import {
    borderColor,
    colors,
    triangleHeightMultiplier,
    trianglesAmount,
    triangleWidthRange,
} from './constants';
import { getRandomNumberInRange } from './utils';

const getCoordinates = (canvas) => {
    const maxTriangleWidth = triangleWidthRange[1];
    const maxTriangleHeight = maxTriangleWidth * triangleHeightMultiplier;
    const coordinates = {};
    coordinates.x = getRandomNumberInRange(maxTriangleWidth/2, canvas.width - maxTriangleWidth/2);
    coordinates.y = getRandomNumberInRange(0, canvas.height - maxTriangleHeight);
    return coordinates;
}

const drawLines = (context, coordinates) => {
    const triangleWidth = getRandomNumberInRange(...triangleWidthRange);
    const triangleHeight = triangleWidth * triangleHeightMultiplier;
    context.strokeStyle = borderColor;
    context.moveTo(coordinates.x, coordinates.y);
    context.lineTo(coordinates.x + triangleWidth/2, coordinates.y + triangleHeight);
    context.lineTo(coordinates.x - triangleWidth/2, coordinates.y + triangleHeight);
    context.lineTo(coordinates.x, coordinates.y);
    context.stroke();
}

const makeTriangle = (canvas) => {
    const color = colors[getRandomNumberInRange(0, colors.length - 1)];
    const coordinates = getCoordinates(canvas);
    const context = canvas.getContext('2d');
    context.fillStyle = color
    context.beginPath();
    drawLines(context, coordinates);
    context.closePath();
    context.fill();
};

const draw = () => {
    const canvas = document.getElementById('canvas');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    for (let i = 0; i < trianglesAmount; i++) {
        makeTriangle(canvas);
    }
};

export default draw;