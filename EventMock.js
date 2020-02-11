/**
 * @class EventMock
 * @constructor
 * @param {object} [listeners={}] 
 */
function EventMock( listeners = {} ) {

	/** @property {boolean} eventsEnabled */
	this.eventsEnabled = true;

	/** @property {object} listeners */
	this.listeners = listeners;

};

/** @property {boolean} enabled */
EventMock.enabled = true;

Object.assign( EventMock.prototype, {

	/**
	 * Add a new listener.
	 * @method on
	 * @param {!(string|number)} type
	 * @param {!function} listener function
	 * @return {this}
	 */
	on: function( type, listener ) {

		if( this.listeners === undefined ) {

			this.listeners = {};

		}

		if( this.listeners[ type ] === undefined ) {

			this.listeners[ type ] = [];

		}

		this.listeners[ type ].push( listener );

	},

	/**
	 * Adds a new listener.
	 * @method addEventListener
	 * @param {!(string|number)} type
	 * @param {!function} listener function
	 * @return {this}
	 */
	addEventListener: EventMock.prototype.on,

	/**
	 * Removes all events and their listeners of the given type.
	 * @method removeEventType
	 * @param {!(string|number)} type
	 * @return {this}
	 */
	removeEventType: function( type ) {

		if( this.listeners === undefined ||
			this.listeners[ type ] === undefined ||
			this.listeners[ type ].length === 0 ) return this;

		this.listeners[ type ].length = 0;

	},

	/**
	 * Removes an event listener.
	 * @method removeEventType
	 * @param {!(string|number)} type
	 * @param {!function} listener function
	 * @return {this}
	 */
	removeEventListener: function( type, listener ) {

		if( this.listeners === undefined || 
			this.listeners[ type ] === undefined ) return this;

		for( var i = 0; i !== this.listeners[ type ].length; i ++ ) {

			if( this.listeners[ type ][ i ].listener === listener ) {

				this.listeners[ type ].splice( i, 1 );
				return this;

			}

		}

	},

	/**
	 * Clears all events and listeners.
	 * @method clearEvents
	 * @return {this}
	 */
	clearEvents: function() {

		if( this.listeners !== undefined ) this.listeners = {};

		return this;

	},

	/**
	 * Clears all events and listeners.
	 * @method dispatch
	 * @param {!(string|number)} type
	 * @param {*} [data]
	 * @return {this}
	 */
	dispatch: function( type, data ) {

		if( EventMock.enabled === false ||
			this.eventsEnabled === false ||
			this.listeners === undefined ||
			this.listeners[ type ] === undefined ) {

			return this;

		}

		for( var i = 0; i !== this.listeners[ type ].length; i ++ ) {

			this.listeners[ type ][ i ].listener( data );

		}

		return this;

	},

	/**
	 * Clears all events and listeners.
	 * @method dispatchEvent
	 * @param {!(string|number)} type
	 * @param {*} [data]
	 * @return {this}
	 */
	dispatchEvent: EventMock.prototype.dispatch

} );
