const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
var TempMail = require('node-temp-mail');
const PluginProxy = require('puppeteer-extra-plugin-proxy')
const fs = require('fs')
const url = "https://www.tiktok.com/@nolanclement2/video/6968689871816871173?lang=en&is_copy_url=1&is_from_webapp=v1"
puppeteer.use(StealthPlugin())

const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-sync',
    '--ignore-certificate-errors',
    '--user-agent=' + 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
    '--lang=en-US,en;q=0.9',
]

async function click(page, selector){
    await page.waitForSelector(selector);
    await page.click(selector);
}

async function typeText(page, selector, text){
    await page.waitForSelector(selector);
    await page.type(selector, text, {delay: Math.floor(Math.random() * 30) + 25});
}
function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

puppeteer.launch({ headless: true, args: args, defaultViewport: null}).then(async browser => {
    try {
        const [page] = await browser.pages();
        await page.setDefaultNavigationTimeout(0); 
        var address = new TempMail(makeid(8));
        console.log(address.getAddress()['address'])
        await page.goto('https://twitter.com/signup');
        await typeText(page, "[name='name']", makeid(8))
        await click(page, ".css-18t94o4 .css-901oao");
        await typeText(page, "[name='email']", address.getAddress()['address']);
        await click(page, "#Month");
        await page.select("[id='Month']", '3');
        await click(page, "#Day");
        await page.select("[id='Day']", '22');
        await click(page, "#Year");
        await page.select("[id='Year']", '1984');
        await delay(1000)
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await delay(1000)
        //await click(page, "[type='checkbox']");
        await page.click(".r-jwli3a");
        await page.click(".r-jwli3a");
        await delay(Math.floor(Math.random() * 5000) + 4000)
        const fetchEmails = () => new Promise((resolve, reject) => {
            address.fetchEmails(function(err, body){
                var vnum = body['messages'][0]['subject'].substring(0,6)
                console.log(vnum)
                return resolve(vnum)
            })
        });
        var vnum = await fetchEmails()
        await typeText(page, "[autocapitalize='sentences']", vnum);
        await delay(1000)
        await click(page, ".r-obd0qt .css-bfa6kz .css-901oao");
        await click(page, "[autocapitalize='sentences']");
        await typeText(page, "[autocapitalize='sentences']", makeid(10));
        await delay(1000)
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await delay(1000)
        console.log("created twitter")
        await page.goto('https://www.tiktok.com/signup');
        await click(page, ".show-more-2f_sw");
        await click(page, ".social-container-NE2xk > :nth-child(4) .channel-item-wrapper-2gBWB");
        await delay(1000)
        const newPagePromise = new Promise(x => page.once('popup', x));
        const newPage = await newPagePromise; 
        console.log("got popup")
        await click(newPage, "#allow");
        await click(page, ".date-selector-pc-oyWlO > div:nth-of-type(1) .select-container-2Ubyt");
        await click(page, ".list-container-2f5zg > li:nth-of-type(1) span");
        await click(page, ".date-selector-pc-oyWlO > div:nth-of-type(2) .select-container-2Ubyt");
        await click(page, ".list-container-2f5zg > :nth-child(1)");
        await click(page, ".not-selected-1Tb33");
        await click(page, ".list-container-2f5zg > :nth-child(37)");
        await click(page, ".login-button-31D24");
        await click(page, ".suggest-wrapper-Cf0Us > :nth-child(2)");
        await click(page, "[type='submit']");
        console.log("went to tiktok")
        await page.goto(url);
        await page.waitForSelector('.lazyload-wrapper:nth-child(1) > .jsx-747277952 > .jsx-747277952 > .jsx-747277952 > .jsx-1045706868 > .jsx-1045706868 > .jsx-1045706868 > svg > path')
        console.log("selector found, we click")
        await page.hover('.lazyload-wrapper:nth-child(1) > .jsx-747277952 > .jsx-747277952 > .jsx-747277952 > .jsx-1045706868 > .jsx-1045706868 > .jsx-1045706868 > svg > path')
        await delay(1000)
        await page.click('.lazyload-wrapper:nth-child(1) > .jsx-747277952 > .jsx-747277952 > .jsx-747277952 > .jsx-1045706868 > .jsx-1045706868 > .jsx-1045706868 > svg > path')
        await page.click('.lazyload-wrapper:nth-child(1) > .jsx-747277952 > .jsx-747277952 > .jsx-747277952 > .jsx-1045706868 > .jsx-1045706868 > .jsx-1045706868 > svg > path')
        await page.screenshot({
          path: "./screenshot.jpg",
          type: "jpeg",
          fullPage: false
        });
        await browser.close();
      } finally {
        if (browser) {
          //await browser.close();
        }
      }
    //await browser.close();
})
