import Amadeus from "amadeus";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

const orders = [];

const amadeus = new Amadeus({
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET,
});

app.use(
    cors({
        allowedHeaders: "*",
    })
);
app.use(express.json());

interface QuoteData {
    quote: string,
    author: string,
    category: string,
}

app.get("/", async (req, res) => {
    let key: string = process.env["API_NINJAS_KEY"];
    if (key === undefined) { res.status(500); res.send("Something is wrong on the server end"); return; }
    try {
        const response = await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness", {
            headers: {
                "X-Api-Key": process.env["API_NINJAS_KEY"]
            }
        });
        const data: QuoteData[] = await response.json();
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        res.send(`
            <html>
            <head>
                <title>Demo Flight Order Booking server</title>
                <style>
                    body {
                        font-family: sans-serif;
                        width: calc(100% - 48px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .container {
                        display: flex;
                        align-items: center;
                        height: 100vh;
                        width: 1200px;
                        flex-direction: column;
                        overflow: hidden;
                    }
                    .inner-container {
                        margin: 24px;
                        font-family: sans-serif;
                        width: 80%;
                        position: relative;
                        background: #f5f5f5;
                        padding: 24px;
                    }
                    span {
                        position: absolute;
                        right: 24px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                <div class="inner-container">
                <h1>${randomQuote.quote}</h1>
                <span>- ${randomQuote.author}</span>
            </div>
            <br>
            <h2>Endpoints:</h2>
            <ul>
                <li><a href="/api/flight-offers">/api/flight-offers</a> This is the post end point</li>
                <li><a href="/api/bookflight">/api/bookflight</a> This is also the post end point</li>
                <li><a href="/api/orders">/api/orders</a> Get Orders</li>
            </ul>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        res.send(error);
    }
})

app.post("/api/flight-offers", async (req, res) => {
    const { originLocationCode, destinationLocationCode, departureDate, adults } =
        req.body;

    console.log(req.body);

    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode,
            destinationLocationCode,
            departureDate,
            adults,
        });
        res.json(response.data);
    } catch (error) {
        res.json(error);
    }
});

app.post("/api/bookflight", async (req, res) => {
    const { flightOffer, traveler } = req.body;
    console.log(req.body);
    try {
        const response = await amadeus.booking.flightOrders.post(
            JSON.stringify({
                data: {
                    type: "flight-order",
                    flightOffers: [flightOffer],
                    travelers: [traveler],
                    ticketingAgreement: {
                        option: "DELAY_TO_CANCEL",
                        delay: "6D",
                    },
                    remarks: {
                        general: [
                            {
                                subType: "GENERAL_MISCELLANEOUS",
                                text: "ONLINE BOOKING FROM INCREIBLE VIAJES",
                            },
                        ],
                    },
                    contacts: [
                        {
                            addresseeName: {
                                firstName: "PABLO",
                                lastName: "RODRIGUEZ",
                            },
                            companyName: "INCREIBLE VIAJES",
                            purpose: "STANDARD",
                            phones: [
                                {
                                    deviceType: "LANDLINE",
                                    countryCallingCode: "34",
                                    number: "480080071",
                                },
                                {
                                    deviceType: "MOBILE",
                                    countryCallingCode: "33",
                                    number: "480080072",
                                },
                            ],
                            emailAddress: "support@increibleviajes.es",
                            address: {
                                lines: ["Calle Prado, 16"],
                                postalCode: "28014",
                                cityName: "Madrid",
                                countryCode: "ES",
                            },
                        },
                    ],
                },
            })
        );
        orders.push(response.data);
        res.json(response.data);
    } catch (error) {
        res.json(error);
    }
});

app.get("/api/orders", (req, res) => {
    res.send(orders);
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
