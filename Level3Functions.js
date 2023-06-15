// Level 3 Start Function
function GameonLevel3() {
  DrawLevel3();
  PlayerLogic();
}

// Movement Event Listner
document.addEventListener("keydown", CheckLevel3Movement);
document.addEventListener("keyup", CheckKeyUp);

// Draw Level 3
function DrawLevel3() {
  // Draw Background Colour
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Ground
  ctx.drawImage(Level2Floor, 0, cnv.height - 70);
  ctx.drawImage(Level2Floor, 300, cnv.height - 70);

  // DrawMario
  ctx.drawImage(
    PlayerImg2,
    spriteMovement * 256,
    0,
    256,
    256,
    player.x2,
    player.y2,
    player.w,
    player.h
  );
}

// Check Which key Pressed for Movement
function CheckLevel3Movement(event) {
  // Movement If Statements
  if (event.keyCode === 32) {
    // Space Bar
    SpaceisPressed = true;
    setTimeout(makeFalse, 10);
  } else if (event.keyCode === 65) {
    // A Key
    aPressed = true;
  } else if (event.keyCode === 68) {
    // D Key
    dPressed = true;
  }
}

//Key Up Logic
function CheckKeyUp(event) {
  if (event.keyCode === 65) {
    // A Key
    aPressed = false;
    spriteMovement = 1;
    Gameframe = 0;
  } else if (event.keyCode === 68) {
    // D Key
    dPressed = false;
    spriteMovement = 1;
    Gameframe = 0;
  }
}

// Player Logic
function PlayerLogic() {
  if (SpaceisPressed && Velocity === 0) {
    console.log(`Function ran`);
    Velocity = -5;
    jumpSound.play();
  }

  if (Velocity >= -5 && Velocity !== 0 && player.y2 + player.h <= 740) {
    Velocity += 0.1;
    console.log(`${Velocity}`);
    player.y2 += Velocity;
  } else if (Velocity > 5) {
    Velocity = 5;
  }

  if (player.y2 > 690) {
    player.y2 = 690;
    Velocity = 0;
    console.log("Landed");
  }

  if (aPressed && player.x2 > 0) {
    player.x2--;
  } else if (dPressed && player.x2 + player.w < cnv.width) {
    player.x2++;
  }
}

// Make Press False
function makeFalse() {
  SpaceisPressed = false;
}

// Loop Player Sprite
requestAnimationFrame(spriteLoop);
function spriteLoop() {
  if (dPressed === true || aPressed === true) {
    Gameframe++;
    if (Gameframe % 8 === 0) {
      spriteMovement++;
    }

    if (spriteMovement > 5) {
      spriteMovement = 0;
    }
  }
  requestAnimationFrame(spriteLoop);
}
