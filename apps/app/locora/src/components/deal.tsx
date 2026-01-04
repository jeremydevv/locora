interface props {
    storeType : "Retail" | "Food"
}

const FoodTypeDeals = [
    {
        title : "2 for 1 combo",
        desc : "Get 2 meals for the price of one when you sign up for the app!"
    },
    {
        title : "Special Meal Deal!",
        desc : "Get a family sized meal for the price of 2 regular meals"
    },
    {
        title : "Seasonal Milkshake on Discount!",
        desc : "Get the seasonal shake while its on sale!"
    }
]

const StoreTypeDeals = [
    {
        title : "Classic BOGO!",
        desc : "Get our special offer and get one of our regular items for free!"
    },
    {
        title : "Discounts via our App!",
        desc : "Get exclusive deals only to our members that are signed up."
    }, {
        title : "Get a stamp card!",
        desc : "Reach 10 stamps when visiting and get a free item! (Under 10$)"
    }
]

export default function Deal({
    storeType
} : props) {

    const rndNum = Math.floor(Math.random() * 3)

    return (
        <>
            <div
                className="flex flex-col bg-bay-of-many-500 text-center items-center justify-center text-white rounded-2xl p-2 h-full"
            >
                <h1
                    className="text-xl font-bold"
                >
                    {
                        storeType == "Food" ? StoreTypeDeals[rndNum].title : FoodTypeDeals[rndNum].title
                    }
                </h1>
                <p
                    className="text-lg font-semibold"
                >
                    {
                        storeType == "Food" ? StoreTypeDeals[rndNum].desc : FoodTypeDeals[rndNum].desc
                    }
                </p>
            </div>
        </>
    )

}