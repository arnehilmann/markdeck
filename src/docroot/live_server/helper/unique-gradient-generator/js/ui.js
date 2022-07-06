
/**
 * Manage UI
 * --
 * Semantic UI modules used:
 *  - reset
 *  - button
 *  - modal
 *  - sidebar
 *  - icons
 *  - message
 */

import $ from './vendor/jquery.min';
import pubsub from './pubsub';
import { getStateURL } from './share';

class ui {

	constructor () {
		this.events = pubsub;
		this.image = null;
		this.ownImage = true;
		this.shareURL = '';

		this.$imagePickerButton = $('#image-selector');
		this.$imageUploadButton = $('#browse-image');
		this.$getURLButton = $('#get-url');
		this.$generateButton = $('#generate');
		this.$facebookShareButton = $('.facebook.button');
		this.$twitterShareButton = $('.twitter.button');

		this.$fileInput = $('#file');
		
		this.$images = $('.sidebar.images img');
		this.$sidebar = $('.ui.sidebar');
		
		this.$modal = $('#generate-css');
		this.$urlDialog = $('#get-url-dialog');

		this.$gradient = $('.pusher');
		this.$content = $('.page-content');

		this.addEvents();
		this.addKeyboardEvents();
	}

	addEvents () {
		this.$imagePickerButton.on('click', () => {
			this.$sidebar.sidebar('setting', 'transition', 'push').sidebar('toggle');
		});

		this.$generateButton.on('click', () => {
			this.$modal.modal('show');
			this.$modal.find('textarea').val( `.myElement { 
	/* Generated with http://gradient.quasi.ink */
	background-size: cover;
	background-image: ${this.$gradient.css('backgroundImage')};
}`);
		});

		this.$imageUploadButton.on('click', ( e ) => {
			this.$fileInput.click();
		});

		this.$images.on('click', ( e ) => {
			this.loadImage( e.target.src.replace('_thumb','') );
			this.$sidebar.sidebar('setting', 'transition', 'push').sidebar('toggle');
		});

		this.$fileInput.on('change', this.handleFileSelect.bind(this));

		this.$getURLButton.on('click', ( e ) => {
			this.events.trigger('sharing');
			this.showSharingDialog( this.shareURL );
		});

		this.$facebookShareButton.on('click', ( e ) => {
			this.events.trigger('sharing');
			this.$facebookShareButton.attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + this.shareURL );
		});

		this.$twitterShareButton.on('click', ( e ) => {
			this.events.trigger('sharing');
			this.$twitterShareButton.attr('href', 'https://twitter.com/intent/tweet?text=I just create a new background gradient: ' + this.shareURL );
		});

		this.events.on('share-url', ( url ) => {
			this.shareURL = url;
		});
	}

	addKeyboardEvents () {
		window.addEventListener('keydown', (e) => {
			if ( e.keyCode == 27 ) { // ESC
				$('.dg.ac').fadeToggle();
				$('.hideable').fadeToggle();
			}
		});
	}

	handleFileSelect(evt) {
		let reader = new FileReader();

		reader.onload = (e) => {
			let dynImg = $('<img>', {
				src: e.target.result, 
				css: { 'display': 'none' }
			}).on('load', () => {
				$( document.body ).append( dynImg );
				this.events.trigger('load', dynImg[0]);
				this.image = dynImg[0];
				this.ownImage = false;
			});
		}
		reader.readAsDataURL( evt.target.files[0] );
	}

	updateGradient ( imageData ) {
		this.$modal.find('.bytes').html( imageData.length );
		this.$gradient.css({
			"backgroundImage": 'url(' + imageData + ')'
		});
	}

	showSharingDialog ( url ) {
		this.$urlDialog.modal('show');
		this.$urlDialog.find('input').val( url );

		if( this.ownImage ) {
			this.$urlDialog.find('input').show();
			this.$urlDialog.find('.sorry').hide();
		} else {
			this.$urlDialog.find('input').hide();
			this.$urlDialog.find('.sorry').show();
		}
	}

	loadFirstImage () {
		this.loadImage( this.$images[0].src.replace('_thumb','') );
	}

	loadImage ( src ) {
		let img = $('<img>', { src: src }).on('load', () => {
			this.events.trigger('load', img[0]);
			this.image = img[0];
		});
		this.ownImage = true;
	}

	/**
	 * Loads image by filename root
	 * @param  {[string]} id [the name of the file without extension, it's always .png]
	 */
	loadImageById ( id ) {
		const item = this.$images.filter(function(i,el){
			const img = el.src.split('/');
			let found = false;
			if( img[img.length-1].replace('_thumb.png','') == id ) {
				found = el;
			}
			return found;
		});
		this.loadImage( item[0].src.replace('_thumb','') );
	}

	getImageId () {
		const img = this.image.src.split('/');
		return img[img.length-1].replace('.png','');
	}

	invertText ( val ) {
		if( val ) {
			this.$content.addClass('invert');
		} else {
			this.$content.removeClass('invert');			
		}
	}
}

export default new ui();
