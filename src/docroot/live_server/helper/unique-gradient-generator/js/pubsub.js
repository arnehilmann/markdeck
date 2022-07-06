
// http://dev.housetrip.com/2014/09/15/decoupling-javascript-apps-using-pub-sub-pattern/

var EventBus = {
	topics: {},

	on: function(topic, listener) {
		// create the topic if not yet created
		if(!this.topics[topic]) this.topics[topic] = [];

		// add the listener
		this.topics[topic].push(listener);
	},

	trigger: function(topic, data) {
		// return if the topic doesn't exist, or there are no listeners
		if(!this.topics[topic] || this.topics[topic].length < 1) return;

		// send the event to all listeners
		this.topics[topic].forEach(function(listener) {
			listener(data || {});
		});
	}
};

export default EventBus;