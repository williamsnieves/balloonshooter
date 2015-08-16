var loadState = {

	 preload: function(){
	 	game.load.image('sky', 'assets/bgmenu.png');
	 	game.load.image('balloon', 'assets/balloon.png');
	 	game.load.image('balloonbad', 'assets/balloonbad.png');
	 },

	 create: function(){
	 	if(!game.device.desktop){
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			document.body.style.backgroundColor = '#3498db';

			game.scale.minWidth = 250;
			game.scale.minHeight = 170;
			game.scale.maxWidth = 1000;
			game.scale.maxHeight = 680;

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;

			game.scale.setScreenSize(true)

		}

		game.state.start('level1');
	 }
}