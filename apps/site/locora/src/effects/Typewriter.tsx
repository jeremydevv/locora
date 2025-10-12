import React, { useEffect } from "react";

const Items = [
    "Toys",
    "Restaurants",
    "Cafes",
    "Bars",
    "Hospitals",
    "Food Trucks",
    "Farmers Markets",
    "Local Boutiques",
    "Thrift Stores",
    "Barbershops",
    "Salons",
    "Tattoo Studios",
    "Gyms",
    "Yoga Studios",
    "Martial Arts Centers",
    "Auto Repair Shops",
    "Car Washes",
    "Pet Groomers",
    "Veterinary Clinics",
    "Florists",
    "Bakeries",
    "Ice Cream Shops",
    "Bookstores",
    "Antique Shops",
    "Craft Stores",
    "Home Decor",
    "Garden Centers",
    "Hardware Stores",
    "Bike Shops",
    "Music Stores",
    "Art Galleries",
    "Photography Studios",
    "Print Shops",
    "Dance Studios",
    "Music Schools",
    "Tutoring Centers",
    "Coworking Spaces",
    "Local Breweries",
    "Wineries",
    "Juice Bars",
    "Smoothie Shops",
    "Streetwear Shops",
    "Sneaker Stores",
    "Gift Shops",
    "Mini Golf",
    "Escape Rooms",
    "Arcades",
    "Cinemas",
    "Farm Stands",
    "Community Theaters",
    "Day Spas",
    "Massage Clinics",
    "Chiropractors",
    "Dentists",
    "Optometrists",
    "Pharmacies",
    "Nail Salons",
    "Dry Cleaners",
    "Tailors",
    "Laundry Services",
    "Real Estate Agencies",
    "Property Management",
    "Local Banks",
    "Insurance Agents",
    "Wedding Venues",
    "Event Planners",
    "Caterers",
    "Food Suppliers",
    "Construction Companies",
    "Landscapers",
    "Cleaning Services",
    "Moving Companies",
    "Storage Units",
    "Tech Repair Shops",
    "Computer Services",
    "Local Nonprofits",
    "Community Centers",
    "Churches",
    "Daycare Centers",
    "Dog Walkers",
    "Home Inspectors",
    "Interior Designers",
    "Furniture Stores",
    "Pawn Shops",
    "Comic Stores",
    "Hobby Shops",
    "Vintage Clothing",
    "Farm-to-Table Restaurants",
    "Pop-Up Shops",
    "Street Vendors",
    "Seasonal Markets",
    "Craft Breweries",
    "Local Distilleries",
    "Bike Rentals",
    "Tour Guides",
    "Bed & Breakfasts",
    "Local Inns",
    "Photography Services",
    "Courier Services",
    "Repair Services",
    "Printing & Sign Shops",
]
export default function TypeWriter() {

    const [currentText, setCurrentText] = React.useState('');

    let BaseText = "Search for "

    {/* effect will type the random choice in and then delete it with a "typing effect" delay */ }
    useEffect(() => {
        let i = 0;
        let isDeleting = false;
        let currentWord = Items[Math.floor(Math.random() * Items.length)];
        let timeout : any;

        const type = () => {
            const fullText = BaseText + currentWord;
            const displayLength = isDeleting ? i-- : i++;

            setCurrentText(fullText.slice(0, displayLength));

            if (!isDeleting && i === currentWord.length) {
                timeout = setTimeout(() => (isDeleting = true), 1500);
            } else if (isDeleting && i <= 10) {
                isDeleting = false;
                currentWord = Items[Math.floor(Math.random() * Items.length)];
            }

            timeout = setTimeout(type, isDeleting ? 50 : 100);
        };

        type();

        return () => clearTimeout(timeout);
    }, [BaseText, Items]);


    return (
        <p>{currentText}</p>
    )

}