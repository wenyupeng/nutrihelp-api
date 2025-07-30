const supabase = require("../dbConnection.js");

async function getRecipeIngredients(recipe_id) {
  try {
		let { data, error } = await supabase
			.from("recipes")
			.select("ingredients")
      .eq("id", recipe_id);
		return data;
	} catch (error) {
		throw error;
	}
}


module.exports = {
  getRecipeIngredients
}