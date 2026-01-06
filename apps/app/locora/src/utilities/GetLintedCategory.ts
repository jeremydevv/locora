const FOOD_TYPES = new Set([
    `restaurant`,
    `food`,
    `cafe`,
    `bakery`,
    `meal_takeaway`,
    `meal_delivery`,
    `fast_food_restaurant`,
    `bar`,
    `night_club`,
    `pizza_restaurant`,
    `sandwich_shop`,
    `hamburger_restaurant`,
    `coffee_shop`,
    `ice_cream_shop`,
    `dessert_shop`,
    `donut_shop`,
    `juice_shop`,
    `tea_house`,
    `brewery`,
    `winery`
]);


const RETAIL_TYPES = new Set([
    `store`,
    `shopping_mall`,
    `department_store`,
    `convenience_store`,
    `supermarket`,
    `grocery_or_supermarket`,
    `clothing_store`,
    `shoe_store`,
    `jewelry_store`,
    `electronics_store`,
    `computer_store`,
    `mobile_phone_store`,
    `furniture_store`,
    `home_goods_store`,
    `hardware_store`,
    `book_store`,
    `pet_store`,
    `florist`,
    `bicycle_store`,
    `liquor_store`
]);

export default function GetLintedCategory(givenCategory: string): ("Food" | "Retail") {

    if (RETAIL_TYPES.has(givenCategory)) {
        return "Retail"
    } else if (FOOD_TYPES.has(givenCategory)) {
        return "Food"
    }

    return "Food"

}