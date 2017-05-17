// TODO import firebase package

// read the service account key
var serviceAccount = require('./service_account_key.json');

// TODO configure firebase

// TODO get a reference to the firebase database and the grocery object

// get the objects from grocery 
var foodgledPromise = foodgledGroceries();
var firebasePromise = firebaseGroceries();

Promise.all([foodgledPromise, firebasePromise]).then(values => {

	// imported groceries
	var foodgled = values[0];
	console.log("Groceries retrieved from Foodgle " + foodgled.length);

	// get the stored groceries from firebase
	var stored = values[1].val();

	if (stored == null) {
		stored = {};
	}
	console.log("Groceries retrieved from Firebase " + Object.keys(stored).length);
	return processGroceries(foodgled, stored);
}).then(processed => {
	console.log("Grocery processing complete");
	var update = updateGroceries(processed['update'])
	var add = addGroceries(processed['add'])
	return Promise.all([update, add])
}).then(result => {
	console.log("Complete, exiting...")
	process.exit();
});

function updateGroceries(toUpdate) {
	console.log("Updating groceries " + Object.keys(toUpdate).length);
	var promises = [];
	// TODO iterate over the toUpdate object and push updates to firebase
	return Promise.all(promises);
}

function addGroceries(toAdd) {
	console.log("Adding new groceries " + toAdd.length);
	var promises = [];
	// iterate over the toAdd groceries array and push new groceries to firebase
	return Promise.all(promises);
}

function processGroceries(foodgled, stored) {
	var toAdd;
	var toUpdate = {};
	var storedKeys = Object.keys(stored);
	var foodgledKeys = Object.keys(foodgled);

	if (storedKeys.length == 0) {
		// empty data store ie. nothing stored on firebase
		toAdd = foodgled;
	} else {
		toAdd = [];

		// decide whats new and what needs to be updated
		for (var i = 0; i < foodgledKeys.length; i++) {
			var foodgledItem = foodgled[foodgledKeys[i]];
			var key = null;

			for (var j = 0; j < storedKeys.length; j++) {
				var storedItem = stored[storedKeys[j]];

				// match item on skus
				if (storedItem.sku === foodgledItem.sku) {
					key = storedKeys[j];
					break;
				}
			}

			if (key) {
				toUpdate[key] = foodgledItem;
			} else {
				toAdd.push(foodgledItem);
			}
		}
	}

	return Promise.resolve({
		'add': toAdd,
		'update': toUpdate
	});
}

/**
 * Gets a reference to the firebase database, then returns a Promise to get all groceries
 */
function firebaseGroceries() {
	// TODO retrieve groceries from fire base
}

/**
 * Let's pretend this function returns grocery prices from our
 * 	patent pending grocery search engine called, Foodgle
 */
function foodgledGroceries() {
	var groceries = [
		{
			"sku": "123",
			"title": "Oreo Cookies, 14.3 OZ",
			"description": "The world's favorite cookie",
			"store": "Lowe's Foods",
			"price": 3.99,
			"url": "https://lowesfoods.com/oreos"
		},
		{
			"sku": "456",
			"title": "Oreo Cookies, 14.3 OZ",
			"description": "The world's favorite cookie",
			"store": "Harris Teeter",
			"price": 4.99,
			"url": "https://harristeeter.com/oreos"
		},
		{
			"sku": "789",
			"title": "Oreo Cookies, 14.3 OZ",
			"description": "The world's favorite cookie",
			"store": "Food Lion",
			"price": 2.49,
			"url": "https://foodlion.com/oreos"
		},
		{
			"sku": "101112",
			"title": "Oreo Cookies, 14.3 OZ",
			"description": "The world's favorite cookie",
			"store": "Publix",
			"price": 3.00,
			"url": "https://publix.com/oreos"
		},
		{
			"sku": "131415",
			"title": "Oreo Cookies, 14.3 OZ",
			"description": "The world's favorite cookie",
			"store": "Kroger",
			"price": 3.50,
			"url": "https://kroger.com/oreos"
		},
		{
			"sku": "161718",
			"title": "Oreo Cookies, 14.3 OZ",
			"description": "The world's favorite cookie",
			"store": "Wal-Mart",
			"price": 2.98,
			"url": "https://walmart.com/oreos"
		}
	];
	return Promise.resolve(groceries);
}