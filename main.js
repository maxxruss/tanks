/**Старт игры*/
var tank = new Tank('tank', 1);
var enemy = new Enemy('enemy', 500);
var enemy1 = new Enemy('enemy1', 1000);


startGame();

// $('.start_game').on('click', startGame);
$(document).keydown(changeDirection);

function startGame() {
    tank.location();
    enemy.location();
    enemy1.location();
    setInterval(function () {
        enemy.enemyMove();
        enemy1.enemyMove();
    }, ENEMY_SPEED);

    setInterval(function () {
        var bulletEnemy = new Bullet(enemy.bullet_id, enemy.direction, 'enemy');
        bulletEnemy.shot();
        var timerEnemy = setInterval(function () {
            bulletEnemy.flightBullet();
            if (!bulletEnemy.flight) {
                clearInterval(timerEnemy);
            }
        }, BULLET_SPEED);
    }, 1500);

    setInterval(function () {
        var bulletEnemy1 = new Bullet(enemy1.bullet_id, enemy1.direction, 'enemy1');
        bulletEnemy1.shot();
        var timerEnemy1 = setInterval(function () {
            bulletEnemy1.flightBullet();
            if (!bulletEnemy1.flight) {
                clearInterval(timerEnemy1);
            }
        }, BULLET_SPEED);
    }, 1600);
}


function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            tank.direction = 'x-';
            tank.move();
            break;
        case 38: // Клавиша вверх
            tank.direction = 'y-';
            tank.move();
            break;
        case 39: // Клавиша вправо
            tank.direction = 'x+';
            tank.move();
            break;
        case 40: // Клавиша вниз
            tank.direction = 'y+';
            tank.move();
            break;
        case 32: // Выстрел
            var bullet = new Bullet(tank.bullet_id, tank.direction, 'tank');
            bullet.shot();
            setInterval(function () {
                bullet.flightBullet();
            }, BULLET_SPEED);
            tank.bullet_id++;
            break;
    }
}


