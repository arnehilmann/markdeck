
/**
 * Handles drawing on canvas and image base64 encoding
 */

import pubsub from './pubsub';

class draw {
	
	constructor () {
		this.canvas = document.querySelector('#slicer');
		this.ctx = this.canvas.getContext('2d');
		this.imageData = null;
	}

	render ( imageObj, params ) {
		let areaArr = params.sampleArea.split(',');
		let sourceX = params.topX;
		let sourceY = params.topY;
		let sourceWidth = parseInt( areaArr[0] );
		let sourceHeight = parseInt( areaArr[1] );
		let destWidth = sourceWidth;
		let destHeight = sourceHeight;
		let destX = 0
		let destY = 0

		this.canvas.width = sourceWidth;
		this.canvas.height = sourceHeight;

		this.ctx.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
		this.imageData = this.canvas.toDataURL();
	}
}

export default new draw();
