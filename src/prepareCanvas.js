export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d');

const prepareCanvas = () => {
    canvas.setAttribute('id', 'canvas');
    canvas.width = document.documentElement.clientWidth - 300;
    canvas.height = document.documentElement.clientHeight;
    document.body.appendChild(canvas);
};

export default prepareCanvas;