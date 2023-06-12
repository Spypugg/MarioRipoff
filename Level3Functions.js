// Level 3 Start Function
function GameonLevel3() {
  DrawLevel3();
  PlayerLogic();
}

// Movement Event Listner
document.addEventListener("keydown", CheckLevel3Movement);

// Draw Level 3
function DrawLevel3() {
  // Draw Background Colour
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Ground
  ctx.drawImage(Level2Floor, 0, cnv.height - 70);
  ctx.drawImage(Level2Floor, 300, cnv.height - 70);

  // DrawMario
  ctx.drawImage(playerImg, player.x2, player.y2, player.w, player.h);
}

// Check Which key Pressed for Movement
function CheckLevel3Movement(event) {
  // Movement If Statements
  if (event.keyCode === 32) {
    SpaceisPressed = true;
    setTimeout(makeFalse, 10);
  } else if (event.keyCode === 65 && player.x2 > 0) {
    player.x2--;
  } else if (event.keyCode === 68 && player.x2 + player.w < cnv.width) {
    player.x2++;
  }
}

// Player Logic
function PlayerLogic() {
  if (SpaceisPressed && Velocity === 0) {
    console.log(`Function ran`);
    Velocity = -2;
  }

  if (Velocity >= -2 && Velocity !== 0 && player.y2 + player.h <= 740) {
    Velocity += 0.01;
    console.log(`${Velocity}`);
    player.y2 += Velocity;
  } else if (Velocity > 2) {
    Velocity = 2;
  }

  if (player.y2 > 690) {
    player.y2 = 690;
    Velocity = 0;
    console.log("Landed");
  }
}

// Make Press False
function makeFalse() {
  SpaceisPressed = false;
}
