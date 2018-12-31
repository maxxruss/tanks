/**Выстрел танка*/

function Bullet(id, direction, type, type_unit) {
    this.id = id;
    this.direction = direction;
    this.type = type;
    this.type_unit = type_unit;
    this.flight = true;
    this.bulletImage = $('<div />', {
        class: 'bullet'
    });
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

    return $('.cell-' + this.coords_x + '-' + this.coords_y);

};

Bullet.prototype.action = function () {
    if (this.new_item.hasClass('field_cell')) {
        this.new_item.removeClass('field_cell')
            .addClass('bullet')
            .attr('bullet-x', this.coords_x.toString())
            .attr('bullet-y', this.coords_y.toString())
            .attr('bullet-id', this.id);
        this.changeImage();

    } else if (this.new_item.hasClass('enemy') && (this.type !== 'enemy')) {
        this.new_item.find('.enemy')
            .remove();

        this.new_item.removeClass()
            .addClass('cell-' + this.coords_x + '-' + this.coords_y)
            .addClass('field_cell')
            .removeAttr('bullet-x')
            .removeAttr('bullet-y')
            .removeAttr('tank-x')
            .removeAttr('tank-y');

        animation.explosion(this.new_item);


        create_enemy('enemy', 'enemy_' + ++enemyCount, enemyCount * 100);

    } else if (this.new_item.hasClass('tank')) {

        this.new_item.find('.tank')
            .remove();

        this.new_item.removeClass()
            .addClass('cell-' + this.coords_x + '-' + this.coords_y)
            .addClass('field_cell')
            .removeAttr('bullet-x')
            .removeAttr('bullet-y')
            .removeAttr('tank-x')
            .removeAttr('tank-y');

        animation.explosion(this.new_item);

        create_tank('tank', 'tank_' + tankCount, 100 * tankCount++)


    } else if (this.new_item.hasClass('general')) {
        /**Уничтожение главного штаба*/

        var eagle = $('.cell-10-21');

        eagle.find('.eagle')
            .removeClass('eagle')
            .addClass('eagle_dead');

        cell_general_1.removeClass('general')
            .addClass('field_cell');

        cell_general_2.removeClass('general')
            .addClass('field_cell');

        cell_general_3.removeClass('general')
            .addClass('field_cell');

        cell_general_4.removeClass('general')
            .addClass('field_cell');

        animation.explosion(this.new_item);

        game_over();


    } else if (this.new_item.hasClass('armor')) {
        animation.hitWall(this.new_item, this.direction);
        this.flight = false;
    } else if (this.new_item.hasClass('brick')) {
        animation.hitWall(this.new_item, this.direction);
        this.flight = false;

        this.new_item.removeClass('brick')
            .addClass('field_cell')

    } else if (this.new_item.hasClass('outer_perimeter')) {
        animation.hitWall(this.new_item, this.direction);
        this.flight = false;
    } else if (this.new_item.hasClass('water')) {
        this.new_item.addClass('bullet')
            .attr('bullet-x', this.coords_x.toString())
            .attr('bullet-y', this.coords_y.toString())
            .attr('bullet-id', this.id);
        this.changeImage();

    } else {
        animation.hitWall(this.new_item, this.direction);
        this.flight = false;
    }
}


Bullet.prototype.shot = function () {

    if (this.type_unit === 'tank') {
        var sound = new Audio();
        sound.src = 'music/shot.mp3';
        sound.play();
    }

    var tankItem = $('.' + this.type_unit);

    this.coords_x = parseInt(tankItem.attr('tank-x'));
    this.coords_y = parseInt(tankItem.attr('tank-y'));

    this.new_item = this.getNextItem();
    this.action();

};

Bullet.prototype.flightBullet = function () {

    var bulletItem = $('[bullet-id = "' + this.id + '"]');


    this.coords_x = parseInt(bulletItem.attr('bullet-x'));
    this.coords_y = parseInt(bulletItem.attr('bullet-y'));


    bulletItem.not('.tank')
        .removeAttr('bullet-x')
        .removeAttr('bullet-y')
        .removeAttr('bullet-id')
        .removeClass('bullet')
        .addClass(bulletItem.hasClass('water') ? '' : 'field_cell')
        .find('.bullet')
        .remove();


    this.new_item = this.getNextItem();

    this.action();
};








