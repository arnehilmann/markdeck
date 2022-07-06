
/**
 * Detect if user is using a shared URL
 * --
 * Valid hash structure:
 * topX|topY|sampleArea|invert|image_preset
 * 312|123|7,7|false|lights
 */
export function hashDetect () {

	// Test if URL is really a shared URL
	if( location.href.indexOf('?s=') == -1 ) {
		return;
	}

	let hash = location.search.replace(/^.*?\=/, '').split('&')[0];

	if( hash === '' ) {
		return false;
	}

	try {
		var decoded = atob( hash );
	} catch (e) {
		console.log('ErR0r: The shared code is not valid');
		return;
	}

	const parts = decoded.split('|');

	return {
		topX: parseInt( parts[0] ),
		topY: parseInt( parts[1] ),
		sampleArea: parts[2],
		invertText: JSON.parse( parts[3] ),
		image: parts[4]
	}
}

export function getStateURL ( state ) {
	return 'http://' + document.location.host + '?s=' + encodeState( state );
}

/**
 * Create a shareable string that encodes the state of the app
 * Input data: 
 *  - controller.params
 *  - selected image ID
 * @return {string} base64 encoded string
 */
function encodeState ( state ) {
	return btoa( state.topX + '|' + state.topY + '|' + state.sampleArea + '|' + state.invertText.toString() + '|' + state.image );
}

/**
 * https://github.com/h5bp/mothereffinganimatedgif/blob/master/assets/js/share.js
 * http://i.imgur.com.rsz.io/d60kpBw.jpg?width=800
 */