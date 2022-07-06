
/**
 * Unique gradient generator
 * --
 * @author Tibor Szász
 * All rights reserved
 */

/* Vendor scripts */
import $ from './vendor/jquery.min';
import semantic from './vendor/semantic.min';

/* App scripts */
import controller from './controller';
import ui from './ui';
import draw from './draw';
import { hashDetect, getStateURL } from './share';

window.addEventListener('DOMContentLoaded', function () {

	/**
	 * dat.GUI event listeners
	 */
	controller.events.on('change', ( params ) => {
		draw.render( ui.image, params );
		ui.updateGradient( draw.imageData );
	});

	controller.events.on('invertText', ( params ) => {
		ui.invertText( params.invertText );
	});

	/**
	 * General image onload event
	 */
	ui.events.on('load', ( image ) => {
		controller.image = image;
		draw.render( image, controller.params );
		ui.updateGradient( draw.imageData );
	});

	/**
	 * Wire up modules via pubsub events
	 */
	ui.events.on('sharing', () => { 
		let state = controller.params;
		state.image = ui.getImageId();

		const url = getStateURL( state );
		ui.events.trigger('share-url', url );
	});

	/**
	 * On first load let's see if we need to present a setting
	 */
	const shared = hashDetect();

	if( shared ) {
		ui.loadImageById( shared.image );
		controller.shared = shared;
	} else {
		ui.loadImageById( 'artificial-trees' );
	}
});

/* That's all folks */
