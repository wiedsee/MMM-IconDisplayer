/* Magic Mirror
 * Module: IconDisplayer
 * 
 * By fruestueck based on github.com/MichMich/MagicMirror/blob/master/modules/default/currentweather
 */
Module.register("MMM-IconDisplayer", {
	// Default module config.
	defaults: {		
		lang: config.language,
		preferences: [
			{
				topic: "Tank_1", // topic name for the MQTT message
				icon: "10", // icon name to display
				max: 10, // maximum value to display icon
				min: 10, // minimum value to display icon
			},
		],
		
	},
	
	// Define required translations.
	getTranslations: function() {
		return false;
	},
	
	// Define start sequence
	start: function() {
		Log.info("Starting module: " + this.name); // log the start of the module 
		this.loaded = false;
	},
	// notification received from other module
	notificationReceived: function(notification, payload, sender) {
		for (var f in this.config.preferences) {
			if (notification == this.config.preferences[f].topic) {
				this.loaded = true;
				window['topic:'+this.config.preferences[f].topic] = payload;
				this.updateDom();
			}
		}
	},
	// create the dom element 	
	getDom: function() {
		var wrapper = document.createElement("div");
		
		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			return wrapper;
		}
		
		for (var x in this.config.preferences) {
			var icon = this.config.preferences[x];
			if (icon.max >= window['topic:'+this.config.preferences[x].topic]) {
				if (icon.min < window['topic:'+this.config.preferences[x].topic]) {
					var img = document.createElement("img");
					img.setAttribute('src',this.data.path + "icons/" + this.config.preferences[x].icon + ".png");
					img.setAttribute('style', "height: 75px; width: auto; display: inline;");
					wrapper.appendChild(img);
				} else if ( icon.min === icon.max) {
					if (icon.max === window['topic:'+this.config.preferences[x].topic]) {
						var img = document.createElement("img");
						img.setAttribute('src',this.data.path + "icons/" + this.config.preferences[x].icon + ".png");
						img.setAttribute('style', "height: 75px; width: auto; display: inline;");
						wrapper.appendChild(img);
					}
				}
			}
		}
		return wrapper;
	},
});
