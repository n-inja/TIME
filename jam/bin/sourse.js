function newImage(key, src) {
    var nImg = new Image();
    nImg.src = "bin/img/" + src;
    img[key] = nImg;
}

newImage("CHARACTER", "chara.png");
newImage("MAPCIP", "mapcip.png");
newImage("EFFECT", "effects.png");
newImage("ENEMY", "enemy.png");
