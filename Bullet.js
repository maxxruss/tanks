/**Выстрел танка*/

function Bullet(id, direction, type_unit) {
    this.id = id;
    this.direction = direction;
    this.type_unit = type_unit;
    this.flight = true;
    this.bulletImage = $('<div />');
}

Bullet.prototype.changeImage = function () {

    switch (this.direction) {
        case'x-':
            this.bulletImage.addClass('bullet_left');
            break;
        case'x+':
            this.bulletImage.addClass('bullet_right');
            break;
        case'y-':
            this.bulletImage.addClass('bullet_up');
            break;
        case'y+':
            this.bulletImage.addClass('bullet_down');
            break;
    }

    this.bulletImage.appendTo(this.new_item);
};


Bullet.prototype.shot = function () {



    if (this.type_unit === 'tank') {
        var sound = new Audio();
        sound.src = 'music/shot.mp3';
        sound.play();
    }

    var tankItem = $('.' + this.type_unit);

    this.coords_x = parseInt(tankItem.attr('tank-x'));
    this.coords_y = parseInt(tankItem.attr('tank-y'));

    this.getNextItem();
};

Bullet.prototype.flightBullet = function () {

    var bulletItem = $('[bullet-id = "' + this.id + '"]');


    this.coords_x = parseInt(bulletItem.attr('bullet-x'));
    this.coords_y = parseInt(bulletItem.attr('bullet-y'));

    this.getNextItem();

    bulletItem.not('.tank')
        .removeAttr('bullet-x')
        .removeAttr('bullet-y')
        .removeAttr('bullet-id')
        .removeClass('bullet')
        .addClass('field_cell')
        .empty();

};

Bullet.prototype.getNextItem = function () {

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

    this.new_item = $('.cell-' + this.coords_x + '-' + this.coords_y);



    if (this.new_item.hasClass('field_cell')) {
        this.new_item.removeClass('field_cell')
            .addClass('bullet')
            .attr('bullet-x', this.coords_x.toString())
            .attr('bullet-y', this.coords_y.toString())
            .attr('bullet-id', this.id);
        this.changeImage();

    } else if (this.new_item.hasClass('enemy')) {
        console.log('ok')
        this.new_item.removeClass()
            .addClass('cell-' + this.coords_x + '-' + this.coords_y)
            .addClass('field_cell')
            .removeAttr('bullet-x')
            .removeAttr('bullet-y')
            .removeAttr('tank-x')
            .removeAttr('tank-y');


        enemy.create('enemy', 'enemy_' + ++enemyCount, enemyCount*100);
        enemy.location();

    } else {
        this.flight = false;
    }
};






