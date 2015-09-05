var level1State = {
	create: function(){
		this.bg = game.add.sprite(0,0,"sky");

		//this.balloon = game.add.sprite(0,0,"balloon");

		//this.balloon = game.add.sprite(0,40,"balloonbad");

		this.minSpeed = -1;
        this.maxSpeed = 2;
        this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
        this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
		
		this.balloonGroup = game.add.physicsGroup();

		
		
		this.createBalloons(10);
	},

	update: function(){
		//this.balloonGroup.y-=1
		this.balloonGroup.forEach(this.moveBalloons, this);
		//this.moveBalloons();
	},

	createBalloons: function(numBalloons){

		var y = 80;

		for(var i=0; i< numBalloons; i++){
			//this.balloonGroup.create(game.world.randomX / 2, game.world.randomY / 2, "balloon");

			var balloon = this.balloonGroup.create(game.world.randomX, 480, "balloon");
			balloon.body.velocity.y = - game.rnd.between(100, 300);
			y -= 48;
			//this.balloonGroup.create(game.world.randomX / 3, game.world.randomY / 3, "balloonbad");
		}


	
	},

	moveBalloons: function(balloon){
		var that = this;
		balloon.inputEnabled = true;

		balloon.events.onInputDown.add(that.killBalloon,{sprite: balloon},that);

		console.log(balloon.y);

		if(balloon.y < 0)
			balloon.y = 480;
		/*this.balloonGroup.forEach(function(sprite){

			var random = Math.random() * game.rnd.between(0, 10);

			console.log("RANDOM", random)

			sprite.inputEnabled = true;

			sprite.events.onInputDown.add(that.killBalloon,{sprite: sprite},that);
			console.log(that.vx);
			sprite.y-= random;
			//sprite.y-= that.vy;
			
			/*var random = Math.random()*1;
			if(random % 2 == 0) 
				sprite.x-= that.vx;
			else
				sprite.x+= that.vx;
		})*/
	},

	killBalloon: function(){
		this.sprite.kill();
	}
}