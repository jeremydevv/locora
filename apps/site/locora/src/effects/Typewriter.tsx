import React, { useEffect, useRef, useState } from "react";

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

interface Props {
    children?: React.ReactNode
}

export default function TypeWriter({children}: Props) {
    const [display, setDisplay] = useState("");
    const indexRef = useRef(0);
    const deletingRef = useRef(false);
    const wordRef = useRef(Items[Math.floor(Math.random() * Items.length)]);
    const timeoutRef = useRef<number | null>(null);

    const baseText = "Search for ";

    useEffect(() => {
        const loop = () => {
            const word = wordRef.current;
            const fullText = baseText + word;

            if (deletingRef.current) {
                indexRef.current = Math.max(0, indexRef.current - 1);
            } else {
                indexRef.current = Math.min(fullText.length, indexRef.current + 1);
            }

            setDisplay(fullText.slice(0, indexRef.current));

            if (!deletingRef.current && indexRef.current === fullText.length) {
                timeoutRef.current = window.setTimeout(() => {
                    deletingRef.current = true;
                    loop();
                }, 1000);
                return;
            }

            if (deletingRef.current && indexRef.current === baseText.length) {
                deletingRef.current = false;
                wordRef.current = Items[Math.floor(Math.random() * Items.length)];
                timeoutRef.current = window.setTimeout(loop, 200);
                return;
            }

            const delay = deletingRef.current ? 50 : 100;
            timeoutRef.current = window.setTimeout(loop, delay);
        };

        loop();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [baseText]);

    return (
        <div className="flex items-center gap-1">
            <h1 className="text-5xl font-black">{display}</h1>
            {children}
        </div>
    );
}