$('form.needs-validation').on('submit', function() {
  this.classList.add('was-validated');
  return this.checkValidity();
});

const
    ctx = $('canvas')[0].getContext('2d'),
    canvasWidth = 2000,
    canvasHeight = 2000,
    objectWidth = 300,
    objectHeight = 300;

let
    x = Math.random() * (canvasWidth - objectWidth),
    y = Math.random() * (canvasHeight - objectHeight),
    degree = Math.random() * 360,
    rectColor = '#ddd',
    trailColor = '#222';

const iterateAnimation = () => {

  ctx.fillStyle = trailColor;
  ctx.fillRect(x, y, objectWidth, objectHeight);

  x += 2 * Math.cos(degree * (Math.PI / 180));
  y += 2 * Math.sin(degree * (Math.PI / 180));

  let reflected = false;
  if (x < 0) {
    x = 0;
    degree = reflectVertical(degree);
    reflected = true;
  } else if (x > canvasWidth - objectWidth) {
    x = canvasWidth - objectWidth;
    degree = reflectVertical(degree);
    reflected = true;
  }
  if (y < 0) {
    y = 0;
    degree = reflectHorizontal(degree);
    reflected = true;
  } else if (y > canvasHeight - objectHeight) {
    y = canvasHeight - objectHeight;
    degree = reflectHorizontal(degree);
    reflected = true;
  }
  if (reflected) {
    degree += Math.random() * 32 - 16;
    const temp = trailColor;
    trailColor = rectColor;
    rectColor = temp;
  }

  ctx.fillStyle = rectColor;
  ctx.fillRect(x, y, objectWidth, objectHeight);
};

setInterval(iterateAnimation);

function reflectVertical(degree) {
  return 180 - degree;
}

function reflectHorizontal(degree) {
  return -degree;
}
