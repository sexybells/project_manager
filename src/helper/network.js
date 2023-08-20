import axios from 'axios';

const baseUrl = 'https://64e278c3ab003735881905d7.mockapi.io/'

export async function GET(endPoint) {
    const res = await axios(baseUrl + endPoint, {
        method: 'get',
        responseType: 'json',
    });

    if (res.data !== undefined) {
        return res.data;
    }
}

export async function POST(endPoint, params) {
    const res = await axios(baseUrl + endPoint, {
        method: 'POST',
        responseType: 'json',
        data: params
    })
    if (res.data !== undefined) {
        return res.data;
    }
}