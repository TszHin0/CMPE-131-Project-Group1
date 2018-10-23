<html>
<head>
    <title> Breakout </title>
    <style>
        { padding: 0; margin: 0; }
        canvas { background: #F3F3F3; display: block; margin: 0 auto; }
    </style>
</head>
<body>

<canvas id="Canvas" width="480" height="350"> </canvas>

<script>
// variables
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

var ball_Radius = 8;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 7;
var dy = -7;

var paddle_Height = 8;
var paddle_Width = 90;
var paddleX = (canvas.width-paddle_Width)/2;
var Press_Right = false;
var Press_Left = false;

var bricks = [];
var brick_Row_Count = 7;
var brick_Column_Count = 4;
var brick_Width = 50;
var brick_Height = 20;
var brick_Padding = 10;
var brick_setTop = 40;
var brick_setLeft = 35;

var score = 0;
var level = 1;
var lives = 10;

// initialize blocks
for(var c=0; c<brick_Column_Count; c++)
{
  bricks[c] = [];
    for(var r=0; r<brick_Row_Count; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
}

// User Control
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) 
{
  if(e.keyCode == 39) {
    Press_Right = true;
  }
  else if(e.keyCode == 37) {
    Press_Left = true;
  }
}

function keyUpHandler(e) 
{
  if(e.keyCode == 39) {
    Press_Right = false;
  }
  else if(e.keyCode == 37) {
    Press_Left = false;
  }
}

function mouseMoveHandler(e) 
{
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddle_Width/2;
  }
}

// Check Collision
function Detection() 
{
  for(var c=0; c<brick_Column_Count; c++) 
  {
    for(var r=0; r<brick_Row_Count; r++) 
    {
      var b = bricks[c][r];
      if(b.status == 1) 
      {
        if((x > b.x && x < b.x+brick_Width) && (y > b.y && y < b.y+brick_Height)) 
        {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brick_Row_Count*brick_Column_Count) 
          {
            alert("YOU WIN!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// Drawing Functions (subjects)
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ball_Radius, 0, Math.PI*2);
  ctx.fillStyle = "#DC143C";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddle_Height, paddle_Width, paddle_Height);
  ctx.fillStyle = "#696969";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(var c=0; c<brick_Column_Count; c++) {
    for(var r=0; r<brick_Row_Count; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brick_Width+brick_Padding))+brick_setLeft;
        var brickY = (c*(brick_Height+brick_Padding))+brick_setTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brick_Width, brick_Height);
        ctx.fillStyle = "#4AA2EF";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Drawing Functions (User info)
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#4AA2EF";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#4AA2EF";
  ctx.fillText("Level: "+level, 210, 20);
}

function drawOver() {
  ctx.font = "60px Arial";
  ctx.fillStyle = "#ED3913";
  ctx.fillText("GAME OVER", canvas.length/2,canvas.width/2);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#4AA2EF";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// Moving controls and detect game over
function Controls()
{
  if(x + dx > canvas.width-ball_Radius || x + dx < ball_Radius) {
    dx = -dx;
  }
  if(y + dy < ball_Radius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ball_Radius) {
    if(x > paddleX && x < paddleX + paddle_Width) {
      dy = -dy;
    }
    else {
      lives--;
      if(lives == 0) 
      {
        drawOver();
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 7;
        dy = -7;
        paddleX = (canvas.width-paddle_Width)/2;
      }
    }
  }

  if(Press_Right && paddleX < canvas.width-paddle_Width) {
    paddleX += 7;
  }
  else if(Press_Left && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

// Print everything
function levelOne() 
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLevel();
  drawLives();
  Detection();
  Controls();
  
  requestAnimationFrame(levelOne);
}

levelOne();
</script>

</body>
</html>
