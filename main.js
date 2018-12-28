/**Старт игры*/
var tank = new Tank('tank', 'tank', 1);
var enemy = new Enemy();
var animation = new Animation();
var let_model = new Let();
// var direction = 'y-';
var bullet_id = 1;
var oldDirection = 'y-';
var tank_timer;
var TANK_SPEED = 300;
var BULLET_SPEED = 50;
var ENEMY_SPEED = 800;
var directionBullet;
var oldDirectionBullet;
var enemyCount = 1;


/**
 * Генерация игрового поля*/

var table = $('.game_field');
for (var i = 0; i <= FIELD_SIZE_X; i++) {
    var row = $('<tr />', {
        class: 'row-' + i
    });
    for (var j = 0; j <= FIELD_SIZE_Y; j++) {
        var sell = $('<td />', {
            class: 'cell-' + j + '-' + i + ' field_cell'
        });
        row.append(sell);
    }
    table.append(row);
}

var armor_arr = [
    {"x": 5, "y": 15},
    {"x": 6, "y": 15},
    {"x": 5, "y": 16}
];
let_model.armor(armor_arr);


var water_arr = [
    {"x": 7, "y": 15},
    {"x": 8, "y": 15},
    {"x": 7, "y": 14}
];
let_model.water(water_arr);


var brick_arr = [
    {"x": 5, "y": 18},
    {"x": 6, "y": 18},
    {"x": 5, "y": 19}
];

let_model.brick(brick_arr);


var forest_arr = [
    {"x": 15, "y": 15},
    {"x": 16, "y": 15},
    {"x": 15, "y": 16}
];

let_model.forest(forest_arr);



// $('.start_game').on('click', startGame);
$(document).keydown(changeDirection);

function startGame() {
    animation.appearance($('.cell-' + tank.coords_x + '-' + tank.coords_y));
    tank.location();
    //
    for (var i = 1; i <= enemyCount; i++) {
        enemy.create('enemy', 'enemy_' + i, i * 100);
    }
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

