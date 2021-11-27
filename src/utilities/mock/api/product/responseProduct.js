import { rest } from 'msw'
import axiosService from 'Mock/api/config';
import dataJson from 'Mock/api/product/data.json';

const responseProduct = [
    rest.get(axiosService('/product-list'), (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: {
                    code: 200,
                    message: "Success"
                },
                data: dataJson
            })
        )
    }),
]

export default responseProduct