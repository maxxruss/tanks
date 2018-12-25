function Enemy(type_unit, bullet_id) {
    Tank.apply(this, [type_unit, bullet_id]);
    this.coords_x = Math.floor(Math.random() * FIELD_SIZE_X);
    this.coords_y = Math.floor(Math.random() * FIELD_SIZE_Y / 2);
}


Enemy.prototype = Object.create(Tank.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.enemyMove = function () {

    if (this.checkNextItem.hasClass('field_cell')) {
        this.move();
    } else {
        var arrDir = ['y-', 'y+', 'x-', 'x+'];
        var randIndex = Math.floor(Math.random() * 4);
        this.direction = arrDir[randIndex];
        this.move();
    }
};

Enemy.prototype.create = function createEnemy(enemy_name, id_bullet) {

    var enemy = new Enemy(enemy_name, id_bullet);
    enemy.location();

    setInterval(function () {
        enemy.enemyMove();
    }, ENEMY_SPEED);

    setInterval(function () {
        var bulletEnemy = new Bullet(enemy.bullet_id, enemy.direction, enemy_name);
        bulletEnemy.shot();
        var timerEnemy = setInterval(function () {
            bulletEnemy.flightBullet();
            if (!bulletEnemy.flight) {
                clearInterval(timerEnemy);
            }
        }, BULLET_SPEED);
    }, 1500);
};

