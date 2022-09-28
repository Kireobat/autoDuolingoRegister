//-------------Imports----------------//

const puppeteer = require('puppeteer');

//-------------Credentials / Variables----------------//

const age = "45"
const pass = "123456789"
let num = 1
let inputEmail = "test+"+num+"@gmail.com"
const email = "test+166@gmail.com"

const creds = { age, inputEmail, pass }

//------------- Delay Function----------------//

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
        console.log("waiting for " + time + "ms");
    });
 }

//------------- Puppeteer ----------------//

const url = process.argv[2];
if (!url) {
    throw "Please provide URL as a first argument";
}

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('button[id="onetrust-accept-btn-handler"]');
    await page.click('button[id="onetrust-accept-btn-handler"]');

    await delay(400);

    await page.waitForSelector('button[data-test="have-account"]');
    await page.click('button[data-test="have-account"]');

    await delay(400);

    await page.waitForSelector('button[class="_16h82 WOZnx _275sd _1ZefG"]');
    await page.click('button[class="_16h82 WOZnx _275sd _1ZefG"]');

    await delay(300);

    await page.waitForSelector('input[data-test="age-input"]');
    await page.type('input[data-test="age-input"]', creds.age);
    await page.type('input[data-test="email-input"]', creds.inputEmail);
    await page.type('input[data-test="password-input"]', creds.pass);
    await page.click('button[data-test="register-button"]');
    
    await delay(4000)

    await page.screenshot({path: 'duo'+num+'.png'});
    
    browser.close();
}

//------------- Acctually running the program----------------//

run();