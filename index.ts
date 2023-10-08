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
