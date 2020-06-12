import SlideContent from './controllers/slidecontent.js'
import SlideNumber from './controllers/slidenumber.js'
import Backgrounds from './controllers/backgrounds.js'
import AutoAnimate from './controllers/autoanimate.js'
import Fragments from './controllers/fragments.js'
import Overview from './controllers/overview.js'
import Keyboard from './controllers/keyboard.js'
import Location from './controllers/location.js'
import Controls from './controllers/controls.js'
import Progress from './controllers/progress.js'
import Pointer from './controllers/pointer.js'
import Plugins from './controllers/plugins.js'
import Print from './controllers/print.js'
import Touch from './controllers/touch.js'
import Focus from './controllers/focus.js'
import Notes from './controllers/notes.js'
import Playback from './components/playback.js'
import defaultConfig from './config.js'
import * as Util from './utils/util.js'
import * as Device from './utils/device.js'
import {
	SLIDES_SELECTOR,
	HORIZONTAL_SLIDES_SELECTOR,
	VERTICAL_SLIDES_SELECTOR,
	POST_MESSAGE_METHOD_BLACKLIST
} from './utils/constants.js'

// The reveal.js version
export const VERSION = '4.0.2';

/**
 * reveal.js
 * https://revealjs.com
 * MIT licensed
 *
 * Copyright (C) 2020 Hakim El Hattab, https://hakim.se
 */
export default function( revealElement, options ) {

	// Support initialization with no args, one arg
	// [options] or two args [revealElement, options]
	if( arguments.length < 2 ) {
		options = arguments[0];
		revealElement = document.querySelector( '.reveal' );
	}

	const Reveal = {};

	// Configuration defaults, can be overridden at initialization time
	let config = {},

		// Flags if reveal.js is loaded (has dispatched the 'ready' event)
		ready = false,

		// The horizontal and vertical index of the currently active slide
		indexh,
		indexv,

		// The previous and current slide HTML elements
		previousSlide,
		currentSlide,

		// Remember which directions that the user has navigated towards
		navigationHistory = {
			hasNavigatedHorizontally: false,
			hasNavigatedVertically: false
		},

		// Slides may have a data-state attribute which we pick up and apply
		// as a class to the body. This list contains the combined state of
		// all current slides.
		state = [],

		// The current scale of the presentation (see width/height config)
		scale = 1,

		// CSS transform that is currently applied to the slides container,
		// split into two groups
		slidesTransform = { layout: '', overview: '' },

		// Cached references to DOM elements
		dom = {},

		// Flags if the interaction event listeners are bound
		eventsAreBound = false,

		// The current slide transition state; idle or running
		transition = 'idle',

		// The current auto-slide duration
		autoSlide = 0,

		// Auto slide properties
		autoSlidePlayer,
		autoSlideTimeout = 0,
		autoSlideStartTime = -1,
		autoSlidePaused = false,

		// Controllers for different aspects of our presentation. They're
		// all given direct references to this Reveal instance since there
		// may be multiple presentations running in parallel.
		slideContent = new SlideContent( Reveal ),
		slideNumber = new SlideNumber( Reveal ),
		autoAnimate = new AutoAnimate( Reveal ),
		backgrounds = new Backgrounds( Reveal ),
		fragments = new Fragments( Reveal ),
		overview = new Overview( Reveal ),
		keyboard = new Keyboard( Reveal ),
		location = new Location( Reveal ),
		controls = new Controls( Reveal ),
		progress = new Progress( Reveal ),
		pointer = new Pointer( Reveal ),
		plugins = new Plugins( Reveal ),
		print = new Print( Reveal ),
		focus = new Focus( Reveal ),
		touch = new Touch( Reveal ),
		notes = new Notes( Reveal );

	/**
	 * Starts up the presentation.
	 */
	function initialize( initOptions ) {

		// Cache references to key DOM elements
		dom.wrapper = revealElement;
		dom.slides = revealElement.querySelector( '.slides' );

		// Compose our config object in order of increasing precedence:
		// 1. Default reveal.js options
		// 2. Options provided via Reveal.configure() prior to
		//    initialization
		// 3. Options passed to the Reveal constructor
		// 4. Options passed to Reveal.initialize
		// 5. Query params
		config = { ...defaultConfig, ...config, ...options, ...initOptions, ...Util.getQueryHash() };

		setViewport();

		// Force a layout when the whole page, incl fonts, has loaded
		window.addEventListener( 'load', layout, false );

		// Register plugins and load dependencies, then move on to #start()
		plugins.load( config.plugins, config.dependencies ).then( start );

		return new Promise( resolve => Reveal.on( 'ready', resolve ) );

	}

	/**
	 * Encase the presentation in a reveal.js viewport. The
	 * extent of the viewport differs based on configuration.
	 */
	function setViewport() {

		// Embedded decks use the reveal element as their viewport
		if( config.embedded === true ) {
			dom.viewport = Util.closest( revealElement, '.reveal-viewport' ) || revealElement;
		}
		// Full-page decks use the body as their viewport
		else {
			dom.viewport = document.body;
			document.documentElement.classList.add( 'reveal-full-page' );
		}

		dom.viewport.classList.add( 'reveal-viewport' );

	}

	/**
	 * Starts up reveal.js by binding input events and navigating
	 * to the current URL deeplink if there is one.
	 */
	function start() {

		ready = true;

		// Make sure we've got all the DOM elements we need
		setupDOM();

		// Listen to messages posted to this window
		setupPostMessage();

		// Prevent the slides from being scrolled out of view
		setupScrollPrevention();

		// Resets all vertical slides so that only the first is visible
		resetVerticalSlides();

		// Updates the presentation to match the current configuration values
		configure();

		// Read the initial hash
		location.readURL();

		// Create slide backgrounds
		backgrounds.update( true );

		// Notify listeners that the presentation is ready but use a 1ms
		// timeout to ensure it's not fired synchronously after #initialize()
		setTimeout( () => {
			// Enable transitions now that we're loaded
			dom.slides.classList.remove( 'no-transition' );

			dom.wrapper.classList.add( 'ready' );

			dispatchEvent({
				type: 'ready',
				data: {
					indexh,
					indexv,
					currentSlide
				}
			});
		}, 1 );

		// Special setup and config is required when printing to PDF
		if( print.isPrintingPDF() ) {
			removeEventListeners();

			// The document needs to have loaded for the PDF layout
			// measurements to be accurate
			if( document.readyState === 'complete' ) {
				print.setupPDF();
			}
			else {
				window.addEventListener( 'load', () => {
					print.setupPDF();
				} );
			}
		}

	}

	/**
	 * Finds and stores references to DOM elements which are
	 * required by the presentation. If a required element is
	 * not found, it is created.
	 */
	function setupDOM() {

		// Prevent transitions while we're loading
		dom.slides.classList.add( 'no-transition' );

		if( Device.isMobile ) {
			dom.wrapper.classList.add( 'no-hover' );
		}
		else {
			dom.wrapper.classList.remove( 'no-hover' );
		}

		backgrounds.render();
		slideNumber.render();
		controls.render();
		progress.render();
		notes.render();

		// Overlay graphic which is displayed during the paused mode
		dom.pauseOverlay = Util.createSingletonNode( dom.wrapper, 'div', 'pause-overlay', config.controls ? '<button class="resume-button">Resume presentation</button>' : null );

		dom.statusElement = createStatusElement();

		dom.wrapper.setAttribute( 'role', 'application' );
	}

	/**
	 * Creates a hidden div with role aria-live to announce the
	 * current slide content. Hide the div off-screen to make it
	 * available only to Assistive Technologies.
	 *
	 * @return {HTMLElement}
	 */
	function createStatusElement() {

		let statusElement = dom.wrapper.querySelector( '.aria-status' );
		if( !statusElement ) {
			statusElement = document.createElement( 'div' );
			statusElement.style.position = 'absolute';
			statusElement.style.height = '1px';
			statusElement.style.width = '1px';
			statusElement.style.overflow = 'hidden';
			statusElement.style.clip = 'rect( 1px, 1px, 1px, 1px )';
			statusElement.classList.add( 'aria-status' );
			statusElement.setAttribute( 'aria-live', 'polite' );
			statusElement.setAttribute( 'aria-atomic','true' );
			dom.wrapper.appendChild( statusElement );
		}
		return statusElement;

	}

	/**
	 * Announces the given text to screen readers.
	 */
	function announceStatus( value ) {

		dom.statusElement.textContent = value;

	}

	/**
	 * Converts the given HTML element into a string of text
	 * that can be announced to a screen reader. Hidden
	 * elements are excluded.
	 */
	function getStatusText( node ) {

		let text = '';

		// Text node
		if( node.nodeType === 3 ) {
			text += node.textContent;
		}
		// Element node
		else if( node.nodeType === 1 ) {

			let isAriaHidden = node.getAttribute( 'aria-hidden' );
			let isDisplayHidden = window.getComputedStyle( node )['display'] === 'none';
			if( isAriaHidden !== 'true' && !isDisplayHidden ) {

				Array.from( node.childNodes ).forEach( child => {
					text += getStatusText( child );
				} );

			}

		}

		text = text.trim();

		return text === '' ? '' : text + ' ';

	}

	/**
	 * This is an unfortunate necessity. Some actions – such as
	 * an input field being focused in an iframe or using the
	 * keyboard to expand text selection beyond the bounds of
	 * a slide – can trigger our content to be pushed out of view.
	 * This scrolling can not be prevented by hiding overflow in
	 * CSS (we already do) so we have to resort to repeatedly
	 * checking if the slides have been offset :(
	 */
	function setupScrollPrevention() {

		setInterval( () => {
			if( dom.wrapper.scrollTop !== 0 || dom.wrapper.scrollLeft !== 0 ) {
				dom.wrapper.scrollTop = 0;
				dom.wrapper.scrollLeft = 0;
			}
		}, 1000 );

	}

	/**
	 * Registers a listener to postMessage events, this makes it
	 * possible to call all reveal.js API methods from another
	 * window. For example:
	 *
	 * revealWindow.postMessage( JSON.stringify({
	 *   method: 'slide',
	 *   args: [ 2 ]
	 * }), '*' );
	 */
	function setupPostMessage() {

		if( config.postMessage ) {
			window.addEventListener( 'message', event => {
				let data = event.data;

				// Make sure we're dealing with JSON
				if( typeof data === 'string' && data.charAt( 0 ) === '{' && data.charAt( data.length - 1 ) === '}' ) {
					data = JSON.parse( data );

					// Check if the requested method can be found
					if( data.method && typeof Reveal[data.method] === 'function' ) {

						if( POST_MESSAGE_METHOD_BLACKLIST.test( data.method ) === false ) {

							const result = Reveal[data.method].apply( Reveal, data.args );

							// Dispatch a postMessage event with the returned value from
							// our method invocation for getter functions
							dispatchPostMessage( 'callback', { method: data.method, result: result } );

						}
						else {
							console.warn( 'reveal.js: "'+ data.method +'" is is blacklisted from the postMessage API' );
						}

					}
				}
			}, false );
		}

	}

	/**
	 * Applies the configuration settings from the config
	 * object. May be called multiple times.
	 *
	 * @param {object} options
	 */
	function configure( options ) {

		const oldConfig = { ...config }

		// New config options may be passed when this method
		// is invoked through the API after initialization
		if( typeof options === 'object' ) Util.extend( config, options );

		// Abort if reveal.js hasn't finished loading, config
		// changes will be applied automatically once ready
		if( Reveal.isReady() ===  false ) return;

		const numberOfSlides = dom.wrapper.querySelectorAll( SLIDES_SELECTOR ).length;

		// The transition is added as a class on the .reveal element
		dom.wrapper.classList.remove( oldConfig.transition );
		dom.wrapper.classList.add( config.transition );

		dom.wrapper.setAttribute( 'data-transition-speed', config.transitionSpeed );
		dom.wrapper.setAttribute( 'data-background-transition', config.backgroundTransition );

		if( config.shuffle ) {
			shuffle();
		}

		Util.toggleClass( dom.wrapper, 'embedded', config.embedded );
		Util.toggleClass( dom.wrapper, 'rtl', config.rtl );
		Util.toggleClass( dom.wrapper, 'center', config.center );

		// Exit the paused mode if it was configured off
		if( config.pause === false ) {
			resume();
		}

		// Iframe link previews
		if( config.previewLinks ) {
			enablePreviewLinks();
			disablePreviewLinks( '[data-preview-link=false]' );
		}
		else {
			disablePreviewLinks();
			enablePreviewLinks( '[data-preview-link]:not([data-preview-link=false])' );
		}

		// Reset all changes made by auto-animations
		autoAnimate.reset();

		// Remove existing auto-slide controls
		if( autoSlidePlayer ) {
			autoSlidePlayer.destroy();
			autoSlidePlayer = null;
		}

		// Generate auto-slide controls if needed
		if( numberOfSlides > 1 && config.autoSlide && config.autoSlideStoppable ) {
			autoSlidePlayer = new Playback( dom.wrapper, () => {
				return Math.min( Math.max( ( Date.now() - autoSlideStartTime ) / autoSlide, 0 ), 1 );
			} );

			autoSlidePlayer.on( 'click', onAutoSlidePlayerClick );
			autoSlidePaused = false;
		}

		// Add the navigation mode to the DOM so we can adjust styling
		if( config.navigationMode !== 'default' ) {
			dom.wrapper.setAttribute( 'data-navigation-mode', config.navigationMode );
		}
		else {
			dom.wrapper.removeAttribute( 'data-navigation-mode' );
		}

		notes.configure( config, oldConfig );
		focus.configure( config, oldConfig );
		pointer.configure( config, oldConfig );
		controls.configure( config, oldConfig );
		progress.configure( config, oldConfig );
		keyboard.configure( config, oldConfig );
		fragments.configure( config, oldConfig );
		slideNumber.configure( config, oldConfig );

		sync();

	}

	/**
	 * Binds all event listeners.
	 */
	function addEventListeners() {

		eventsAreBound = true;

		window.addEventListener( 'resize', onWindowResize, false );

		if( config.touch ) touch.bind();
		if( config.keyboard ) keyboard.bind();
		if( config.progress ) progress.bind();
		if( config.respondToHashChanges ) location.bind();
		controls.bind();
		focus.bind();

		dom.slides.addEventListener( 'transitionend', onTransitionEnd, false );
		dom.pauseOverlay.addEventListener( 'click', resume, false );

		if( config.focusBodyOnPageVisibilityChange ) {
			document.addEventListener( 'visibilitychange', onPageVisibilityChange, false );
		}

	}

	/**
	 * Unbinds all event listeners.
	 */
	function removeEventListeners() {

		eventsAreBound = false;

		touch.unbind();
		focus.unbind();
		keyboard.unbind();
		controls.unbind();
		progress.unbind();
		location.unbind();

		window.removeEventListener( 'resize', onWindowResize, false );

		dom.slides.removeEventListener( 'transitionend', onTransitionEnd, false );
		dom.pauseOverlay.removeEventListener( 'click', resume, false );

	}

	/**
	 * Adds a listener to one of our custom reveal.js events,
	 * like slidechanged.
	 */
	function on( type, listener, useCapture ) {

		revealElement.addEventListener( type, listener, useCapture );

	}

	/**
	 * Unsubscribes from a reveal.js event.
	 */
	function off( type, listener, useCapture ) {

		revealElement.removeEventListener( type, listener, useCapture );

	}

	/**
	 * Applies CSS transforms to the slides container. The container
	 * is transformed from two separate sources: layout and the overview
	 * mode.
	 *
	 * @param {object} transforms
	 */
	function transformSlides( transforms ) {

		// Pick up new transforms from arguments
		if( typeof transforms.layout === 'string' ) slidesTransform.layout = transforms.layout;
		if( typeof transforms.overview === 'string' ) slidesTransform.overview = transforms.overview;

		// Apply the transforms to the slides container
		if( slidesTransform.layout ) {
			Util.transformElement( dom.slides, slidesTransform.layout + ' ' + slidesTransform.overview );
		}
		else {
			Util.transformElement( dom.slides, slidesTransform.overview );
		}

	}

	/**
	 * Dispatches an event of the specified type from the
	 * reveal DOM element.
	 */
	function dispatchEvent({ target=dom.wrapper, type, data, bubbles=true }) {

		let event = document.createEvent( 'HTMLEvents', 1, 2 );
		event.initEvent( type, bubbles, true );
		Util.extend( event, data );
		target.dispatchEvent( event );

		if( target === dom.wrapper ) {
			// If we're in an iframe, post each reveal.js event to the
			// parent window. Used by the notes plugin
			dispatchPostMessage( type );
		}

	}

	/**
	 * Dispatched a postMessage of the given type from our window.
	 */
	function dispatchPostMessage( type, data ) {

		if( config.postMessageEvents && window.parent !== window.self ) {
			let message = {
				namespace: 'reveal',
				eventName: type,
				state: getState()
			};

			Util.extend( message, data );

			window.parent.postMessage( JSON.stringify( message ), '*' );
		}

	}

	/**
	 * Bind preview frame links.
	 *
	 * @param {string} [selector=a] - selector for anchors
	 */
	function enablePreviewLinks( selector = 'a' ) {

		Array.from( dom.wrapper.querySelectorAll( selector ) ).forEach( element => {
			if( /^(http|www)/gi.test( element.getAttribute( 'href' ) ) ) {
				element.addEventListener( 'click', onPreviewLinkClicked, false );
			}
		} );

	}

	/**
	 * Unbind preview frame links.
	 */
	function disablePreviewLinks( selector = 'a' ) {

		Array.from( dom.wrapper.querySelectorAll( selector ) ).forEach( element => {
			if( /^(http|www)/gi.test( element.getAttribute( 'href' ) ) ) {
				element.removeEventListener( 'click', onPreviewLinkClicked, false );
			}
		} );

	}

	/**
	 * Opens a preview window for the target URL.
	 *
	 * @param {string} url - url for preview iframe src
	 */
	function showPreview( url ) {

		closeOverlay();

		dom.overlay = document.createElement( 'div' );
		dom.overlay.classList.add( 'overlay' );
		dom.overlay.classList.add( 'overlay-preview' );
		dom.wrapper.appendChild( dom.overlay );

		dom.overlay.innerHTML =
			`<header>
				<a class="close" href="#"><span class="icon"></span></a>
				<a class="external" href="${url}" target="_blank"><span class="icon"></span></a>
			</header>
			<div class="spinner"></div>
			<div class="viewport">
				<iframe src="${url}"></iframe>
				<small class="viewport-inner">
					<span class="x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`;

		dom.overlay.querySelector( 'iframe' ).addEventListener( 'load', event => {
			dom.overlay.classList.add( 'loaded' );
		}, false );

		dom.overlay.querySelector( '.close' ).addEventListener( 'click', event => {
			closeOverlay();
			event.preventDefault();
		}, false );

		dom.overlay.querySelector( '.external' ).addEventListener( 'click', event => {
			closeOverlay();
		}, false );

	}

	/**
	 * Open or close help overlay window.
	 *
	 * @param {Boolean} [override] Flag which overrides the
	 * toggle logic and forcibly sets the desired state. True means
	 * help is open, false means it's closed.
	 */
	function toggleHelp( override ){

		if( typeof override === 'boolean' ) {
			override ? showHelp() : closeOverlay();
		}
		else {
			if( dom.overlay ) {
				closeOverlay();
			}
			else {
				showHelp();
			}
		}
	}

	/**
	 * Opens an overlay window with help material.
	 */
	function showHelp() {

		if( config.help ) {

			closeOverlay();

			dom.overlay = document.createElement( 'div' );
			dom.overlay.classList.add( 'overlay' );
			dom.overlay.classList.add( 'overlay-help' );
			dom.wrapper.appendChild( dom.overlay );

			let html = '<p class="title">Keyboard Shortcuts</p><br/>';

			let shortcuts = keyboard.getShortcuts(),
				bindings = keyboard.getBindings();

			html += '<table><th>KEY</th><th>ACTION</th>';
			for( let key in shortcuts ) {
				html += `<tr><td>${key}</td><td>${shortcuts[ key ]}</td></tr>`;
			}

			// Add custom key bindings that have associated descriptions
			for( let binding in bindings ) {
				if( bindings[binding].key && bindings[binding].description ) {
					html += `<tr><td>${bindings[binding].key}</td><td>${bindings[binding].description}</td></tr>`;
				}
			}

			html += '</table>';

			dom.overlay.innerHTML = `
				<header>
					<a class="close" href="#"><span class="icon"></span></a>
				</header>
				<div class="viewport">
					<div class="viewport-inner">${html}</div>
				</div>
			`;

			dom.overlay.querySelector( '.close' ).addEventListener( 'click', event => {
				closeOverlay();
				event.preventDefault();
			}, false );

		}

	}

	/**
	 * Closes any currently open overlay.
	 */
	function closeOverlay() {

		if( dom.overlay ) {
			dom.overlay.parentNode.removeChild( dom.overlay );
			dom.overlay = null;
			return true;
		}

		return false;

	}

	/**
	 * Applies JavaScript-controlled layout rules to the
	 * presentation.
	 */
	function layout() {

		if( dom.wrapper && !print.isPrintingPDF() ) {

			if( !config.disableLayout ) {

				// On some mobile devices '100vh' is taller than the visible
				// viewport which leads to part of the presentation being
				// cut off. To work around this we define our own '--vh' custom
				// property where 100x adds up to the correct height.
				//
				// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
				if( Device.isMobile && !config.embedded ) {
					document.documentElement.style.setProperty( '--vh', ( window.innerHeight * 0.01 ) + 'px' );
				}

				const size = getComputedSlideSize();

				const oldScale = scale;

				// Layout the contents of the slides
				layoutSlideContents( config.width, config.height );

				dom.slides.style.width = size.width + 'px';
				dom.slides.style.height = size.height + 'px';

				// Determine scale of content to fit within available space
				scale = Math.min( size.presentationWidth / size.width, size.presentationHeight / size.height );

				// Respect max/min scale settings
				scale = Math.max( scale, config.minScale );
				scale = Math.min( scale, config.maxScale );

				// Don't apply any scaling styles if scale is 1
				if( scale === 1 ) {
					dom.slides.style.zoom = '';
					dom.slides.style.left = '';
					dom.slides.style.top = '';
					dom.slides.style.bottom = '';
					dom.slides.style.right = '';
					transformSlides( { layout: '' } );
				}
				else {
					// Zoom Scaling
					// Content remains crisp no matter how much we scale. Side
					// effects are minor differences in text layout and iframe
					// viewports changing size. A 200x200 iframe viewport in a
					// 2x zoomed presentation ends up having a 400x400 viewport.
					if( scale > 1 && Device.supportsZoom && window.devicePixelRatio < 2 ) {
						dom.slides.style.zoom = scale;
						dom.slides.style.left = '';
						dom.slides.style.top = '';
						dom.slides.style.bottom = '';
						dom.slides.style.right = '';
						transformSlides( { layout: '' } );
					}
					// Transform Scaling
					// Content layout remains the exact same when scaled up.
					// Side effect is content becoming blurred, especially with
					// high scale values on ldpi screens.
					else {
						dom.slides.style.zoom = '';
						dom.slides.style.left = '50%';
						dom.slides.style.top = '50%';
						dom.slides.style.bottom = 'auto';
						dom.slides.style.right = 'auto';
						transformSlides( { layout: 'translate(-50%, -50%) scale('+ scale +')' } );
					}
				}

				// Select all slides, vertical and horizontal
				const slides = Array.from( dom.wrapper.querySelectorAll( SLIDES_SELECTOR ) );

				for( let i = 0, len = slides.length; i < len; i++ ) {
					const slide = slides[ i ];

					// Don't bother updating invisible slides
					if( slide.style.display === 'none' ) {
						continue;
					}

					if( config.center || slide.classList.contains( 'center' ) ) {
						// Vertical stacks are not centred since their section
						// children will be
						if( slide.classList.contains( 'stack' ) ) {
							slide.style.top = 0;
						}
						else {
							slide.style.top = Math.max( ( size.height - slide.scrollHeight ) / 2, 0 ) + 'px';
						}
					}
					else {
						slide.style.top = '';
					}

				}

				if( oldScale !== scale ) {
					dispatchEvent({
						type: 'resize',
						data: {
							oldScale,
							scale,
							size
						}
					});
				}
			}

			progress.update();
			backgrounds.updateParallax();

			if( overview.isActive() ) {
				overview.update();
			}

		}

	}

	/**
	 * Applies layout logic to the contents of all slides in
	 * the presentation.
	 *
	 * @param {string|number} width
	 * @param {string|number} height
	 */
	function layoutSlideContents( width, height ) {

		// Handle sizing of elements with the 'r-stretch' class
		Util.queryAll( dom.slides, 'section > .stretch, section > .r-stretch' ).forEach( element => {

			// Determine how much vertical space we can use
			let remainingHeight = Util.getRemainingHeight( element, height );

			// Consider the aspect ratio of media elements
			if( /(img|video)/gi.test( element.nodeName ) ) {
				const nw = element.naturalWidth || element.videoWidth,
					  nh = element.naturalHeight || element.videoHeight;

				const es = Math.min( width / nw, remainingHeight / nh );

				element.style.width = ( nw * es ) + 'px';
				element.style.height = ( nh * es ) + 'px';

			}
			else {
				element.style.width = width + 'px';
				element.style.height = remainingHeight + 'px';
			}

		} );

	}

	/**
	 * Calculates the computed pixel size of our slides. These
	 * values are based on the width and height configuration
	 * options.
	 *
	 * @param {number} [presentationWidth=dom.wrapper.offsetWidth]
	 * @param {number} [presentationHeight=dom.wrapper.offsetHeight]
	 */
	function getComputedSlideSize( presentationWidth, presentationHeight ) {

		const size = {
			// Slide size
			width: config.width,
			height: config.height,

			// Presentation size
			presentationWidth: presentationWidth || dom.wrapper.offsetWidth,
			presentationHeight: presentationHeight || dom.wrapper.offsetHeight
		};

		// Reduce available space by margin
		size.presentationWidth -= ( size.presentationWidth * config.margin );
		size.presentationHeight -= ( size.presentationHeight * config.margin );

		// Slide width may be a percentage of available width
		if( typeof size.width === 'string' && /%$/.test( size.width ) ) {
			size.width = parseInt( size.width, 10 ) / 100 * size.presentationWidth;
		}

		// Slide height may be a percentage of available height
		if( typeof size.height === 'string' && /%$/.test( size.height ) ) {
			size.height = parseInt( size.height, 10 ) / 100 * size.presentationHeight;
		}

		return size;

	}

	/**
	 * Stores the vertical index of a stack so that the same
	 * vertical slide can be selected when navigating to and
	 * from the stack.
	 *
	 * @param {HTMLElement} stack The vertical stack element
	 * @param {string|number} [v=0] Index to memorize
	 */
	function setPreviousVerticalIndex( stack, v ) {

		if( typeof stack === 'object' && typeof stack.setAttribute === 'function' ) {
			stack.setAttribute( 'data-previous-indexv', v || 0 );
		}

	}

	/**
	 * Retrieves the vertical index which was stored using
	 * #setPreviousVerticalIndex() or 0 if no previous index
	 * exists.
	 *
	 * @param {HTMLElement} stack The vertical stack element
	 */
	function getPreviousVerticalIndex( stack ) {

		if( typeof stack === 'object' && typeof stack.setAttribute === 'function' && stack.classList.contains( 'stack' ) ) {
			// Prefer manually defined start-indexv
			const attributeName = stack.hasAttribute( 'data-start-indexv' ) ? 'data-start-indexv' : 'data-previous-indexv';

			return parseInt( stack.getAttribute( attributeName ) || 0, 10 );
		}

		return 0;

	}

	/**
	 * Checks if the current or specified slide is vertical
	 * (nested within another slide).
	 *
	 * @param {HTMLElement} [slide=currentSlide] The slide to check
	 * orientation of
	 * @return {Boolean}
	 */
	function isVerticalSlide( slide = currentSlide ) {

		return slide && slide.parentNode && !!slide.parentNode.nodeName.match( /section/i );

	}

	/**
	 * Returns true if we're on the last slide in the current
	 * vertical stack.
	 */
	function isLastVerticalSlide() {

		if( currentSlide && isVerticalSlide( currentSlide ) ) {
			// Does this slide have a next sibling?
			if( currentSlide.nextElementSibling ) return false;

			return true;
		}

		return false;

	}

	/**
	 * Returns true if we're currently on the first slide in
	 * the presentation.
	 */
	function isFirstSlide() {

		return indexh === 0 && indexv === 0;

	}

	/**
	 * Returns true if we're currently on the last slide in
	 * the presenation. If the last slide is a stack, we only
	 * consider this the last slide if it's at the end of the
	 * stack.
	 */
	function isLastSlide() {

		if( currentSlide ) {
			// Does this slide have a next sibling?
			if( currentSlide.nextElementSibling ) return false;

			// If it's vertical, does its parent have a next sibling?
			if( isVerticalSlide( currentSlide ) && currentSlide.parentNode.nextElementSibling ) return false;

			return true;
		}

		return false;

	}

	/**
	 * Enters the paused mode which fades everything on screen to
	 * black.
	 */
	function pause() {

		if( config.pause ) {
			const wasPaused = dom.wrapper.classList.contains( 'paused' );

			cancelAutoSlide();
			dom.wrapper.classList.add( 'paused' );

			if( wasPaused === false ) {
				dispatchEvent({ type: 'paused' });
			}
		}

	}

	/**
	 * Exits from the paused mode.
	 */
	function resume() {

		const wasPaused = dom.wrapper.classList.contains( 'paused' );
		dom.wrapper.classList.remove( 'paused' );

		cueAutoSlide();

		if( wasPaused ) {
			dispatchEvent({ type: 'resumed' });
		}

	}

	/**
	 * Toggles the paused mode on and off.
	 */
	function togglePause( override ) {

		if( typeof override === 'boolean' ) {
			override ? pause() : resume();
		}
		else {
			isPaused() ? resume() : pause();
		}

	}

	/**
	 * Checks if we are currently in the paused mode.
	 *
	 * @return {Boolean}
	 */
	function isPaused() {

		return dom.wrapper.classList.contains( 'paused' );

	}

	/**
	 * Toggles the auto slide mode on and off.
	 *
	 * @param {Boolean} [override] Flag which sets the desired state.
	 * True means autoplay starts, false means it stops.
	 */

	function toggleAutoSlide( override ) {

		if( typeof override === 'boolean' ) {
			override ? resumeAutoSlide() : pauseAutoSlide();
		}

		else {
			autoSlidePaused ? resumeAutoSlide() : pauseAutoSlide();
		}

	}

	/**
	 * Checks if the auto slide mode is currently on.
	 *
	 * @return {Boolean}
	 */
	function isAutoSliding() {

		return !!( autoSlide && !autoSlidePaused );

	}

	/**
	 * Steps from the current point in the presentation to the
	 * slide which matches the specified horizontal and vertical
	 * indices.
	 *
	 * @param {number} [h=indexh] Horizontal index of the target slide
	 * @param {number} [v=indexv] Vertical index of the target slide
	 * @param {number} [f] Index of a fragment within the
	 * target slide to activate
	 * @param {number} [o] Origin for use in multimaster environments
	 */
	function slide( h, v, f, o ) {

		// Remember where we were at before
		previousSlide = currentSlide;

		// Query all horizontal slides in the deck
		const horizontalSlides = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR );

		// Abort if there are no slides
		if( horizontalSlides.length === 0 ) return;

		// If no vertical index is specified and the upcoming slide is a
		// stack, resume at its previous vertical index
		if( v === undefined && !overview.isActive() ) {
			v = getPreviousVerticalIndex( horizontalSlides[ h ] );
		}

		// If we were on a vertical stack, remember what vertical index
		// it was on so we can resume at the same position when returning
		if( previousSlide && previousSlide.parentNode && previousSlide.parentNode.classList.contains( 'stack' ) ) {
			setPreviousVerticalIndex( previousSlide.parentNode, indexv );
		}

		// Remember the state before this slide
		const stateBefore = state.concat();

		// Reset the state array
		state.length = 0;

		let indexhBefore = indexh || 0,
			indexvBefore = indexv || 0;

		// Activate and transition to the new slide
		indexh = updateSlides( HORIZONTAL_SLIDES_SELECTOR, h === undefined ? indexh : h );
		indexv = updateSlides( VERTICAL_SLIDES_SELECTOR, v === undefined ? indexv : v );

		// Dispatch an event if the slide changed
		let slideChanged = ( indexh !== indexhBefore || indexv !== indexvBefore );

		// Ensure that the previous slide is never the same as the current
		if( !slideChanged ) previousSlide = null;

		// Find the current horizontal slide and any possible vertical slides
		// within it
		let currentHorizontalSlide = horizontalSlides[ indexh ],
			currentVerticalSlides = currentHorizontalSlide.querySelectorAll( 'section' );

		// Store references to the previous and current slides
		currentSlide = currentVerticalSlides[ indexv ] || currentHorizontalSlide;

		let autoAnimateTransition = false;

		// Detect if we're moving between two auto-animated slides
		if( slideChanged && previousSlide && currentSlide && !overview.isActive() ) {

			// If this is an auto-animated transition, we disable the
			// regular slide transition
			//
			// Note 20-03-2020:
			// This needs to happen before we update slide visibility,
			// otherwise transitions will still run in Safari.
			if( previousSlide.hasAttribute( 'data-auto-animate' ) && currentSlide.hasAttribute( 'data-auto-animate' ) ) {
				autoAnimateTransition = true;
				dom.slides.classList.add( 'disable-slide-transitions' );
			}

			transition = 'running';

		}

		// Update the visibility of slides now that the indices have changed
		updateSlidesVisibility();

		layout();

		// Update the overview if it's currently active
		if( overview.isActive() ) {
			overview.update();
		}

		// Show fragment, if specified
		if( typeof f !== 'undefined' ) {
			fragments.goto( f );
		}

		// Solves an edge case where the previous slide maintains the
		// 'present' class when navigating between adjacent vertical
		// stacks
		if( previousSlide && previousSlide !== currentSlide ) {
			previousSlide.classList.remove( 'present' );
			previousSlide.setAttribute( 'aria-hidden', 'true' );

			// Reset all slides upon navigate to home
			if( isFirstSlide() ) {
				// Launch async task
				setTimeout( () => {
					getVerticalStacks().forEach( slide => {
						setPreviousVerticalIndex( slide, 0 );
					} );
				}, 0 );
			}
		}

		// Apply the new state
		stateLoop: for( let i = 0, len = state.length; i < len; i++ ) {
			// Check if this state existed on the previous slide. If it
			// did, we will avoid adding it repeatedly
			for( let j = 0; j < stateBefore.length; j++ ) {
				if( stateBefore[j] === state[i] ) {
					stateBefore.splice( j, 1 );
					continue stateLoop;
				}
			}

			dom.viewport.classList.add( state[i] );

			// Dispatch custom event matching the state's name
			dispatchEvent({ type: state[i] });
		}

		// Clean up the remains of the previous state
		while( stateBefore.length ) {
			dom.viewport.classList.remove( stateBefore.pop() );
		}

		if( slideChanged ) {
			dispatchEvent({
				type: 'slidechanged',
				data: {
					indexh,
					indexv,
					previousSlide,
					currentSlide,
					origin: o
				}
			});
		}

		// Handle embedded content
		if( slideChanged || !previousSlide ) {
			slideContent.stopEmbeddedContent( previousSlide );
			slideContent.startEmbeddedContent( currentSlide );
		}

		// Announce the current slide contents to screen readers
		announceStatus( getStatusText( currentSlide ) );

		progress.update();
		controls.update();
		notes.update();
		backgrounds.update();
		backgrounds.updateParallax();
		slideNumber.update();
		fragments.update();

		// Update the URL hash
		location.writeURL();

		cueAutoSlide();

		// Auto-animation
		if( autoAnimateTransition ) {

			setTimeout( () => {
				dom.slides.classList.remove( 'disable-slide-transitions' );
			}, 0 );

			if( config.autoAnimate ) {
				// Run the auto-animation between our slides
				autoAnimate.run( previousSlide, currentSlide );
			}

		}

	}

	/**
	 * Syncs the presentation with the current DOM. Useful
	 * when new slides or control elements are added or when
	 * the configuration has changed.
	 */
	function sync() {

		// Subscribe to input
		removeEventListeners();
		addEventListeners();

		// Force a layout to make sure the current config is accounted for
		layout();

		// Reflect the current autoSlide value
		autoSlide = config.autoSlide;

		// Start auto-sliding if it's enabled
		cueAutoSlide();

		// Re-create all slide backgrounds
		backgrounds.create();

		// Write the current hash to the URL
		location.writeURL();

		fragments.sortAll();

		controls.update();
		progress.update();

		updateSlidesVisibility();

		notes.update();
		notes.updateVisibility();
		backgrounds.update( true );
		slideNumber.update();
		slideContent.formatEmbeddedContent();

		// Start or stop embedded content depending on global config
		if( config.autoPlayMedia === false ) {
			slideContent.stopEmbeddedContent( currentSlide, { unloadIframes: false } );
		}
		else {
			slideContent.startEmbeddedContent( currentSlide );
		}

		if( overview.isActive() ) {
			overview.layout();
		}

	}

	/**
	 * Updates reveal.js to keep in sync with new slide attributes. For
	 * example, if you add a new `data-background-image` you can call
	 * this to have reveal.js render the new background image.
	 *
	 * Similar to #sync() but more efficient when you only need to
	 * refresh a specific slide.
	 *
	 * @param {HTMLElement} slide
	 */
	function syncSlide( slide = currentSlide ) {

		backgrounds.sync( slide );
		fragments.sync( slide );

		slideContent.load( slide );

		backgrounds.update();
		notes.update();

	}

	/**
	 * Resets all vertical slides so that only the first
	 * is visible.
	 */
	function resetVerticalSlides() {

		getHorizontalSlides().forEach( horizontalSlide => {

			Util.queryAll( horizontalSlide, 'section' ).forEach( ( verticalSlide, y ) => {

				if( y > 0 ) {
					verticalSlide.classList.remove( 'present' );
					verticalSlide.classList.remove( 'past' );
					verticalSlide.classList.add( 'future' );
					verticalSlide.setAttribute( 'aria-hidden', 'true' );
				}

			} );

		} );

	}

	/**
	 * Randomly shuffles all slides in the deck.
	 */
	function shuffle() {

		getHorizontalSlides().forEach( ( slide, i, slides ) => {

			// Insert this slide next to another random slide. This may
			// cause the slide to insert before itself but that's fine.
			dom.slides.insertBefore( slide, slides[ Math.floor( Math.random() * slides.length ) ] );

		} );

	}

	/**
	 * Updates one dimension of slides by showing the slide
	 * with the specified index.
	 *
	 * @param {string} selector A CSS selector that will fetch
	 * the group of slides we are working with
	 * @param {number} index The index of the slide that should be
	 * shown
	 *
	 * @return {number} The index of the slide that is now shown,
	 * might differ from the passed in index if it was out of
	 * bounds.
	 */
	function updateSlides( selector, index ) {

		// Select all slides and convert the NodeList result to
		// an array
		let slides = Util.queryAll( dom.wrapper, selector ),
			slidesLength = slides.length;

		let printMode = print.isPrintingPDF();

		if( slidesLength ) {

			// Should the index loop?
			if( config.loop ) {
				index %= slidesLength;

				if( index < 0 ) {
					index = slidesLength + index;
				}
			}

			// Enforce max and minimum index bounds
			index = Math.max( Math.min( index, slidesLength - 1 ), 0 );

			for( let i = 0; i < slidesLength; i++ ) {
				let element = slides[i];

				let reverse = config.rtl && !isVerticalSlide( element );

				// Avoid .remove() with multiple args for IE11 support
				element.classList.remove( 'past' );
				element.classList.remove( 'present' );
				element.classList.remove( 'future' );

				// http://www.w3.org/html/wg/drafts/html/master/editing.html#the-hidden-attribute
				element.setAttribute( 'hidden', '' );
				element.setAttribute( 'aria-hidden', 'true' );

				// If this element contains vertical slides
				if( element.querySelector( 'section' ) ) {
					element.classList.add( 'stack' );
				}

				// If we're printing static slides, all slides are "present"
				if( printMode ) {
					element.classList.add( 'present' );
					continue;
				}

				if( i < index ) {
					// Any element previous to index is given the 'past' class
					element.classList.add( reverse ? 'future' : 'past' );

					if( config.fragments ) {
						// Show all fragments in prior slides
						Util.queryAll( element, '.fragment' ).forEach( fragment => {
							fragment.classList.add( 'visible' );
							fragment.classList.remove( 'current-fragment' );
						} );
					}
				}
				else if( i > index ) {
					// Any element subsequent to index is given the 'future' class
					element.classList.add( reverse ? 'past' : 'future' );

					if( config.fragments ) {
						// Hide all fragments in future slides
						Util.queryAll( element, '.fragment.visible' ).forEach( fragment => {
							fragment.classList.remove( 'visible', 'current-fragment' );
						} );
					}
				}
			}

			let slide = slides[index];
			let wasPresent = slide.classList.contains( 'present' );

			// Mark the current slide as present
			slide.classList.add( 'present' );
			slide.removeAttribute( 'hidden' );
			slide.removeAttribute( 'aria-hidden' );

			if( !wasPresent ) {
				// Dispatch an event indicating the slide is now visible
				dispatchEvent({
					target: slide,
					type: 'visible',
					bubbles: false
				});
			}

			// If this slide has a state associated with it, add it
			// onto the current state of the deck
			let slideState = slide.getAttribute( 'data-state' );
			if( slideState ) {
				state = state.concat( slideState.split( ' ' ) );
			}

		}
		else {
			// Since there are no slides we can't be anywhere beyond the
			// zeroth index
			index = 0;
		}

		return index;

	}

	/**
	 * Optimization method; hide all slides that are far away
	 * from the present slide.
	 */
	function updateSlidesVisibility() {

		// Select all slides and convert the NodeList result to
		// an array
		let horizontalSlides = getHorizontalSlides(),
			horizontalSlidesLength = horizontalSlides.length,
			distanceX,
			distanceY;

		if( horizontalSlidesLength && typeof indexh !== 'undefined' ) {

			// The number of steps away from the present slide that will
			// be visible
			let viewDistance = overview.isActive() ? 10 : config.viewDistance;

			// Shorten the view distance on devices that typically have
			// less resources
			if( Device.isMobile ) {
				viewDistance = overview.isActive() ? 6 : config.mobileViewDistance;
			}

			// All slides need to be visible when exporting to PDF
			if( print.isPrintingPDF() ) {
				viewDistance = Number.MAX_VALUE;
			}

			for( let x = 0; x < horizontalSlidesLength; x++ ) {
				let horizontalSlide = horizontalSlides[x];

				let verticalSlides = Util.queryAll( horizontalSlide, 'section' ),
					verticalSlidesLength = verticalSlides.length;

				// Determine how far away this slide is from the present
				distanceX = Math.abs( ( indexh || 0 ) - x ) || 0;

				// If the presentation is looped, distance should measure
				// 1 between the first and last slides
				if( config.loop ) {
					distanceX = Math.abs( ( ( indexh || 0 ) - x ) % ( horizontalSlidesLength - viewDistance ) ) || 0;
				}

				// Show the horizontal slide if it's within the view distance
				if( distanceX < viewDistance ) {
					slideContent.load( horizontalSlide );
				}
				else {
					slideContent.unload( horizontalSlide );
				}

				if( verticalSlidesLength ) {

					let oy = getPreviousVerticalIndex( horizontalSlide );

					for( let y = 0; y < verticalSlidesLength; y++ ) {
						let verticalSlide = verticalSlides[y];

						distanceY = x === ( indexh || 0 ) ? Math.abs( ( indexv || 0 ) - y ) : Math.abs( y - oy );

						if( distanceX + distanceY < viewDistance ) {
							slideContent.load( verticalSlide );
						}
						else {
							slideContent.unload( verticalSlide );
						}
					}

				}
			}

			// Flag if there are ANY vertical slides, anywhere in the deck
			if( hasVerticalSlides() ) {
				dom.wrapper.classList.add( 'has-vertical-slides' );
			}
			else {
				dom.wrapper.classList.remove( 'has-vertical-slides' );
			}

			// Flag if there are ANY horizontal slides, anywhere in the deck
			if( hasHorizontalSlides() ) {
				dom.wrapper.classList.add( 'has-horizontal-slides' );
			}
			else {
				dom.wrapper.classList.remove( 'has-horizontal-slides' );
			}

		}

	}

	/**
	 * Determine what available routes there are for navigation.
	 *
	 * @return {{left: boolean, right: boolean, up: boolean, down: boolean}}
	 */
	function availableRoutes({ includeFragments = false } = {}) {

		let horizontalSlides = dom.wrapper.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ),
			verticalSlides = dom.wrapper.querySelectorAll( VERTICAL_SLIDES_SELECTOR );

		let routes = {
			left: indexh > 0,
			right: indexh < horizontalSlides.length - 1,
			up: indexv > 0,
			down: indexv < verticalSlides.length - 1
		};

		// Looped presentations can always be navigated as long as
		// there are slides available
		if( config.loop ) {
			if( horizontalSlides.length > 1 ) {
				routes.left = true;
				routes.right = true;
			}

			if( verticalSlides.length > 1 ) {
				routes.up = true;
				routes.down = true;
			}
		}

		if ( horizontalSlides.length > 1 && config.navigationMode === 'linear' ) {
			routes.right = routes.right || routes.down;
			routes.left = routes.left || routes.up;
		}

		// If includeFragments is set, a route will be considered
		// availalbe if either a slid OR fragment is available in
		// the given direction
		if( includeFragments === true ) {
			let fragmentRoutes = fragments.availableRoutes();
			routes.left = routes.left || fragmentRoutes.prev;
			routes.up = routes.up || fragmentRoutes.prev;
			routes.down = routes.down || fragmentRoutes.next;
			routes.right = routes.right || fragmentRoutes.next;
		}

		// Reverse horizontal controls for rtl
		if( config.rtl ) {
			let left = routes.left;
			routes.left = routes.right;
			routes.right = left;
		}

		return routes;

	}

	/**
	 * Returns the number of past slides. This can be used as a global
	 * flattened index for slides.
	 *
	 * @param {HTMLElement} [slide=currentSlide] The slide we're counting before
	 *
	 * @return {number} Past slide count
	 */
	function getSlidePastCount( slide = currentSlide ) {

		let horizontalSlides = getHorizontalSlides();

		// The number of past slides
		let pastCount = 0;

		// Step through all slides and count the past ones
		mainLoop: for( let i = 0; i < horizontalSlides.length; i++ ) {

			let horizontalSlide = horizontalSlides[i];
			let verticalSlides = horizontalSlide.querySelectorAll( 'section' );

			for( let j = 0; j < verticalSlides.length; j++ ) {

				// Stop as soon as we arrive at the present
				if( verticalSlides[j] === slide ) {
					break mainLoop;
				}

				// Don't count slides with the "uncounted" class
				if( verticalSlides[j].dataset.visibility !== 'uncounted' ) {
					pastCount++;
				}

			}

			// Stop as soon as we arrive at the present
			if( horizontalSlide === slide ) {
				break;
			}

			// Don't count the wrapping section for vertical slides and
			// slides marked as uncounted
			if( horizontalSlide.classList.contains( 'stack' ) === false && !horizontalSlide.dataset.visibility !== 'uncounted' ) {
				pastCount++;
			}

		}

		return pastCount;

	}

	/**
	 * Returns a value ranging from 0-1 that represents
	 * how far into the presentation we have navigated.
	 *
	 * @return {number}
	 */
	function getProgress() {

		// The number of past and total slides
		let totalCount = getTotalSlides();
		let pastCount = getSlidePastCount();

		if( currentSlide ) {

			let allFragments = currentSlide.querySelectorAll( '.fragment' );

			// If there are fragments in the current slide those should be
			// accounted for in the progress.
			if( allFragments.length > 0 ) {
				let visibleFragments = currentSlide.querySelectorAll( '.fragment.visible' );

				// This value represents how big a portion of the slide progress
				// that is made up by its fragments (0-1)
				let fragmentWeight = 0.9;

				// Add fragment progress to the past slide count
				pastCount += ( visibleFragments.length / allFragments.length ) * fragmentWeight;
			}

		}

		return Math.min( pastCount / ( totalCount - 1 ), 1 );

	}

	/**
	 * Retrieves the h/v location and fragment of the current,
	 * or specified, slide.
	 *
	 * @param {HTMLElement} [slide] If specified, the returned
	 * index will be for this slide rather than the currently
	 * active one
	 *
	 * @return {{h: number, v: number, f: number}}
	 */
	function getIndices( slide ) {

		// By default, return the current indices
		let h = indexh,
			v = indexv,
			f;

		// If a slide is specified, return the indices of that slide
		if( slide ) {
			let isVertical = isVerticalSlide( slide );
			let slideh = isVertical ? slide.parentNode : slide;

			// Select all horizontal slides
			let horizontalSlides = getHorizontalSlides();

			// Now that we know which the horizontal slide is, get its index
			h = Math.max( horizontalSlides.indexOf( slideh ), 0 );

			// Assume we're not vertical
			v = undefined;

			// If this is a vertical slide, grab the vertical index
			if( isVertical ) {
				v = Math.max( Util.queryAll( slide.parentNode, 'section' ).indexOf( slide ), 0 );
			}
		}

		if( !slide && currentSlide ) {
			let hasFragments = currentSlide.querySelectorAll( '.fragment' ).length > 0;
			if( hasFragments ) {
				let currentFragment = currentSlide.querySelector( '.current-fragment' );
				if( currentFragment && currentFragment.hasAttribute( 'data-fragment-index' ) ) {
					f = parseInt( currentFragment.getAttribute( 'data-fragment-index' ), 10 );
				}
				else {
					f = currentSlide.querySelectorAll( '.fragment.visible' ).length - 1;
				}
			}
		}

		return { h, v, f };

	}

	/**
	 * Retrieves all slides in this presentation.
	 */
	function getSlides() {

		return Util.queryAll( dom.wrapper, SLIDES_SELECTOR + ':not(.stack):not([data-visibility="uncounted"])' );

	}

	/**
	 * Returns a list of all horizontal slides in the deck. Each
	 * vertical stack is included as one horizontal slide in the
	 * resulting array.
	 */
	function getHorizontalSlides() {

		return Util.queryAll( dom.wrapper, HORIZONTAL_SLIDES_SELECTOR );

	}

	/**
	 * Returns all vertical slides that exist within this deck.
	 */
	function getVerticalSlides() {

		return Util.queryAll( dom.wrapper, '.slides>section>section' );

	}

	/**
	 * Returns all vertical stacks (each stack can contain multiple slides).
	 */
	function getVerticalStacks() {

		return Util.queryAll( dom.wrapper, HORIZONTAL_SLIDES_SELECTOR + '.stack');

	}

	/**
	 * Returns true if there are at least two horizontal slides.
	 */
	function hasHorizontalSlides() {

		return getHorizontalSlides().length > 1;
	}

	/**
	 * Returns true if there are at least two vertical slides.
	 */
	function hasVerticalSlides() {

		return getVerticalSlides().length > 1;

	}

	/**
	 * Returns an array of objects where each object represents the
	 * attributes on its respective slide.
	 */
	function getSlidesAttributes() {

		return getSlides().map( slide => {

			let attributes = {};
			for( let i = 0; i < slide.attributes.length; i++ ) {
				let attribute = slide.attributes[ i ];
				attributes[ attribute.name ] = attribute.value;
			}
			return attributes;

		} );

	}

	/**
	 * Retrieves the total number of slides in this presentation.
	 *
	 * @return {number}
	 */
	function getTotalSlides() {

		return getSlides().length;

	}

	/**
	 * Returns the slide element matching the specified index.
	 *
	 * @return {HTMLElement}
	 */
	function getSlide( x, y ) {

		let horizontalSlide = getHorizontalSlides()[ x ];
		let verticalSlides = horizontalSlide && horizontalSlide.querySelectorAll( 'section' );

		if( verticalSlides && verticalSlides.length && typeof y === 'number' ) {
			return verticalSlides ? verticalSlides[ y ] : undefined;
		}

		return horizontalSlide;

	}

	/**
	 * Returns the background element for the given slide.
	 * All slides, even the ones with no background properties
	 * defined, have a background element so as long as the
	 * index is valid an element will be returned.
	 *
	 * @param {mixed} x Horizontal background index OR a slide
	 * HTML element
	 * @param {number} y Vertical background index
	 * @return {(HTMLElement[]|*)}
	 */
	function getSlideBackground( x, y ) {

		let slide = typeof x === 'number' ? getSlide( x, y ) : x;
		if( slide ) {
			return slide.slideBackgroundElement;
		}

		return undefined;

	}

	/**
	 * Retrieves the current state of the presentation as
	 * an object. This state can then be restored at any
	 * time.
	 *
	 * @return {{indexh: number, indexv: number, indexf: number, paused: boolean, overview: boolean}}
	 */
	function getState() {

		let indices = getIndices();

		return {
			indexh: indices.h,
			indexv: indices.v,
			indexf: indices.f,
			paused: isPaused(),
			overview: overview.isActive()
		};

	}

	/**
	 * Restores the presentation to the given state.
	 *
	 * @param {object} state As generated by getState()
	 * @see {@link getState} generates the parameter `state`
	 */
	function setState( state ) {

		if( typeof state === 'object' ) {
			slide( Util.deserialize( state.indexh ), Util.deserialize( state.indexv ), Util.deserialize( state.indexf ) );

			let pausedFlag = Util.deserialize( state.paused ),
				overviewFlag = Util.deserialize( state.overview );

			if( typeof pausedFlag === 'boolean' && pausedFlag !== isPaused() ) {
				togglePause( pausedFlag );
			}

			if( typeof overviewFlag === 'boolean' && overviewFlag !== overview.isActive() ) {
				overview.toggle( overviewFlag );
			}
		}

	}

	/**
	 * Cues a new automated slide if enabled in the config.
	 */
	function cueAutoSlide() {

		cancelAutoSlide();

		if( currentSlide && config.autoSlide !== false ) {

			let fragment = currentSlide.querySelector( '.current-fragment' );

			// When the slide first appears there is no "current" fragment so
			// we look for a data-autoslide timing on the first fragment
			if( !fragment ) fragment = currentSlide.querySelector( '.fragment' );

			let fragmentAutoSlide = fragment ? fragment.getAttribute( 'data-autoslide' ) : null;
			let parentAutoSlide = currentSlide.parentNode ? currentSlide.parentNode.getAttribute( 'data-autoslide' ) : null;
			let slideAutoSlide = currentSlide.getAttribute( 'data-autoslide' );

			// Pick value in the following priority order:
			// 1. Current fragment's data-autoslide
			// 2. Current slide's data-autoslide
			// 3. Parent slide's data-autoslide
			// 4. Global autoSlide setting
			if( fragmentAutoSlide ) {
				autoSlide = parseInt( fragmentAutoSlide, 10 );
			}
			else if( slideAutoSlide ) {
				autoSlide = parseInt( slideAutoSlide, 10 );
			}
			else if( parentAutoSlide ) {
				autoSlide = parseInt( parentAutoSlide, 10 );
			}
			else {
				autoSlide = config.autoSlide;

				// If there are media elements with data-autoplay,
				// automatically set the autoSlide duration to the
				// length of that media. Not applicable if the slide
				// is divided up into fragments.
				// playbackRate is accounted for in the duration.
				if( currentSlide.querySelectorAll( '.fragment' ).length === 0 ) {
					Util.queryAll( currentSlide, 'video, audio' ).forEach( el => {
						if( el.hasAttribute( 'data-autoplay' ) ) {
							if( autoSlide && (el.duration * 1000 / el.playbackRate ) > autoSlide ) {
								autoSlide = ( el.duration * 1000 / el.playbackRate ) + 1000;
							}
						}
					} );
				}
			}

			// Cue the next auto-slide if:
			// - There is an autoSlide value
			// - Auto-sliding isn't paused by the user
			// - The presentation isn't paused
			// - The overview isn't active
			// - The presentation isn't over
			if( autoSlide && !autoSlidePaused && !isPaused() && !overview.isActive() && ( !isLastSlide() || fragments.availableRoutes().next || config.loop === true ) ) {
				autoSlideTimeout = setTimeout( () => {
					if( typeof config.autoSlideMethod === 'function' ) {
						config.autoSlideMethod()
					}
					else {
						navigateNext();
					}
					cueAutoSlide();
				}, autoSlide );
				autoSlideStartTime = Date.now();
			}

			if( autoSlidePlayer ) {
				autoSlidePlayer.setPlaying( autoSlideTimeout !== -1 );
			}

		}

	}

	/**
	 * Cancels any ongoing request to auto-slide.
	 */
	function cancelAutoSlide() {

		clearTimeout( autoSlideTimeout );
		autoSlideTimeout = -1;

	}

	function pauseAutoSlide() {

		if( autoSlide && !autoSlidePaused ) {
			autoSlidePaused = true;
			dispatchEvent({ type: 'autoslidepaused' });
			clearTimeout( autoSlideTimeout );

			if( autoSlidePlayer ) {
				autoSlidePlayer.setPlaying( false );
			}
		}

	}

	function resumeAutoSlide() {

		if( autoSlide && autoSlidePaused ) {
			autoSlidePaused = false;
			dispatchEvent({ type: 'autoslideresumed' });
			cueAutoSlide();
		}

	}

	function navigateLeft() {

		navigationHistory.hasNavigatedHorizontally = true;

		// Reverse for RTL
		if( config.rtl ) {
			if( ( overview.isActive() || fragments.next() === false ) && availableRoutes().left ) {
				slide( indexh + 1, config.navigationMode === 'grid' ? indexv : undefined );
			}
		}
		// Normal navigation
		else if( ( overview.isActive() || fragments.prev() === false ) && availableRoutes().left ) {
			slide( indexh - 1, config.navigationMode === 'grid' ? indexv : undefined );
		}

	}

	function navigateRight() {

		navigationHistory.hasNavigatedHorizontally = true;

		// Reverse for RTL
		if( config.rtl ) {
			if( ( overview.isActive() || fragments.prev() === false ) && availableRoutes().right ) {
				slide( indexh - 1, config.navigationMode === 'grid' ? indexv : undefined );
			}
		}
		// Normal navigation
		else if( ( overview.isActive() || fragments.next() === false ) && availableRoutes().right ) {
			slide( indexh + 1, config.navigationMode === 'grid' ? indexv : undefined );
		}

	}

	function navigateUp() {

		// Prioritize hiding fragments
		if( ( overview.isActive() || fragments.prev() === false ) && availableRoutes().up ) {
			slide( indexh, indexv - 1 );
		}

	}

	function navigateDown() {

		navigationHistory.hasNavigatedVertically = true;

		// Prioritize revealing fragments
		if( ( overview.isActive() || fragments.next() === false ) && availableRoutes().down ) {
			slide( indexh, indexv + 1 );
		}

	}

	/**
	 * Navigates backwards, prioritized in the following order:
	 * 1) Previous fragment
	 * 2) Previous vertical slide
	 * 3) Previous horizontal slide
	 */
	function navigatePrev() {

		// Prioritize revealing fragments
		if( fragments.prev() === false ) {
			if( availableRoutes().up ) {
				navigateUp();
			}
			else {
				// Fetch the previous horizontal slide, if there is one
				let previousSlide;

				if( config.rtl ) {
					previousSlide = Util.queryAll( dom.wrapper, HORIZONTAL_SLIDES_SELECTOR + '.future' ).pop();
				}
				else {
					previousSlide = Util.queryAll( dom.wrapper, HORIZONTAL_SLIDES_SELECTOR + '.past' ).pop();
				}

				if( previousSlide ) {
					let v = ( previousSlide.querySelectorAll( 'section' ).length - 1 ) || undefined;
					let h = indexh - 1;
					slide( h, v );
				}
			}
		}

	}

	/**
	 * The reverse of #navigatePrev().
	 */
	function navigateNext() {

		navigationHistory.hasNavigatedHorizontally = true;
		navigationHistory.hasNavigatedVertically = true;

		// Prioritize revealing fragments
		if( fragments.next() === false ) {

			let routes = availableRoutes();

			// When looping is enabled `routes.down` is always available
			// so we need a separate check for when we've reached the
			// end of a stack and should move horizontally
			if( routes.down && routes.right && config.loop && isLastVerticalSlide( currentSlide ) ) {
				routes.down = false;
			}

			if( routes.down ) {
				navigateDown();
			}
			else if( config.rtl ) {
				navigateLeft();
			}
			else {
				navigateRight();
			}
		}

	}


	// --------------------------------------------------------------------//
	// ----------------------------- EVENTS -------------------------------//
	// --------------------------------------------------------------------//

	/**
	 * Called by all event handlers that are based on user
	 * input.
	 *
	 * @param {object} [event]
	 */
	function onUserInput( event ) {

		if( config.autoSlideStoppable ) {
			pauseAutoSlide();
		}

	}

	/**
	 * Event listener for transition end on the current slide.
	 *
	 * @param {object} [event]
	 */
	function onTransitionEnd( event ) {

		if( transition === 'running' && /section/gi.test( event.target.nodeName ) ) {
			transition = 'idle';
			dispatchEvent({
				type: 'slidetransitionend',
				data: { indexh, indexv, previousSlide, currentSlide }
			});
		}

	}

	/**
	 * Handler for the window level 'resize' event.
	 *
	 * @param {object} [event]
	 */
	function onWindowResize( event ) {

		layout();

	}

	/**
	 * Handle for the window level 'visibilitychange' event.
	 *
	 * @param {object} [event]
	 */
	function onPageVisibilityChange( event ) {

		// If, after clicking a link or similar and we're coming back,
		// focus the document.body to ensure we can use keyboard shortcuts
		if( document.hidden === false && document.activeElement !== document.body ) {
			// Not all elements support .blur() - SVGs among them.
			if( typeof document.activeElement.blur === 'function' ) {
				document.activeElement.blur();
			}
			document.body.focus();
		}

	}

	/**
	 * Handles clicks on links that are set to preview in the
	 * iframe overlay.
	 *
	 * @param {object} event
	 */
	function onPreviewLinkClicked( event ) {

		if( event.currentTarget && event.currentTarget.hasAttribute( 'href' ) ) {
			let url = event.currentTarget.getAttribute( 'href' );
			if( url ) {
				showPreview( url );
				event.preventDefault();
			}
		}

	}

	/**
	 * Handles click on the auto-sliding controls element.
	 *
	 * @param {object} [event]
	 */
	function onAutoSlidePlayerClick( event ) {

		// Replay
		if( isLastSlide() && config.loop === false ) {
			slide( 0, 0 );
			resumeAutoSlide();
		}
		// Resume
		else if( autoSlidePaused ) {
			resumeAutoSlide();
		}
		// Pause
		else {
			pauseAutoSlide();
		}

	}


	// --------------------------------------------------------------------//
	// ------------------------------- API --------------------------------//
	// --------------------------------------------------------------------//

	// The public reveal.js API
	const API = {
		VERSION,

		initialize,
		configure,

		sync,
		syncSlide,
		syncFragments: fragments.sync.bind( fragments ),

		// Navigation methods
		slide,
		left: navigateLeft,
		right: navigateRight,
		up: navigateUp,
		down: navigateDown,
		prev: navigatePrev,
		next: navigateNext,

		// Navigation aliases
		navigateLeft, navigateRight, navigateUp, navigateDown, navigatePrev, navigateNext,

		// Fragment methods
		navigateFragment: fragments.goto.bind( fragments ),
		prevFragment: fragments.prev.bind( fragments ),
		nextFragment: fragments.next.bind( fragments ),

		// Event binding
		on,
		off,

		// Legacy event binding methods left in for backwards compatibility
		addEventListener: on,
		removeEventListener: off,

		// Forces an update in slide layout
		layout,

		// Randomizes the order of slides
		shuffle,

		// Returns an object with the available routes as booleans (left/right/top/bottom)
		availableRoutes,

		// Returns an object with the available fragments as booleans (prev/next)
		availableFragments: fragments.availableRoutes.bind( fragments ),

		// Toggles a help overlay with keyboard shortcuts
		toggleHelp,

		// Toggles the overview mode on/off
		toggleOverview: overview.toggle.bind( overview ),

		// Toggles the "black screen" mode on/off
		togglePause,

		// Toggles the auto slide mode on/off
		toggleAutoSlide,

		// Slide navigation checks
		isFirstSlide,
		isLastSlide,
		isLastVerticalSlide,
		isVerticalSlide,

		// State checks
		isPaused,
		isAutoSliding,
		isSpeakerNotes: notes.isSpeakerNotesWindow.bind( notes ),
		isOverview: overview.isActive.bind( overview ),
		isFocused: focus.isFocused.bind( focus ),
		isPrintingPDF: print.isPrintingPDF.bind( print ),

		// Checks if reveal.js has been loaded and is ready for use
		isReady: () => ready,

		// Slide preloading
		loadSlide: slideContent.load.bind( slideContent ),
		unloadSlide: slideContent.unload.bind( slideContent ),

		// Adds or removes all internal event listeners
		addEventListeners,
		removeEventListeners,
		dispatchEvent,

		// Facility for persisting and restoring the presentation state
		getState,
		setState,

		// Presentation progress on range of 0-1
		getProgress,

		// Returns the indices of the current, or specified, slide
		getIndices,

		// Returns an Array of key:value maps of the attributes of each
		// slide in the deck
		getSlidesAttributes,

		// Returns the number of slides that we have passed
		getSlidePastCount,

		// Returns the total number of slides
		getTotalSlides,

		// Returns the slide element at the specified index
		getSlide,

		// Returns the previous slide element, may be null
		getPreviousSlide: () => previousSlide,

		// Returns the current slide element
		getCurrentSlide: () => currentSlide,

		// Returns the slide background element at the specified index
		getSlideBackground,

		// Returns the speaker notes string for a slide, or null
		getSlideNotes: notes.getSlideNotes.bind( notes ),

		// Returns an Array of all slides
		getSlides,

		// Returns an array with all horizontal/vertical slides in the deck
		getHorizontalSlides,
		getVerticalSlides,

		// Checks if the presentation contains two or more horizontal
		// and vertical slides
		hasHorizontalSlides,
		hasVerticalSlides,

		// Checks if the deck has navigated on either axis at least once
		hasNavigatedHorizontally: () => navigationHistory.hasNavigatedHorizontally,
		hasNavigatedVertically: () => navigationHistory.hasNavigatedVertically,

		// Adds/removes a custom key binding
		addKeyBinding: keyboard.addKeyBinding.bind( keyboard ),
		removeKeyBinding: keyboard.removeKeyBinding.bind( keyboard ),

		// Programmatically triggers a keyboard event
		triggerKey: keyboard.triggerKey.bind( keyboard ),

		// Registers a new shortcut to include in the help overlay
		registerKeyboardShortcut: keyboard.registerKeyboardShortcut.bind( keyboard ),

		getComputedSlideSize,

		// Returns the current scale of the presentation content
		getScale: () => scale,

		// Returns the current configuration object
		getConfig: () => config,

		// Helper method, retrieves query string as a key:value map
		getQueryHash: Util.getQueryHash,

		// Returns reveal.js DOM elements
		getRevealElement: () => revealElement,
		getSlidesElement: () => dom.slides,
		getViewportElement: () => dom.viewport,
		getBackgroundsElement: () => backgrounds.element,

		// API for registering and retrieving plugins
		registerPlugin: plugins.registerPlugin.bind( plugins ),
		hasPlugin: plugins.hasPlugin.bind( plugins ),
		getPlugin: plugins.getPlugin.bind( plugins ),
		getPlugins: plugins.getRegisteredPlugins.bind( plugins )

	};

	// Our internal API which controllers have access to
	Util.extend( Reveal, {
		...API,

		// Methods for announcing content to screen readers
		announceStatus,
		getStatusText,

		// Controllers
		print,
		focus,
		progress,
		controls,
		location,
		overview,
		fragments,
		slideContent,
		slideNumber,

		onUserInput,
		closeOverlay,
		updateSlidesVisibility,
		layoutSlideContents,
		transformSlides,
		cueAutoSlide,
		cancelAutoSlide
	} );

	return API;

};
