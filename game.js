 //definicja canvasa
 const canvas = document.querySelector('canvas');
 const ctx = canvas.getContext('2d');

 //stol
 canvas.width = 1000;
 canvas.height = 500;

 const cw = canvas.width;
 const ch = canvas.height;

 //pilka
 const ballSize = 20; // ball size
 let ballX = cw / 2 - ballSize / 2; //polowa stolu - polowa pilki (srodek X)
 let ballY = ch / 2 - ballSize / 2; //polowa stolu - polowa pilki (srodek Y)

 //wielkosc paletek
 const paddelHeight = 100;
 const paddelWidth = 20;

 //paletki pozycja X (stala odleglosc)
 const playerX = 70;
 const aiX = 910;
 //paletki pozycja Y (rozna odleglosc)
 let playerY = 200;
 let aiY = 200;

 //linie
 const lineWidth = 6;
 const lineHeight = 16;

 //predkosc pilki
 // let ballSpeedX = 4;
 // let ballSpeedY = 4;

 //new game
 let gameOn = false;
 let newGame = true;
 let playerScore = 0;
 let aiScore = 0;

 const playerPKT = document.getElementById('playerPKT');
 const aiPKT = document.getElementById('aiPKT');
 const body = document.querySelector('body');

 // CSS background animation based on class add/remove
 function scoreAdd() {
     body.classList.add('scored');
 }

 function scoreRemove() {
     body.classList.remove('scored');
 }

 // who scored
 function reset(who) {
     if (who) {
         playerPKT.textContent = ++playerScore;

     } else {
         aiPKT.textContent = ++aiScore;
     }
     newGame = true;
     gameOn = false;
 }
 //ball reset after score or at start
 function ballReset() {
     ballX = playerX + paddelWidth;
     ballY = playerY + paddelHeight / 2 - ballSize / 2;
     ctx.fillStyle = '#AAA';
     ctx.fillRect(ballX, ballY, ballSize, ballSize);

     if (newGame == true) {
         canvas.addEventListener("click", play);
     } else {
         return false;
     }
 }

 //start playing
 function play() {
     scoreRemove();
     gameOn = true;
     newGame = false;
     if (ballY > 251) {
         ballSpeedX = 3;
         ballSpeedY = -3
     } else {
         ballSpeedX = 3;
         ballSpeedY = 3;
     }
     canvas.removeEventListener("click", play);
     if (playerScore >= 3 || aiScore >= 3) {
         playerScore = 0;
         aiScore = 0;
     }
 }


 //player drawing
 function player() {
     ctx.fillStyle = '#444';
     ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
 }

 //ai drawing
 function ai() {
     ctx.fillStyle = '#444';
     ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
 }

 //ball drawing
 function ball() {

     ctx.fillStyle = '#ccc';
     ctx.fillRect(ballX, ballY, ballSize, ballSize);

     ballX += ballSpeedX; // = ballX + ballSpeedX
     ballY += ballSpeedY; // = ballY + ballSpeedY

     if (ballY <= 0 || ballY + ballSize >= ch) {
         ballSpeedY = -ballSpeedY;
         speedUp()
     }

     if (ballX + ballSize >= cw) {
         reset(true);
         scoreAdd();
     }

     if (ballX <= 0) {
         reset(false);
         scoreAdd();
     }


     // ball bounding against paddels
     if (ballX <= playerX + paddelWidth &&
         ballX >= playerX &&
         ballY + ballSize >= playerY &&
         ballY <= playerY + paddelHeight) {
         ballSpeedX *= -1;
         ballX = playerX + paddelWidth;
         speedUp();
     }

     if (ballX + ballSize >= aiX &&
         ballX + ballSize <= aiX + paddelWidth &&
         ballY + ballSize >= aiY &&
         ballY <= aiY + paddelHeight) {
         ballSpeedX *= -1;
         ballX = aiX - ballSize;
         speedUp();
     }

 }
 //draw score
 function score() {
     ctx.fillStyle = 'grey';
     ctx.font = "200px Arial";
     ctx.fillText(playerScore, cw * .215, 300);
     ctx.fillText(aiScore, cw * .68, 300);
 }
 //draw table
 function table() {
     //table
     ctx.fillStyle = 'black';
     ctx.fillRect(0, 0, cw, ch);

     //lines
     for (let linePosition = 20; linePosition < ch; linePosition += 30) {
         ctx.fillStyle = "grey";
         ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
     }


 }

 // ball speed up with time
 function speedUp() {
     //            console.log(ballSpeedX);
     //predkosc X (max speed 16)
     if (ballSpeedX > 0 && ballSpeedX < 16) {
         ballSpeedX += .4;
     } else if (ballSpeedX < 0 && ballSpeedX > -16) {
         ballSpeedX -= .4;

     }
     //predkosc Y (max speed 16)
     if (ballSpeedY > 0 && ballSpeedY < 10) {
         ballSpeedY += .3;
     } else if (ballSpeedY < 0 && ballSpeedY > -10) {
         ballSpeedY -= .3;

     }

 }

 // AI (Artificial Intelligence) play
 function aiPosition() {

     const middlePaddel = aiY + paddelHeight / 2;
     const middleBall = ballY + ballSize / 2;

     if (ballX > 500) {

         if (middlePaddel - middleBall > 200) {
             aiY -= 20;
         } else if (middlePaddel - middleBall > 50) {
             aiY -= 10;
         } else if (middlePaddel - middleBall < -200) {
             aiY += 20;
         } else if (middlePaddel - middleBall < -50) {
             aiY += 10;
         }

     } else if (ballX <= 500 && ballX > 150) {

         if (middlePaddel - middleBall > 100) {
             aiY -= 3;
         } else if (middlePaddel - middleBall < -100) {
             aiY += 3;
         }

     }
 }

 //press start text
 function pressStart() {
     if (newGame == true) {
         ctx.fillStyle = 'grey';
         ctx.font = "30px arial";
         ctx.fillText("LEFT CLICK   TO START", cw * .316, 50);
     }
 }

 //game result text if score = (?)
 function result() {
     if (playerScore == 3) {
         ctx.fillStyle = 'grey';
         ctx.font = "100px Arial";
         ctx.fillText("YOU", cw * .23, 440);
         ctx.fillText("WON", cw * .55, 440);
         newGame = true;

     }
     if (aiScore == 3) {
         ctx.fillStyle = 'grey';
         ctx.font = "100px Arial";
         ctx.fillText("YOU", cw * .23, 440);
         ctx.fillText("LOST", cw * .55, 440);
         newGame = true;

     }
 }


 //canvas top left corner position
 topCanvas = canvas.offsetTop;
 // console.log(topCanvas);

 //player moving paddel
 function playerPosition(e) {
     //            console.log("Pozycja Myszy na canvasie to " + (e.clientY - topCanvas));
     playerY = e.clientY - topCanvas - paddelHeight / 2;

     //paddel stopped at bottom border
     if (playerY >= ch - paddelHeight) {
         playerY = ch - paddelHeight;
     }

     //paddel stopped at top border
     if (playerY <= 0) {
         playerY = 0;
     }

     // aiy paddel control for testing
     //            aiY = playerY;

 }

 canvas.addEventListener("mousemove", playerPosition)

 function game() {
     table();
     score();
     if (!newGame) {
         ball();
     } else {
         ballReset();
     }
     pressStart();
     player();
     ai();
     aiPosition();
     result()

 }

 setInterval(game, 1000 / 60) //1000/60 = 60klatek na sek (1000ms)
