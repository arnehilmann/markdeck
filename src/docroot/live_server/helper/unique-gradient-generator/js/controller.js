
/**
 * The DAT.GUI wrapper class
 */

import dat from './vendor/dat.gui.min';
import pubsub from './pubsub';

class controller {

	constructor () {
		this.gui = new dat.GUI();
		this.events = pubsub;

		this.params = {
			topX: 220,
			topY: 143,
			sampleArea: '7,3',
			invertText: false
		};

		this.imageWidth = 0;
		this.imageHeight = 0;

		this.sampleAreaOptions = {};
		this.createSampleArea();

		this.controllers = {};

		this.addKeyboardEvents();
	}

	/**
	 * expects a DOM image reference
	 */
	set image( img ) {
		this.imageWidth = img.width;
		this.imageHeight = img.height;

		if( this.controllers.list ) {
			this.clearGUIParams();
			// reset positions
			this.params.topX = this.imageWidth / 2;
			this.params.topY = this.imageHeight / 2;
		}
		this.addGUIParams();
	}

	set shared( share ) {
		this.params.topX = share.topX;
		this.params.topY = share.topY;
		this.params.sampleArea = share.sampleArea;
		this.params.invertText = share.invertText;
		//
		this.events.trigger('invertText', this.params);
	}

	createSampleArea () {
		const sampleAreaArray = [
			[7,3],[9,5],[5,5],[9,9],[12,9],[15,9],[15,15],[20,15]
		];

		sampleAreaArray.forEach((e) => {
			this.sampleAreaOptions[ e[0] + ' × ' + e[1] ] = e;
		});
	}

	addGUIParams () {
		/**
		 * Start X
		 */
		this.controllers.topX = this.gui.add(this.params, 'topX');
		this.controllers.topX = this.controllers.topX.min(0).max(this.imageWidth).step(1).name('X position');

		this.controllers.topX.onChange((val) => {
			this.events.trigger('change', this.params);
		});

		/**
		 * Start Y
		 */
		this.controllers.topY = this.gui.add(this.params, 'topY');
		this.controllers.topY = this.controllers.topY.min(0).max(this.imageHeight).step(1).name('Y position');

		this.controllers.topY.onChange((val) => {
			this.events.trigger('change', this.params);
		});

		/**
		 * Sample area
		 */
		this.controllers.list = this.gui.add(this.params, 'sampleArea', this.sampleAreaOptions );
		this.controllers.list = this.controllers.list.name('Sample area');

		this.controllers.list.onChange((val) => {
			this.events.trigger('change', this.params);
		});

		/**
		 * Invert text
		 */
		this.controllers.invertText = this.gui.add(this.params, "invertText");
		this.controllers.invertText = this.controllers.invertText.name('Invert text color');

		this.controllers.invertText.onChange((val) => {
			this.events.trigger('invertText', this.params);
		});

		/**
		 * Randomize Button
		 */
		this.controllers.randomizeButton = this.gui.add({
			"Randomize": () => {
				this.randomize();
			}
		}, "Randomize");
	}

	clearGUIParams () {
		this.gui.remove( this.controllers.topY );
		this.gui.remove( this.controllers.topX );
		this.gui.remove( this.controllers.list );
		this.gui.remove( this.controllers.invertText );
		this.gui.remove( this.controllers.randomizeButton );
	}

	randomBetween (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomize () {
		this.params.topX = this.randomBetween(0, this.imageWidth);
		this.params.topY = this.randomBetween(0, this.imageHeight);
		this.gui.__controllers[0].setValue(this.params.topX);
		this.gui.__controllers[1].setValue(this.params.topY);
	}

	addKeyboardEvents () {
		window.addEventListener('keydown', (e) => {
			switch ( e.keyCode ) {
				case 37:
					e.preventDefault();
					this.params.topX--;
					this.gui.__controllers[0].setValue(this.params.topX);
				break;
				case 39:
					e.preventDefault();
					this.params.topX++;
					this.gui.__controllers[0].setValue(this.params.topX);
				break;
				case 38:
					e.preventDefault();
					this.params.topY--;
					this.gui.__controllers[1].setValue(this.params.topY);
				break;
				case 40:
					e.preventDefault();
					this.params.topY++;
					this.gui.__controllers[1].setValue(this.params.topY);
				break;
				case 82:
					e.preventDefault();
					this.randomize();
				break;
			}
		});
	}
}

export default new controller();
