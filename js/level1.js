var level1State = {
	create: function(){
		this.bg = game.add.sprite(0,0,"sky");

		this.bgSound = game.add.audio('music');

		this.bgSound.play();
		this.bgSound.loop = true;	

		//this.balloon = game.add.sprite(0,0,"balloon");

		//this.balloon = game.add.sprite(0,40,"balloonbad");

		this.counterKillBalloons = 0;
		this.lifes = 3;

		this.minSpeed = -1;
        this.maxSpeed = 2;
        this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
        this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;

        this.messageGameOver = "";
		
		this.balloonGroup = game.add.physicsGroup();


		this.heartsGroup = game.add.group();

		
		this.win = false;
		this.scoreBoardGroup = game.add.group();


		for(var i=0; i < this.lifes; i++)
			this.hearts = this.heartsGroup.create(game.world.width / 2  + 220 + (i * 20), 30, "heart"); 

		
		
		game.time.events.loop(1000,this.createBalloons, this);

		this.scoreLabel = game.add.text(30,30,'Balloons Exploited: 0', {font : '18px Arial', fill: '#ffffff'});

		this.lifeLabel = game.add.text(game.world.width / 2  + 150,25,'Cat Life: ', {font : '18px Arial', fill: '#ffffff'});

		this.explodeSound = game.add.audio('explode');

	},

	update: function(){
		//this.balloonGroup.y-=1
		this.balloonGroup.forEach(this.moveBalloons, this);
		//this.moveBalloons();
	},

	/*createBalloons: function(numBalloons){

		var y = 80;

		for(var i=0; i< numBalloons; i++){
			//this.balloonGroup.create(game.world.randomX / 2, game.world.randomY / 2, "balloon");

			var balloon = this.balloonGroup.create(game.world.randomX, 480, "balloon");
			balloon.body.velocity.y = - game.rnd.between(100, 300);
			y -= 48;
			//this.balloonGroup.create(game.world.randomX / 3, game.world.randomY / 3, "balloonbad");
		}


	
	},*/

	createBalloons: function(){
		var balloonAmount = Math.floor(Math.random() * 20);
		var balloon;

		for(var i=0; i<balloonAmount; i++){
			if(i % 2 == 0)
				balloon = this.balloonGroup.create(game.world.randomX, 480, "balloonbad"); 

			balloon = this.balloonGroup.create(game.world.randomX, 480, "balloon");
		}

		//console.log(balloonAmount);
	},


	moveBalloons: function(balloon){
		
		//console.log(balloon);
		var that = this;
		balloon.inputEnabled = true;
		balloon.checkWorldBounds = true;
		balloon.outOfBoundsKill = true;
		var minSpeed = -(Math.floor(Math.random() * 3));
        var maxSpeed = Math.floor(Math.random() * 10);
        var vx = Math.random()*(maxSpeed - minSpeed+1)-minSpeed;
        var vy = Math.random()*(maxSpeed - minSpeed+1)-minSpeed;

		balloon.body.velocity.y -= vy;

		balloon.events.onInputDown.add(this.killBalloon, this);
	


	},

	killBalloon: function(sprite, pointer){
		console.log(sprite.key);

		this.explodeSound.play();
		if(!sprite.alive){
			return;
		}



		sprite.kill();

		if(sprite.key == 'balloon')
			this.counterKillBalloons++;
		else{
			this.lifes--;
			this.heartsGroup.children[this.lifes].kill();
		}

		if(this.counterKillBalloons == 10){
			this.win = true;
			this.messageGameOver = "You win!!!";
			this.gameOver();
		}

		if(this.lifes == 0){
			this.win = false;
			this.messageGameOver = "You loose!!!"
			this.gameOver();
		}


		this.scoreLabel.text = "Balloons Exploited: "+this.counterKillBalloons;

		
	},

	killCat: function(){

		



	},

	showScoreBoardDead: function(){
		this.gameOverLabel = game.add.text(game.world.width / 2,120, this.messageGameOver, {font : '18px Arial', fill: '#ffffff'});
		this.gameOverLabel.anchor.setTo(0.5, 0.5);

		this.lifeFinalScore = game.add.text(300,220,'Cat Life: ', {font : '18px Arial', fill: '#ffffff'});
		this.finalScore = game.add.text(300,180,'Balloons: ', {font : '18px Arial', fill: '#ffffff'})

		this.scoreBoardGroup.create(game.world.width / 2 - 150 , 150, "scoreboard");

		this.scoreBoardGroup.add(this.lifeFinalScore);
		this.scoreBoardGroup.add(this.finalScore);
		this.scoreBoardGroup.add(this.gameOverLabel);

		game.world.bringToTop(this.finalScore);
		game.world.bringToTop(this.lifeFinalScore);

		this.lifeFinalScore.text = "Cat Life: "+this.lifes;
		this.finalScore.text = "Balloons: "+this.counterKillBalloons;

		game.add.tween(this.scoreBoardGroup).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
	},

	showScoreWin: function(){
		this.gameOverLabel = game.add.text(game.world.width / 2,120, this.messageGameOver, {font : '18px Arial', fill: '#ffffff'});
		this.gameOverLabel.anchor.setTo(0.5, 0.5);

		this.lifeFinalScore = game.add.text(300,220,'Cat Life: ', {font : '18px Arial', fill: '#ffffff'});
		this.finalScore = game.add.text(300,180,'Balloons: ', {font : '18px Arial', fill: '#ffffff'})

		this.scoreBoardGroup.create(game.world.width / 2 - 150 , 150, "scoreboardwin");

		this.scoreBoardGroup.add(this.lifeFinalScore);
		this.scoreBoardGroup.add(this.finalScore);
		this.scoreBoardGroup.add(this.gameOverLabel);

		game.world.bringToTop(this.finalScore);
		game.world.bringToTop(this.lifeFinalScore);

		this.lifeFinalScore.text = "Cat Life: "+this.lifes;
		this.finalScore.text = "Balloons: "+this.counterKillBalloons;

		game.add.tween(this.scoreBoardGroup).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
	},

	gameOver: function(){
		if(this.win){
			this.bgSound.stop();
			this.explodeSound.stop();
			game.time.events.stop();
			this.showScoreWin();
		}else{
			this.bgSound.stop();
			this.explodeSound.stop();
			game.time.events.stop();
			this.showScoreBoardDead();
		}
			
	}
}