/**Старт игры*/
var tank = new Tank('tank', 1);

var enemy = new Enemy('enemy', 500);

var enemy1 = new Enemy('enemy1', 1000);
var bulletEnemy1 = new Bullet(enemy1.bullet_id, enemy1.direction);


startGame();

// $('.start_game').on('click', startGame);
$(document).keydown(changeDirection);

function startGame() {
    // clearInterval(tank_timer);
    // setInterval(move, TANK_SPEED);
    // var bulletItem = $('[bullet-id = "' + bullet_id + '"]');
    // console.log(bulletItem);
    tank.location();
    enemy.location();
    // enemy1.location();
    setInterval(function () {
        enemy.enemyMove();
        // enemy1.enemyMove();
    }, ENEMY_SPEED);


    setInterval(function () {
        var bulletEnemy = new Bullet(enemy.bullet_id, enemy.direction, 'enemy');
        bulletEnemy.shot();
        setInterval(function () {
            while (bulletEnemy.flight === true) {
                bulletEnemy.flightBullet();
            }
        }, 2000)
    }, BULLET_SPEED);
    tank.bullet_id++;

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


