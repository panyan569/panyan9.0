const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const gameContainer = document.getElementById('gameContainer');
let score = 0;
let lives = 3;
let ballSpeedX = 2;
let ballSpeedY = 2;
let paddleSpeed = 10;

// 初始化砖块
function createBricks() {
    const brickContainer = document.createElement('div');
    brickContainer.style.position = 'absolute';
    brickContainer.style.top = '50px';
    brickContainer.style.left = '50px';
    gameContainer.appendChild(brickContainer);
  
    for (let row = 0; row < 3; row++) { // 增加行数
      for (let i = 0; i < 10; i++) { // 每行砖块的数量保持不变
        const brick = document.createElement('div');
        brick.classList.add('brick');
        brick.style.position = 'absolute'; // 确保每个砖块都是绝对定位
        brick.style.left = i * 76 + 'px';
        brick.style.top = row * 30 + 'px'; // 根据行数调整 top 值
        brickContainer.appendChild(brick);
      }
    }
  }
  createBricks();
  
  // 移动挡板
  document.addEventListener('mousemove', function(e) {
    let mouseX = e.clientX - gameContainer.offsetLeft;
    if (mouseX > 0 && mouseX < gameContainer.offsetWidth - paddle.offsetWidth) {
      paddle.style.left = mouseX + 'px';
    }
  });

// 小球运动
function moveBall() {
  let ballX = ball.offsetLeft;
  let ballY = ball.offsetTop;
  let ballRadius = ball.offsetWidth / 2;
  let paddleX = paddle.offsetLeft;
  let paddleY = paddle.offsetTop;
  let paddleWidth = paddle.offsetWidth;
  let containerWidth = gameContainer.offsetWidth;
  let containerHeight = gameContainer.offsetHeight;

  // 检测小球与挡板的碰撞
  if (ballY + ballRadius >= paddleY && ballX + ballRadius >= paddleX && ballX - ballRadius <= paddleX + paddleWidth) {
    ballSpeedY = -ballSpeedY;
  }

   // 检测小球与砖块的碰撞
   let bricks = document.querySelectorAll('.brick');
   bricks.forEach(brick => {
     let brickX = brick.offsetLeft;
     let brickY = brick.offsetTop;
     let brickWidth = brick.offsetWidth;
     let brickHeight = brick.offsetHeight;
 
     if (ballY - ballRadius <= brickY + brickHeight && ballY + ballRadius >= brickY && ballX + ballRadius >= brickX && ballX - ballRadius <= brickX + brickWidth) {
       ballSpeedY = -ballSpeedY;
       brick.remove();
       score++;
       scoreDisplay.textContent = `得分: ${score}`;
     }
   });

  // 检测小球是否触碰底部
  if (ballY + ballRadius >= containerHeight) {
    lives--;
    livesDisplay.textContent = `生命: ${lives}`;
    if (lives === 0) {
      alert('游戏结束');
      document.location.reload();
    } else {
      ball.style.top = '280px';
      ball.style.left = '390px';
      ballSpeedX = 2;
      ballSpeedY = 2;
    }
  }

  // 小球碰壁反弹
  if (ballX + ballRadius >= containerWidth || ballX - ballRadius <= 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY - ballRadius <= 0) {
    ballSpeedY = -ballSpeedY;
  }

  // 更新小球位置
  ball.style.top = (ball.offsetTop + ballSpeedY) + 'px';
  ball.style.left = (ball.offsetLeft + ballSpeedX) + 'px';
}

// 游戏主循环
setInterval(moveBall, 10);