var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var d = document;
var gameIsRunning = true;
var direction = 'y-';
var oldDirection = 'y-';
var tank_timer;
var TANK_SPEED = 300;
var BULLET_SPEED = 300;
var directionBullet;
var oldDirectionBullet;


d.querySelector('.start_game').addEventListener('click', startGame);
addEventListener('keydown', changeDirection);

/**
 * Генерация игрового поля*/

var table = d.querySelector('.game_field');
for (var i = 0; i <= FIELD_SIZE_X; i++) {
    var row = d.createElement('tr');
    row.className = 'row-' + i;
    for (var j = 0; j <= FIELD_SIZE_Y; j++) {
        var sell = d.createElement('td');
        // sell.className = ('data-x = ' + i);
        // sell.className = ('data-y = ' + j);
        sell.className = ('sell-' + j + '-' + i);
        row.appendChild(sell);
    }
    table.appendChild(row);
}

/**
 *Расположение танка */

function tankReLocation() {
    var start_coords_x = FIELD_SIZE_X / 2;
    var start_coords_y = FIELD_SIZE_Y / 2;
    var coordsTank = d.querySelector('.sell-' + start_coords_x + '-' + start_coords_y);
    console.log(start_coords_x);
    console.log(start_coords_y);
    coordsTank.classList.add('tank');
    coordsTank.setAttribute('data-x', start_coords_x.toString());
    coordsTank.setAttribute('data-y', start_coords_y.toString());
}


/**
 *Старт игры */

function startGame() {
    // clearInterval(tank_timer);
    tankReLocation();
    // setInterval(move, TANK_SPEED);

    // move();

}


/**
 *Движение танка */
function move() {
    var tank = d.querySelector('.tank');

    var coords_x = parseInt(tank.getAttribute('data-x'));
    var coords_y = parseInt(tank.getAttribute('data-y'));
    console.log(coords_y);

    var new_unit;

    switch (direction) {
        case'x-':
            new_unit = d.querySelector('.sell-' + (coords_x -= 1) + '-' + (coords_y));
            break;
        case'x+':
            new_unit = d.querySelector('.sell-' + (coords_x += 1) + '-' + (coords_y));
            break;
        case'y-':
            new_unit = d.querySelector('.sell-' + (coords_x) + '-' + (coords_y -= 1));
            break;
        case'y+':
            new_unit = d.querySelector('.sell-' + (coords_x) + '-' + (coords_y += 1));
            break;
    }


    new_unit.classList.add('tank');
    tank.classList.remove('tank');

    tank.removeAttribute('data-x');
    tank.removeAttribute('data-y');

    new_unit.setAttribute('data-x', coords_x.toString());
    new_unit.setAttribute('data-y', coords_y.toString());
    oldDirection = direction;
}

function bulletRelocation() {

    var tank = d.querySelector('.tank');

    var bullet_coords_x = parseInt(tank.getAttribute('data-x'));
    var bullet_coords_y = parseInt(tank.getAttribute('data-y'));

    var start_bullet;

    switch (direction) {
        case'x-':
            start_bullet = d.querySelector('.sell-' + (bullet_coords_x -= 1) + '-' + (bullet_coords_y));
            break;
        case'x+':
            start_bullet = d.querySelector('.sell-' + (bullet_coords_x += 1) + '-' + (bullet_coords_y));
            break;
        case'y-':
            start_bullet = d.querySelector('.sell-' + (bullet_coords_x) + '-' + (bullet_coords_y -= 1));
            break;
        case'y+':
            start_bullet = d.querySelector('.sell-' + (bullet_coords_x) + '-' + (bullet_coords_y += 1));
            break;
    }


    start_bullet.classList.add('bullet');
    start_bullet.setAttribute('data-x', bullet_coords_x.toString());
    start_bullet.setAttribute('data-y', bullet_coords_y.toString());
}

function shot() {
    var tank = d.querySelector('.tank');

    var bullet_coords_x = parseInt(tank.getAttribute('data-x'));
    var bullet_coords_y = parseInt(tank.getAttribute('data-y'));

    var new_unit_bullet;

    directionBullet = direction;

    switch (direction) {
        case'x-':
            new_unit_bullet = d.querySelector('.sell-' + (bullet_coords_x -= 1) + '-' + (bullet_coords_y));
            break;
        case'x+':
            new_unit_bullet = d.querySelector('.sell-' + (bullet_coords_x += 1) + '-' + (bullet_coords_y));
            break;
        case'y-':
            new_unit_bullet = d.querySelector('.sell-' + (bullet_coords_x) + '-' + (bullet_coords_y -= 1));
            break;
        case'y+':
            new_unit_bullet = d.querySelector('.sell-' + (bullet_coords_x) + '-' + (bullet_coords_y += 1));
            break;
    }

    new_unit_bullet.classList.add('bullet');
    bullet.classList.remove('bullet');

    bullet.removeAttribute('data-x');
    bullet.removeAttribute('data-y');

    new_unit_bullet.setAttribute('data-x', bullet_coords_x.toString());
    new_unit_bullet.setAttribute('data-y', bullet_coords_y.toString());
    oldDirectionBullet = directionBullet;
}


function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            direction = 'x-';
            move();
            break;
        case 38: // Клавиша вверх
            direction = 'y-';
            move();
            break;
        case 39: // Клавиша вправо
            direction = 'x+';
            move();
            break;
        case 40: // Клавиша вниз
            direction = 'y+';
            move();
            break;
        case 32: // Выстрел
            bulletRelocation();
            setInterval(shot, BULLET_SPEED);
            break;
    }
}