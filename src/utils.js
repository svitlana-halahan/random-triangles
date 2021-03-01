import { colors, triangleHeightMultiplier, triangleWidthRange } from './constants';

export const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const getCoordinates = (width, height) => {
    const maxTriangleWidth = triangleWidthRange[1];
    const maxTriangleHeight = maxTriangleWidth * triangleHeightMultiplier;
    const coordinates = {};
    coordinates.x = getRandomNumberInRange(maxTriangleWidth / 2, width - maxTriangleWidth / 2);
    coordinates.y = getRandomNumberInRange(0, height - maxTriangleHeight);
    return coordinates;
}
export const getTriangleDimensions = () => {
    const triangleWidth = getRandomNumberInRange(...triangleWidthRange);
    const triangleHeight = Math.floor(triangleWidth * triangleHeightMultiplier);
    return {
        width: triangleWidth,
        height: triangleHeight,
    };
};

export const getColor = () => colors[getRandomNumberInRange(0, colors.length - 1)];

export const printResult = (triangles, time) => {
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
    resultContainer.textContent = str;
};

export const timerWrapper = (f) => () => {
    const start = performance.now();
    f();
    const end = performance.now();
    const resultContainer = document.querySelector('.results');
    resultContainer.textContent = `Execution time:\n${end - start}`;
};