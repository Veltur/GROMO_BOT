module.exports = {

name: "Edycja Kanału",

section: "^MrCiacho",

subtitle: function(data) {
	const names = ['Same Channel', 'Mentioned Channel', 'Default Channel', 'Temp Variable', 'Server Variable', 'Global Variable'];
	const index = parseInt(data.storage);
	return index < 3 ? `${names[index]}` : `${names[index]} - ${data.varName}`;
},


	 author: "MrCiacho",

	 version: "1.0.0", 

	 short_description: "Edycja kanału głosowego",


fields: ["storage", "varName", "toChange", "newState"],

html: function(isEvent, data) {
	return `
	<div>
		<p>
			<u>Informacje:</u><br>
			MOD Stworzony przez: MrCiacho
		</p>
	</div><br>
<div>
	<div style="float: left; width: 35%;">
		Source Channel:<br>
		<select id="storage" class="round" onchange="glob.channelChange(this, 'varNameContainer')">
			${data.channels[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div>
	<div style="float: left; width: 35%;">
		Zmień:<br>
		<select id="toChange" class="round">
			<option value="name">Nazwa</option>
		</select>
	</div><br>
<div>
	<div style="float: left; width: 80%;">
		Change to:<br>
		<input id="newState" class="round" type="text"><br>
	</div>
</div>`
},

init: function() {
	const {glob, document} = this;

	glob.channelChange(document.getElementById('storage'), 'varNameContainer');
},

action: function(cache) {
	const data = cache.actions[cache.index];
	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	const toChange = parseInt(data.toChange);
	const newState = this.evalMessage(data.newState, cache);
	const channel = channels.get("448521700892475398");
	
	if(data.toChange === "name") {
		channel.edit({name: newState});
	} else {
		console.log('This should never been shown!');
	}
	this.callNextAction(cache);
},

mod: function(DBM) {
	DBM.Actions["Edit channel"] = DBM.Actions["Edit Channel"];
}

};
