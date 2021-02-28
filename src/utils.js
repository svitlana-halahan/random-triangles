import { colors, triangleHeightMultiplier, triangleWidthRange } from './constants';

export const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const getCoordinates = (canvas) => {
    const maxTriangleWidth = triangleWidthRange[1];
    const maxTriangleHeight = maxTriangleWidth * triangleHeightMultiplier;
    const coordinates = {};
    coordinates.x = getRandomNumberInRange(maxTriangleWidth / 2, canvas.width - maxTriangleWidth / 2);
    coordinates.y = getRandomNumberInRange(0, canvas.height - maxTriangleHeight);
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