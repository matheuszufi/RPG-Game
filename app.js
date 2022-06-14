const xp = document.getElementById('status-xp');
const level = document.getElementById('status-level');


const enemyOutput = document.getElementById('enemy');
const enemyLife = document.getElementById('enemy-life');
const enemyBody = document.getElementById('enemy-body');

const levelBtn = document.getElementById('progress-btn');
const levelBtn2 = document.getElementById('progress-btn-2');
const xpRange = document.getElementById('xp-range');
const progressOutput = document.getElementById('progress-output');

const myCoins = document.getElementById('coins-output');
const lootCoin = document.getElementById('loot-coin');
const enemyLoot = document.getElementById('enemy-loot');

const shopBtn = document.getElementById('status-shop');


const canvas = document.getElementById('canvas');

const shopping = document.getElementById('shopping');
const shopCloseBtn = document.getElementById('shop-close-btn');

const fightBtn = document.getElementById('status-fight');


const shopMoney = document.getElementById('upgrade-money');
const shopPriceMoney = document.getElementById('money-price-output');

const mana = document.getElementById('mana');
const manaPercent = document.getElementById('mana-percent-output');

const life = document.getElementById('life');
const lifePercent = document.getElementById('life-percent-output');


const tolvlup = document.getElementById('status-tolvlup');

const info = document.getElementById('info');
const howToPlay = document.getElementById('howtoplay');
const howtoCloseBtn = document.getElementById('howtoplay-close-btn');




let player = {
    level: 1,
    xp: 0,  
    atk: 10,
    coin: 0,
    mana: 180,
    maxMana: 180,
    life: 240,
    maxLife: 240,
}


let enemy = {
    hp: 100,
    xp: 50,  
    coin: '' 
}

let itemsShop = {
    money: 50,
}

let randNum;
randomCoin(); 

let toLevelUp = 100 * player.level;
tolvlup.innerHTML = toLevelUp;


level.innerHTML = player.level;
xp.innerHTML = player.xp; 
shopPriceMoney.innerHTML = `${itemsShop.money}`;
lifePercent.innerHTML = `${player.maxLife}`
life.style.width = ` ${(player.life / player.maxLife ) * 100}%`;

manaPercent.innerHTML = `${player.mana}`
mana.style.width = ` ${(player.maxMana / player.mana) * 100}%`;


loadEventListeners();


function loadEventListeners() {
    enemyBody.addEventListener('click', atkEnemy);
    levelBtn2.addEventListener('click', levelUp);
    enemyLoot.addEventListener('click', lootingCoin);
    shopBtn.addEventListener('click', openShop);
    shopCloseBtn.addEventListener('click', closeShopping);
    fightBtn.addEventListener('click', openCanvas);

    enemyBody.addEventListener('mousemove', slashEnemy);
    shopMoney.addEventListener('click', upgradeMoney);

    info.addEventListener('click', openInfo);

    howtoCloseBtn.addEventListener('click', closeHowTo);
    //setInterval(() => console.log('test'), 1000)

}


const power1 = document.getElementById('power-1'); 
const power2 = document.getElementById('power-2');
const power3 = document.getElementById('power-3');
const power4 = document.getElementById('power-4');


document.addEventListener('keydown', (event) => {
   btnA = "1";
   btnB = "2";
   btnC = "3";
   btnD = "4";

  if(event.key === btnA) {
    power1.style.background = "blue";
    power2.style.background = "grey";
    power3.style.background = "grey";
    power4.style.background = "grey";
  } else if (event.key === btnB) {
    power1.style.background = "grey";
    power2.style.background = "blue";
    power3.style.background = "grey";
    power4.style.background = "grey";
  } else if (event.key === btnC) {
    power1.style.background = "grey";
    power2.style.background = "grey";
    power3.style.background = "blue";
    power4.style.background = "grey";
  } else if (event.key === btnD) {
    power1.style.background = "grey";
    power2.style.background = "grey";
    power3.style.background = "grey";
    power4.style.background = "blue";
  }

  if (power1.style.background === "blue") {
    player.atk += 40;
    player.mana -= 10;
  }
  });

function slashEnemy() {
   
    enemy.hp -= 0.1;
    enemyLife.style.width = `${enemy.hp }%`;
    
    manaPercent.innerHTML = player.mana;
    mana.style.width = `${(player.mana / player.maxMana ) * 100}%`;
    if(enemy.hp <= 0) {
        killEnemy();

    }
}

function atkEnemy() {
    if (player.mana >= 20) {
    enemy.hp -= player.atk;
    player.mana -= 20;
    manaPercent.innerHTML = player.mana;
    mana.style.width = ` ${(player.mana / player.maxMana ) * 100}%`;
    enemyLife.style.width = `${enemy.hp}%`;
 
    } 
    if(enemy.hp <= 0) {
        killEnemy();
    

    }

}



var porcentagem = (player.xp / toLevelUp).toFixed();
progressOutput.innerHTML = `${porcentagem}%`;


function killEnemy() {
        enemyLoot.style.display = "flex";
        randomCoin(); 

        changePosition();
        enemy.hp = 100;
        enemyLife.style.width = `${enemy.hp}%`; 
        player.xp += enemy.xp;
      
      
        progressAnimation();
        xp.innerHTML = player.xp;
        const porcentagem = ((player.xp / toLevelUp) * 100).toFixed();
        progressOutput.innerHTML = `${porcentagem}%`;
    if (player.xp >= toLevelUp) {
        upLevel();
        levelBtn.style.opacity = '1';
   
    }
}


function upLevel() {
    levelBtn2.style.display = "flex";
    enemyOutput.style.display = "none";
    player.maxMana += 20;
    player.maxLife += 10;
  
}


function levelUp () {
   
    levelBtn.style.opacity = '0.4';
    player.xp = 0;
    levelBtn2.style.display = "none";
    enemyOutput.style.display = "flex";
    player.level++;
    toLevelUp = 100 * player.level;
    tolvlup.innerHTML = toLevelUp;
    level.innerHTML = player.level;
    xp.innerHTML = player.xp;

    progressAnimation();   
    progressOutput.innerHTML = `${porcentagem}%`;
}


function changePosition() {
    max = 80;
    min = 20;
    const posY = Math.floor(Math.random() * (max - min)+ 10);
    const posX = Math.floor(Math.random() * (max - min)+ 10);
    enemyOutput.style.transform = `translate(${posX}vw, ${posY}vh`;
}


function progressAnimation () {
    xpRange.style.width = `${(player.xp / toLevelUp) * 100}%`;
   
}

const calcRand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}


function randomCoin () {
    min = 0;
    max = 20;
    randNum = Math.floor(Math.random() * (max - min) + min);
    enemy.coin = randNum;
    lootCoin.innerHTML = randNum;
    if (itemsShop.money > 50) {
        enemy.coin += (itemsShop.money / 25);
        lootCoin.innerHTML = enemy.coin;
    }   
}

function lootingCoin() {
    enemyLoot.style.display = "none";
    player.coin = player.coin + enemy.coin;
    myCoins.innerHTML = player.coin
}

function openShop () {
    canvas.style.display = "none";
    shopping.style.display = "flex";
}

function closeShopping() {
    canvas.style.display = "block";
    shopping.style.display = "none";
}

function openCanvas() {
    canvas.style.display = "block";
    shopping.style.display = "none";
    howToPlay.style.display = "none";
}


function upgradeMoney () {
    if (player.coin >= itemsShop.money) {
    
   

    player.coin -= itemsShop.money;
    myCoins.innerHTML = player.coin;
   

    let retornoRandNum = calcRand(0, 20)
    enemy.coin = retornoRandNum + 5;
    
    
    itemsShop.money += 50;
    shopPriceMoney.innerHTML = `${itemsShop.money}`;
    } else {
       
         alert('You do not have money');      
     
    }

    
}

function restoreMana() {
    
if (player.mana < player.maxMana) {
    player.mana += 2;
    manaPercent.innerHTML = `${player.mana}`
    mana.style.width = `${(player.mana / player.maxMana) * 100}%`;
   
    }
}

setInterval(restoreMana, 1000);

function restoreLife() {
    
    if (player.life < player.maxLife) {
        player.life += 2;
        lifePercent.innerHTML = `${player.life}`
        life.style.width = `${(player.life / player.maxLife) * 100}%`;
       
   
    }
    }
    
    setInterval(restoreLife, 4000);



function openInfo() {
    canvas.style.display = "none";
    howToPlay.style.display = "flex";
}


function closeHowTo() {
    canvas.style.display = "block";
    howToPlay.style.display = "none";
}