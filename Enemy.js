function Enemy(type, type_unit, bullet_id) {
    Tank.apply(this, [type, type_unit, bullet_id]);
    this.coords_x = Math.floor(Math.random() * FIELD_SIZE_X);
    this.coords_y = Math.floor(Math.random() * FIELD_SIZE_Y / 2);
}


Enemy.prototype = Object.create(Tank.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.enemyMove = function () {

    /**Проверка следующей по движению клетки*/
    if (this.checkNextItem.hasClass('field_cell')) {
        this.move();
    } else {

        /**Если впереди припятствие - выбираем другое направление движения танка*/
        var arrDir = ['y-', 'y+', 'x-', 'x+'];
        var randIndex = Math.floor(Math.random() * 4);
        this.direction = arrDir[randIndex];
        this.move();
    }
};

Enemy.prototype.create = function createEnemy(type, enemy_name, id_bullet) {
    /**Создаем модель вражеского танка*/
    var enemy = new Enemy(type, enemy_name, id_bullet);

    /**Запускаем анимацию перед появлением*/
    animation.appearance($('.cell-' + enemy.coords_x + '-' + enemy.coords_y));

    /**Танк появляется в начальной точке*/
    enemy.location();

    /**Танк начинает двигаться только после окончания анимации*/
    setTimeout(begin_move_shot, 2150);

    function begin_move_shot() {

        /**Задаем скорость передвижения танка*/
        setInterval(function () {
            enemy.enemyMove();
        }, ENEMY_SPEED);

        setInterval(function () {

            /**Создаем модель снаряда*/
            var bulletEnemy = new Bullet(enemy.bullet_id, enemy.direction, enemy_name);

            /**Выстрел танка - сняряд вылетел из танка*/
            bulletEnemy.shot();
            var timerEnemy = setInterval(function () {

                /**Задаем скорость движения снаряда*/
                bulletEnemy.flightBullet();
                if (!bulletEnemy.flight) {
                    clearInterval(timerEnemy);
                }
            }, BULLET_SPEED);
        }, 1500);
    }
};

