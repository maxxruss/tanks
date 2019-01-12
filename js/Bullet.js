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

/**Смена картинки в соответствии с направлением*/

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

/**Получение координат следующей по направлению ячейки*/

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

/**Действие при полете снаряда*/

Bullet.prototype.action = function () {
    if (this.new_item.hasClass('field_cell')) {
        this.new_item.removeClass('field_cell')
            .addClass('bullet')
            .attr('bullet-x', this.coords_x.toString())
            .attr('bullet-y', this.coords_y.toString())
            .attr('bullet-id', this.id);
        this.changeImage();

    } else if (this.new_item.hasClass('enemy') && (this.type !== 'enemy')) {

        /**Если снаряд попадает в танк, то танк уничтожается*/

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

        /**Уменьшается количество оставшихся танков на правой панели игрового поля*/

        if (arrLastEnemy.length > 1) {
            arrLastEnemy.pop();
            render_last_enemy();
        } else if (arrLastEnemy.length === 1) {
            arrLastEnemy.pop();
            render_last_enemy();
            you_win();
        }

        /**Если игра не окончена - генерируется новый вражеский танк*/


        if (gameIsRunning === true) {
            create_enemy('enemy', 'enemy_' + ++enemyCount, enemyCount * 100);
        }

    } else if (this.new_item.hasClass('tank')) {

        /**Если снаряд попадает в танк, то танк уничтожается*/

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

        /**Генерируется новый танк игрока*/

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

        /**Игра заканчивается*/

        game_over();

    } else if (this.new_item.hasClass('armor')) {

        /**Если снаряд попадает в бетонное припятствие - дальше не летит, янимация попадания снаряда в стену*/

        animation.hitWall(this.new_item, this.direction);
        this.flight = false;
    } else if (this.new_item.hasClass('brick')) {

        /**Если снаряд попадает в кирпичное припятствие - дальше не летит, янимация попадания снаряда в стену, кирпич пропадает*/

        animation.hitWall(this.new_item, this.direction);
        this.flight = false;

        this.new_item.removeClass('brick')
            .addClass('field_cell')

    } else if (this.new_item.hasClass('outer_perimeter')) {

        /**Если снаряд попадает во внешний периметр - дальше не летит, янимация попадания снаряда в стену*/

        animation.hitWall(this.new_item, this.direction);
        this.flight = false;
    } else if (this.new_item.hasClass('water')) {

        /**Если снаряд попадает в воду - летит дальше над водой*/

        this.new_item.addClass('bullet')
            .attr('bullet-x', this.coords_x.toString())
            .attr('bullet-y', this.coords_y.toString())
            .attr('bullet-id', this.id);
        this.changeImage();

    } else {

        /**Если снаряд попадает в другое припятствие (лес) - летит дальше под ним*/

        animation.hitWall(this.new_item, this.direction);
        this.flight = false;
    }
}


Bullet.prototype.shot = function () {

    /**Выстрел из танка - снаряд вылетает из дула*/

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

    /**Полет снаряда*/

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








