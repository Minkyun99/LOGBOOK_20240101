const express = require("express");
const path = require("path");
const logger = require("morgan");
const app = express();
const fs = require('fs').promises;
require("dotenv").config();

const port = 8080;

// 로깅을 위한 morgan 설정
app.use(logger("tiny"));

// JSON 요청 본문을 파싱하기 위한 미들웨어 설정
app.use(express.json());

// 정적 파일을 "public" 디렉터리에서 제공하도록 설정
app.use(express.static(path.join(__dirname, "public")));

// HTML 파일을 제공하기 위한 경로 설정
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "shipkey.html"));
});

// 로컬 JSON 파일을 읽어오는 함수
async function fetchLocalJsonFile(filePath) {
    const absolutePath = path.resolve(filePath);
    const fileContent = await fs.readFile(absolutePath, 'utf8');
    return JSON.parse(fileContent);
}

// shipname 요청을 처리하는 엔드포인트
app.post("/send_shipname", async (req, res) => {
    const shipname = req.body.shipname;
    console.log("Received shipname:", shipname);

    try {
        const data = await fetchLocalJsonFile('./ships_data.json');
        let found = false;
        for (let company in data) {
            for (let ship of data[company]) {
                if (ship.SHIPNAME === shipname) {
                    res.json(ship);
                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        if (!found) {
            res.send('Ship not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// company name 요청을 처리하는 엔드포인트
app.post("/send_company_name", async (req, res) => {
    const ship_company = req.body.company;
    console.log("Received company name:", ship_company);

    try {
        const data = await fetchLocalJsonFile('./ships_data.json');
        if (data.hasOwnProperty(ship_company)) {
            const ships = data[ship_company];
            console.log("Ships found:", ships);
            res.json(ships);
        } else if (ship_company==='ALL'){
            res.json(data)
        }
        else {
            res.status(404).send('Company not found');
        } 
    } catch (error) {
        console.error('Error fetching JSON file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/send_all_ships", async(req, res)=>{
    try {
        const data = await fetchLocalJsonFile('./ships_data.json')
            res.json(data);

    } catch (error){
        console.error('Error fetching JSON file:', error);
        res.status(500).send('Internal Server Error');
    }
})



app.post("/download_dailyreport", async (req, res) => {
    const year = req.body.year;
    const shipkey = req.body.shipkey;
    const token = req.body.token
    console.log(year, shipkey);
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6IjAzZjE2YzJkLTFkMzktNCIsIm5hbWUiOiJhZG1pbkBwb3NzbS5jby5rciIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9jNDJjNGUyY2U0MDNiYWFhYTgyOTIwOGRlOWM0MDkwMj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmFkLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDI0LTA1LTMwVDAxOjUxOjM0LjA0MloiLCJlbWFpbCI6ImFkbWluQHBvc3NtLmNvLmtyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vbGFiMDIxLmF1dGgwLmNvbS8iLCJhdWQiOiJ5VW5oQzMxY2FqQkxId3RaZUxzOVgyaExDc01RUHRGViIsImlhdCI6MTcxNzAzMzg5NCwiZXhwIjoxNzE3MDY5ODk0LCJzdWIiOiJhdXRoMHw2MmNiZGZjYTZmNjAzYzc2ZTJmMWEwM2MifQ.I1vwMoNxLsQUDDuPT5_IFSSCNKRF92usViU98YLMxMY';
    const url = process.env.dailyreport_api_1 + shipkey + process.env.dailyreport_api_2;

    res.status(200).send({ url: url, year: year, token: token });
});


app.listen(port, () => {
    console.log(port + "에서 서버 동작 완료.");
});