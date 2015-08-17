var level1State = {
	create: function(){
		this.bg = game.add.sprite(0,0,"sky");

		//this.balloon = game.add.sprite(0,0,"balloon");

		//this.balloon = game.add.sprite(0,40,"balloonbad");
		
		this.balloonGroup = game.add.group();
		
		this.createBalloons();
	},

	update: function(){
		this.balloonGroup.y-=1;
	},

	createBalloons: function(){		
		for(var i=0; i<5; i++){
			//this.balloonGroup.create(game.world.randomX / 2, game.world.randomY / 2, "balloon");

			this.balloonGroup.create(game.world.randomX, game.rnd.between(490, 520), "balloon");
			//this.balloonGroup.create(game.world.randomX / 3, game.world.randomY / 3, "balloonbad");
		}
	},

	moveBalloons: function(){

	}
}