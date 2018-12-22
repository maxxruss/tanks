var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var gameIsRunning = true;
var direction = 'y-';
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


function Tank(type_unit) {
    this.type_unit = type_unit;
    this.coords_x = FIELD_SIZE_X / 2;
    this.coords_y = FIELD_SIZE_Y / 2;
    // this.direction = 'y-';
    // this.Olddirection = 'y-';
    this.bullet_id = 1;
}

/**Расположение танка*/

Tank.prototype.location = function () {

    var startPosition = $('.cell-' + this.coords_x + '-' + this.coords_y);

    startPosition.removeClass('field_cell');

    startPosition.addClass(this.type_unit)
        .attr('tank-x', this.coords_x.toString())
        .attr('tank-y', this.coords_y.toString())
        .attr('bullet-x', this.coords_x.toString())
        .attr('bullet-y', this.coords_y.toString())
        .attr('bullet-id', this.bullet_id);

    this.nextItem();


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


/**Движение танка*/

Tank.prototype.move = function () {

    var tankItem = $('.' + this.type_unit);

    // this.coords_x = parseInt(tankItem.attr('data-x'));
    // this.coords_y = parseInt(tankItem.attr('data-y'));

    var coords_x = parseInt(tankItem.attr('tank-x'));
    var coords_y = parseInt(tankItem.attr('tank-y'));


    // switch (this.direction) {
    //     case'x-':
    //         coords_x -= 1;
    //         break;
    //     case'x+':
    //         coords_x += 1;
    //         break;
    //     case'y-':
    //         coords_y -= 1;
    //         break;
    //     case'y+':
    //         coords_y += 1;
    //         break;
    // }
    //
    // this.new_tankItem = $('.cell-' + coords_x + '-' + coords_y);

    this.nextItem();

    if (this.new_tankItem.hasClass('field_cell') === true) {
        tankItem.removeClass(this.type_unit)
            .removeAttr('tank-x')
            .removeAttr('tank-y')
            .removeAttr('bullet-x')
            .removeAttr('bullet-y')
            .removeAttr('bullet-id')
            .addClass('field_cell');

        this.new_tankItem.removeClass('field_cell')
            .addClass(this.type_unit)
            .attr('tank-x', this.coords_x.toString())
            .attr('tank-y', this.coords_y.toString())
            .attr('bullet-x', this.coords_x.toString())
            .attr('bullet-y', this.coords_y.toString())
            .attr('bullet-id', this.bullet_id)
    }


    // this.oldDirection = this.direction;
};

/**Выстрел танка*/

function Bullet(id, direction) {
    this.id = id;
    this.direction = direction;
    // console.log(this.id, this.direction)
}

Bullet.prototype.shot = function () {
    // console.log(this.id, this.direction);

    var bulletItem = $('[bullet-id = "' + this.id + '"]');

    if (bulletItem.length > 1) {
        bulletItem = bulletItem.not('.tank')
    }

    // console.log(this.id);

    var bullet_coords_x = parseInt(bulletItem.attr('bullet-x'));
    var bullet_coords_y = parseInt(bulletItem.attr('bullet-y'));


    // this.direction = tank.direction;

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
        // console.log(bullet_id, this.id);

        newBulletItem.addClass('bullet')
            .removeClass('field_cell')
            .attr('bullet-x', bullet_coords_x.toString())
            .attr('bullet-y', bullet_coords_y.toString())
            .attr('bullet-id', this.id);
        // oldDirectionBullet = directionBullet;
    }

};






