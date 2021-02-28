const colors = ['rgb(186,85,211)', 'rgb(30,144,255)', 'rgb(50,205,50)'];
const borderColor = 'rgb(47,79,79)';
const triangleWidthRange = [50, 150];
const triangleHeightMultiplier = 0.8;
const trianglesAmount = 20;

const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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


