/**Старт игры*/
var tank = new Tank('tank', 'tank', 1);
var enemy = new Enemy();


// $('.start_game').on('click', startGame);
$(document).keydown(changeDirection);

function startGame() {
    tank.location();

    for(var i = 1;i<enemyCount;i++) {
        enemy.create('enemy', 'enemy_' + i, i*100);
    }

    // enemy.create('enemy1', 1000);
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

startGame();

