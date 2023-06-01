// Level 2 Start Function
function GameonLevel2() {
  DrawLevel2();
  cnv.addEventListener("click", MouseTrackerLevel2);
}

// Draw Level
function DrawLevel2() {
  // Draw Backgorund
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Floor
  ctx.drawImage(Level2Floor, 0, cnv.height - 70);
  ctx.drawImage(Level2Floor, 300, cnv.height - 70);

  // Draw Mario and Boss
  ctx.drawImage(playerImg, 20, cnv.height - 130, 70, 70);
  ctx.drawImage(enemyImg, cnv.height - 330, cnv.width - 400, 300, 300);

  // Draw Attack Select Box
  ctx.strokeStyle = "black";
  ctx.lineWidth = "4";
  ctx.strokeRect(20, 20, 250, 70);
  ctx.strokeRect(320, 20, 250, 70);
  ctx.strokeRect(cnv.width - 270, 20, 250, 70);

  // Draw Attack Select Text
  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Punch", 70, 70);
  ctx.fillText("Kick", 390, 70);
  ctx.fillText("Locked", cnv.width - 220, 70);
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`${AttackSelect}`, 20, 140);

  // Draw Mario and Goomba Health Points
  ctx.fillText(`${MarioHealthFinal}`, 15, cnv.height - 140);
  ctx.fillText(`${GoombaHealthFinal}`, cnv.height - 330, cnv.width - 370);
}

// Mouse X Y Tracker and Attack Selection
function MouseTrackerLevel2(event) {
  cnvRect = cnv.getBoundingClientRect();
  // Mouse Tracker
  mouseX = event.clientX - cnvRect.left;
  mouseY = event.clientY - cnvRect.top;

  // Attack Selection If Statements
  // Player Attack if Statements
  if (
    state === "gameonLevel2" &&
    AttackState === "Player" &&
    MarioHealthFinal > 0 &&
    AttackSelect === "Your Turn"
  ) {
    attackEFF = Math.random() * 5;
    if (mouseX > 20 && mouseY > 20 && mouseX < 270 && mouseY < 90) {
      console.log("Punched");
      GoombaHealth -= 5 * `${attackEFF}`;
      AttackEfftext();
      GoombaHealthFinal = Math.round(GoombaHealth);
      AttackSelect = `You Used Punch Which ${EffText}`;
      AttackState = "Enemy";
      setTimeout(GoombaAttack, 2500);
      GoombaHealthChecker();
    } else if (mouseX > 321 && mouseX < 572 && mouseY > 20 && mouseY < 90) {
      console.log("Kicked");
      AttackSelect = `You Used Kick Which ${EffText}`;
      GoombaHealth -= 7 * `${attackEFF}`;
      AttackEfftext();
      GoombaHealthFinal = Math.round(GoombaHealth);
      AttackState = "Enemy";
      setTimeout(GoombaAttack, 2500);
      GoombaHealthChecker();
    } else if (mouseX > 630 && mouseX < 880 && mouseY > 19 && mouseY < 90) {
      console.log("Locked");
    }
  }
}

// Reset Attack Text
function ResetAttackText() {
  AttackSelect = "Your Turn";
}

// Goombac Attack If Statements
function GoombaAttack() {
  console.log("GoombaAttack");
  console.log(state, AttackState);
  attackEFF = Math.random();
  if (
    state === "gameonLevel2" &&
    AttackState === "Enemy" &&
    GoombaHealthFinal > 0
  ) {
    EnemyGoombaAttackSelect = Math.random();
    attackEFF = Math.random() * 10;
    if (EnemyGoombaAttackSelect <= 0.25) {
      AttackSelect = `King Goomba used GOOMBA BOUNCE Which ${EffText}`;
      setTimeout(ResetAttackText, 2000);
      MarioHealth -= 8 * `${attackEFF}`;
      AttackEfftext();
      console.log("Goomba Attack");
      MarioHealthFinal = Math.round(MarioHealth);
      AttackState = "Player";
      MarioHealthChecker();
    } else if (EnemyGoombaAttackSelect <= 0.5) {
      AttackSelect = `King Goomba Used NO HAND SLAP Which ${EffText}`;
      setTimeout(ResetAttackText, 2000);
      MarioHealth -= 4 * `${attackEFF}`;
      AttackEfftext();
      console.log("Goomba Attack");
      MarioHealthFinal = Math.round(MarioHealth);
      AttackState = "Player";
      MarioHealthChecker();
    } else if (EnemyGoombaAttackSelect <= 0.55) {
      AttackSelect = "Kinga Goomba Used HEAl";
      setTimeout(ResetAttackText, 2000);
      GoombaHealth += 20;
      GoombaHealthFinal += 20;
      console.log("Goomba Attack");
      MarioHealthFinal = Math.round(MarioHealth);
      AttackState = "Player";
      MarioHealthChecker();
    } else {
      AttackSelect = `King Goomba used GOOMBA STOMP Which ${EffText}`;
      setTimeout(ResetAttackText, 2000);
      console.log("Goomba Attack");
      MarioHealth -= 3 * `${attackEFF}`;
      AttackEfftext();
      MarioHealthFinal = Math.round(MarioHealth);
      AttackState = "Player";
      MarioHealthChecker();
    }
  }
}

// Reset Functions
function MarioDied() {
  setTimeout(resetifDie, 2000);
  drawDeathScreen();
}

function resetifDie() {
  GameonLevel2();
}

function drawDeathScreen() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("You've Died, Click to Respawn", cnv.width / 3, 300);
}

// Mario Health Checker
function MarioHealthChecker() {
  if (MarioHealthFinal < 1) {
    state = "level2GameOver";
    console.log(`Mario Died`);
  }
}

// Goomba Health Checker
function GoombaHealthChecker() {
  if (GoombaHealthFinal < 1) {
    state = "level2Finished";
    console.log(`Player has Beaten Level 2`);
  }
}

function AttackEfftext() {
  if (attackEFF === 1) {
    EffText = "Missed";
  } else if (attackEFF <= 2) {
    EffText = "Tickled";
  } else if (attackEFF <= 4) {
    EffText = "Stung";
  } else if (attackEFF <= 6) {
    EffText = "Hurt";
  } else if (attackEFF <= 8) {
    EffText = "Made a Cracking Sound";
  } else if (attackEFF <= 10) {
    EffText = "Broke a Bone";
  }
}
