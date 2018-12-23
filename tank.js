var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var gameIsRunning = true;
// var direction = 'y-';
var bullet_id = 1;
var oldDirection = 'y-';
var tank_timer;
var TANK_SPEED = 300;
var BULLET_SPEED = 50;
var ENEMY_SPEED = 1000;
var directionBullet;
var oldDirectionBullet;


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


function Tank(type_unit, bullet_id) {
    this.type_unit = type_unit;
    this.coords_x = FIELD_SIZE_X / 2;
    this.coords_y = FIELD_SIZE_Y / 2;
    this.direction = 'y-';
    // this.Olddirection = 'y-';
    this.bullet_id = bullet_id;
}

/**Расположение танка*/

Tank.prototype.location = function () {

    var startPosition = $('.cell-' + this.coords_x + '-' + this.coords_y);

    startPosition.removeClass('field_cell');

    startPosition.addClass(this.type_unit)
        .attr('tank-x', this.coords_x.toString())
        .attr('tank-y', this.coords_y.toString())
        .attr('bullet-x', this.coords_x.toString())
        .attr('bullet-y', this.coords_y.toString());
        // .attr('bullet-id', this.bullet_id);

    this.checkItem();

};

Tank.prototype.nextItem = function () {

    switch (this.direction) {
        case'x-':
            this.coords_x -= 1;
            break;
        case'x+':
            this.coords_x += 1;
            break;
        case'y-':
            this.coords_y -= 1;
            break;
        case'y+':
            this.coords_y += 1;
            break;
    }

    this.new_tankItem = $('.cell-' + this.coords_x + '-' + this.coords_y);

};

Tank.prototype.checkItem = function () {

    this.next_coords_x = this.coords_x;
    this.next_coords_y = this.coords_y;

    switch (this.direction) {
        case'x-':
            this.next_coords_x -= 1;
            break;
        case'x+':
            this.next_coords_x += 1;
            break;
        case'y-':
            this.next_coords_y -= 1;
            break;
        case'y+':
            this.next_coords_y += 1;
            break;
    }

    this.checkNextItem = $('.cell-' + this.next_coords_x + '-' + this.next_coords_y);

};


/**Движение танка*/

Tank.prototype.move = function () {

    var tankItem = $('.' + this.type_unit);

    this.coords_x = parseInt(tankItem.attr('tank-x'));
    this.coords_y = parseInt(tankItem.attr('tank-y'));

    this.nextItem();


    if (this.new_tankItem.hasClass('field_cell') === true) {
        tankItem.removeClass(this.type_unit)
            .removeAttr('tank-x')
            .removeAttr('tank-y')
            .removeAttr('bullet-x')
            .removeAttr('bullet-y')
            // .removeAttr('bullet-id')
            .addClass('field_cell');

        this.new_tankItem.removeClass('field_cell')
            .addClass(this.type_unit)
            .attr('tank-x', this.coords_x.toString())
            .attr('tank-y', this.coords_y.toString())
            .attr('bullet-x', this.coords_x.toString())
            .attr('bullet-y', this.coords_y.toString())
            // .attr('bullet-id', this.bullet_id)
    }

    this.checkItem();
};

/**Выстрел танка*/

function Bullet(id, direction, type_unit) {
    this.id = id;
    this.direction = direction;
    this.type_unit = type_unit;
    this.flight = true;
}

Bullet.prototype.shot = function () {

    var tankItem = $('.' + this.type_unit);

    this.bullet_coords_x = parseInt(tankItem.attr('tank-x'));
    this.bullet_coords_y = parseInt(tankItem.attr('tank-y'));

    switch (this.direction) {
        case'x-':
            this.bullet_coords_x -= 1;
            break;
        case'x+':
            this.bullet_coords_x += 1;
            break;
        case'y-':
            this.bullet_coords_y -= 1;
            break;
        case'y+':
            this.bullet_coords_y += 1;
            break;
    }

    var newBulletItem = $('.cell-' + this.bullet_coords_x + '-' + this.bullet_coords_y);

    newBulletItem.removeClass('field_cell')
        .addClass('bullet')
        .attr('bullet-x', this.bullet_coords_x.toString())
        .attr('bullet-y', this.bullet_coords_y.toString())
        .attr('bullet-id', this.id);

};

Bullet.prototype.flightBullet = function () {

    var bulletItem = $('[bullet-id = "' + this.id + '"]');

    // if (bulletItem.length > 1) {
    //     bulletItem = bulletItem.not('.tank')
    // }

    var bullet_coords_x = parseInt(bulletItem.attr('bullet-x'));
    var bullet_coords_y = parseInt(bulletItem.attr('bullet-y'));

    switch (this.direction) {
        case'x-':
            bullet_coords_x -= 1;
            break;
        case'x+':
            bullet_coords_x += 1;
            break;
        case'y-':
            bullet_coords_y -= 1;
            break;
        case'y+':
            bullet_coords_y += 1;
            break;
    }

    var newBulletItem = $('.cell-' + (bullet_coords_x) + '-' + (bullet_coords_y));

    bulletItem.not('.tank')
        .removeAttr('bullet-x')
        .removeAttr('bullet-y')
        .removeAttr('bullet-id')
        .removeClass('bullet')
        .addClass('field_cell');


    if (newBulletItem.hasClass('field_cell')) {

        newBulletItem.addClass('bullet')
            .removeClass('field_cell')
            .attr('bullet-x', bullet_coords_x.toString())
            .attr('bullet-y', bullet_coords_y.toString())
            .attr('bullet-id', this.id);
    } else {
        this.flight = false;
    }
}






