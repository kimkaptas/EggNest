(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Kim Egg Nest Final_atlas_1", frames: [[0,0,1022,1406]]},
		{name:"Kim Egg Nest Final_atlas_2", frames: [[0,663,711,561],[713,663,423,661],[1259,0,646,826],[0,1326,444,580],[446,1326,444,580],[892,1326,444,580],[1338,828,444,580],[1338,1410,444,580],[0,0,1257,661]]},
		{name:"Kim Egg Nest Final_atlas_3", frames: [[1924,474,53,89],[0,687,186,183],[868,574,222,281],[1924,565,92,48],[1172,572,314,206],[0,0,754,337],[1172,0,412,570],[756,0,414,572],[0,339,441,346],[1586,0,444,472],[443,339,300,216],[443,574,423,327],[1979,474,26,2],[1586,474,336,442]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_94 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(img.CachedBmp_72);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2892,2679);


(lib.CachedBmp_70 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["Kim Egg Nest Final_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(img.CachedBmp_75);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3990,2228);


(lib.CachedBmp_73 = function() {
	this.initialize(img.CachedBmp_73);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3990,2228);


(lib.CachedBmp_76 = function() {
	this.initialize(img.CachedBmp_76);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3990,2228);


(lib.CachedBmp_74 = function() {
	this.initialize(img.CachedBmp_74);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3990,2228);


(lib.CachedBmp_71 = function() {
	this.initialize(img.CachedBmp_71);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6125,4428);


(lib.CachedBmp_78 = function() {
	this.initialize(img.CachedBmp_78);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6132,6244);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol79 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol78 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol77 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol76 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol75 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol74 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol73 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol72 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol71 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol70 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol69 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol68 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol67 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol66 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol65 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol64 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol63 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol62 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol61 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol60 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol59 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol58 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol57 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol56 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(3777.8,-894.2,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-1327,1374,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_70();
	this.instance_2.setTransform(-221,580,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1327,-894.2,6550.8,4482.2);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,336,442), null);


(lib.startOver = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_99();
	this.instance.setTransform(37.45,76,0.2057,0.2057);

	this.instance_1 = new lib.CachedBmp_98();
	this.instance_1.setTransform(-1.95,-1.95,0.2057,0.2057);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.startOver, new cjs.Rectangle(-1.9,-1.9,210.20000000000002,289.2), null);


(lib.Scene_1_background_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// background
	this.instance = new lib.CachedBmp_73();
	this.instance.setTransform(-74.3,-30.75,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_74();
	this.instance_1.setTransform(-74.3,-30.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_75();
	this.instance_2.setTransform(-74.3,-30.75,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_76();
	this.instance_3.setTransform(-74.3,-30.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},95).to({state:[{t:this.instance_3}]},813).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Wings = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Wings, new cjs.Rectangle(-0.5,-0.5,93,91.5), null);


(lib.lips2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_96();
	this.instance.setTransform(0,0,0.2115,0.2115);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lips2, new cjs.Rectangle(0,0,47,59.5), null);


(lib.leegs = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.leegs, new cjs.Rectangle(0,0,377,168.5), null);


(lib.eye1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_94();
	this.instance.setTransform(-0.45,-0.45,0.4865,0.4865);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eye1, new cjs.Rectangle(-0.4,-0.4,25.799999999999997,43.3), null);


(lib.body2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_92();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.body2, new cjs.Rectangle(-0.5,-0.5,323,413), null);


(lib.nest = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_90();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.nest, new cjs.Rectangle(0,0,628.5,330.5), null);


(lib.eggbrok = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_87();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eggbrok, new cjs.Rectangle(0,0,211.5,330.5), null);


(lib.down = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_86();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.down, new cjs.Rectangle(0,0,220.5,173), null);


(lib._12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_79();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._12, new cjs.Rectangle(0,0,211.5,163.5), null);


(lib.dinoz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_78();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dinoz, new cjs.Rectangle(0,0,3066,3122), null);


(lib.tree = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_77();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tree, new cjs.Rectangle(0,0,150,108), null);


(lib.___Camera___ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-961,-541,1922,1082);


(lib.Scene_1_moov = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// moov
	this.instance = new lib.down();
	this.instance.setTransform(1416.55,327.5,0.1681,0.1681,-14.975,0,0,110.8,90);

	this.instance_1 = new lib.tree();
	this.instance_1.setTransform(1409.6,375.25,0.8007,0.9065,20.9351,0,0,75,54.3);

	this.instance_2 = new lib.nest();
	this.instance_2.setTransform(1409.6,349.75,0.1549,0.1549,0,0,0,314.1,165.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},818).wait(91));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_legg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// legg
	this.instance = new lib.leegs();
	this.instance.setTransform(1418.15,343.85,0.0273,0.0525,-30.0011,0,0,188.7,85.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(625).to({_off:false},0).wait(1).to({regX:231.3,regY:105.4,scaleX:0.027,scaleY:0.0522,rotation:0,x:1415.75,y:344.75},0).wait(1).to({regX:231.5,regY:143.2,scaleX:0.0496,scaleY:0.111,skewX:-29.6101,skewY:-29.2962,x:1423.7,y:350.95},0).wait(12).to({regX:232.2,regY:144.6,scaleX:0.0232,scaleY:0.0519,skewX:-29.6008,skewY:-29.2673,x:1419.15,y:345.55},0).wait(5).to({regX:235.6,regY:152.4,scaleX:0.0469,scaleY:0.0887,skewX:-22.0358,skewY:-21.6285,x:1421.4,y:350.4},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Layer_14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_14
	this.instance = new lib.dinoz();
	this.instance.setTransform(1610.1,625.35,0.0918,0.0918,0,0,0,1534,1561.3);

	this.instance_1 = new lib.Symbol56("synched",0);
	this.instance_1.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_2 = new lib.Symbol57("synched",0);
	this.instance_2.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_3 = new lib.Symbol58("synched",0);
	this.instance_3.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_4 = new lib.Symbol59("synched",0);
	this.instance_4.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_5 = new lib.Symbol60("synched",0);
	this.instance_5.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_6 = new lib.Symbol61("synched",0);
	this.instance_6.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_7 = new lib.Symbol62("synched",0);
	this.instance_7.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_8 = new lib.Symbol63("synched",0);
	this.instance_8.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_9 = new lib.Symbol64("synched",0);
	this.instance_9.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_10 = new lib.Symbol65("synched",0);
	this.instance_10.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_11 = new lib.Symbol66("synched",0);
	this.instance_11.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_12 = new lib.Symbol67("synched",0);
	this.instance_12.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_13 = new lib.Symbol68("synched",0);
	this.instance_13.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_14 = new lib.Symbol69("synched",0);
	this.instance_14.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_15 = new lib.Symbol70("synched",0);
	this.instance_15.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_16 = new lib.Symbol71("synched",0);
	this.instance_16.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_17 = new lib.Symbol72("synched",0);
	this.instance_17.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_18 = new lib.Symbol73("synched",0);
	this.instance_18.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_19 = new lib.Symbol74("synched",0);
	this.instance_19.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_20 = new lib.Symbol75("synched",0);
	this.instance_20.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_21 = new lib.Symbol76("synched",0);
	this.instance_21.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_22 = new lib.Symbol77("synched",0);
	this.instance_22.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_23 = new lib.Symbol78("synched",0);
	this.instance_23.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.instance_24 = new lib.Symbol79("synched",0);
	this.instance_24.setTransform(3896.8,2693.8,1,1,0,0,0,3896.8,2693.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance,p:{regX:1534,regY:1561.3,scaleX:0.0918,scaleY:0.0918,rotation:0,y:625.35,x:1610.1}}]},863).to({state:[{t:this.instance_2},{t:this.instance,p:{regX:1534.7,regY:1561.5,scaleX:0.0917,scaleY:0.0917,rotation:-5.7182,y:625.4,x:1610.1}}]},2).to({state:[{t:this.instance_3},{t:this.instance,p:{regX:1535.4,regY:1562.1,scaleX:0.0917,scaleY:0.0917,rotation:1.2201,y:628.75,x:1614.45}}]},2).to({state:[{t:this.instance_4},{t:this.instance,p:{regX:1535.7,regY:1562.6,scaleX:0.0917,scaleY:0.0917,rotation:9.4325,y:628.8,x:1614.4}}]},1).to({state:[{t:this.instance_5},{t:this.instance,p:{regX:1535.8,regY:1563.2,scaleX:0.0917,scaleY:0.0917,rotation:2.4796,y:628.8,x:1614.5}}]},2).to({state:[{t:this.instance_6},{t:this.instance,p:{regX:1534,regY:1561.3,scaleX:0.0918,scaleY:0.0918,rotation:0,y:625.35,x:1610.1}}]},2).to({state:[{t:this.instance_7},{t:this.instance,p:{regX:1534.7,regY:1561.5,scaleX:0.0917,scaleY:0.0917,rotation:-5.7182,y:625.4,x:1610.1}}]},3).to({state:[{t:this.instance_8},{t:this.instance,p:{regX:1535.4,regY:1562.1,scaleX:0.0917,scaleY:0.0917,rotation:1.2201,y:628.75,x:1614.45}}]},2).to({state:[{t:this.instance_9},{t:this.instance,p:{regX:1535.7,regY:1562.6,scaleX:0.0917,scaleY:0.0917,rotation:9.4325,y:628.8,x:1614.4}}]},1).to({state:[{t:this.instance_10},{t:this.instance,p:{regX:1535.8,regY:1563.2,scaleX:0.0917,scaleY:0.0917,rotation:2.4796,y:628.8,x:1614.5}}]},2).to({state:[{t:this.instance_11},{t:this.instance,p:{regX:1534,regY:1561.3,scaleX:0.0918,scaleY:0.0918,rotation:0,y:625.35,x:1610.1}}]},3).to({state:[{t:this.instance_12},{t:this.instance,p:{regX:1534.7,regY:1561.5,scaleX:0.0917,scaleY:0.0917,rotation:-5.7182,y:625.4,x:1610.1}}]},3).to({state:[{t:this.instance_13},{t:this.instance,p:{regX:1535.4,regY:1562.1,scaleX:0.0917,scaleY:0.0917,rotation:1.2201,y:628.75,x:1614.45}}]},2).to({state:[{t:this.instance_14},{t:this.instance,p:{regX:1535.7,regY:1562.6,scaleX:0.0917,scaleY:0.0917,rotation:9.4325,y:628.8,x:1614.4}}]},1).to({state:[{t:this.instance_15},{t:this.instance,p:{regX:1535.8,regY:1563.2,scaleX:0.0917,scaleY:0.0917,rotation:2.4796,y:628.8,x:1614.5}}]},2).to({state:[{t:this.instance_16},{t:this.instance,p:{regX:1534,regY:1561.3,scaleX:0.0918,scaleY:0.0918,rotation:0,y:625.35,x:1610.1}}]},2).to({state:[{t:this.instance_17},{t:this.instance,p:{regX:1534.7,regY:1561.5,scaleX:0.0917,scaleY:0.0917,rotation:-5.7182,y:625.4,x:1610.1}}]},3).to({state:[{t:this.instance_18},{t:this.instance,p:{regX:1535.4,regY:1562.1,scaleX:0.0917,scaleY:0.0917,rotation:1.2201,y:628.75,x:1614.45}}]},2).to({state:[{t:this.instance_19},{t:this.instance,p:{regX:1535.7,regY:1562.6,scaleX:0.0917,scaleY:0.0917,rotation:9.4325,y:628.8,x:1614.4}}]},1).to({state:[{t:this.instance_20},{t:this.instance,p:{regX:1534,regY:1561.3,scaleX:0.0918,scaleY:0.0918,rotation:0,y:625.35,x:1610.1}}]},1).to({state:[{t:this.instance_21},{t:this.instance,p:{regX:1534.7,regY:1561.5,scaleX:0.0917,scaleY:0.0917,rotation:-5.7182,y:625.4,x:1610.1}}]},2).to({state:[{t:this.instance_22},{t:this.instance,p:{regX:1535.4,regY:1562.1,scaleX:0.0917,scaleY:0.0917,rotation:1.2201,y:628.75,x:1614.45}}]},2).to({state:[{t:this.instance_23},{t:this.instance,p:{regX:1535.7,regY:1562.6,scaleX:0.0917,scaleY:0.0917,rotation:9.4325,y:628.8,x:1614.4}}]},1).to({state:[{t:this.instance_24},{t:this.instance,p:{regX:1535.8,regY:1563.2,scaleX:0.0917,scaleY:0.0917,rotation:2.4796,y:628.8,x:1614.5}}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_egg_dwon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// egg_dwon
	this.instance = new lib.down();
	this.instance.setTransform(1396.35,341.25,0.1418,0.1418,0,0,0,110.4,86.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(538).to({_off:false},0).wait(371));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// background
	this.start = new lib.Symbol2();
	this.start.name = "start";
	this.start.setTransform(994.95,500.8,1,1,0,0,0,168,221);

	this.replay = new lib.startOver();
	this.replay.name = "replay";
	this.replay.setTransform(1006.65,607.6,2.4306,2.4309,-5.4977,0,0,103.2,142.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},1).to({state:[{t:this.replay}]},908).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.eye = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eye1();
	this.instance.setTransform(27.95,-449.8);

	this.instance_1 = new lib.eye1();
	this.instance_1.setTransform(-46.15,-429.55,1,1,0,0,0,12.5,21.2);

	this.instance_2 = new lib.CachedBmp_93();
	this.instance_2.setTransform(-76.45,-506.95,0.4865,0.4865);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eye, new cjs.Rectangle(-76.4,-506.9,152.7,100.19999999999999), null);


(lib.all = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.eye();
	this.instance.setTransform(304.05,-70.75,1.0277,1,0,0,-13.3248,0,-456.9);

	this.instance_1 = new lib.Wings();
	this.instance_1.setTransform(127.35,16.15,1,1,90,0,0,46,45.3);

	this.instance_2 = new lib.lips2();
	this.instance_2.setTransform(323.8,64.15,2.3634,1.266,0,0,0,23.6,29.8);

	this.instance_3 = new lib.body2();
	this.instance_3.setTransform(305.05,42.15,1,1,0,0,0,161,206);

	this.instance_4 = new lib.Wings();
	this.instance_4.setTransform(495.05,35.15,1,1,0,0,0,46,45.2);

	this.instance_5 = new lib.leegs();
	this.instance_5.setTransform(298,269.2,0.5599,0.7625,0,0,0,188.5,84.2);

	this.instance_6 = new lib.CachedBmp_91();
	this.instance_6.setTransform(107.6,30.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.all, new cjs.Rectangle(81.7,-164.3,459.90000000000003,497.8), null);


(lib.egg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.eggbrok();
	this.instance_1.setTransform(100.35,165.3,1,1,0,0,0,105.8,165.3);

	this.instance_2 = new lib.CachedBmp_89();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.egg1, new cjs.Rectangle(-5.4,-0.5,211.9,331), null);


(lib.eggpink = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.egg1();
	this.instance.setTransform(103.1,142.6,1,1,0,0,0,103.1,142.6);
	this.instance.filters = [new cjs.ColorFilter(0.64, 0.64, 0.64, 1, 91.8, 91.8, 91.8, 0)];
	this.instance.cache(-7,-2,216,335);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.eggpink, new cjs.Rectangle(-5.4,-0.5,211.9,331), null);


(lib.egg2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.egg1();
	this.instance.setTransform(103.1,142.6,1,1,0,0,0,103.1,142.6);
	this.instance.filters = [new cjs.ColorFilter(0.64, 0.64, 0.64, 1, 91.8, 91.8, 91.8, 0)];
	this.instance.cache(-7,-2,216,335);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.egg2, new cjs.Rectangle(-5.4,-0.5,211.9,331), null);


(lib.bigholeegg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_80();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_81();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_82();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_83();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_84();
	this.instance_4.setTransform(0,0,0.5,0.5);

	this.instance_5 = new lib.down();
	this.instance_5.setTransform(-0.05,122.7);

	this.instance_6 = new lib.CachedBmp_85();
	this.instance_6.setTransform(-0.05,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},41).to({state:[{t:this.instance_2}]},30).to({state:[{t:this.instance_3}]},10).to({state:[{t:this.instance_4}]},9).to({state:[{t:this.instance_6},{t:this.instance_5}]},5).wait(146));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,222,295.7);


(lib.appegg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._12();
	this.instance.setTransform(105.8,81.7,1,1,0,0,0,105.8,81.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.appegg, new cjs.Rectangle(0,0,211.5,163.5), null);


(lib.Scene_1_fledgling = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// fledgling
	this.instance = new lib.lips2();
	this.instance.setTransform(1392.25,333.05,0.1322,0.0942,0,0,0,23.4,29.8);

	this.instance_1 = new lib.all();
	this.instance_1.setTransform(1392.3,332.15,0.0356,0.0356,0,0,0,240.3,250.1);

	this.instance_2 = new lib.all();
	this.instance_2.setTransform(1381.1,330.6,0.0799,0.0966,0,0,0,240.8,252.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1,p:{x:1392.3,y:332.15,regX:240.3,regY:250.1,scaleX:0.0356,scaleY:0.0356,rotation:0}},{t:this.instance,p:{regX:23.4,regY:29.8,scaleX:0.1322,rotation:0,x:1392.25,y:333.05,scaleY:0.0942}}]},498).to({state:[{t:this.instance_1,p:{x:1391.65,y:334.35,regX:240.3,regY:250.1,scaleX:0.0356,scaleY:0.0356,rotation:0}},{t:this.instance,p:{regX:24.1,regY:29.9,scaleX:0.1257,rotation:15.0002,x:1392.7,y:332.1,scaleY:0.0942}}]},13).to({state:[{t:this.instance_1,p:{x:1395.35,y:344.7,regX:242,regY:251.7,scaleX:0.0558,scaleY:0.0665,rotation:0}},{t:this.instance,p:{regX:24.2,regY:31.6,scaleX:0.1532,rotation:-14.9972,x:1397,y:330.45,scaleY:0.1002}}]},9).to({state:[{t:this.instance_1,p:{x:1395.05,y:342.05,regX:241,regY:250.8,scaleX:0.0596,scaleY:0.0712,rotation:0}},{t:this.instance,p:{regX:24.9,regY:32.5,scaleX:0.1903,rotation:0,x:1398.35,y:327.25,scaleY:0.2321}}]},15).to({state:[{t:this.instance_1,p:{x:1393.55,y:339.05,regX:241,regY:250.8,scaleX:0.0596,scaleY:0.0712,rotation:0}},{t:this.instance,p:{regX:24.9,regY:32.5,scaleX:0.1903,rotation:0,x:1398.35,y:327.25,scaleY:0.2321}}]},1).to({state:[{t:this.instance_1,p:{x:1392.5,y:342,regX:241.3,regY:250.8,scaleX:0.0744,scaleY:0.0889,rotation:0}},{t:this.instance,p:{regX:25.1,regY:32.6,scaleX:0.2377,rotation:0,x:1398.5,y:327.25,scaleY:0.29}}]},8).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:241.2,regY:252.2,scaleX:0.0709,scaleY:0.0856,rotation:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.2934,rotation:0,x:1394.9,y:320.2,scaleY:0.2085}}]},3).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.2934,rotation:0,x:1397.1,y:317.45,scaleY:0.2085}}]},3).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.1928,rotation:0,x:1396.15,y:317.45,scaleY:0.2085}}]},1).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.2949,rotation:0,x:1395.55,y:317.45,scaleY:0.2085}}]},1).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0}},{t:this.instance,p:{regX:25.9,regY:33.3,scaleX:0.2949,rotation:0,x:1395.55,y:317.5,scaleY:0.2764}}]},1).to({state:[{t:this.instance_1,p:{x:1388.4,y:333.65,regX:240.8,regY:252.1,scaleX:0.08,scaleY:0.0966,rotation:0}},{t:this.instance,p:{regX:25.9,regY:33.1,scaleX:0.2949,rotation:0,x:1395.55,y:317.45,scaleY:0.2085}}]},1).to({state:[{t:this.instance_1,p:{x:1381.1,y:330.6,regX:240.8,regY:252.6,scaleX:0.0799,scaleY:0.0966,rotation:0}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}}]},7).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1419.8,y:334,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0}}]},4).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1419.8,y:338.55,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0}}]},10).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1419.8,y:338.9,regX:292.4,regY:296.7,scaleX:0.0634,scaleY:0.0769,rotation:0}}]},2).to({state:[{t:this.instance_2,p:{regX:241.2,regY:253.4,rotation:-14.9915,x:1381.05,y:330.5,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.6,scaleX:0.2948,rotation:-14.9884,x:1385.4,y:312.65,scaleY:0.2084}},{t:this.instance_1,p:{x:1407.35,y:338.75,regX:241.5,regY:253.8,scaleX:0.0799,scaleY:0.0966,rotation:0}}]},47).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1408,y:341.8,regX:251.6,regY:261.7,scaleX:0.0796,scaleY:0.0963,rotation:-7.8887}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253,rotation:9.2197,x:1381,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.6,scaleX:0.2949,rotation:0,x:1391.05,y:316.75,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:241.2,regY:253.4,rotation:-14.9915,x:1381.05,y:330.5,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:26.1,regY:33.8,scaleX:0.2948,rotation:-14.9957,x:1384.9,y:314.3,scaleY:0.2084}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:264.4,regY:272.2,rotation:0,x:1381.1,y:330.6,scaleX:0.0794,scaleY:0.0961}},{t:this.instance,p:{regX:25.9,regY:33.6,scaleX:0.2949,rotation:0,x:1388.1,y:312.7,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.7,y:341.75,regX:251.1,regY:260.9,scaleX:0.0797,scaleY:0.0963,rotation:7.089}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1410.6,y:337.45,regX:255.4,regY:265.3,scaleX:0.0795,scaleY:0.0962,rotation:-7.8421}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1408.8,y:341.85,regX:251.2,regY:261.6,scaleX:0.0796,scaleY:0.0963,rotation:7.0811}}]},1).to({state:[{t:this.instance_2,p:{regX:241.2,regY:253.4,rotation:-14.9915,x:1381.05,y:330.5,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:26.1,regY:33.7,scaleX:0.2948,rotation:-14.9884,x:1384.95,y:314.35,scaleY:0.2084}},{t:this.instance_1,p:{x:1410.15,y:341.85,regX:251.2,regY:261.6,scaleX:0.0796,scaleY:0.0963,rotation:7.0811}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1406.65,y:341.7,regX:251.6,regY:261.1,scaleX:0.0796,scaleY:0.0963,rotation:-7.8964}}]},1).to({state:[{t:this.instance_2,p:{regX:240.8,regY:252.6,rotation:0,x:1381.1,y:330.6,scaleX:0.0799,scaleY:0.0966}},{t:this.instance,p:{regX:25.9,regY:33.4,scaleX:0.2949,rotation:0,x:1388.25,y:314.4,scaleY:0.2085}},{t:this.instance_1,p:{x:1408.2,y:341.85,regX:253.5,regY:263.5,scaleX:0.0796,scaleY:0.0962,rotation:-7.8654}}]},1).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,x:1380.9,y:327.7,scaleX:0.0799,scaleY:0.0965}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084}},{t:this.instance_1,p:{x:1406.65,y:341.8,regX:267.3,regY:272.9,scaleX:0.0793,scaleY:0.096,rotation:-1.4396}}]},1).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,x:1380.9,y:327.7,scaleX:0.0799,scaleY:0.0965}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084}},{t:this.instance_1,p:{x:1406.5,y:334.3,regX:267.4,regY:273.4,scaleX:0.0793,scaleY:0.0959,rotation:-1.4307}}]},2).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,x:1380.9,y:327.7,scaleX:0.0799,scaleY:0.0965}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084}},{t:this.instance_1,p:{x:1406.45,y:331.3,regX:267.4,regY:273.9,scaleX:0.0793,scaleY:0.0959,rotation:-1.4218}}]},1).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,x:1380.9,y:327.7,scaleX:0.0799,scaleY:0.0965}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084}},{t:this.instance_1,p:{x:1406.5,y:326.4,regX:267.8,regY:274.9,scaleX:0.0792,scaleY:0.0959,rotation:7.2946}}]},4).to({state:[{t:this.instance_2,p:{regX:241.1,regY:253.9,rotation:-14.9851,x:1380.9,y:327.7,scaleX:0.0799,scaleY:0.0965}},{t:this.instance,p:{regX:25.9,regY:33.9,scaleX:0.2948,rotation:-14.9855,x:1385.3,y:309.85,scaleY:0.2084}},{t:this.instance_1,p:{x:1398,y:322.55,regX:267.9,regY:275.5,scaleX:0.0792,scaleY:0.0959,rotation:7.2867}}]},7).to({state:[{t:this.instance_2,p:{regX:241.4,regY:255,rotation:-6.009,x:1374.25,y:327.8,scaleX:0.0799,scaleY:0.0965}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9825,x:1381.2,y:310,scaleY:0.2084}},{t:this.instance_1,p:{x:1398,y:322.45,regX:268.3,regY:275.7,scaleX:0.0792,scaleY:0.0959,rotation:-7.7019}}]},5).to({state:[{t:this.instance_2,p:{regX:241.4,regY:255,rotation:-6.009,x:1374.25,y:327.8,scaleX:0.0799,scaleY:0.0965}},{t:this.instance,p:{regX:25.9,regY:34.1,scaleX:0.2948,rotation:-14.9825,x:1381.2,y:310,scaleY:0.2084}},{t:this.instance_1,p:{x:1397.9,y:322.4,regX:268.8,regY:276,scaleX:0.0792,scaleY:0.0959,rotation:7.2891}}]},7).wait(239));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_eggs = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// eggs
	this.instance = new lib.tree();
	this.instance.setTransform(1401.75,348.75,1,1,0,0,0,75,54.1);

	this.instance_1 = new lib.nest();
	this.instance_1.setTransform(1409.6,349.75,0.1549,0.1549,0,0,0,314.1,165.3);

	this.instance_2 = new lib.egg1();
	this.instance_2.setTransform(1389.85,336.55,0.1633,0.1633,0,0,0,57.9,142.7);
	this.instance_2._off = true;

	this.instance_3 = new lib.egg2();
	this.instance_3.setTransform(1428.4,334.35,0.1393,0.1393,0,0,0,103,142.6);

	this.instance_4 = new lib.egg1();
	this.instance_4.setTransform(1414,321.35,0.1633,0.1633,0,0,0,57.9,142.7);

	this.instance_5 = new lib.bigholeegg();
	this.instance_5.setTransform(1391.9,329.6,0.1631,0.1631,-6.5095,0,0,58.6,143.3);

	this.instance_6 = new lib.down();
	this.instance_6.setTransform(1398.45,341.25,0.1418,0.1418,0,0,0,110.4,86.4);

	this.instance_7 = new lib.appegg();
	this.instance_7.setTransform(1398.95,323.8,0.1534,0.1534,0,0,0,105.7,82.2);

	this.instance_8 = new lib.eggpink();
	this.instance_8.setTransform(1428.25,334.25,0.1392,0.1392,22.4942,0,0,103.4,142.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance,p:{regY:54.1,scaleX:1,scaleY:1,rotation:0,x:1401.75,y:348.75,regX:75}}]},1).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9066,rotation:20.9355,x:1400.7,y:339.2,regX:75}}]},169).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9066,rotation:20.9355,x:1400.7,y:339.2,regX:75}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9066,rotation:5.9349,x:1400.7,y:339.15,regX:75}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9066,rotation:20.9341,x:1400.75,y:339.15,regX:75}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9065,rotation:35.9332,x:1400.7,y:339.15,regX:75}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9065,rotation:35.9332,x:1409.45,y:349.75,regX:75}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.2,scaleX:0.8007,scaleY:0.9065,rotation:5.9332,x:1409.5,y:349.65,regX:75}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9321,x:1409.6,y:349.8,regX:75.2}}]},7).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1409.55,y:349.8,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1409.55,y:355.75,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1418.9,y:355.75,regX:75.2}}]},7).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1407.85,y:355.75,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1407.85,y:358.3,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1407.85,y:360,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1407.85,y:362.55,regX:75.2}}]},8).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1409.55,y:365.1,regX:75.2}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1409.55,y:368.5,regX:75.2}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1412.1,y:371.05,regX:75.2}}]},6).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8006,scaleY:0.9065,rotation:42.626,x:1412.1,y:372.75,regX:75.2}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},22).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},43).to({state:[{t:this.instance_4,p:{regX:57.8,regY:142.9,rotation:-14.9959,y:321.3}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},15).to({state:[{t:this.instance_4,p:{regX:57.9,regY:143,rotation:0,y:321.3}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},21).to({state:[{t:this.instance_4,p:{regX:58,regY:143,rotation:14.9959,y:321.3}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_4,p:{regX:58,regY:143,rotation:14.9959,y:321.3}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},9).to({state:[{t:this.instance_4,p:{regX:58,regY:143,rotation:14.9959,y:321.3}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},18).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.5,scaleX:0.8006,scaleY:0.9064,rotation:20.9332,x:1409.85,y:377.95,regX:75.4}}]},23).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},18).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},13).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},9).to({state:[{t:this.instance_4,p:{regX:57.9,regY:142.7,rotation:0,y:321.35}},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_2},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_5},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},5).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_7,p:{x:1398.95,y:323.8,regX:105.7,regY:82.2,scaleX:0.1534,scaleY:0.1534,rotation:0}},{t:this.instance_6,p:{regX:110.4,regY:86.4,scaleX:0.1418,scaleY:0.1418,rotation:0,x:1398.45,y:341.25}}]},3).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_7,p:{x:1399,y:320.45,regX:105.7,regY:82.2,scaleX:0.1534,scaleY:0.1534,rotation:0}},{t:this.instance_6,p:{regX:110.4,regY:86.4,scaleX:0.1418,scaleY:0.1418,rotation:0,x:1398.45,y:341.25}}]},1).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.4,regY:86.4,scaleX:0.1418,scaleY:0.1418,rotation:0,x:1398.45,y:341.25}},{t:this.instance_7,p:{x:1396.55,y:314.5,regX:105.8,regY:82.7,scaleX:0.1533,scaleY:0.1533,rotation:-14.9946}}]},1).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},1).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},27).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},6).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},5).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.6,scaleX:0.1393,scaleY:0.1393,rotation:0,x:1428.4,y:334.35,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},5).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.8,scaleX:0.1392,scaleY:0.1392,rotation:-14.9897,x:1428.35,y:334.3,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.7,scaleX:0.1392,scaleY:0.1392,rotation:22.4942,x:1428.25,y:334.25,regX:103.4}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.8,scaleX:0.1392,scaleY:0.1392,rotation:-14.9897,x:1428.35,y:334.3,regX:103}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},8).to({state:[{t:this.instance_2},{t:this.instance_3,p:{regY:142.7,scaleX:0.1392,scaleY:0.1392,rotation:22.4942,x:1428.25,y:334.25,regX:103.4}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}}]},7).to({state:[{t:this.instance_8,p:{regX:103.4,regY:142.7,rotation:22.4942,y:334.25,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}},{t:this.instance_7,p:{x:1413.95,y:309.85,regX:117.1,regY:102.4,scaleX:0.1672,scaleY:0.1672,rotation:-14.7973}}]},8).to({state:[{t:this.instance_8,p:{regX:103.4,regY:142.7,rotation:22.4942,y:334.25,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}},{t:this.instance_7,p:{x:1413.9,y:309.9,regX:117.2,regY:102.5,scaleX:0.1672,scaleY:0.1672,rotation:-4.6077}}]},1).to({state:[{t:this.instance_8,p:{regX:103.4,regY:142.7,rotation:22.4942,y:334.25,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}},{t:this.instance_7,p:{x:1413.8,y:307.95,regX:124.5,regY:111.2,scaleX:0.1667,scaleY:0.1667,rotation:-19.4732}}]},1).to({state:[{t:this.instance_8,p:{regX:103.4,regY:142.7,rotation:22.4942,y:334.25,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}},{t:this.instance_7,p:{x:1416.4,y:307.85,regX:124.5,regY:111.8,scaleX:0.1667,scaleY:0.1667,rotation:-4.4739}}]},1).to({state:[{t:this.instance_8,p:{regX:103.4,regY:142.7,rotation:22.4942,y:334.25,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}},{t:this.instance_7,p:{x:1422,y:303.4,regX:124.9,regY:112.4,scaleX:0.1666,scaleY:0.1666,rotation:10.5114}}]},1).to({state:[{t:this.instance_8,p:{regX:103.4,regY:142.7,rotation:22.4942,y:334.25,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}},{t:this.instance_7,p:{x:1427.5,y:303.45,regX:125,regY:112.8,scaleX:0.1666,scaleY:0.1666,rotation:17.9868}}]},1).to({state:[{t:this.instance_8,p:{regX:103.4,regY:142.7,rotation:22.4942,y:334.25,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}},{t:this.instance_7,p:{x:1431.95,y:303.45,regX:125.7,regY:113,scaleX:0.1665,scaleY:0.1665,rotation:55.4141}}]},1).to({state:[{t:this.instance_8,p:{regX:103.4,regY:142.7,rotation:22.4942,y:334.25,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},1).to({state:[{t:this.instance_8,p:{regX:103.6,regY:142.9,rotation:7.4975,y:334.2,scaleX:0.1392,scaleY:0.1392,x:1428.25}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},50).to({state:[{t:this.instance_8,p:{regX:103.9,regY:142.9,rotation:22.4898,y:334.1,scaleX:0.1391,scaleY:0.1391,x:1428.2}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},4).to({state:[{t:this.instance_8,p:{regX:104.4,regY:143.2,rotation:37.4758,y:330.8,scaleX:0.1391,scaleY:0.1391,x:1427.5}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},11).to({state:[{t:this.instance_8,p:{regX:104.4,regY:143.2,rotation:22.482,y:330.7,scaleX:0.1391,scaleY:0.1391,x:1427.45}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},25).to({state:[{t:this.instance_8,p:{regX:104.4,regY:143.6,rotation:-7.5041,y:330.75,scaleX:0.139,scaleY:0.139,x:1427.35}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},6).to({state:[{t:this.instance_8,p:{regX:104.5,regY:144.3,rotation:2.2084,y:325.05,scaleX:0.139,scaleY:0.139,x:1427.2}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},21).to({state:[{t:this.instance_8,p:{regX:104.6,regY:144.7,rotation:2.2024,y:321.85,scaleX:0.139,scaleY:0.139,x:1433.7}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},15).to({state:[{t:this.instance_8,p:{regX:104.8,regY:145,rotation:9.183,y:321.85,scaleX:0.1389,scaleY:0.1389,x:1433.55}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},19).to({state:[{t:this.instance_8,p:{regX:104.6,regY:145.2,rotation:-20.8043,y:321.8,scaleX:0.1389,scaleY:0.1389,x:1433.45}},{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:1416.55,y:327.5}}]},5).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_1},{t:this.instance,p:{regY:54.3,scaleX:0.8007,scaleY:0.9065,rotation:20.9351,x:1409.6,y:375.25,regX:75}},{t:this.instance_6,p:{regX:110.8,regY:90,scaleX:0.1681,scaleY:0.1681,rotation:-14.975,x:3971.35,y:183.2}}]},1).wait(49));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(170).to({_off:false},0).wait(174).to({regX:58.2,regY:142.9,rotation:14.9959,x:1389.9,y:336.6},0).wait(43).to({regX:58.5,regY:143.8,rotation:-14.9959,x:1389.95,y:336.65},0).wait(43).to({regX:58.8,regY:144,rotation:0},0).wait(9).to({regX:59,regY:144.3,rotation:14.9987,y:336.7},0).wait(18).to({y:332.45},0).wait(23).to({regX:57.9,regY:142.7,rotation:0,x:1389.85,y:336.55},0).wait(18).to({regY:142.8,rotation:-7.2213,y:336.5},0).wait(13).to({regX:58.2,regY:143.1,scaleX:0.1632,scaleY:0.1632,rotation:8.4998,x:1389.65,y:336.4},0).wait(9).to({regX:58.5,regY:143,rotation:23.4919,y:336.35},0).wait(7).to({regY:143.3,scaleX:0.1631,scaleY:0.1631,rotation:-21.5088,x:1389.5,y:336.3},0).wait(5).to({regX:57.9,regY:142.7,scaleX:0.1633,scaleY:0.1633,rotation:0,x:1414,y:321.35},0).wait(39).to({regX:57.8,regY:142.9,rotation:-14.9907,x:1413.95,y:321.25},0).wait(5).to({regX:57.6,regY:143.1,scaleX:0.1632,scaleY:0.1632,rotation:18.9786,x:1413.85,y:321.2},0).wait(5).to({regX:57.9,regY:143.6,rotation:-11.0126,x:1413.8},0).wait(7).to({regY:143.8,scaleX:0.1631,scaleY:0.1631,rotation:18.9772,x:1413.7,y:321.15},0).wait(7).to({regY:143.9,scaleX:0.1632,scaleY:0.1632,rotation:-11.0084,x:1410.65,y:320.95},0).wait(8).to({regX:58,regY:144.1,rotation:3.9791,x:1413.7,y:321.15},0).wait(7).to({regX:57.8,regY:144.2,rotation:-11.0031,x:1407.6,y:319.55},0).to({_off:true},8).wait(166).to({_off:false,regX:4.8,regY:29.6,scaleX:0.1387,scaleY:0.1387,rotation:9.1961,x:1441,y:331.75},0).wait(1).to({regX:100.5,regY:165,scaleX:0.1388,scaleY:0.1388,rotation:13.6991,x:1454.3,y:367.9},0).wait(1).to({rotation:18.1978,x:1457.45,y:383.2},0).wait(1).to({rotation:22.6965,x:1460.5,y:398.4},0).wait(1).to({rotation:27.1952,x:1463.65,y:413.45},0).wait(1).to({rotation:31.6939,x:1466.65,y:428.45},0).wait(1).to({rotation:36.1926,x:1469.75,y:443.25},0).wait(1).to({rotation:40.6913,x:1472.75,y:457.85},0).wait(1).to({rotation:45.19,x:1475.9,y:472.4},0).wait(1).to({rotation:49.6887,x:1478.95,y:486.7},0).wait(1).to({rotation:54.1874,x:1482.1,y:500.95},0).wait(1).to({rotation:57.4014,x:1481.85,y:507.25},0).wait(1).to({rotation:60.6154,x:1481.65,y:513.45},0).wait(1).to({rotation:63.8294,x:1481.5,y:519.6},0).wait(1).to({rotation:67.0434,x:1481.35,y:525.75},0).wait(1).to({rotation:70.2574,x:1481.25,y:531.8},0).wait(1).to({rotation:73.4714,x:1481.15,y:537.7},0).wait(1).to({rotation:76.6854,y:543.6},0).wait(1).to({rotation:79.8994,x:1481.2,y:549.5},0).wait(1).to({rotation:83.1134,x:1481.25,y:555.3},0).wait(1).to({rotation:86.3274,x:1481.45,y:561.05},0).wait(1).to({rotation:89.5414,x:1481.6,y:566.8},0).wait(1).to({rotation:92.7554,x:1481.9,y:572.45},0).wait(1).to({rotation:95.9694,x:1482.2,y:578.05},0).wait(1).to({rotation:99.1834,x:1482.55,y:583.7},0).wait(1).to({rotation:101.6716,x:1484.2,y:588.65},0).wait(1).to({rotation:104.1598,x:1485.8,y:593.6},0).wait(1).to({rotation:106.6479,x:1487.45,y:598.55},0).wait(1).to({rotation:109.1361,x:1489.2,y:603.45},0).wait(1).to({rotation:111.6243,x:1490.95,y:608.4},0).wait(1).to({rotation:114.1125,x:1492.75,y:613.35},0).wait(1).to({rotation:116.6006,x:1494.65,y:618.2},0).wait(1).to({rotation:119.0888,x:1496.5,y:623.1},0).wait(1).to({rotation:121.577,x:1498.45,y:628},0).wait(1).to({rotation:124.0652,x:1500.45,y:632.9},0).wait(1).to({rotation:126.5533,x:1502.45,y:637.75},0).wait(1).to({rotation:129.0415,x:1504.5,y:642.7},0).wait(1).to({rotation:131.5297,x:1506.6,y:647.5},0).wait(1).to({rotation:134.0179,x:1508.8,y:652.45},0).wait(1).to({rotation:136.5061,x:1511,y:657.35},0).wait(1).to({rotation:138.9942,x:1513.25,y:662.2},0).wait(1).to({rotation:141.4824,x:1515.5,y:667.2},0).wait(1).to({rotation:143.9706,x:1517.8,y:672.1},0).wait(1).to({rotation:146.4588,x:1520.2,y:677},0).wait(1).to({rotation:148.9469,x:1522.6,y:682},0).wait(1).to({rotation:151.4351,x:1525,y:686.95},0).wait(1).to({rotation:153.9233,x:1527.5,y:692},0).wait(1).to({rotation:156.4115,x:1530,y:696.95},0).wait(1).to({rotation:158.8996,x:1532.6,y:702},0).wait(1).to({rotation:161.3878,x:1535.2,y:707.05},0).wait(1).to({rotation:163.876,x:1537.8,y:712.15},0).wait(1).to({x:1528.8,y:708.65},0).wait(1).to({x:1519.75,y:705.2},0).wait(1).to({x:1510.75,y:701.75},0).wait(1).to({x:1509.35,y:704.65},0).wait(1).to({x:1507.95,y:707.55},0).wait(1).to({x:1506.5,y:710.45},0).wait(1).to({x:1505.1,y:713.35},0).wait(1).to({x:1503.7,y:716.25},0).wait(1).to({x:1502.3,y:719.15},0).wait(1).to({x:1500.85,y:722.05},0).wait(1).to({x:1499.45,y:724.95},0).wait(1).to({x:1501.15,y:721.95},0).wait(1).to({x:1502.9,y:718.95},0).wait(1).to({x:1504.6,y:716},0).wait(1).to({x:1506.3,y:713},0).wait(1).to({x:1508,y:710.05},0).wait(1).to({x:1509.75,y:707.05},0).wait(1).to({x:1511.45,y:704.05},0).wait(1).to({x:1513.15,y:701.1},0).wait(1).to({x:1517.95,y:703.1},0).wait(1).to({x:1522.75,y:705.15},0).wait(1).to({x:1527.6,y:707.2},0).wait(1).to({x:1532.4,y:709.2},0).wait(1).to({x:1537.2,y:711.25},0).wait(1).to({x:1542,y:713.3},0).to({_off:true},1).wait(49));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_egg__up = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// egg__up
	this.instance = new lib.appegg();
	this.instance.setTransform(1396.55,314.5,0.1533,0.1533,-14.9906,0,0,97.5,71);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(538).to({_off:false},0).wait(1).to({regX:105.8,regY:81.8,rotation:-16.6609,x:1396.4,y:313.8},0).wait(1).to({rotation:-18.3269,x:1394.6,y:311.85},0).wait(1).to({rotation:-19.993,x:1392.8,y:309.9},0).wait(1).to({rotation:-21.6591,x:1391,y:307.9},0).wait(1).to({rotation:-23.3251,x:1389.15,y:306},0).wait(1).to({rotation:-24.9912,x:1385.75,y:305.9},0).wait(1).to({rotation:-26.6573,x:1382.4,y:305.8},0).wait(1).to({rotation:-28.3233,x:1379},0).wait(1).to({rotation:-29.9894,x:1375.6,y:305.7},0).wait(1).to({rotation:-37.9797,x:1371.2,y:309.4},0).wait(1).to({rotation:-45.9701,x:1366.75,y:313.05},0).wait(1).to({rotation:-53.9604,x:1362.35,y:316.75},0).wait(1).to({rotation:-59.9616,x:1359.6,y:321.1},0).wait(1).to({rotation:-65.9628,x:1356.9,y:325.45},0).wait(1).to({rotation:-71.964,x:1354.15,y:329.8},0).wait(1).to({rotation:-77.9652,x:1351.4,y:334.2},0).wait(1).to({rotation:-83.9664,x:1348.6,y:338.55},0).wait(1).to({rotation:-98.9673,x:1346.7,y:344.45},0).wait(1).to({rotation:-113.9681,x:1344.75,y:350.4},0).wait(1).to({rotation:-128.969,x:1342.7,y:356.45},0).wait(1).to({rotation:-131.4688,x:1335.5,y:383.85},0).wait(1).to({rotation:-133.9687,x:1328.35,y:411.25},0).wait(1).to({rotation:-136.4685,x:1321.1,y:438.7},0).wait(1).to({rotation:-138.9683,x:1313.9,y:466.1},0).wait(1).to({rotation:-141.4682,x:1306.65,y:493.55},0).wait(1).to({rotation:-143.968,x:1299.5,y:520.9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_egg__2_br = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// egg__2_br
	this.instance = new lib.appegg();
	this.instance.setTransform(1436.9,303.5,0.1664,0.1664,70.4087,0,0,124.1,109.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(625).to({_off:false},0).wait(1).to({regX:105.8,regY:81.8,rotation:74.4087,x:1443.6,y:304.15},0).wait(1).to({rotation:78.4086,x:1446.95,y:309.25},0).wait(1).to({rotation:82.4084,x:1450.3,y:314.35},0).wait(1).to({rotation:86.4083,x:1453.65,y:319.45},0).wait(1).to({rotation:90.4082,x:1457,y:324.6},0).wait(1).to({rotation:94.4081,x:1460.3,y:329.75},0).wait(1).to({rotation:98.408,x:1463.6,y:334.9},0).wait(1).to({rotation:102.4078,x:1466.8,y:340.15},0).wait(1).to({rotation:106.4077,x:1470.1,y:345.3},0).wait(1).to({rotation:110.4076,x:1473.25,y:350.5},0).wait(1).to({rotation:114.4075,x:1476.4,y:355.7},0).wait(1).to({rotation:118.4074,x:1479.6,y:360.9},0).wait(1).to({rotation:122.4072,x:1482.7,y:366.1},0).wait(1).to({rotation:126.4071,x:1485.8,y:371.3},0).wait(1).to({rotation:130.407,x:1488.9,y:376.6},0).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.KimEggNestFinal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,1,909];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.background.start;
		var self = this;
		self.stop();
		
		self.start.addEventListener("click",startPlaying);
		
		function startPlaying() 
		{
			self.gotoAndPlay(1);
		}
	}
	this.frame_1 = function() {
		this.start = undefined;
	}
	this.frame_909 = function() {
		this.replay = this.background.replay;
		this.___loopingOver___ = true;
		var self = this;
		//self.stop();
		
		self.replay.addEventListener("click",playAgain);
		
		function playAgain(){
			self.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(908).call(this.frame_909).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(960,540);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({scaleX:0.9973,scaleY:0.9973,x:961.4481,y:539.1778},0).wait(1).to({scaleX:0.9946,scaleY:0.9946,x:962.8962,y:538.3557},0).wait(1).to({scaleX:0.9918,scaleY:0.9918,x:964.3444,y:537.5335},0).wait(1).to({scaleX:0.9891,scaleY:0.9891,x:965.7925,y:536.7113},0).wait(1).to({scaleX:0.9864,scaleY:0.9864,x:967.2406,y:535.8891},0).wait(1).to({scaleX:0.9837,scaleY:0.9837,x:968.6887,y:535.067},0).wait(1).to({scaleX:0.9809,scaleY:0.9809,x:970.1368,y:534.2448},0).wait(1).to({scaleX:0.9782,scaleY:0.9782,x:971.5849,y:533.4226},0).wait(1).to({scaleX:0.9755,scaleY:0.9755,x:973.0331,y:532.6004},0).wait(1).to({scaleX:0.9728,scaleY:0.9728,x:974.4812,y:531.7782},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:975.9293,y:530.9561},0).wait(1).to({scaleX:0.9673,scaleY:0.9673,x:977.3774,y:530.1339},0).wait(1).to({scaleX:0.9646,scaleY:0.9646,x:978.8255,y:529.3117},0).wait(1).to({scaleX:0.9619,scaleY:0.9619,x:980.2736,y:528.4895},0).wait(1).to({scaleX:0.9591,scaleY:0.9591,x:981.7218,y:527.6674},0).wait(1).to({scaleX:0.9564,scaleY:0.9564,x:983.1699,y:526.8452},0).wait(1).to({scaleX:0.9537,scaleY:0.9537,x:984.618,y:526.023},0).wait(1).to({scaleX:0.951,scaleY:0.951,x:986.0661,y:525.2008},0).wait(1).to({scaleX:0.9482,scaleY:0.9482,x:987.5142,y:524.3787},0).wait(1).to({scaleX:0.9455,scaleY:0.9455,x:988.9623,y:523.5565},0).wait(1).to({scaleX:0.9428,scaleY:0.9428,x:990.4105,y:522.7343},0).wait(1).to({scaleX:0.9401,scaleY:0.9401,x:991.8586,y:521.9121},0).wait(1).to({scaleX:0.9373,scaleY:0.9373,x:993.3067,y:521.09},0).wait(1).to({scaleX:0.9346,scaleY:0.9346,x:994.7548,y:520.2678},0).wait(1).to({scaleX:0.9319,scaleY:0.9319,x:996.2029,y:519.4456},0).wait(1).to({scaleX:0.9292,scaleY:0.9292,x:997.6511,y:518.6234},0).wait(1).to({scaleX:0.9264,scaleY:0.9264,x:999.0992,y:517.8013},0).wait(1).to({scaleX:0.9237,scaleY:0.9237,x:1000.5473,y:516.9791},0).wait(1).to({scaleX:0.921,scaleY:0.921,x:1001.9954,y:516.1569},0).wait(1).to({scaleX:0.9183,scaleY:0.9183,x:1003.4435,y:515.3347},0).wait(1).to({scaleX:0.9155,scaleY:0.9155,x:1004.8916,y:514.5126},0).wait(1).to({scaleX:0.9128,scaleY:0.9128,x:1006.3397,y:513.6904},0).wait(1).to({scaleX:0.9101,scaleY:0.9101,x:1007.7879,y:512.8682},0).wait(1).to({scaleX:0.9074,scaleY:0.9074,x:1009.236,y:512.046},0).wait(1).to({scaleX:0.9046,scaleY:0.9046,x:1010.6841,y:511.2239},0).wait(1).to({scaleX:0.9019,scaleY:0.9019,x:1012.1322,y:510.4017},0).wait(1).to({scaleX:0.8992,scaleY:0.8992,x:1013.5803,y:509.5795},0).wait(1).to({scaleX:0.8965,scaleY:0.8965,x:1015.0285,y:508.7573},0).wait(1).to({scaleX:0.8937,scaleY:0.8937,x:1016.4766,y:507.9352},0).wait(1).to({scaleX:0.891,scaleY:0.891,x:1017.9247,y:507.113},0).wait(1).to({scaleX:0.8883,scaleY:0.8883,x:1019.3728,y:506.2908},0).wait(1).to({scaleX:0.8856,scaleY:0.8856,x:1020.8209,y:505.4686},0).wait(1).to({scaleX:0.8829,scaleY:0.8829,x:1022.269,y:504.6464},0).wait(1).to({scaleX:0.8801,scaleY:0.8801,x:1023.7172,y:503.8243},0).wait(1).to({scaleX:0.8774,scaleY:0.8774,x:1025.1653,y:503.0021},0).wait(1).to({scaleX:0.8747,scaleY:0.8747,x:1026.6134,y:502.1799},0).wait(1).to({scaleX:0.872,scaleY:0.872,x:1028.0615,y:501.3577},0).wait(1).to({scaleX:0.8692,scaleY:0.8692,x:1029.5096,y:500.5356},0).wait(1).to({scaleX:0.8665,scaleY:0.8665,x:1030.9577,y:499.7134},0).wait(1).to({scaleX:0.8638,scaleY:0.8638,x:1032.4059,y:498.8912},0).wait(1).to({scaleX:0.8611,scaleY:0.8611,x:1033.854,y:498.069},0).wait(1).to({scaleX:0.8583,scaleY:0.8583,x:1035.3021,y:497.2469},0).wait(1).to({scaleX:0.8556,scaleY:0.8556,x:1036.7502,y:496.4247},0).wait(1).to({scaleX:0.8529,scaleY:0.8529,x:1038.1983,y:495.6025},0).wait(1).to({scaleX:0.8502,scaleY:0.8502,x:1039.6464,y:494.7803},0).wait(1).to({scaleX:0.8474,scaleY:0.8474,x:1041.0946,y:493.9582},0).wait(1).to({scaleX:0.8447,scaleY:0.8447,x:1042.5427,y:493.136},0).wait(1).to({scaleX:0.842,scaleY:0.842,x:1043.9908,y:492.3138},0).wait(1).to({scaleX:0.8393,scaleY:0.8393,x:1045.4389,y:491.4916},0).wait(1).to({scaleX:0.8365,scaleY:0.8365,x:1046.887,y:490.6695},0).wait(1).to({scaleX:0.8338,scaleY:0.8338,x:1048.3351,y:489.8473},0).wait(1).to({scaleX:0.8311,scaleY:0.8311,x:1049.7833,y:489.0251},0).wait(1).to({scaleX:0.8284,scaleY:0.8284,x:1051.2314,y:488.2029},0).wait(1).to({scaleX:0.8256,scaleY:0.8256,x:1052.6795,y:487.3808},0).wait(1).to({scaleX:0.8229,scaleY:0.8229,x:1054.1276,y:486.5586},0).wait(1).to({scaleX:0.8202,scaleY:0.8202,x:1055.5757,y:485.7364},0).wait(1).to({scaleX:0.8175,scaleY:0.8175,x:1057.0238,y:484.9142},0).wait(1).to({scaleX:0.8147,scaleY:0.8147,x:1058.472,y:484.0921},0).wait(1).to({scaleX:0.812,scaleY:0.812,x:1059.9201,y:483.2699},0).wait(1).to({scaleX:0.8093,scaleY:0.8093,x:1061.3682,y:482.4477},0).wait(1).to({scaleX:0.8066,scaleY:0.8066,x:1062.8163,y:481.6255},0).wait(1).to({scaleX:0.8038,scaleY:0.8038,x:1064.2644,y:480.8034},0).wait(1).to({scaleX:0.8011,scaleY:0.8011,x:1065.7126,y:479.9812},0).wait(1).to({scaleX:0.7984,scaleY:0.7984,x:1067.1607,y:479.159},0).wait(1).to({scaleX:0.7957,scaleY:0.7957,x:1068.6088,y:478.3368},0).wait(1).to({scaleX:0.7929,scaleY:0.7929,x:1070.0569,y:477.5146},0).wait(1).to({scaleX:0.7902,scaleY:0.7902,x:1071.505,y:476.6925},0).wait(1).to({scaleX:0.7875,scaleY:0.7875,x:1072.9531,y:475.8703},0).wait(1).to({scaleX:0.7848,scaleY:0.7848,x:1074.4013,y:475.0481},0).wait(1).to({scaleX:0.7821,scaleY:0.7821,x:1075.8494,y:474.2259},0).wait(1).to({scaleX:0.7793,scaleY:0.7793,x:1077.2975,y:473.4038},0).wait(1).to({scaleX:0.7766,scaleY:0.7766,x:1078.7456,y:472.5816},0).wait(1).to({scaleX:0.7739,scaleY:0.7739,x:1080.1937,y:471.7594},0).wait(1).to({scaleX:0.7712,scaleY:0.7712,x:1081.6418,y:470.9372},0).wait(1).to({scaleX:0.7684,scaleY:0.7684,x:1083.09,y:470.1151},0).wait(1).to({scaleX:0.7657,scaleY:0.7657,x:1084.5381,y:469.2929},0).wait(1).to({scaleX:0.763,scaleY:0.763,x:1085.9862,y:468.4707},0).wait(1).to({scaleX:0.7603,scaleY:0.7603,x:1087.4343,y:467.6485},0).wait(1).to({scaleX:0.7575,scaleY:0.7575,x:1088.8824,y:466.8264},0).wait(1).to({scaleX:0.7548,scaleY:0.7548,x:1090.3305,y:466.0042},0).wait(1).to({scaleX:0.7521,scaleY:0.7521,x:1091.7787,y:465.182},0).wait(1).to({scaleX:0.7494,scaleY:0.7494,x:1093.2268,y:464.3598},0).wait(1).to({scaleX:0.7466,scaleY:0.7466,x:1094.6749,y:463.5377},0).wait(1).to({scaleX:0.7439,scaleY:0.7439,x:1096.123,y:462.7155},0).wait(1).to({scaleX:0.7412,scaleY:0.7412,x:1097.5711,y:461.8933},0).wait(1).to({scaleX:0.7385,scaleY:0.7385,x:1099.0192,y:461.0711},0).wait(1).to({scaleX:0.7357,scaleY:0.7357,x:1100.4674,y:460.249},0).wait(1).to({scaleX:0.733,scaleY:0.733,x:1101.9155,y:459.4268},0).wait(1).to({scaleX:0.7303,scaleY:0.7303,x:1103.3636,y:458.6046},0).wait(1).to({scaleX:0.7276,scaleY:0.7276,x:1104.8117,y:457.7824},0).wait(1).to({scaleX:0.7248,scaleY:0.7248,x:1106.2598,y:456.9603},0).wait(1).to({scaleX:0.7221,scaleY:0.7221,x:1107.7079,y:456.1381},0).wait(1).to({scaleX:0.7194,scaleY:0.7194,x:1109.1561,y:455.3159},0).wait(1).to({scaleX:0.7167,scaleY:0.7167,x:1110.6042,y:454.4937},0).wait(1).to({scaleX:0.7139,scaleY:0.7139,x:1112.0523,y:453.6716},0).wait(1).to({scaleX:0.7112,scaleY:0.7112,x:1113.5004,y:452.8494},0).wait(1).to({scaleX:0.7085,scaleY:0.7085,x:1114.9485,y:452.0272},0).wait(1).to({scaleX:0.7058,scaleY:0.7058,x:1116.3967,y:451.205},0).wait(1).to({scaleX:0.703,scaleY:0.703,x:1117.8448,y:450.3829},0).wait(1).to({scaleX:0.7003,scaleY:0.7003,x:1119.2929,y:449.5607},0).wait(1).to({scaleX:0.6976,scaleY:0.6976,x:1120.741,y:448.7385},0).wait(1).to({scaleX:0.6949,scaleY:0.6949,x:1122.1891,y:447.9163},0).wait(1).to({scaleX:0.6921,scaleY:0.6921,x:1123.6372,y:447.0941},0).wait(1).to({scaleX:0.6894,scaleY:0.6894,x:1125.0854,y:446.272},0).wait(1).to({scaleX:0.6867,scaleY:0.6867,x:1126.5335,y:445.4498},0).wait(1).to({scaleX:0.684,scaleY:0.684,x:1127.9816,y:444.6276},0).wait(1).to({scaleX:0.6812,scaleY:0.6812,x:1129.4297,y:443.8054},0).wait(1).to({scaleX:0.6785,scaleY:0.6785,x:1130.8778,y:442.9833},0).wait(1).to({scaleX:0.6758,scaleY:0.6758,x:1132.3259,y:442.1611},0).wait(1).to({scaleX:0.6731,scaleY:0.6731,x:1133.7741,y:441.3389},0).wait(1).to({scaleX:0.6704,scaleY:0.6704,x:1135.2222,y:440.5167},0).wait(1).to({scaleX:0.6676,scaleY:0.6676,x:1136.6703,y:439.6946},0).wait(1).to({scaleX:0.6649,scaleY:0.6649,x:1138.1184,y:438.8724},0).wait(1).to({scaleX:0.6622,scaleY:0.6622,x:1139.5665,y:438.0502},0).wait(1).to({scaleX:0.6595,scaleY:0.6595,x:1141.0146,y:437.228},0).wait(1).to({scaleX:0.6567,scaleY:0.6567,x:1142.4628,y:436.4059},0).wait(1).to({scaleX:0.654,scaleY:0.654,x:1143.9109,y:435.5837},0).wait(1).to({scaleX:0.6513,scaleY:0.6513,x:1145.359,y:434.7615},0).wait(1).to({scaleX:0.6486,scaleY:0.6486,x:1146.8071,y:433.9393},0).wait(1).to({scaleX:0.6458,scaleY:0.6458,x:1148.2552,y:433.1172},0).wait(1).to({scaleX:0.6431,scaleY:0.6431,x:1149.7033,y:432.295},0).wait(1).to({scaleX:0.6404,scaleY:0.6404,x:1151.1515,y:431.4728},0).wait(1).to({scaleX:0.6377,scaleY:0.6377,x:1152.5996,y:430.6506},0).wait(1).to({scaleX:0.6349,scaleY:0.6349,x:1154.0477,y:429.8285},0).wait(1).to({scaleX:0.6322,scaleY:0.6322,x:1155.4958,y:429.0063},0).wait(1).to({scaleX:0.6295,scaleY:0.6295,x:1156.9439,y:428.1841},0).wait(1).to({scaleX:0.6268,scaleY:0.6268,x:1158.3921,y:427.3619},0).wait(1).to({scaleX:0.624,scaleY:0.624,x:1159.8402,y:426.5398},0).wait(1).to({scaleX:0.6213,scaleY:0.6213,x:1161.2883,y:425.7176},0).wait(1).to({scaleX:0.6186,scaleY:0.6186,x:1162.7364,y:424.8954},0).wait(1).to({scaleX:0.6159,scaleY:0.6159,x:1164.1845,y:424.0732},0).wait(1).to({scaleX:0.6131,scaleY:0.6131,x:1165.6326,y:423.2511},0).wait(1).to({scaleX:0.6104,scaleY:0.6104,x:1167.0808,y:422.4289},0).wait(1).to({scaleX:0.6077,scaleY:0.6077,x:1168.5289,y:421.6067},0).wait(1).to({scaleX:0.605,scaleY:0.605,x:1169.977,y:420.7845},0).wait(1).to({scaleX:0.6022,scaleY:0.6022,x:1171.4251,y:419.9623},0).wait(1).to({scaleX:0.5995,scaleY:0.5995,x:1172.8732,y:419.1402},0).wait(1).to({scaleX:0.5968,scaleY:0.5968,x:1174.3213,y:418.318},0).wait(1).to({scaleX:0.5941,scaleY:0.5941,x:1175.7695,y:417.4958},0).wait(1).to({scaleX:0.5913,scaleY:0.5913,x:1177.2176,y:416.6736},0).wait(1).to({scaleX:0.5886,scaleY:0.5886,x:1178.6657,y:415.8515},0).wait(1).to({scaleX:0.5859,scaleY:0.5859,x:1180.1138,y:415.0293},0).wait(1).to({scaleX:0.5832,scaleY:0.5832,x:1181.5619,y:414.2071},0).wait(1).to({scaleX:0.5804,scaleY:0.5804,x:1183.01,y:413.3849},0).wait(1).to({scaleX:0.5777,scaleY:0.5777,x:1184.4582,y:412.5628},0).wait(1).to({scaleX:0.575,scaleY:0.575,x:1185.9063,y:411.7406},0).wait(1).to({scaleX:0.5723,scaleY:0.5723,x:1187.3544,y:410.9184},0).wait(1).to({scaleX:0.5696,scaleY:0.5696,x:1188.8025,y:410.0962},0).wait(1).to({scaleX:0.5668,scaleY:0.5668,x:1190.2506,y:409.2741},0).wait(1).to({scaleX:0.5641,scaleY:0.5641,x:1191.6987,y:408.4519},0).wait(1).to({scaleX:0.5614,scaleY:0.5614,x:1193.1469,y:407.6297},0).wait(1).to({scaleX:0.5587,scaleY:0.5587,x:1194.595,y:406.8075},0).wait(1).to({scaleX:0.5559,scaleY:0.5559,x:1196.0431,y:405.9854},0).wait(1).to({scaleX:0.5532,scaleY:0.5532,x:1197.4912,y:405.1632},0).wait(1).to({scaleX:0.5505,scaleY:0.5505,x:1198.9393,y:404.341},0).wait(1).to({scaleX:0.5478,scaleY:0.5478,x:1200.3874,y:403.5188},0).wait(1).to({scaleX:0.545,scaleY:0.545,x:1201.8356,y:402.6967},0).wait(1).to({scaleX:0.5423,scaleY:0.5423,x:1203.2837,y:401.8745},0).wait(1).to({scaleX:0.5396,scaleY:0.5396,x:1204.7318,y:401.0523},0).wait(1).to({scaleX:0.5369,scaleY:0.5369,x:1206.1799,y:400.2301},0).wait(1).to({scaleX:0.5341,scaleY:0.5341,x:1207.628,y:399.408},0).wait(1).to({scaleX:0.5314,scaleY:0.5314,x:1209.0762,y:398.5858},0).wait(1).to({scaleX:0.5287,scaleY:0.5287,x:1210.5243,y:397.7636},0).wait(1).to({scaleX:0.526,scaleY:0.526,x:1211.9724,y:396.9414},0).wait(1).to({scaleX:0.5232,scaleY:0.5232,x:1213.4205,y:396.1193},0).wait(1).to({scaleX:0.5205,scaleY:0.5205,x:1214.8686,y:395.2971},0).wait(1).to({scaleX:0.5178,scaleY:0.5178,x:1216.3167,y:394.4749},0).wait(1).to({scaleX:0.5151,scaleY:0.5151,x:1217.7649,y:393.6527},0).wait(1).to({scaleX:0.5123,scaleY:0.5123,x:1219.213,y:392.8305},0).wait(1).to({scaleX:0.5096,scaleY:0.5096,x:1220.6611,y:392.0084},0).wait(1).to({scaleX:0.5069,scaleY:0.5069,x:1222.1092,y:391.1862},0).wait(1).to({scaleX:0.5042,scaleY:0.5042,x:1223.5573,y:390.364},0).wait(1).to({scaleX:0.5014,scaleY:0.5014,x:1225.0054,y:389.5418},0).wait(1).to({scaleX:0.4987,scaleY:0.4987,x:1226.4536,y:388.7197},0).wait(1).to({scaleX:0.496,scaleY:0.496,x:1227.9017,y:387.8975},0).wait(1).to({scaleX:0.4933,scaleY:0.4933,x:1229.3498,y:387.0753},0).wait(1).to({scaleX:0.4905,scaleY:0.4905,x:1230.7979,y:386.2531},0).wait(1).to({scaleX:0.4878,scaleY:0.4878,x:1232.246,y:385.431},0).wait(1).to({scaleX:0.4851,scaleY:0.4851,x:1233.6941,y:384.6088},0).wait(1).to({scaleX:0.4824,scaleY:0.4824,x:1235.1423,y:383.7866},0).wait(1).to({scaleX:0.4796,scaleY:0.4796,x:1236.5904,y:382.9644},0).wait(1).to({scaleX:0.4769,scaleY:0.4769,x:1238.0385,y:382.1423},0).wait(1).to({scaleX:0.4742,scaleY:0.4742,x:1239.4866,y:381.3201},0).wait(1).to({scaleX:0.4715,scaleY:0.4715,x:1240.9347,y:380.4979},0).wait(1).to({scaleX:0.4687,scaleY:0.4687,x:1242.3828,y:379.6757},0).wait(1).to({scaleX:0.466,scaleY:0.466,x:1243.831,y:378.8536},0).wait(1).to({scaleX:0.4633,scaleY:0.4633,x:1245.2791,y:378.0314},0).wait(1).to({scaleX:0.4606,scaleY:0.4606,x:1246.7272,y:377.2092},0).wait(1).to({scaleX:0.4579,scaleY:0.4579,x:1248.1753,y:376.387},0).wait(1).to({scaleX:0.4551,scaleY:0.4551,x:1249.6234,y:375.5649},0).wait(1).to({scaleX:0.4524,scaleY:0.4524,x:1251.0715,y:374.7427},0).wait(1).to({scaleX:0.4497,scaleY:0.4497,x:1252.5197,y:373.9205},0).wait(1).to({scaleX:0.447,scaleY:0.447,x:1253.9678,y:373.0983},0).wait(1).to({scaleX:0.4442,scaleY:0.4442,x:1255.4159,y:372.2761},0).wait(1).to({scaleX:0.4415,scaleY:0.4415,x:1256.864,y:371.454},0).wait(1).to({scaleX:0.4388,scaleY:0.4388,x:1258.3121,y:370.6318},0).wait(1).to({scaleX:0.4361,scaleY:0.4361,x:1259.7603,y:369.8096},0).wait(1).to({scaleX:0.4333,scaleY:0.4333,x:1261.2084,y:368.9875},0).wait(1).to({scaleX:0.4306,scaleY:0.4306,x:1262.6565,y:368.1653},0).wait(1).to({scaleX:0.4279,scaleY:0.4279,x:1264.1046,y:367.3431},0).wait(1).to({scaleX:0.4252,scaleY:0.4252,x:1265.5527,y:366.5209},0).wait(1).to({scaleX:0.4224,scaleY:0.4224,x:1267.0008,y:365.6987},0).wait(1).to({scaleX:0.4197,scaleY:0.4197,x:1268.449,y:364.8766},0).wait(1).to({scaleX:0.417,scaleY:0.417,x:1269.8971,y:364.0544},0).wait(1).to({scaleX:0.4143,scaleY:0.4143,x:1271.3452,y:363.2322},0).wait(1).to({scaleX:0.4115,scaleY:0.4115,x:1272.7933,y:362.41},0).wait(1).to({scaleX:0.4088,scaleY:0.4088,x:1274.2414,y:361.5879},0).wait(1).to({scaleX:0.4061,scaleY:0.4061,x:1275.6895,y:360.7657},0).wait(1).to({scaleX:0.4034,scaleY:0.4034,x:1277.1377,y:359.9435},0).wait(1).to({scaleX:0.4006,scaleY:0.4006,x:1278.5858,y:359.1213},0).wait(1).to({scaleX:0.3979,scaleY:0.3979,x:1280.0339,y:358.2992},0).wait(1).to({scaleX:0.3952,scaleY:0.3952,x:1281.482,y:357.477},0).wait(1).to({scaleX:0.3925,scaleY:0.3925,x:1282.9301,y:356.6548},0).wait(1).to({scaleX:0.3897,scaleY:0.3897,x:1284.3782,y:355.8326},0).wait(1).to({scaleX:0.387,scaleY:0.387,x:1285.8264,y:355.0105},0).wait(1).to({scaleX:0.3843,scaleY:0.3843,x:1287.2745,y:354.1883},0).wait(1).to({scaleX:0.3816,scaleY:0.3816,x:1288.7226,y:353.3661},0).wait(1).to({scaleX:0.3788,scaleY:0.3788,x:1290.1707,y:352.5439},0).wait(1).to({scaleX:0.3761,scaleY:0.3761,x:1291.6188,y:351.7218},0).wait(1).to({scaleX:0.3734,scaleY:0.3734,x:1293.0669,y:350.8996},0).wait(1).to({scaleX:0.3707,scaleY:0.3707,x:1294.5151,y:350.0774},0).wait(1).to({scaleX:0.3679,scaleY:0.3679,x:1295.9632,y:349.2552},0).wait(1).to({scaleX:0.3652,scaleY:0.3652,x:1297.4113,y:348.4331},0).wait(1).to({scaleX:0.3625,scaleY:0.3625,x:1298.8594,y:347.6109},0).wait(1).to({scaleX:0.3598,scaleY:0.3598,x:1300.3075,y:346.7887},0).wait(1).to({scaleX:0.3571,scaleY:0.3571,x:1301.7556,y:345.9665},0).wait(1).to({scaleX:0.3543,scaleY:0.3543,x:1303.2038,y:345.1443},0).wait(1).to({scaleX:0.3516,scaleY:0.3516,x:1304.6519,y:344.3222},0).wait(1).to({scaleX:0.3489,scaleY:0.3489,x:1306.1,y:343.5},0).wait(1).to({scaleX:0.3481,scaleY:0.3481,x:1306.9168,y:343.4698},0).wait(1).to({scaleX:0.3474,scaleY:0.3474,x:1307.7337,y:343.4396},0).wait(1).to({scaleX:0.3467,scaleY:0.3467,x:1308.5505,y:343.4094},0).wait(1).to({scaleX:0.3459,scaleY:0.3459,x:1309.3673,y:343.3792},0).wait(1).to({scaleX:0.3452,scaleY:0.3452,x:1310.1842,y:343.349},0).wait(1).to({scaleX:0.3444,scaleY:0.3444,x:1311.001,y:343.3188},0).wait(1).to({scaleX:0.3437,scaleY:0.3437,x:1311.8178,y:343.2886},0).wait(1).to({scaleX:0.343,scaleY:0.343,x:1312.6347,y:343.2584},0).wait(1).to({scaleX:0.3422,scaleY:0.3422,x:1313.4515,y:343.2282},0).wait(1).to({scaleX:0.3415,scaleY:0.3415,x:1314.2683,y:343.198},0).wait(1).to({scaleX:0.3408,scaleY:0.3408,x:1315.0851,y:343.1678},0).wait(1).to({scaleX:0.34,scaleY:0.34,x:1315.902,y:343.1376},0).wait(1).to({scaleX:0.3393,scaleY:0.3393,x:1316.7188,y:343.1074},0).wait(1).to({scaleX:0.3385,scaleY:0.3385,x:1317.5356,y:343.0772},0).wait(1).to({scaleX:0.3378,scaleY:0.3378,x:1318.3525,y:343.047},0).wait(1).to({scaleX:0.3371,scaleY:0.3371,x:1319.1693,y:343.0168},0).wait(1).to({scaleX:0.3363,scaleY:0.3363,x:1319.9861,y:342.9866},0).wait(1).to({scaleX:0.3356,scaleY:0.3356,x:1320.803,y:342.9564},0).wait(1).to({scaleX:0.3349,scaleY:0.3349,x:1321.6198,y:342.9262},0).wait(1).to({scaleX:0.3341,scaleY:0.3341,x:1322.4366,y:342.896},0).wait(1).to({scaleX:0.3334,scaleY:0.3334,x:1323.2535,y:342.8658},0).wait(1).to({scaleX:0.3326,scaleY:0.3326,x:1324.0703,y:342.8356},0).wait(1).to({scaleX:0.3319,scaleY:0.3319,x:1324.8871,y:342.8055},0).wait(1).to({scaleX:0.3312,scaleY:0.3312,x:1325.704,y:342.7753},0).wait(1).to({scaleX:0.3304,scaleY:0.3304,x:1326.5208,y:342.7451},0).wait(1).to({scaleX:0.3297,scaleY:0.3297,x:1327.3376,y:342.7149},0).wait(1).to({scaleX:0.329,scaleY:0.329,x:1328.1545,y:342.6846},0).wait(1).to({scaleX:0.3282,scaleY:0.3282,x:1328.9713,y:342.6545},0).wait(1).to({scaleX:0.3275,scaleY:0.3275,x:1329.7881,y:342.6243},0).wait(1).to({scaleX:0.3267,scaleY:0.3267,x:1330.605,y:342.5941},0).wait(1).to({scaleX:0.326,scaleY:0.326,x:1331.4218,y:342.5639},0).wait(1).to({scaleX:0.3253,scaleY:0.3253,x:1332.2386,y:342.5337},0).wait(1).to({scaleX:0.3245,scaleY:0.3245,x:1333.0554,y:342.5035},0).wait(1).to({scaleX:0.3238,scaleY:0.3238,x:1333.8723,y:342.4733},0).wait(1).to({scaleX:0.323,scaleY:0.323,x:1334.6891,y:342.4431},0).wait(1).to({scaleX:0.3223,scaleY:0.3223,x:1335.5059,y:342.4129},0).wait(1).to({scaleX:0.3216,scaleY:0.3216,x:1336.3228,y:342.3827},0).wait(1).to({scaleX:0.3208,scaleY:0.3208,x:1337.1396,y:342.3525},0).wait(1).to({scaleX:0.3201,scaleY:0.3201,x:1337.9564,y:342.3223},0).wait(1).to({scaleX:0.3194,scaleY:0.3194,x:1338.7733,y:342.2921},0).wait(1).to({scaleX:0.3186,scaleY:0.3186,x:1339.5901,y:342.2619},0).wait(1).to({scaleX:0.3179,scaleY:0.3179,x:1340.4069,y:342.2317},0).wait(1).to({scaleX:0.3171,scaleY:0.3171,x:1341.2238,y:342.2015},0).wait(1).to({scaleX:0.3164,scaleY:0.3164,x:1342.0406,y:342.1713},0).wait(1).to({scaleX:0.3157,scaleY:0.3157,x:1342.8574,y:342.1411},0).wait(1).to({scaleX:0.3149,scaleY:0.3149,x:1343.6743,y:342.1109},0).wait(1).to({scaleX:0.3142,scaleY:0.3142,x:1344.4911,y:342.0807},0).wait(1).to({scaleX:0.3135,scaleY:0.3135,x:1345.3079,y:342.0505},0).wait(1).to({scaleX:0.3127,scaleY:0.3127,x:1346.1248,y:342.0203},0).wait(1).to({scaleX:0.312,scaleY:0.312,x:1346.9416,y:341.9901},0).wait(1).to({scaleX:0.3112,scaleY:0.3112,x:1347.7584,y:341.9599},0).wait(1).to({scaleX:0.3105,scaleY:0.3105,x:1348.5752,y:341.9297},0).wait(1).to({scaleX:0.3098,scaleY:0.3098,x:1349.3921,y:341.8995},0).wait(1).to({scaleX:0.309,scaleY:0.309,x:1350.2089,y:341.8693},0).wait(1).to({scaleX:0.3083,scaleY:0.3083,x:1351.0257,y:341.8391},0).wait(1).to({scaleX:0.3076,scaleY:0.3076,x:1351.8426,y:341.8089},0).wait(1).to({scaleX:0.3068,scaleY:0.3068,x:1352.6594,y:341.7787},0).wait(1).to({scaleX:0.3061,scaleY:0.3061,x:1353.4762,y:341.7485},0).wait(1).to({scaleX:0.3053,scaleY:0.3053,x:1354.2931,y:341.7183},0).wait(1).to({scaleX:0.3046,scaleY:0.3046,x:1355.1099,y:341.6881},0).wait(1).to({scaleX:0.3039,scaleY:0.3039,x:1355.9267,y:341.6579},0).wait(1).to({scaleX:0.3031,scaleY:0.3031,x:1356.7436,y:341.6277},0).wait(1).to({scaleX:0.3024,scaleY:0.3024,x:1357.5604,y:341.5975},0).wait(1).to({scaleX:0.3016,scaleY:0.3016,x:1358.3772,y:341.5673},0).wait(1).to({scaleX:0.3009,scaleY:0.3009,x:1359.1941,y:341.5371},0).wait(1).to({scaleX:0.3002,scaleY:0.3002,x:1360.0109,y:341.5069},0).wait(1).to({scaleX:0.2994,scaleY:0.2994,x:1360.8277,y:341.4767},0).wait(1).to({scaleX:0.2987,scaleY:0.2987,x:1361.6446,y:341.4465},0).wait(1).to({scaleX:0.298,scaleY:0.298,x:1362.4614,y:341.4163},0).wait(1).to({scaleX:0.2972,scaleY:0.2972,x:1363.2782,y:341.3861},0).wait(1).to({scaleX:0.2965,scaleY:0.2965,x:1364.095,y:341.3559},0).wait(1).to({scaleX:0.2957,scaleY:0.2957,x:1364.9119,y:341.3257},0).wait(1).to({scaleX:0.295,scaleY:0.295,x:1365.7287,y:341.2955},0).wait(1).to({scaleX:0.2943,scaleY:0.2943,x:1366.5455,y:341.2654},0).wait(1).to({scaleX:0.2935,scaleY:0.2935,x:1367.3624,y:341.2351},0).wait(1).to({scaleX:0.2928,scaleY:0.2928,x:1368.1792,y:341.205},0).wait(1).to({scaleX:0.2921,scaleY:0.2921,x:1368.996,y:341.1748},0).wait(1).to({scaleX:0.2913,scaleY:0.2913,x:1369.8129,y:341.1446},0).wait(1).to({scaleX:0.2906,scaleY:0.2906,x:1370.6297,y:341.1144},0).wait(1).to({scaleX:0.2898,scaleY:0.2898,x:1371.4465,y:341.0842},0).wait(1).to({scaleX:0.2891,scaleY:0.2891,x:1372.2634,y:341.054},0).wait(1).to({scaleX:0.2884,scaleY:0.2884,x:1373.0802,y:341.0238},0).wait(1).to({scaleX:0.2876,scaleY:0.2876,x:1373.897,y:340.9936},0).wait(1).to({scaleX:0.2869,scaleY:0.2869,x:1374.7139,y:340.9634},0).wait(1).to({scaleX:0.2862,scaleY:0.2862,x:1375.5307,y:340.9332},0).wait(1).to({scaleX:0.2854,scaleY:0.2854,x:1376.3475,y:340.903},0).wait(1).to({scaleX:0.2847,scaleY:0.2847,x:1377.1644,y:340.8728},0).wait(1).to({scaleX:0.2839,scaleY:0.2839,x:1377.9812,y:340.8426},0).wait(1).to({scaleX:0.2832,scaleY:0.2832,x:1378.798,y:340.8124},0).wait(1).to({scaleX:0.2825,scaleY:0.2825,x:1379.6149,y:340.7822},0).wait(1).to({scaleX:0.2817,scaleY:0.2817,x:1380.4317,y:340.752},0).wait(1).to({scaleX:0.281,scaleY:0.281,x:1381.2485,y:340.7218},0).wait(1).to({scaleX:0.2802,scaleY:0.2802,x:1382.0653,y:340.6916},0).wait(1).to({scaleX:0.2795,scaleY:0.2795,x:1382.8822,y:340.6614},0).wait(1).to({scaleX:0.2788,scaleY:0.2788,x:1383.699,y:340.6312},0).wait(1).to({scaleX:0.278,scaleY:0.278,x:1384.5158,y:340.601},0).wait(1).to({scaleX:0.2773,scaleY:0.2773,x:1385.3327,y:340.5708},0).wait(1).to({scaleX:0.2766,scaleY:0.2766,x:1386.1495,y:340.5406},0).wait(1).to({scaleX:0.2758,scaleY:0.2758,x:1386.9663,y:340.5104},0).wait(1).to({scaleX:0.2751,scaleY:0.2751,x:1387.7832,y:340.4802},0).wait(1).to({scaleX:0.2743,scaleY:0.2743,x:1388.6,y:340.45},0).wait(1).to({scaleX:0.2736,scaleY:0.2736,x:1389.4168,y:340.4198},0).wait(1).to({scaleX:0.2729,scaleY:0.2729,x:1390.2337,y:340.3896},0).wait(1).to({scaleX:0.2721,scaleY:0.2721,x:1391.0505,y:340.3594},0).wait(1).to({scaleX:0.2714,scaleY:0.2714,x:1391.8673,y:340.3292},0).wait(1).to({scaleX:0.2707,scaleY:0.2707,x:1392.6842,y:340.299},0).wait(1).to({scaleX:0.2699,scaleY:0.2699,x:1393.501,y:340.2688},0).wait(1).to({scaleX:0.2692,scaleY:0.2692,x:1394.3178,y:340.2386},0).wait(1).to({scaleX:0.2684,scaleY:0.2684,x:1395.1347,y:340.2084},0).wait(1).to({scaleX:0.2677,scaleY:0.2677,x:1395.9515,y:340.1782},0).wait(1).to({scaleX:0.267,scaleY:0.267,x:1396.7683,y:340.148},0).wait(1).to({scaleX:0.2662,scaleY:0.2662,x:1397.5851,y:340.1178},0).wait(1).to({scaleX:0.2655,scaleY:0.2655,x:1398.402,y:340.0876},0).wait(1).to({scaleX:0.2648,scaleY:0.2648,x:1399.2188,y:340.0574},0).wait(1).to({scaleX:0.264,scaleY:0.264,x:1400.0356,y:340.0272},0).wait(1).to({scaleX:0.2633,scaleY:0.2633,x:1400.8525,y:339.997},0).wait(1).to({scaleX:0.2625,scaleY:0.2625,x:1401.6693,y:339.9668},0).wait(1).to({scaleX:0.2618,scaleY:0.2618,x:1402.4861,y:339.9366},0).wait(1).to({scaleX:0.2611,scaleY:0.2611,x:1403.303,y:339.9064},0).wait(1).to({scaleX:0.2603,scaleY:0.2603,x:1404.1198,y:339.8762},0).wait(1).to({scaleX:0.2596,scaleY:0.2596,x:1404.9366,y:339.846},0).wait(1).to({scaleX:0.2588,scaleY:0.2588,x:1405.7535,y:339.8158},0).wait(1).to({scaleX:0.2581,scaleY:0.2581,x:1406.5703,y:339.7856},0).wait(1).to({scaleX:0.2574,scaleY:0.2574,x:1407.3871,y:339.7555},0).wait(1).to({scaleX:0.2566,scaleY:0.2566,x:1408.204,y:339.7253},0).wait(1).to({scaleX:0.2559,scaleY:0.2559,x:1409.0208,y:339.6951},0).wait(1).to({scaleX:0.2552,scaleY:0.2552,x:1409.8376,y:339.6649},0).wait(1).to({scaleX:0.2544,scaleY:0.2544,x:1410.6545,y:339.6347},0).wait(1).to({scaleX:0.2537,scaleY:0.2537,x:1411.4713,y:339.6045},0).wait(1).to({scaleX:0.2529,scaleY:0.2529,x:1412.2881,y:339.5743},0).wait(1).to({scaleX:0.2522,scaleY:0.2522,x:1413.105,y:339.5441},0).wait(1).to({scaleX:0.2515,scaleY:0.2515,x:1413.9218,y:339.5139},0).wait(1).to({scaleX:0.2507,scaleY:0.2507,x:1414.7386,y:339.4837},0).wait(1).to({scaleX:0.25,scaleY:0.25,x:1415.5554,y:339.4535},0).wait(1).to({scaleX:0.2493,scaleY:0.2493,x:1416.3723,y:339.4233},0).wait(1).to({scaleX:0.2485,scaleY:0.2485,x:1417.1891,y:339.3931},0).wait(1).to({scaleX:0.2478,scaleY:0.2478,x:1418.0059,y:339.3629},0).wait(1).to({scaleX:0.247,scaleY:0.247,x:1418.8228,y:339.3327},0).wait(1).to({scaleX:0.2463,scaleY:0.2463,x:1419.6396,y:339.3025},0).wait(1).to({scaleX:0.2456,scaleY:0.2456,x:1420.4564,y:339.2723},0).wait(1).to({scaleX:0.2448,scaleY:0.2448,x:1421.2733,y:339.2421},0).wait(1).to({scaleX:0.2441,scaleY:0.2441,x:1422.0901,y:339.2119},0).wait(1).to({scaleX:0.2434,scaleY:0.2434,x:1422.9069,y:339.1817},0).wait(1).to({scaleX:0.2426,scaleY:0.2426,x:1423.7238,y:339.1515},0).wait(1).to({scaleX:0.2419,scaleY:0.2419,x:1424.5406,y:339.1213},0).wait(1).to({scaleX:0.2411,scaleY:0.2411,x:1425.3574,y:339.0911},0).wait(1).to({scaleX:0.2404,scaleY:0.2404,x:1426.1743,y:339.0609},0).wait(1).to({scaleX:0.2397,scaleY:0.2397,x:1426.9911,y:339.0307},0).wait(1).to({scaleX:0.2389,scaleY:0.2389,x:1427.8079,y:339.0005},0).wait(1).to({scaleX:0.2382,scaleY:0.2382,x:1428.6248,y:338.9703},0).wait(1).to({scaleX:0.2374,scaleY:0.2374,x:1429.4416,y:338.9401},0).wait(1).to({scaleX:0.2367,scaleY:0.2367,x:1430.2584,y:338.9099},0).wait(1).to({scaleX:0.236,scaleY:0.236,x:1431.0752,y:338.8797},0).wait(1).to({scaleX:0.2352,scaleY:0.2352,x:1431.8921,y:338.8495},0).wait(1).to({scaleX:0.2345,scaleY:0.2345,x:1432.7089,y:338.8193},0).wait(1).to({scaleX:0.2338,scaleY:0.2338,x:1433.5257,y:338.7891},0).wait(1).to({scaleX:0.233,scaleY:0.233,x:1434.3426,y:338.7589},0).wait(1).to({scaleX:0.2323,scaleY:0.2323,x:1435.1594,y:338.7287},0).wait(1).to({scaleX:0.2315,scaleY:0.2315,x:1435.9762,y:338.6985},0).wait(1).to({scaleX:0.2308,scaleY:0.2308,x:1436.7931,y:338.6683},0).wait(1).to({scaleX:0.2301,scaleY:0.2301,x:1437.6099,y:338.6381},0).wait(1).to({scaleX:0.2293,scaleY:0.2293,x:1438.4267,y:338.6079},0).wait(1).to({scaleX:0.2286,scaleY:0.2286,x:1439.2436,y:338.5777},0).wait(1).to({scaleX:0.2279,scaleY:0.2279,x:1440.0604,y:338.5475},0).wait(1).to({scaleX:0.2271,scaleY:0.2271,x:1440.8772,y:338.5173},0).wait(1).to({scaleX:0.2264,scaleY:0.2264,x:1441.6941,y:338.4871},0).wait(1).to({scaleX:0.2256,scaleY:0.2256,x:1442.5109,y:338.4569},0).wait(1).to({scaleX:0.2249,scaleY:0.2249,x:1443.3277,y:338.4267},0).wait(1).to({scaleX:0.2242,scaleY:0.2242,x:1444.1446,y:338.3965},0).wait(1).to({scaleX:0.2234,scaleY:0.2234,x:1444.9614,y:338.3663},0).wait(1).to({scaleX:0.2227,scaleY:0.2227,x:1445.7782,y:338.3361},0).wait(1).to({scaleX:0.222,scaleY:0.222,x:1446.595,y:338.3059},0).wait(1).to({scaleX:0.2212,scaleY:0.2212,x:1447.4119,y:338.2757},0).wait(1).to({scaleX:0.2205,scaleY:0.2205,x:1448.2287,y:338.2455},0).wait(1).to({scaleX:0.2197,scaleY:0.2197,x:1449.0455,y:338.2154},0).wait(1).to({scaleX:0.219,scaleY:0.219,x:1449.8624,y:338.1852},0).wait(1).to({scaleX:0.2183,scaleY:0.2183,x:1450.6792,y:338.155},0).wait(1).to({scaleX:0.2175,scaleY:0.2175,x:1451.496,y:338.1248},0).wait(1).to({scaleX:0.2168,scaleY:0.2168,x:1452.3129,y:338.0946},0).wait(1).to({scaleX:0.216,scaleY:0.216,x:1453.1297,y:338.0644},0).wait(1).to({scaleX:0.2153,scaleY:0.2153,x:1453.9465,y:338.0342},0).wait(1).to({scaleX:0.2146,scaleY:0.2146,x:1454.7634,y:338.004},0).wait(1).to({scaleX:0.2138,scaleY:0.2138,x:1455.5802,y:337.9738},0).wait(1).to({scaleX:0.2131,scaleY:0.2131,x:1456.397,y:337.9436},0).wait(1).to({scaleX:0.2124,scaleY:0.2124,x:1457.2139,y:337.9134},0).wait(1).to({scaleX:0.2116,scaleY:0.2116,x:1458.0307,y:337.8832},0).wait(1).to({scaleX:0.2109,scaleY:0.2109,x:1458.8475,y:337.853},0).wait(1).to({scaleX:0.2101,scaleY:0.2101,x:1459.6644,y:337.8228},0).wait(1).to({scaleX:0.2094,scaleY:0.2094,x:1460.4812,y:337.7926},0).wait(1).to({scaleX:0.2087,scaleY:0.2087,x:1461.298,y:337.7624},0).wait(1).to({scaleX:0.2079,scaleY:0.2079,x:1462.1149,y:337.7322},0).wait(1).to({scaleX:0.2072,scaleY:0.2072,x:1462.9317,y:337.702},0).wait(1).to({scaleX:0.2065,scaleY:0.2065,x:1463.7485,y:337.6718},0).wait(1).to({scaleX:0.2057,scaleY:0.2057,x:1464.5653,y:337.6416},0).wait(1).to({scaleX:0.205,scaleY:0.205,x:1465.3822,y:337.6114},0).wait(1).to({scaleX:0.2042,scaleY:0.2042,x:1466.199,y:337.5812},0).wait(1).to({scaleX:0.2035,scaleY:0.2035,x:1467.0158,y:337.551},0).wait(1).to({scaleX:0.2028,scaleY:0.2028,x:1467.8327,y:337.5208},0).wait(1).to({scaleX:0.202,scaleY:0.202,x:1468.6495,y:337.4906},0).wait(1).to({scaleX:0.2013,scaleY:0.2013,x:1469.4663,y:337.4604},0).wait(1).to({scaleX:0.2006,scaleY:0.2006,x:1470.2832,y:337.4302},0).wait(1).to({scaleX:0.1998,scaleY:0.1998,x:1471.1,y:337.4},0).wait(1).to({scaleX:0.1995,scaleY:0.1995,x:1470.8535,y:337.3818},0).wait(1).to({scaleX:0.1992,scaleY:0.1992,x:1470.607,y:337.3635},0).wait(1).to({scaleX:0.1988,scaleY:0.1988,x:1470.3605,y:337.3453},0).wait(1).to({scaleX:0.1985,scaleY:0.1985,x:1470.1139,y:337.3271},0).wait(1).to({scaleX:0.1982,scaleY:0.1982,x:1469.8674,y:337.3088},0).wait(1).to({scaleX:0.1978,scaleY:0.1978,x:1469.6209,y:337.2906},0).wait(1).to({scaleX:0.1975,scaleY:0.1975,x:1469.3744,y:337.2723},0).wait(1).to({scaleX:0.1972,scaleY:0.1972,x:1469.1279,y:337.2541},0).wait(1).to({scaleX:0.1968,scaleY:0.1968,x:1468.8814,y:337.2359},0).wait(1).to({scaleX:0.1965,scaleY:0.1965,x:1468.6348,y:337.2176},0).wait(1).to({scaleX:0.1962,scaleY:0.1962,x:1468.3883,y:337.1994},0).wait(1).to({scaleX:0.1959,scaleY:0.1959,x:1468.1418,y:337.1812},0).wait(1).to({scaleX:0.1955,scaleY:0.1955,x:1467.8953,y:337.1629},0).wait(1).to({scaleX:0.1952,scaleY:0.1952,x:1467.6488,y:337.1447},0).wait(1).to({scaleX:0.1949,scaleY:0.1949,x:1467.4023,y:337.1264},0).wait(1).to({scaleX:0.1945,scaleY:0.1945,x:1467.1557,y:337.1082},0).wait(1).to({scaleX:0.1942,scaleY:0.1942,x:1466.9092,y:337.09},0).wait(1).to({scaleX:0.1939,scaleY:0.1939,x:1466.6627,y:337.0717},0).wait(1).to({scaleX:0.1936,scaleY:0.1936,x:1466.4162,y:337.0535},0).wait(1).to({scaleX:0.1932,scaleY:0.1932,x:1466.1697,y:337.0353},0).wait(1).to({scaleX:0.1929,scaleY:0.1929,x:1465.9232,y:337.017},0).wait(1).to({scaleX:0.1926,scaleY:0.1926,x:1465.6766,y:336.9988},0).wait(1).to({scaleX:0.1922,scaleY:0.1922,x:1465.4301,y:336.9805},0).wait(1).to({scaleX:0.1919,scaleY:0.1919,x:1465.1836,y:336.9623},0).wait(1).to({scaleX:0.1916,scaleY:0.1916,x:1464.9371,y:336.9441},0).wait(1).to({scaleX:0.1912,scaleY:0.1912,x:1464.6906,y:336.9258},0).wait(1).to({scaleX:0.1909,scaleY:0.1909,x:1464.4441,y:336.9076},0).wait(1).to({scaleX:0.1906,scaleY:0.1906,x:1464.1975,y:336.8893},0).wait(1).to({scaleX:0.1903,scaleY:0.1903,x:1463.951,y:336.8711},0).wait(1).to({scaleX:0.1899,scaleY:0.1899,x:1463.7045,y:336.8529},0).wait(1).to({scaleX:0.1896,scaleY:0.1896,x:1463.458,y:336.8346},0).wait(1).to({scaleX:0.1893,scaleY:0.1893,x:1463.2115,y:336.8164},0).wait(1).to({scaleX:0.1889,scaleY:0.1889,x:1462.965,y:336.7982},0).wait(1).to({scaleX:0.1886,scaleY:0.1886,x:1462.7184,y:336.7799},0).wait(1).to({scaleX:0.1883,scaleY:0.1883,x:1462.4719,y:336.7617},0).wait(1).to({scaleX:0.188,scaleY:0.188,x:1462.2254,y:336.7434},0).wait(1).to({scaleX:0.1876,scaleY:0.1876,x:1461.9789,y:336.7252},0).wait(1).to({scaleX:0.1873,scaleY:0.1873,x:1461.7324,y:336.707},0).wait(1).to({scaleX:0.187,scaleY:0.187,x:1461.4859,y:336.6887},0).wait(1).to({scaleX:0.1866,scaleY:0.1866,x:1461.2393,y:336.6705},0).wait(1).to({scaleX:0.1863,scaleY:0.1863,x:1460.9928,y:336.6523},0).wait(1).to({scaleX:0.186,scaleY:0.186,x:1460.7463,y:336.634},0).wait(1).to({scaleX:0.1856,scaleY:0.1856,x:1460.4998,y:336.6158},0).wait(1).to({scaleX:0.1853,scaleY:0.1853,x:1460.2533,y:336.5975},0).wait(1).to({scaleX:0.185,scaleY:0.185,x:1460.0068,y:336.5793},0).wait(1).to({scaleX:0.1847,scaleY:0.1847,x:1459.7602,y:336.5611},0).wait(1).to({scaleX:0.1843,scaleY:0.1843,x:1459.5137,y:336.5428},0).wait(1).to({scaleX:0.184,scaleY:0.184,x:1459.2672,y:336.5246},0).wait(1).to({scaleX:0.1837,scaleY:0.1837,x:1459.0207,y:336.5064},0).wait(1).to({scaleX:0.1833,scaleY:0.1833,x:1458.7742,y:336.4881},0).wait(1).to({scaleX:0.183,scaleY:0.183,x:1458.5277,y:336.4699},0).wait(1).to({scaleX:0.1827,scaleY:0.1827,x:1458.2811,y:336.4516},0).wait(1).to({scaleX:0.1824,scaleY:0.1824,x:1458.0346,y:336.4334},0).wait(1).to({scaleX:0.182,scaleY:0.182,x:1457.7881,y:336.4152},0).wait(1).to({scaleX:0.1817,scaleY:0.1817,x:1457.5416,y:336.3969},0).wait(1).to({scaleX:0.1814,scaleY:0.1814,x:1457.2951,y:336.3787},0).wait(1).to({scaleX:0.181,scaleY:0.181,x:1457.0486,y:336.3605},0).wait(1).to({scaleX:0.1807,scaleY:0.1807,x:1456.802,y:336.3422},0).wait(1).to({scaleX:0.1804,scaleY:0.1804,x:1456.5555,y:336.324},0).wait(1).to({scaleX:0.18,scaleY:0.18,x:1456.309,y:336.3057},0).wait(1).to({scaleX:0.1797,scaleY:0.1797,x:1456.0625,y:336.2875},0).wait(1).to({scaleX:0.1794,scaleY:0.1794,x:1455.816,y:336.2693},0).wait(1).to({scaleX:0.1791,scaleY:0.1791,x:1455.5695,y:336.251},0).wait(1).to({scaleX:0.1787,scaleY:0.1787,x:1455.323,y:336.2328},0).wait(1).to({scaleX:0.1784,scaleY:0.1784,x:1455.0764,y:336.2145},0).wait(1).to({scaleX:0.1781,scaleY:0.1781,x:1454.8299,y:336.1963},0).wait(1).to({scaleX:0.1777,scaleY:0.1777,x:1454.5834,y:336.1781},0).wait(1).to({scaleX:0.1774,scaleY:0.1774,x:1454.3369,y:336.1598},0).wait(1).to({scaleX:0.1771,scaleY:0.1771,x:1454.0904,y:336.1416},0).wait(1).to({scaleX:0.1767,scaleY:0.1767,x:1453.8439,y:336.1234},0).wait(1).to({scaleX:0.1764,scaleY:0.1764,x:1453.5973,y:336.1051},0).wait(1).to({scaleX:0.1761,scaleY:0.1761,x:1453.3508,y:336.0869},0).wait(1).to({scaleX:0.1758,scaleY:0.1758,x:1453.1043,y:336.0687},0).wait(1).to({scaleX:0.1754,scaleY:0.1754,x:1452.8578,y:336.0504},0).wait(1).to({scaleX:0.1751,scaleY:0.1751,x:1452.6113,y:336.0322},0).wait(1).to({scaleX:0.1748,scaleY:0.1748,x:1452.3648,y:336.0139},0).wait(1).to({scaleX:0.1744,scaleY:0.1744,x:1452.1182,y:335.9957},0).wait(1).to({scaleX:0.1741,scaleY:0.1741,x:1451.8717,y:335.9775},0).wait(1).to({scaleX:0.1738,scaleY:0.1738,x:1451.6252,y:335.9592},0).wait(1).to({scaleX:0.1735,scaleY:0.1735,x:1451.3787,y:335.941},0).wait(1).to({scaleX:0.1731,scaleY:0.1731,x:1451.1322,y:335.9228},0).wait(1).to({scaleX:0.1728,scaleY:0.1728,x:1450.8857,y:335.9045},0).wait(1).to({scaleX:0.1725,scaleY:0.1725,x:1450.6391,y:335.8863},0).wait(1).to({scaleX:0.1721,scaleY:0.1721,x:1450.3926,y:335.868},0).wait(1).to({scaleX:0.1718,scaleY:0.1718,x:1450.1461,y:335.8498},0).wait(1).to({scaleX:0.1715,scaleY:0.1715,x:1449.8996,y:335.8316},0).wait(1).to({scaleX:0.1711,scaleY:0.1711,x:1449.6531,y:335.8133},0).wait(1).to({scaleX:0.1708,scaleY:0.1708,x:1449.4066,y:335.7951},0).wait(1).to({scaleX:0.1705,scaleY:0.1705,x:1449.16,y:335.7768},0).wait(1).to({scaleX:0.1702,scaleY:0.1702,x:1448.9135,y:335.7586},0).wait(1).to({scaleX:0.1698,scaleY:0.1698,x:1448.667,y:335.7404},0).wait(1).to({scaleX:0.1695,scaleY:0.1695,x:1448.4205,y:335.7221},0).wait(1).to({scaleX:0.1692,scaleY:0.1692,x:1448.174,y:335.7039},0).wait(1).to({scaleX:0.1688,scaleY:0.1688,x:1447.9275,y:335.6857},0).wait(1).to({scaleX:0.1685,scaleY:0.1685,x:1447.6809,y:335.6674},0).wait(1).to({scaleX:0.1682,scaleY:0.1682,x:1447.4344,y:335.6492},0).wait(1).to({scaleX:0.1679,scaleY:0.1679,x:1447.1879,y:335.6309},0).wait(1).to({scaleX:0.1675,scaleY:0.1675,x:1446.9414,y:335.6127},0).wait(1).to({scaleX:0.1672,scaleY:0.1672,x:1446.6949,y:335.5945},0).wait(1).to({scaleX:0.1669,scaleY:0.1669,x:1446.4484,y:335.5762},0).wait(1).to({scaleX:0.1665,scaleY:0.1665,x:1446.2018,y:335.558},0).wait(1).to({scaleX:0.1662,scaleY:0.1662,x:1445.9553,y:335.5398},0).wait(1).to({scaleX:0.1659,scaleY:0.1659,x:1445.7088,y:335.5215},0).wait(1).to({scaleX:0.1655,scaleY:0.1655,x:1445.4623,y:335.5033},0).wait(1).to({scaleX:0.1652,scaleY:0.1652,x:1445.2158,y:335.485},0).wait(1).to({scaleX:0.1649,scaleY:0.1649,x:1444.9693,y:335.4668},0).wait(1).to({scaleX:0.1646,scaleY:0.1646,x:1444.7227,y:335.4486},0).wait(1).to({scaleX:0.1642,scaleY:0.1642,x:1444.4762,y:335.4303},0).wait(1).to({scaleX:0.1639,scaleY:0.1639,x:1444.2297,y:335.4121},0).wait(1).to({scaleX:0.1636,scaleY:0.1636,x:1443.9832,y:335.3939},0).wait(1).to({scaleX:0.1632,scaleY:0.1632,x:1443.7367,y:335.3756},0).wait(1).to({scaleX:0.1629,scaleY:0.1629,x:1443.4902,y:335.3574},0).wait(1).to({scaleX:0.1626,scaleY:0.1626,x:1443.2436,y:335.3391},0).wait(1).to({scaleX:0.1623,scaleY:0.1623,x:1442.9971,y:335.3209},0).wait(1).to({scaleX:0.1619,scaleY:0.1619,x:1442.7506,y:335.3027},0).wait(1).to({scaleX:0.1616,scaleY:0.1616,x:1442.5041,y:335.2844},0).wait(1).to({scaleX:0.1613,scaleY:0.1613,x:1442.2576,y:335.2662},0).wait(1).to({scaleX:0.1609,scaleY:0.1609,x:1442.0111,y:335.248},0).wait(1).to({scaleX:0.1606,scaleY:0.1606,x:1441.7645,y:335.2297},0).wait(1).to({scaleX:0.1603,scaleY:0.1603,x:1441.518,y:335.2115},0).wait(1).to({scaleX:0.1599,scaleY:0.1599,x:1441.2715,y:335.1932},0).wait(1).to({scaleX:0.1596,scaleY:0.1596,x:1441.025,y:335.175},0).wait(1).to({scaleX:0.1593,scaleY:0.1593,x:1440.7785,y:335.1568},0).wait(1).to({scaleX:0.159,scaleY:0.159,x:1440.532,y:335.1385},0).wait(1).to({scaleX:0.1586,scaleY:0.1586,x:1440.2855,y:335.1203},0).wait(1).to({scaleX:0.1583,scaleY:0.1583,x:1440.0389,y:335.1021},0).wait(1).to({scaleX:0.158,scaleY:0.158,x:1439.7924,y:335.0838},0).wait(1).to({scaleX:0.1576,scaleY:0.1576,x:1439.5459,y:335.0656},0).wait(1).to({scaleX:0.1573,scaleY:0.1573,x:1439.2994,y:335.0473},0).wait(1).to({scaleX:0.157,scaleY:0.157,x:1439.0529,y:335.0291},0).wait(1).to({scaleX:0.1566,scaleY:0.1566,x:1438.8064,y:335.0109},0).wait(1).to({scaleX:0.1563,scaleY:0.1563,x:1438.5598,y:334.9926},0).wait(1).to({scaleX:0.156,scaleY:0.156,x:1438.3133,y:334.9744},0).wait(1).to({scaleX:0.1557,scaleY:0.1557,x:1438.0668,y:334.9562},0).wait(1).to({scaleX:0.1553,scaleY:0.1553,x:1437.8203,y:334.9379},0).wait(1).to({scaleX:0.155,scaleY:0.155,x:1437.5738,y:334.9197},0).wait(1).to({scaleX:0.1547,scaleY:0.1547,x:1437.3273,y:334.9014},0).wait(1).to({scaleX:0.1543,scaleY:0.1543,x:1437.0807,y:334.8832},0).wait(1).to({scaleX:0.154,scaleY:0.154,x:1436.8342,y:334.865},0).wait(1).to({scaleX:0.1537,scaleY:0.1537,x:1436.5877,y:334.8467},0).wait(1).to({scaleX:0.1534,scaleY:0.1534,x:1436.3412,y:334.8285},0).wait(1).to({scaleX:0.153,scaleY:0.153,x:1436.0947,y:334.8103},0).wait(1).to({scaleX:0.1527,scaleY:0.1527,x:1435.8482,y:334.792},0).wait(1).to({scaleX:0.1524,scaleY:0.1524,x:1435.6016,y:334.7738},0).wait(1).to({scaleX:0.152,scaleY:0.152,x:1435.3551,y:334.7555},0).wait(1).to({scaleX:0.1517,scaleY:0.1517,x:1435.1086,y:334.7373},0).wait(1).to({scaleX:0.1514,scaleY:0.1514,x:1434.8621,y:334.7191},0).wait(1).to({scaleX:0.151,scaleY:0.151,x:1434.6156,y:334.7008},0).wait(1).to({scaleX:0.1507,scaleY:0.1507,x:1434.3691,y:334.6826},0).wait(1).to({scaleX:0.1504,scaleY:0.1504,x:1434.1225,y:334.6643},0).wait(1).to({scaleX:0.1501,scaleY:0.1501,x:1433.876,y:334.6461},0).wait(1).to({scaleX:0.1497,scaleY:0.1497,x:1433.6295,y:334.6279},0).wait(1).to({scaleX:0.1494,scaleY:0.1494,x:1433.383,y:334.6096},0).wait(1).to({scaleX:0.1491,scaleY:0.1491,x:1433.1365,y:334.5914},0).wait(1).to({scaleX:0.1487,scaleY:0.1487,x:1432.89,y:334.5732},0).wait(1).to({scaleX:0.1484,scaleY:0.1484,x:1432.6434,y:334.5549},0).wait(1).to({scaleX:0.1481,scaleY:0.1481,x:1432.3969,y:334.5367},0).wait(1).to({scaleX:0.1478,scaleY:0.1478,x:1432.1504,y:334.5184},0).wait(1).to({scaleX:0.1474,scaleY:0.1474,x:1431.9039,y:334.5002},0).wait(1).to({scaleX:0.1471,scaleY:0.1471,x:1431.6574,y:334.482},0).wait(1).to({scaleX:0.1468,scaleY:0.1468,x:1431.4109,y:334.4637},0).wait(1).to({scaleX:0.1464,scaleY:0.1464,x:1431.1643,y:334.4455},0).wait(1).to({scaleX:0.1461,scaleY:0.1461,x:1430.9178,y:334.4273},0).wait(1).to({scaleX:0.1458,scaleY:0.1458,x:1430.6713,y:334.409},0).wait(1).to({scaleX:0.1454,scaleY:0.1454,x:1430.4248,y:334.3908},0).wait(1).to({scaleX:0.1451,scaleY:0.1451,x:1430.1783,y:334.3725},0).wait(1).to({scaleX:0.1448,scaleY:0.1448,x:1429.9318,y:334.3543},0).wait(1).to({scaleX:0.1445,scaleY:0.1445,x:1429.6852,y:334.3361},0).wait(1).to({scaleX:0.1441,scaleY:0.1441,x:1429.4387,y:334.3178},0).wait(1).to({scaleX:0.1438,scaleY:0.1438,x:1429.1922,y:334.2996},0).wait(1).to({scaleX:0.1435,scaleY:0.1435,x:1428.9457,y:334.2813},0).wait(1).to({scaleX:0.1431,scaleY:0.1431,x:1428.6992,y:334.2631},0).wait(1).to({scaleX:0.1428,scaleY:0.1428,x:1428.4527,y:334.2449},0).wait(1).to({scaleX:0.1425,scaleY:0.1425,x:1428.2061,y:334.2266},0).wait(1).to({scaleX:0.1422,scaleY:0.1422,x:1427.9596,y:334.2084},0).wait(1).to({scaleX:0.1418,scaleY:0.1418,x:1427.7131,y:334.1902},0).wait(1).to({scaleX:0.1415,scaleY:0.1415,x:1427.4666,y:334.1719},0).wait(1).to({scaleX:0.1412,scaleY:0.1412,x:1427.2201,y:334.1537},0).wait(1).to({scaleX:0.1408,scaleY:0.1408,x:1426.9736,y:334.1355},0).wait(1).to({scaleX:0.1405,scaleY:0.1405,x:1426.727,y:334.1172},0).wait(1).to({scaleX:0.1402,scaleY:0.1402,x:1426.4805,y:334.099},0).wait(1).to({scaleX:0.1398,scaleY:0.1398,x:1426.234,y:334.0807},0).wait(1).to({scaleX:0.1395,scaleY:0.1395,x:1425.9875,y:334.0625},0).wait(1).to({scaleX:0.1392,scaleY:0.1392,x:1425.741,y:334.0443},0).wait(1).to({scaleX:0.1389,scaleY:0.1389,x:1425.4945,y:334.026},0).wait(1).to({scaleX:0.1385,scaleY:0.1385,x:1425.248,y:334.0078},0).wait(1).to({scaleX:0.1382,scaleY:0.1382,x:1425.0014,y:333.9896},0).wait(1).to({scaleX:0.1379,scaleY:0.1379,x:1424.7549,y:333.9713},0).wait(1).to({scaleX:0.1375,scaleY:0.1375,x:1424.5084,y:333.9531},0).wait(1).to({scaleX:0.1372,scaleY:0.1372,x:1424.2619,y:333.9348},0).wait(1).to({scaleX:0.1369,scaleY:0.1369,x:1424.0154,y:333.9166},0).wait(1).to({scaleX:0.1365,scaleY:0.1365,x:1423.7689,y:333.8984},0).wait(1).to({scaleX:0.1362,scaleY:0.1362,x:1423.5223,y:333.8801},0).wait(1).to({scaleX:0.1359,scaleY:0.1359,x:1423.2758,y:333.8619},0).wait(1).to({scaleX:0.1356,scaleY:0.1356,x:1423.0293,y:333.8437},0).wait(1).to({scaleX:0.1352,scaleY:0.1352,x:1422.7828,y:333.8254},0).wait(1).to({scaleX:0.1349,scaleY:0.1349,x:1422.5363,y:333.8072},0).wait(1).to({scaleX:0.1346,scaleY:0.1346,x:1422.2898,y:333.7889},0).wait(1).to({scaleX:0.1342,scaleY:0.1342,x:1422.0432,y:333.7707},0).wait(1).to({scaleX:0.1339,scaleY:0.1339,x:1421.7967,y:333.7525},0).wait(1).to({scaleX:0.1336,scaleY:0.1336,x:1421.5502,y:333.7342},0).wait(1).to({scaleX:0.1333,scaleY:0.1333,x:1421.3037,y:333.716},0).wait(1).to({scaleX:0.1329,scaleY:0.1329,x:1421.0572,y:333.6978},0).wait(1).to({scaleX:0.1326,scaleY:0.1326,x:1420.8107,y:333.6795},0).wait(1).to({scaleX:0.1323,scaleY:0.1323,x:1420.5641,y:333.6613},0).wait(1).to({scaleX:0.1319,scaleY:0.1319,x:1420.3176,y:333.643},0).wait(1).to({scaleX:0.1316,scaleY:0.1316,x:1420.0711,y:333.6248},0).wait(1).to({scaleX:0.1313,scaleY:0.1313,x:1419.8246,y:333.6066},0).wait(1).to({scaleX:0.1309,scaleY:0.1309,x:1419.5781,y:333.5883},0).wait(1).to({scaleX:0.1306,scaleY:0.1306,x:1419.3316,y:333.5701},0).wait(1).to({scaleX:0.1303,scaleY:0.1303,x:1419.085,y:333.5518},0).wait(1).to({scaleX:0.13,scaleY:0.13,x:1418.8385,y:333.5336},0).wait(1).to({scaleX:0.1296,scaleY:0.1296,x:1418.592,y:333.5154},0).wait(1).to({scaleX:0.1293,scaleY:0.1293,x:1418.3455,y:333.4971},0).wait(1).to({scaleX:0.129,scaleY:0.129,x:1418.099,y:333.4789},0).wait(1).to({scaleX:0.1286,scaleY:0.1286,x:1417.8525,y:333.4607},0).wait(1).to({scaleX:0.1283,scaleY:0.1283,x:1417.6059,y:333.4424},0).wait(1).to({scaleX:0.128,scaleY:0.128,x:1417.3594,y:333.4242},0).wait(1).to({scaleX:0.1277,scaleY:0.1277,x:1417.1129,y:333.4059},0).wait(1).to({scaleX:0.1273,scaleY:0.1273,x:1416.8664,y:333.3877},0).wait(1).to({scaleX:0.127,scaleY:0.127,x:1416.6199,y:333.3695},0).wait(1).to({scaleX:0.1267,scaleY:0.1267,x:1416.3734,y:333.3512},0).wait(1).to({scaleX:0.1263,scaleY:0.1263,x:1416.1268,y:333.333},0).wait(1).to({scaleX:0.126,scaleY:0.126,x:1415.8803,y:333.3148},0).wait(1).to({scaleX:0.1257,scaleY:0.1257,x:1415.6338,y:333.2965},0).wait(1).to({scaleX:0.1253,scaleY:0.1253,x:1415.3873,y:333.2783},0).wait(1).to({scaleX:0.125,scaleY:0.125,x:1415.1408,y:333.26},0).wait(1).to({scaleX:0.1247,scaleY:0.1247,x:1414.8943,y:333.2418},0).wait(1).to({scaleX:0.1244,scaleY:0.1244,x:1414.6477,y:333.2236},0).wait(1).to({scaleX:0.124,scaleY:0.124,x:1414.4012,y:333.2053},0).wait(1).to({scaleX:0.1237,scaleY:0.1237,x:1414.1547,y:333.1871},0).wait(1).to({scaleX:0.1234,scaleY:0.1234,x:1413.9082,y:333.1689},0).wait(1).to({scaleX:0.123,scaleY:0.123,x:1413.6617,y:333.1506},0).wait(1).to({scaleX:0.1227,scaleY:0.1227,x:1413.4152,y:333.1324},0).wait(1).to({scaleX:0.1224,scaleY:0.1224,x:1413.1686,y:333.1141},0).wait(1).to({scaleX:0.1221,scaleY:0.1221,x:1412.9221,y:333.0959},0).wait(1).to({scaleX:0.1217,scaleY:0.1217,x:1412.6756,y:333.0777},0).wait(1).to({scaleX:0.1214,scaleY:0.1214,x:1412.4291,y:333.0594},0).wait(1).to({scaleX:0.1211,scaleY:0.1211,x:1412.1826,y:333.0412},0).wait(1).to({scaleX:0.1207,scaleY:0.1207,x:1411.9361,y:333.023},0).wait(1).to({scaleX:0.1204,scaleY:0.1204,x:1411.6895,y:333.0047},0).wait(1).to({scaleX:0.1201,scaleY:0.1201,x:1411.443,y:332.9865},0).wait(1).to({scaleX:0.1197,scaleY:0.1197,x:1411.1965,y:332.9682},0).wait(1).to({scaleX:0.1194,scaleY:0.1194,x:1410.95,y:332.95},0).wait(1).to({scaleX:0.1199,scaleY:0.1199,x:1411.215,y:333.2315},0).wait(1).to({scaleX:0.1204,scaleY:0.1204,x:1411.48,y:333.513},0).wait(1).to({scaleX:0.1209,scaleY:0.1209,x:1411.745,y:333.7945},0).wait(1).to({scaleX:0.1214,scaleY:0.1214,x:1412.01,y:334.076},0).wait(1).to({scaleX:0.1219,scaleY:0.1219,x:1412.275,y:334.3575},0).wait(1).to({scaleX:0.1224,scaleY:0.1224,x:1412.54,y:334.639},0).wait(1).to({scaleX:0.1229,scaleY:0.1229,x:1412.805,y:334.9205},0).wait(1).to({scaleX:0.1234,scaleY:0.1234,x:1413.07,y:335.202},0).wait(1).to({scaleX:0.1239,scaleY:0.1239,x:1413.335,y:335.4835},0).wait(1).to({scaleX:0.1244,scaleY:0.1244,x:1413.6,y:335.765},0).wait(1).to({scaleX:0.1249,scaleY:0.1249,x:1413.865,y:336.0465},0).wait(1).to({scaleX:0.1254,scaleY:0.1254,x:1414.13,y:336.328},0).wait(1).to({scaleX:0.1259,scaleY:0.1259,x:1414.395,y:336.6095},0).wait(1).to({scaleX:0.1264,scaleY:0.1264,x:1414.66,y:336.891},0).wait(1).to({scaleX:0.1269,scaleY:0.1269,x:1414.925,y:337.1725},0).wait(1).to({scaleX:0.1274,scaleY:0.1274,x:1415.19,y:337.454},0).wait(1).to({scaleX:0.1279,scaleY:0.1279,x:1415.455,y:337.7355},0).wait(1).to({scaleX:0.1284,scaleY:0.1284,x:1415.72,y:338.017},0).wait(1).to({scaleX:0.1289,scaleY:0.1289,x:1415.985,y:338.2985},0).wait(1).to({scaleX:0.1294,scaleY:0.1294,x:1416.25,y:338.58},0).wait(1).to({scaleX:0.1299,scaleY:0.1299,x:1416.515,y:338.8615},0).wait(1).to({scaleX:0.1304,scaleY:0.1304,x:1416.78,y:339.143},0).wait(1).to({scaleX:0.1309,scaleY:0.1309,x:1417.045,y:339.4245},0).wait(1).to({scaleX:0.1314,scaleY:0.1314,x:1417.31,y:339.706},0).wait(1).to({scaleX:0.1319,scaleY:0.1319,x:1417.575,y:339.9875},0).wait(1).to({scaleX:0.1324,scaleY:0.1324,x:1417.84,y:340.269},0).wait(1).to({scaleX:0.1329,scaleY:0.1329,x:1418.105,y:340.5505},0).wait(1).to({scaleX:0.1334,scaleY:0.1334,x:1418.37,y:340.832},0).wait(1).to({scaleX:0.1339,scaleY:0.1339,x:1418.635,y:341.1135},0).wait(1).to({scaleX:0.1344,scaleY:0.1344,x:1418.9,y:341.395},0).wait(1).to({scaleX:0.1349,scaleY:0.1349,x:1419.165,y:341.6765},0).wait(1).to({scaleX:0.1354,scaleY:0.1354,x:1419.43,y:341.958},0).wait(1).to({scaleX:0.1359,scaleY:0.1359,x:1419.695,y:342.2395},0).wait(1).to({scaleX:0.1364,scaleY:0.1364,x:1419.96,y:342.521},0).wait(1).to({scaleX:0.1369,scaleY:0.1369,x:1420.225,y:342.8025},0).wait(1).to({scaleX:0.1374,scaleY:0.1374,x:1420.49,y:343.084},0).wait(1).to({scaleX:0.1379,scaleY:0.1379,x:1420.755,y:343.3655},0).wait(1).to({scaleX:0.1384,scaleY:0.1384,x:1421.02,y:343.647},0).wait(1).to({scaleX:0.1389,scaleY:0.1389,x:1421.285,y:343.9285},0).wait(1).to({scaleX:0.1394,scaleY:0.1394,x:1421.55,y:344.21},0).wait(1).to({scaleX:0.1399,scaleY:0.1399,x:1421.815,y:344.4915},0).wait(1).to({scaleX:0.1404,scaleY:0.1404,x:1422.08,y:344.773},0).wait(1).to({scaleX:0.1409,scaleY:0.1409,x:1422.345,y:345.0545},0).wait(1).to({scaleX:0.1414,scaleY:0.1414,x:1422.61,y:345.336},0).wait(1).to({scaleX:0.1419,scaleY:0.1419,x:1422.875,y:345.6175},0).wait(1).to({scaleX:0.1424,scaleY:0.1424,x:1423.14,y:345.899},0).wait(1).to({scaleX:0.1429,scaleY:0.1429,x:1423.405,y:346.1805},0).wait(1).to({scaleX:0.1434,scaleY:0.1434,x:1423.67,y:346.462},0).wait(1).to({scaleX:0.1439,scaleY:0.1439,x:1423.935,y:346.7435},0).wait(1).to({scaleX:0.1444,scaleY:0.1444,x:1424.2,y:347.025},0).wait(1).to({scaleX:0.1449,scaleY:0.1449,x:1424.465,y:347.3065},0).wait(1).to({scaleX:0.1454,scaleY:0.1454,x:1424.73,y:347.588},0).wait(1).to({scaleX:0.1459,scaleY:0.1459,x:1424.995,y:347.8695},0).wait(1).to({scaleX:0.1464,scaleY:0.1464,x:1425.26,y:348.151},0).wait(1).to({scaleX:0.1469,scaleY:0.1469,x:1425.525,y:348.4325},0).wait(1).to({scaleX:0.1474,scaleY:0.1474,x:1425.79,y:348.714},0).wait(1).to({scaleX:0.1479,scaleY:0.1479,x:1426.055,y:348.9955},0).wait(1).to({scaleX:0.1484,scaleY:0.1484,x:1426.32,y:349.277},0).wait(1).to({scaleX:0.1489,scaleY:0.1489,x:1426.585,y:349.5585},0).wait(1).to({scaleX:0.1494,scaleY:0.1494,x:1426.85,y:349.84},0).wait(1).to({scaleX:0.1499,scaleY:0.1499,x:1427.115,y:350.1215},0).wait(1).to({scaleX:0.1504,scaleY:0.1504,x:1427.38,y:350.403},0).wait(1).to({scaleX:0.1509,scaleY:0.1509,x:1427.645,y:350.6845},0).wait(1).to({scaleX:0.1514,scaleY:0.1514,x:1427.91,y:350.966},0).wait(1).to({scaleX:0.1519,scaleY:0.1519,x:1428.175,y:351.2475},0).wait(1).to({scaleX:0.1524,scaleY:0.1524,x:1428.44,y:351.529},0).wait(1).to({scaleX:0.1529,scaleY:0.1529,x:1428.705,y:351.8105},0).wait(1).to({scaleX:0.1534,scaleY:0.1534,x:1428.97,y:352.092},0).wait(1).to({scaleX:0.1539,scaleY:0.1539,x:1429.235,y:352.3735},0).wait(1).to({scaleX:0.1544,scaleY:0.1544,x:1429.5,y:352.655},0).wait(1).to({scaleX:0.1549,scaleY:0.1549,x:1429.765,y:352.9365},0).wait(1).to({scaleX:0.1554,scaleY:0.1554,x:1430.03,y:353.218},0).wait(1).to({scaleX:0.1559,scaleY:0.1559,x:1430.295,y:353.4995},0).wait(1).to({scaleX:0.1564,scaleY:0.1564,x:1430.56,y:353.781},0).wait(1).to({scaleX:0.1569,scaleY:0.1569,x:1430.825,y:354.0625},0).wait(1).to({scaleX:0.1574,scaleY:0.1574,x:1431.09,y:354.344},0).wait(1).to({scaleX:0.1579,scaleY:0.1579,x:1431.355,y:354.6255},0).wait(1).to({scaleX:0.1584,scaleY:0.1584,x:1431.62,y:354.907},0).wait(1).to({scaleX:0.1589,scaleY:0.1589,x:1431.885,y:355.1885},0).wait(1).to({scaleX:0.1594,scaleY:0.1594,x:1432.15,y:355.47},0).wait(1).to({scaleX:0.1599,scaleY:0.1599,x:1432.415,y:355.7515},0).wait(1).to({scaleX:0.1604,scaleY:0.1604,x:1432.68,y:356.033},0).wait(1).to({scaleX:0.1609,scaleY:0.1609,x:1432.945,y:356.3145},0).wait(1).to({scaleX:0.1614,scaleY:0.1614,x:1433.21,y:356.596},0).wait(1).to({scaleX:0.1619,scaleY:0.1619,x:1433.475,y:356.8775},0).wait(1).to({scaleX:0.1624,scaleY:0.1624,x:1433.74,y:357.159},0).wait(1).to({scaleX:0.1629,scaleY:0.1629,x:1434.005,y:357.4405},0).wait(1).to({scaleX:0.1634,scaleY:0.1634,x:1434.27,y:357.722},0).wait(1).to({scaleX:0.1639,scaleY:0.1639,x:1434.535,y:358.0035},0).wait(1).to({scaleX:0.1644,scaleY:0.1644,x:1434.8,y:358.285},0).wait(1).to({scaleX:0.1649,scaleY:0.1649,x:1435.065,y:358.5665},0).wait(1).to({scaleX:0.1654,scaleY:0.1654,x:1435.33,y:358.848},0).wait(1).to({scaleX:0.1659,scaleY:0.1659,x:1435.595,y:359.1295},0).wait(1).to({scaleX:0.1664,scaleY:0.1664,x:1435.86,y:359.411},0).wait(1).to({scaleX:0.1669,scaleY:0.1669,x:1436.125,y:359.6925},0).wait(1).to({scaleX:0.1674,scaleY:0.1674,x:1436.39,y:359.974},0).wait(1).to({scaleX:0.1679,scaleY:0.1679,x:1436.655,y:360.2555},0).wait(1).to({scaleX:0.1684,scaleY:0.1684,x:1436.92,y:360.537},0).wait(1).to({scaleX:0.1689,scaleY:0.1689,x:1437.185,y:360.8185},0).wait(1).to({scaleX:0.1694,scaleY:0.1694,x:1437.45,y:361.1},0).wait(1).to({scaleX:0.1699,scaleY:0.1699,x:1445.24,y:360.81},0).wait(1).to({scaleX:0.1704,scaleY:0.1704,x:1453.03,y:360.52},0).wait(1).to({scaleX:0.171,scaleY:0.171,x:1460.82,y:360.23},0).wait(1).to({scaleX:0.1715,scaleY:0.1715,x:1468.61,y:359.94},0).wait(1).to({scaleX:0.172,scaleY:0.172,x:1476.4,y:359.65},0).wait(1).to({scaleX:0.1793,scaleY:0.1793,x:1485.3833,y:386.9},0).wait(1).to({scaleX:0.1867,scaleY:0.1867,x:1494.3667,y:414.15},0).wait(1).to({scaleX:0.1941,scaleY:0.1941,x:1503.35,y:441.4},0).wait(1).to({scaleX:0.2082,scaleY:0.2082,x:1499.4833,y:463.9667},0).wait(1).to({scaleX:0.2223,scaleY:0.2223,x:1495.6167,y:486.5333},0).wait(1).to({scaleX:0.2364,scaleY:0.2364,x:1491.75,y:509.1},0).wait(1).to({scaleX:0.2427,scaleY:0.2427,x:1490.3875,y:515.9188},0).wait(1).to({scaleX:0.249,scaleY:0.249,x:1489.025,y:522.7375},0).wait(1).to({scaleX:0.2552,scaleY:0.2552,x:1487.6625,y:529.5563},0).wait(1).to({scaleX:0.2615,scaleY:0.2615,x:1486.3,y:536.375},0).wait(1).to({scaleX:0.2678,scaleY:0.2678,x:1484.9375,y:543.1938},0).wait(1).to({scaleX:0.2741,scaleY:0.2741,x:1483.575,y:550.0125},0).wait(1).to({scaleX:0.2804,scaleY:0.2804,x:1482.2125,y:556.8313},0).wait(1).to({scaleX:0.2866,scaleY:0.2866,x:1480.85,y:563.65},0).wait(1).to({scaleX:0.3276,scaleY:0.3276,x:1455.1357,y:551.7571},0).wait(1).to({scaleX:0.3685,scaleY:0.3685,x:1429.4214,y:539.8643},0).wait(1).to({scaleX:0.4095,scaleY:0.4095,x:1403.7071,y:527.9714},0).wait(1).to({scaleX:0.4504,scaleY:0.4504,x:1377.9929,y:516.0786},0).wait(1).to({scaleX:0.4913,scaleY:0.4913,x:1352.2786,y:504.1857},0).wait(1).to({scaleX:0.5323,scaleY:0.5323,x:1326.5643,y:492.2929},0).wait(1).to({scaleX:0.5732,scaleY:0.5732,x:1300.85,y:480.4},0).wait(97).to({_off:true},1).wait(1));

	// background_obj_
	this.background = new lib.Scene_1_background();
	this.background.name = "background";
	this.background.setTransform(995,500.8,1,1,0,0,0,995,500.8);
	this.background.depth = 0;
	this.background.isAttachedToCamera = 0
	this.background.isAttachedToMask = 0
	this.background.layerDepth = 0
	this.background.layerIndex = 0
	this.background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background).wait(1).to({regX:996.3,regY:500.2,scaleX:1.0027,scaleY:1.0027,x:994.95,y:500.85},0).wait(908).to({regX:995,regY:500.8,scaleX:1,scaleY:1,x:995,y:500.8},0).wait(1));

	// legg_obj_
	this.legg = new lib.Scene_1_legg();
	this.legg.name = "legg";
	this.legg.depth = 0;
	this.legg.isAttachedToCamera = 0
	this.legg.isAttachedToMask = 0
	this.legg.layerDepth = 0
	this.legg.layerIndex = 1
	this.legg.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.legg).wait(1).to({regX:4,regY:0.7,scaleX:1.0027,scaleY:1.0027,x:-0.05},0).wait(624).to({regX:1292.1,regY:258.9,scaleX:7.1852,scaleY:7.1852,x:0,y:0.05},0).wait(1).to({regX:1292.2,regY:259.1,scaleX:7.2018,scaleY:7.2018,x:0.35,y:0},0).wait(1).to({regY:259.2,scaleX:7.2192,scaleY:7.2192,x:-0.35,y:-0.35},0).wait(12).to({regX:1293.1,regY:261.1,scaleX:7.4312,scaleY:7.4312,x:0},0).wait(5).to({regX:1293.5,regY:261.9,scaleX:7.5234,scaleY:7.5234,x:0.4},0).to({_off:true},1).wait(265));

	// eggs_obj_
	this.eggs = new lib.Scene_1_eggs();
	this.eggs.name = "eggs";
	this.eggs.depth = 0;
	this.eggs.isAttachedToCamera = 0
	this.eggs.isAttachedToMask = 0
	this.eggs.layerDepth = 0
	this.eggs.layerIndex = 2
	this.eggs.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.eggs).wait(1).to({regX:4,regY:0.7,scaleX:1.0027,scaleY:1.0027,x:-0.05},0).wait(169).to({regX:690.8,regY:110.4,scaleX:1.8627,scaleY:1.8627,x:0,y:0.05},0).wait(9).to({regX:727.4,regY:116.2,scaleX:1.9519,scaleY:1.9519,y:0},0).wait(8).to({regX:759.9,regY:121.5,scaleX:2.0386,scaleY:2.0386,x:0.1,y:0.15},0).wait(9).to({regX:796.5,regY:127.2,scaleX:2.1458,scaleY:2.1458,y:-0.1},0).wait(8).to({regX:829,regY:132.4,scaleX:2.2511,scaleY:2.2511,x:0.15},0).wait(8).to({regX:861.5,regY:137.6,scaleX:2.3673,scaleY:2.3673,x:0,y:0.05},0).wait(8).to({regX:894,regY:142.8,scaleX:2.496,scaleY:2.496,x:0.15,y:-0.1},0).wait(7).to({regX:922.5,regY:147.4,scaleX:2.6208,scaleY:2.6208,y:0},0).wait(8).to({regX:955,regY:152.6,scaleX:2.7795,scaleY:2.7795,y:0.15},0).wait(8).to({regX:977.3,regY:156.7,scaleX:2.8909,scaleY:2.8909,x:0},0).wait(7).to({regX:988,regY:159.2,scaleX:2.9346,scaleY:2.9346,x:0.15,y:0.05},0).wait(8).to({regX:1000.1,regY:162.2,scaleX:2.9864,scaleY:2.9864,x:-0.15,y:0.2},0).wait(8).to({regX:1012.4,regY:165.1,scaleX:3.04,scaleY:3.04,x:0,y:0},0).wait(8).to({regX:1024.5,regY:168.1,scaleX:3.0956,scaleY:3.0956,x:-0.15,y:0.15},0).wait(8).to({regX:1036.8,regY:171,scaleX:3.1532,scaleY:3.1532,x:0.15,y:0.05},0).wait(9).to({regX:1050.5,regY:174.3,scaleX:3.2206,scaleY:3.2206,x:0,y:0},0).wait(9).to({regX:1064.2,regY:177.7,scaleX:3.2911,scaleY:3.2911,x:-0.15,y:0.2},0).wait(6).to({regX:1073.4,regY:179.8,scaleX:3.3398,scaleY:3.3398,x:0.05,y:-0.15},0).wait(9).to({regX:1087.1,regY:183.2,scaleX:3.4155,scaleY:3.4155,x:0,y:0.2},0).wait(7).to({regX:1097.8,regY:185.7,scaleX:3.4767,scaleY:3.4767,x:0.15,y:0},0).wait(22).to({regX:1131.4,regY:193.8,scaleX:3.6847,scaleY:3.6847,x:0.2,y:0.05},0).wait(43).to({regX:1196.9,regY:209.7,scaleX:4.1727,scaleY:4.1727,x:0,y:0.2},0).wait(15).to({regX:1219.8,regY:215.2,scaleX:4.3746,scaleY:4.3746,y:0},0).wait(21).to({regX:1251.8,regY:222.9,scaleX:4.6929,scaleY:4.6929,y:0.05},0).wait(7).to({regX:1262.5,regY:225.5,scaleX:4.8096,scaleY:4.8096,x:-0.2,y:0},0).wait(9).to({regX:1276.2,regY:228.8,scaleX:4.9682,scaleY:4.9682,x:-0.25,y:-0.2},0).wait(18).to({regX:1280.4,regY:232.2,scaleX:5.1405,scaleY:5.1405,x:0,y:0.25},0).wait(23).to({regX:1282,regY:235.8,scaleX:5.349,scaleY:5.349,y:0.3},0).wait(18).to({regX:1283.2,regY:238.7,scaleX:5.5239,scaleY:5.5239,x:-0.25},0).wait(13).to({regX:1284.2,regY:240.8,scaleX:5.6579,scaleY:5.6579,x:0.3},0).wait(9).to({regX:1284.8,regY:242.2,scaleX:5.7543,scaleY:5.7543,x:0,y:0.05},0).wait(7).to({regX:1285.2,regY:243.3,scaleX:5.8322,scaleY:5.8322,x:-0.3,y:0},0).wait(5).to({regX:1285.7,regY:244.1,scaleX:5.8887,scaleY:5.8887,x:0.3,y:0.3},0).wait(3).to({regX:1285.9,regY:244.6,scaleX:5.9228,scaleY:5.9228},0).wait(1).to({regY:244.8,scaleX:5.9346,scaleY:5.9346,x:0,y:0.35},0).wait(1).to({regX:1286,scaleX:5.9465,scaleY:5.9465,y:-0.25},0).wait(1).to({regY:245.1,scaleX:5.9578,scaleY:5.9578,x:-0.3,y:0.3},0).wait(27).to({regX:1288,regY:249.3,scaleX:6.2912,scaleY:6.2912,x:0.3,y:-0.3},0).wait(6).to({regX:1288.4,regY:250.3,scaleX:6.3708,scaleY:6.3708,x:0.05,y:0},0).wait(5).to({regX:1288.7,regY:251.1,scaleX:6.4383,scaleY:6.4383,x:-0.05},0).wait(5).to({regX:1289,regY:251.9,scaleX:6.5074,scaleY:6.5074,x:-0.35},0).wait(7).to({regX:1289.5,regY:253.1,scaleX:6.6064,scaleY:6.6064,y:0.35},0).wait(7).to({regX:1290,regY:254.2,scaleX:6.7086,scaleY:6.7086,x:0},0).wait(8).to({regX:1290.6,regY:255.4,scaleX:6.8295,scaleY:6.8295,y:0},0).wait(7).to({regX:1291,regY:256.6,scaleX:6.9387,scaleY:6.9387,x:-0.35,y:0.35},0).wait(8).to({regX:1291.7,regY:257.9,scaleX:7.0682,scaleY:7.0682,x:0.35},0).wait(1).to({regY:258,scaleX:7.0842,scaleY:7.0842,x:0,y:0},0).wait(1).to({regX:1291.8,regY:258.1,scaleX:7.1011,scaleY:7.1011,x:0.05,y:-0.3},0).wait(1).to({regX:1291.9,regY:258.3,scaleX:7.1173,scaleY:7.1173,x:0.35,y:0.05},0).wait(1).to({regY:258.4,scaleX:7.1343,scaleY:7.1343,x:0,y:-0.35},0).wait(1).to({regX:1292,regY:258.6,scaleX:7.1515,scaleY:7.1515,y:0},0).wait(1).to({regY:258.8,scaleX:7.1679,scaleY:7.1679,x:-0.35,y:0.05},0).wait(1).to({regX:1292.1,regY:258.9,scaleX:7.1852,scaleY:7.1852,x:0},0).wait(50).to({regX:1295.7,regY:266.9,scaleX:8.1502,scaleY:8.1502,x:0.45},0).wait(4).to({regX:1295.9,regY:267.6,scaleX:8.2383,scaleY:8.2383,x:0},0).wait(11).to({regX:1295.2,regY:268.6,scaleX:8.2033,scaleY:8.2033,x:-0.35,y:0},0).wait(25).to({regX:1289.9,regY:268.9,scaleX:7.4397,scaleY:7.4397,x:0,y:0.35},0).wait(6).to({regX:1288.5,scaleX:7.2769,scaleY:7.2769,x:-0.35,y:0},0).wait(21).to({regX:1284,regY:269.1,scaleX:6.7598,scaleY:6.7598,y:-0.3},0).wait(15).to({regX:1280.8,regY:269.4,scaleX:6.4339,scaleY:6.4339,x:0,y:0.35},0).wait(19).to({regX:1276.8,regY:269.6,scaleX:6.0631,scaleY:6.0631,x:0.3,y:0.3},0).wait(5).to({regX:1275.7,scaleX:5.9725,scaleY:5.9725,y:0},0).wait(3).to({regX:1275,scaleX:5.9191,scaleY:5.9191,x:0,y:-0.25},0).wait(1).to({regX:2658.1,regY:457.5,scaleX:1,scaleY:1,x:1383.15,y:187.9},0).wait(75).to({regX:750.6,regY:170.9,scaleX:1.7445,scaleY:1.7445,x:0.05,y:0.05},0).to({_off:true},49).wait(1));

	// moov_obj_
	this.moov = new lib.Scene_1_moov();
	this.moov.name = "moov";
	this.moov.depth = 0;
	this.moov.isAttachedToCamera = 0
	this.moov.isAttachedToMask = 0
	this.moov.layerDepth = 0
	this.moov.layerIndex = 3
	this.moov.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.moov).wait(1).to({regX:4,regY:0.7,scaleX:1.0027,scaleY:1.0027,x:-0.05},0).wait(817).to({regX:750.6,regY:170.9,scaleX:1.7445,scaleY:1.7445,x:0.05,y:0.05},0).to({_off:true},91).wait(1));

	// egg__2_br_obj_
	this.egg__2_br = new lib.Scene_1_egg__2_br();
	this.egg__2_br.name = "egg__2_br";
	this.egg__2_br.depth = 0;
	this.egg__2_br.isAttachedToCamera = 0
	this.egg__2_br.isAttachedToMask = 0
	this.egg__2_br.layerDepth = 0
	this.egg__2_br.layerIndex = 4
	this.egg__2_br.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.egg__2_br).wait(1).to({regX:4,regY:0.7,scaleX:1.0027,scaleY:1.0027,x:-0.05},0).wait(624).to({regX:1292.1,regY:258.9,scaleX:7.1852,scaleY:7.1852,x:0,y:0.05},0).wait(1).to({regX:1466.1,regY:338.4,scaleX:1,scaleY:1,x:174.05,y:79.55},0).wait(18).to({_off:true},1).wait(265));

	// egg__up_obj_
	this.egg__up = new lib.Scene_1_egg__up();
	this.egg__up.name = "egg__up";
	this.egg__up.depth = 0;
	this.egg__up.isAttachedToCamera = 0
	this.egg__up.isAttachedToMask = 0
	this.egg__up.layerDepth = 0
	this.egg__up.layerIndex = 5
	this.egg__up.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.egg__up).wait(1).to({regX:4,regY:0.7,scaleX:1.0027,scaleY:1.0027,x:-0.05},0).wait(537).to({regX:1286,regY:245.1,scaleX:5.9578,scaleY:5.9578,x:-0.3,y:0.3},0).wait(1).to({regX:1348.1,regY:413.7,scaleX:1,scaleY:1,x:62.05,y:168.7},0).wait(25).to({_off:true},1).wait(345));

	// egg_dwon_obj_
	this.egg_dwon = new lib.Scene_1_egg_dwon();
	this.egg_dwon.name = "egg_dwon";
	this.egg_dwon.depth = 0;
	this.egg_dwon.isAttachedToCamera = 0
	this.egg_dwon.isAttachedToMask = 0
	this.egg_dwon.layerDepth = 0
	this.egg_dwon.layerIndex = 6
	this.egg_dwon.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.egg_dwon).wait(1).to({regX:4,regY:0.7,scaleX:1.0027,scaleY:1.0027,x:-0.05},0).wait(537).to({regX:1286,regY:245.1,scaleX:5.9578,scaleY:5.9578,x:-0.3,y:0.3},0).wait(27).to({regX:1288,regY:249.3,scaleX:6.2912,scaleY:6.2912,x:0.3,y:-0.3},0).to({_off:true},344).wait(1));

	// fledgling_obj_
	this.fledgling = new lib.Scene_1_fledgling();
	this.fledgling.name = "fledgling";
	this.fledgling.depth = 0;
	this.fledgling.isAttachedToCamera = 0
	this.fledgling.isAttachedToMask = 0
	this.fledgling.layerDepth = 0
	this.fledgling.layerIndex = 7
	this.fledgling.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fledgling).wait(1).to({regX:4,regY:0.7,scaleX:1.0027,scaleY:1.0027,x:-0.05},0).wait(233).to({regX:950.9,regY:152,scaleX:2.7587,scaleY:2.7587,x:0,y:0.15},0).wait(264).to({regX:1283.2,regY:238.7,scaleX:5.5239,scaleY:5.5239,x:-0.25,y:0.3},0).wait(13).to({regX:1284.2,regY:240.8,scaleX:5.6579,scaleY:5.6579,x:0.3},0).wait(9).to({regX:1284.8,regY:242.2,scaleX:5.7543,scaleY:5.7543,x:0,y:0.05},0).wait(15).to({regX:1285.9,regY:244.6,scaleX:5.9228,scaleY:5.9228,x:0.3,y:0.3},0).wait(1).to({regY:244.8,scaleX:5.9346,scaleY:5.9346,x:0,y:0.35},0).wait(8).to({regX:1286.5,regY:246,scaleX:6.0291,scaleY:6.0291,y:0},0).wait(3).to({regX:1286.7,regY:246.5,scaleX:6.0648,scaleY:6.0648},0).wait(3).to({regX:1286.9,regY:247,scaleX:6.1015,scaleY:6.1015,x:0.05,y:0.3},0).wait(1).to({regX:1287,regY:247.1,scaleX:6.114,scaleY:6.114,x:0.3,y:0},0).wait(1).to({regY:247.3,scaleX:6.126,scaleY:6.126,x:0},0).wait(1).to({regX:1287.1,regY:247.5,scaleX:6.1386,scaleY:6.1386,x:0.05,y:0.3},0).wait(1).to({regX:1287.2,regY:247.6,scaleX:6.1513,scaleY:6.1513,x:0.25,y:0},0).wait(7).to({regX:1287.7,regY:248.8,scaleX:6.2397,scaleY:6.2397,x:0.3,y:0.35},0).wait(4).to({regX:1288,regY:249.3,scaleX:6.2912,scaleY:6.2912,y:-0.3},0).wait(10).to({regX:1288.7,regY:251,scaleX:6.4245,scaleY:6.4245,x:0.35,y:0.35},0).wait(2).to({regX:1288.8,regY:251.3,scaleX:6.4517,scaleY:6.4517,x:0,y:0},0).wait(47).to({regX:1292,regY:258.8,scaleX:7.1679,scaleY:7.1679,x:-0.35,y:0.05},0).wait(1).to({regX:1292.1,regY:258.9,scaleX:7.1852,scaleY:7.1852,x:0},0).wait(1).to({regX:1292.2,regY:259.1,scaleX:7.2018,scaleY:7.2018,x:0.35,y:0},0).wait(1).to({regY:259.2,scaleX:7.2192,scaleY:7.2192,x:-0.35,y:-0.35},0).wait(1).to({regX:1292.4,regY:259.4,scaleX:7.2367,scaleY:7.2367,x:0.35,y:0},0).wait(1).to({regX:1292.5,regY:259.6,scaleX:7.2536,scaleY:7.2536},0).wait(1).to({regY:259.8,scaleX:7.2713,scaleY:7.2713,x:0,y:0.35},0).wait(1).to({regY:259.9,scaleX:7.2883,scaleY:7.2883,x:-0.35,y:0},0).wait(1).to({regX:1292.7,regY:260.1,scaleX:7.3061,scaleY:7.3061,x:0.35,y:0.35},0).wait(1).to({regY:260.2,scaleX:7.3241,scaleY:7.3241,x:-0.05,y:0},0).wait(1).to({regX:1292.8,regY:260.4,scaleX:7.3413,scaleY:7.3413,x:0.4,y:0.4},0).wait(1).to({regX:1292.9,regY:260.6,scaleX:7.3595,scaleY:7.3595,x:0.35,y:0.35},0).wait(1).to({scaleX:7.3768,scaleY:7.3768,x:0,y:-0.35},0).wait(1).to({regX:1293,regY:260.9,scaleX:7.3952,scaleY:7.3952,x:0.35,y:0.4},0).wait(1).to({regY:261.1,scaleX:7.4136,scaleY:7.4136,x:-0.35},0).wait(1).to({regX:1293.1,scaleX:7.4312,scaleY:7.4312,x:0,y:-0.35},0).wait(1).to({regX:1293.2,regY:261.4,scaleX:7.4498,scaleY:7.4498,x:0.35,y:0.35},0).wait(1).to({regY:261.5,scaleX:7.4676,scaleY:7.4676,x:0,y:0.05},0).wait(1).to({regX:1293.4,regY:261.6,scaleX:7.4864,scaleY:7.4864,x:0.4,y:-0.35},0).wait(1).to({regY:261.9,scaleX:7.5053,scaleY:7.5053,x:0,y:0.35},0).wait(1).to({regX:1293.5,scaleX:7.5234,scaleY:7.5234,x:0.4,y:-0.35},0).wait(2).to({regX:1293.6,regY:262.3,scaleX:7.5607,scaleY:7.5607,x:0.05,y:0},0).wait(1).to({regX:1293.7,regY:262.4,scaleX:7.5799,scaleY:7.5799,x:0.4,y:-0.4},0).wait(4).to({regX:1294,regY:263.1,scaleX:7.6561,scaleY:7.6561,y:0},0).wait(7).to({regX:1294.5,regY:264.2,scaleX:7.7935,scaleY:7.7935},0).wait(5).to({regX:1294.8,regY:265.1,scaleX:7.8949,scaleY:7.8949,x:0,y:0.4},0).wait(7).to({regX:1295.2,regY:266.1,scaleX:8.0422,scaleY:8.0422,x:-0.4,y:-0.35},0).to({_off:true},239).wait(1));

	// Layer_14_obj_
	this.Layer_14 = new lib.Scene_1_Layer_14();
	this.Layer_14.name = "Layer_14";
	this.Layer_14.depth = 0;
	this.Layer_14.isAttachedToCamera = 0
	this.Layer_14.isAttachedToMask = 0
	this.Layer_14.layerDepth = 0
	this.Layer_14.layerIndex = 8
	this.Layer_14.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_14).wait(1).to({regX:4,regY:0.7,scaleX:1.0027,scaleY:1.0027,x:-0.05},0).wait(862).to({regX:750.6,regY:170.9,scaleX:1.7445,scaleY:1.7445,x:0.05,y:0.05},0).wait(44).to({_off:true},2).wait(1));

	// background_obj_
	this.background_1 = new lib.Scene_1_background_1();
	this.background_1.name = "background_1";
	this.background_1.setTransform(923.2,526.2,1,1,0,0,0,923.2,526.2);
	this.background_1.depth = 0;
	this.background_1.isAttachedToCamera = 0
	this.background_1.isAttachedToMask = 0
	this.background_1.layerDepth = 0
	this.background_1.layerIndex = 9
	this.background_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background_1).wait(1).to({regX:924.7,regY:525.5,scaleX:1.0027,scaleY:1.0027,x:923.15,y:526.25},0).wait(95).to({regX:1071.8,regY:450.9,scaleX:1.3542,scaleY:1.3542,y:526.2},0).wait(813).to({regX:923.2,regY:526.2,scaleX:1,scaleY:1,x:923.2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-367,-354.2,5590.8,3942.2);
// library properties:
lib.properties = {
	id: 'C0D88D9191966D408E74C57B809C2569',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_72.png?1618056169846", id:"CachedBmp_72"},
		{src:"images/CachedBmp_75.png?1618056169846", id:"CachedBmp_75"},
		{src:"images/CachedBmp_73.png?1618056169846", id:"CachedBmp_73"},
		{src:"images/CachedBmp_76.png?1618056169846", id:"CachedBmp_76"},
		{src:"images/CachedBmp_74.png?1618056169846", id:"CachedBmp_74"},
		{src:"images/CachedBmp_71.png?1618056169846", id:"CachedBmp_71"},
		{src:"images/CachedBmp_78.png?1618056169846", id:"CachedBmp_78"},
		{src:"images/Kim Egg Nest Final_atlas_1.png?1618056169655", id:"Kim Egg Nest Final_atlas_1"},
		{src:"images/Kim Egg Nest Final_atlas_2.png?1618056169655", id:"Kim Egg Nest Final_atlas_2"},
		{src:"images/Kim Egg Nest Final_atlas_3.png?1618056169655", id:"Kim Egg Nest Final_atlas_3"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C0D88D9191966D408E74C57B809C2569'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;