/**Выстрел танка*/

function Animation() {

}

Animation.prototype.appearance = function (unit) {

    function appear_start() {
        unit.addClass('appear_1');
    }

    function appear_1() {
        unit.removeClass('appear_2')
            .addClass('appear_1');
    }


    function appear_2() {
        unit.removeClass('appear_1')
            .removeClass('appear_3')
            .addClass('appear_2');
    }

    function appear_3() {
        unit.removeClass('appear_2')
            .removeClass('appear_4')
            .addClass('appear_3');
    }

    function appear_4() {
        unit.removeClass('appear_3')
            .addClass('appear_4');
    }

    function appear_finish() {
        unit.removeClass('appear_1');
    }

    appear_start();
    setTimeout(appear_2, 150);
    setTimeout(appear_3, 300);
    setTimeout(appear_4, 450);
    setTimeout(appear_3, 600);
    setTimeout(appear_2, 750);
    setTimeout(appear_1, 1000);
    setTimeout(appear_2, 1150);
    setTimeout(appear_3, 1300);
    setTimeout(appear_4, 1450);
    setTimeout(appear_3, 1600);
    setTimeout(appear_2, 1750);
    setTimeout(appear_1, 2000);
    setTimeout(appear_finish, 2150);

};

Animation.prototype.explosion = function (enemy_item) {
    // enemy_item.find('div')
    //     .remove()

    var exp_view = $('<div />', {
        class: 'exp_enemy_1'
    });

    function exp_1() {
        exp_view.removeClass('exp_enemy_1')
            .addClass('exp_enemy_2')
    }

    function exp_empty() {
        enemy_item.find('.exp_enemy_2')
            .remove()
    }


    setTimeout(exp_1, 150);
    setTimeout(exp_empty, 300);


    exp_view.appendTo(enemy_item);

    var sound = new Audio();
    sound.src = 'music/enemy_kill.mp3';
    sound.play()
};

Animation.prototype.hitWall = function (unit, direction) {
    // console.log('анимация hit')

    switch (direction) {
        case'x-':
            this.directionClass = 'right';
            break;
        case'x+':
            this.directionClass = 'left';
            break;
        case'y-':
            this.directionClass = 'down';
            break;
        case'y+':
            this.directionClass = 'up';
            break;
    }

    var class_1 = 'hit_wall_' + this.directionClass + '_1';
    var class_2 = 'hit_wall_' + this.directionClass + '_2';
    var class_3 = 'hit_wall_' + this.directionClass + '_3';

    var hit_wall_image = $('<div />', {
        class: 'hit_wall_' + this.directionClass + '_1'
    });

    function hit_wall_2() {
        hit_wall_image.removeClass(class_1)
            .addClass(class_2);
    }

    function hit_wall_3() {
        hit_wall_image.removeClass(class_2)
            .addClass(class_3);
    }

    function unit_empty() {
        unit.empty()
    }

    setTimeout(hit_wall_2, 150);
    setTimeout(hit_wall_3, 300);
    setTimeout(unit_empty, 450);

    hit_wall_image.appendTo(unit);

    // var sound = new Audio();
    // sound.src = 'music/hit_wall.mp3';
    // sound.play()

}






