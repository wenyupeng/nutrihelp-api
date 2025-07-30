const supabase = require("../dbConnection.js");

async function getIngredientsPriceById(ingredient_id) {
  try {
    let { data, error } = await supabase
      .from("ingredient_price")
      .select("*")
      .in("ingredient_id", ingredient_id);
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getIngredientsPriceById,
}