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
    attackEFF = Math.random();
    if (mouseX > 20 && mouseY > 20 && mouseX < 270 && mouseY < 90) {
      console.log("Punched");
      AttackEfftext();
      GoombaHealth -= AttackDmg;
      GoombaHealthFinal = Math.round(GoombaHealth);
      AttackSelect = `You Used Punch Which ${EffText}`;
      AttackState = "Enemy";
      console.log(`Attack Eff = ${attackEFF}`);
      setTimeout(GoombaAttack, 2500);
      GoombaHealthChecker();
    } else if (mouseX > 321 && mouseX < 572 && mouseY > 20 && mouseY < 90) {
      console.log("Kicked");
      AttackEfftext();
      GoombaHealth -= AttackDmg;
      GoombaHealthFinal = Math.round(GoombaHealth);
      AttackSelect = `You Used Kick Which ${EffText}`;
      AttackState = "Enemy";
      console.log(`Attack Eff = ${attackEFF}`);
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
  if (
    state === "gameonLevel2" &&
    AttackState === "Enemy" &&
    GoombaHealthFinal > 0
  ) {
    EnemyGoombaAttackSelect = Math.random();
    attackEFF = Math.random();
    if (EnemyGoombaAttackSelect <= 0.25) {
      setTimeout(ResetAttackText, 2000);
      AttackEfftext();
      MarioHealth -= AttackDmg;
      AttackSelect = `King Goomba used GOOMBA BOUNCE Which ${EffText}`;
      console.log("Goomba Attack");
      MarioHealthFinal = Math.round(MarioHealth);
      AttackState = "Player";
      console.log(`Attack Eff = ${attackEFF}`);
      MarioHealthChecker();
    } else if (EnemyGoombaAttackSelect <= 0.5) {
      setTimeout(ResetAttackText, 2000);
      AttackEfftext();
      MarioHealth -= AttackDmg;
      AttackSelect = `King Goomba used GOOMBA BOUNCE Which ${EffText}`;
      console.log("Goomba Attack");
      MarioHealthFinal = Math.round(MarioHealth);
      AttackState = "Player";
      console.log(`Attack Eff = ${attackEFF}`);
      MarioHealthChecker();
    } else if (EnemyGoombaAttackSelect <= 0.55) {
      AttackSelect = "Kinga Goomba Used HEAL";
      setTimeout(ResetAttackText, 2000);
      GoombaHealth += 10;
      GoombaHealthFinal += 10;
      console.log("Goomba Attack");
      MarioHealthFinal = Math.round(MarioHealth);
      AttackState = "Player";
      MarioHealthChecker();
    } else {
      setTimeout(ResetAttackText, 2000);
      console.log("Goomba Attack");
      AttackEfftext();
      MarioHealth -= AttackDmg;
      AttackSelect = `King Goomba used GOOMBA STOMP Which ${EffText}`;
      MarioHealthFinal = Math.round(MarioHealth);
      AttackState = "Player";
      console.log(`Attack Eff = ${attackEFF}`);
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
    MarioHealthFinal = 0;
  }
}

// Goomba Health Checker
function GoombaHealthChecker() {
  if (GoombaHealthFinal < 1) {
    state = "level2Finished";
    console.log(`Player has Beaten Level 2`);
    DrawLevel2FinishedScreen();
  }
}

// Text Eff Text Gen
function AttackEfftext() {
  if (attackEFF <= 0.1) {
    EffText = "Missed";
    AttackDmg = "0";
  } else if (attackEFF <= 0.2) {
    EffText = "Felt like a Flick";
    AttackDmg = "2";
  } else if (attackEFF <= 0.4) {
    EffText = "Stung";
    AttackDmg = "4";
  } else if (attackEFF <= 0.6) {
    EffText = "Hurt";
    AttackDmg = "6";
  } else if (attackEFF <= 0.8) {
    EffText = "Made a Cracking Sound";
    AttackDmg = "8";
  } else if (attackEFF <= 1) {
    EffText = "Broke a Bone";
    AttackDmg = "10";
  }
}

// Draw Level2Finish Screen
function DrawLevel2FinishedScreen() {
  setTimeout(StartLevel3, 10000);
  setTimeout(DrawAttackUnlock1, 3000);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`You've Beaten Me Mario, But You Won't Last Long`, 100, 300);
  UnlockedSound.pause();
}

function StartLevel3() {
  state = "gameOnLevel3";
  UnlockedSound.pause();
}

// Draw Unlocked Attack
function DrawAttackUnlock1() {
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`New Attack Unlocked`, 100, 300);
  ctx.font = "30px Arial";
  ctx.fillText(`"Mario Jump"`, 100, 330);
  console.log(`Before`);
  UnlockedSound.play();
  console.log(`After`);
}
