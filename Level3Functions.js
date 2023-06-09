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
  }
}

// Player Logic
function PlayerLogic() {
  if (SpaceisPressed && Velocity === 0) {
    console.log(`Function ran`);
    Velocity = -2;
  }

  if (player.y2 + player.h < cnv.height - 70) {
    if (Velocity < 0) {
      Velocity + 0.1;
      player.y2 += Velocity;
      if (Velocity > 2) {
        velocity = 2;
      }
    }
    console.log("going down");
  }

  if (Velocity < 0) {
    Velocity + 0.1;
    player.y2 += Velocity;
  }
}

// Make Press False
function makeFalse() {
  SpaceisPressed = false;
}
