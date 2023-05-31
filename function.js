// Game Start Function
function gameStart() {
  drawStart();
}

// Game On Function
function gameOn() {
  // Logic
  checkCollision();
  checkMovement();
  // DRAW
  drawBorders();
}

// Game Over Function
function gameOver() {
  drawBorders();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "blue";
  ctx.fillText("You've Been Elongaded", 370, 300);

  // Circle around Player
  ctx.strokeStyle = "Blue";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(player.x + player.w / 2, player.y + player.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  state = "gameOver";

  setTimeout(reset, 2000);
}

// Draw Borders
function drawBorders() {
  // Draw Top Border
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, cnv.width, 50);

  // Draw Bottom Border
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 750, cnv.width, 50);

  // Draw Text
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`SURVIVE`, 350, cnv.height - 20);

  // Draw Survive Countdown
  ctx.font = "30px, Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Time Left: ${level1Timer}`, 305, 30);

  // Draw Play Area
  ctx.fillStyle = "red";
  ctx.fillRect(0, 50, cnv.width, cnv.height - 100);

  if (state === "gameOn") {
    // Draw Player
    ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);
  } else if (state === "gameOver") {
    // Draw Enlongaded Mario

    ctx.drawImage(ElongadedMario, player.x, player.y, player.w, player.h);
    // Player Mario Mama Mia
    mamaMia.play();
    // Stop Mama Mia After 1 Second
    setTimeout(stopMamaMia, 1300);
    function stopMamaMia() {
      mamaMia.pause();
      mamaMia.currentTime = 0;
    }
  }

  // Draw Enemy
  ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.w, enemy.h);
}

function drawStart() {
  // Reset Game Counter
  level1Timer = 200;
  // Draw Top Border
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, cnv.width, 50);

  // Reset Player and Enemy Position
  enemy.y = 400;
  enemy.x = 400;
  player.x = 50;
  player.y = 50;

  // Play Area
  ctx.fillStyle = "red";
  ctx.fillRect(0, 50, cnv.width, cnv.height - 100);

  // Draw Text
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Welcome to the game", 305, 30);

  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Click to Start", 370, 300);

  // Draw Bottom Border
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 750, cnv.width, 50);
}

// Mario Movement
function movement(event) {
  if (state === "gameOn") {
    if (event.keyCode === 87) {
      // W Key
      if (player.y > 51) {
        player.y -= 2;
      }
    } else if (event.keyCode === 65) {
      // A Key
      if (player.x > 1) {
        player.x -= 2;
      }
    } else if (event.keyCode === 83) {
      // S Key
      if (player.y + player.h < cnv.height - 51) {
        player.y += 2;
      }
    } else if (event.keyCode === 68) {
      // D Key
      if (player.x + player.w < cnv.width - 1) {
        player.x += 2;
      }
    }
  }
}

// Goomba A.I. Movement
function checkMovement() {
  if (player.x > enemy.x && player.y > enemy.y) {
    enemy.y += goombaSpeed;
    enemy.x += goombaSpeed;
  } else if (player.x < enemy.x && player.y < enemy.y) {
    enemy.y -= goombaSpeed;
    enemy.x -= goombaSpeed;
  } else if (player.x < enemy.x && player.y > enemy.y) {
    enemy.y += goombaSpeed;
    enemy.x -= goombaSpeed;
  } else if (player.x > enemy.x && player.y < enemy.y) {
    enemy.y -= goombaSpeed;
    enemy.x += goombaSpeed;
  } else if (player.x < enemy.x) {
    enemy.x -= goombaSpeed;
  } else if (player.x > enemy.x) {
    enemy.x += goombaSpeed;
  } else if (player.y < enemy.y) {
    enemy.y -= goombaSpeed;
  } else if (player.y > enemy.y) {
    enemy.y += goombaSpeed;
  } else if (player.x > enemy.x && player.y > enemy.y) {
    enemy.y += goombaSpeed;
    enemy.x += goombaSpeed;
  }
}

// Collision Checker
function checkCollision() {
  if (
    player.x + player.w >= enemy.x &&
    player.x <= enemy.x + enemy.w &&
    player.y + player.h >= enemy.y &&
    player.y <= enemy.y + enemy.h
  ) {
    gameOver();
    tries += 1;
  }
}

// Reset to Start
function reset() {
  state = "start";
}

// Make Counter Countdown
function countdown() {
  if (level1Timer > 0) {
    level1Timer -= 1;
    setTimeout(countdown, 1000);
  } else {
    state = "Stage1End";
    console.log(`WINNER WINNER CHICKEN DINNER`);
  }
}

// Draw Win Screen
function Stage1End() {
  if (tries > 1 || tries === 0) {
    trys = "trys";
  } else {
    trys = "try";
  }
  ctx.font = "25px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(
    `You Ran Away and the Goomba Called his Dad, It took you ${tries} ${trys} to Run Away`,
    40,
    300
  );
  ctx.fillText(`Click to Play Next Level`, 200, 350);
}
