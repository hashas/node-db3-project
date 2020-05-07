db = require("../data/config")

function find() {
	return db("schemes")

}

async function findById(id) {
	return db("schemes").where("id", id)
}

function findSteps(id) {
	// resolve to array of all correctly ordered steps for given scheme
	// array should include "scheme_name" not "scheme_id"
	return db("schemes as s")
		.join("steps as st", "s.id", "st.scheme_id")
		.where("s.id", id)
		.select("st.id", "s.scheme_name", "st.step_number", "st.instructions")

}

async function add(scheme) {
	try {
		// insert scheme into database
		const [ id ] = await db("schemes").insert(scheme)
		// resolve to newly inserted scheme (which includes id)
		return findById(id)
	} catch (err) {
		console.log(err)
	}
}

async function update(changes, id) {
	try {
		// update the scheme with the given id
		await db("schemes").where("id", id).update(changes)
		// resolve to the newly udpated scheme object
		return findById(id)
	} catch (err) {
		console.log(err)
	}

}

async function remove(id) {
	// store the scheme before we delete it so we can show what we deleted
	const delScheme = findById(id)
	// resolve to null on invalid id
	if (!delScheme) {
		return null
	} else {
		try {
			// remove the scheme object with the provided id
			await db("schemes").where("id", id).del()
			// resolve to the removed scheme
			return delScheme
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = {
	find,
	findById,
	findSteps,
	add,
	update,
	remove,
}