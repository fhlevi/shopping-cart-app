import { rest } from "msw";
import axiosService from "./config";

const products = [
    rest.get(axiosService("/product-list"), (_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: {
                    code: 200,
                    message: "Success",
                },
                data: {
                    items: [
                        {
                            id: "1923",
                            name: "Tas Pria Ransel Distro Original",
                            price: 100000,
                            stuff: {
                                image_url:
                                    "https://s2.bukalapak.com/img/2584349902/small/Tas_Pria_Ransel__Distro_Original_Bandung________________tas_.jpg",
                                stock: 4,
                            },
                            store: {
                                id: 129,
                                name: "Kobeo Store",
                            },
                            category: {
                                id: 1,
                                name: "Asessoris Pria",
                            },
                        },
                        {
                            id: "1987",
                            name: "Sepatu Running Adidas Original",
                            price: 175000,
                            stuff: {
                                image_url:
                                    "https://s1.bukalapak.com/img/6024418382/small/SEPATU.jpg",
                                stock: 8,
                            },
                            store: {
                                id: 315,
                                name: "sepatuonlineinc",
                            },
                            category: {
                                id: 2,
                                name: "Sepatu Pria",
                            },
                        },
                        {
                            id: "2001",
                            name: "Jaket Virendra Polos. Tersedia Semua Logo Club Bola. Jacket Soccer Waterproof Promo",
                            price: 200000,
                            stuff: {
                                image_url:
                                    "https://s0.bukalapak.com/img/5759820062/small/Jaket_Virendra_Polos_Tersedia_Semua_Logo_Club_Bola_Jacket_So.jpg",
                                stock: 15,
                            },
                            store: {
                                id: 177,
                                name: "Butik Soccer ID",
                            },
                            category: {
                                id: 3,
                                name: "Pakaian",
                            },
                        },
                        {
                            id: "2024",
                            name: "Baju Koko Shaquille Biru Kemeja Soccer Baju Sholat Muslim Gamis Kemko",
                            price: 140000,
                            stuff: {
                                image_url:
                                    "https://s2.bukalapak.com/img/2681803562/small/Baju_Koko_Shaquille_Hiaju_Kemeja_Soccer_Baju_Sholat_Muslim_G.jpg",
                                stock: 20,
                            },
                            store: {
                                id: 177,
                                name: "Butik Soccer ID",
                            },
                            category: {
                                id: 3,
                                name: "Pakaian",
                            },
                        },
                        {
                            id: "2531",
                            name: "SEPATU SNEAKERS PRIA SEPATU PRIA",
                            price: 185000,
                            stuff: {
                                image_url:
                                    "https://s1.bukalapak.com/img/6453738872/small/1530104514938_scaled.jpg",
                                stock: 4,
                            },
                            store: {
                                id: 398,
                                name: "NF Footwear",
                            },
                            category: {
                                id: 2,
                                name: "Sepatu Pria",
                            },
                        },
                    ],
                },
            })
        );
    }),
];

export default products;