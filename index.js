const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const iPhoneX = puppeteer.pptr.devices['iPhone X'];
var TempMail = require('node-temp-mail');
var GhostCursor = require('ghost-cursor')
//const PluginProxy = require('puppeteer-extra-plugin-proxy')

puppeteer.use(StealthPlugin())

const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-sync',
    '--ignore-certificate-errors',
    '--user-agent=' + 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
    '--lang=en-US,en;q=0.9',
]

async function click(page, selector, cursor){
    await page.waitForSelector(selector);
    await cursor.move(selector)
    await delay(Math.floor(Math.random() * 100) + 50)
    await cursor.click(selector);
}

async function typeText(page, selector, text){
    await page.waitForSelector(selector);
    await page.type(selector, text, {delay: Math.floor(Math.random() * 120) + 100});
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

puppeteer.launch({ headless: false, args: args}).then(async browser => {
    try {
        const page = await browser.newPage();
        const cursor = GhostCursor.createCursor(page)
        var address = new TempMail(makeid(8));
        console.log(address.getAddress()['address'])
        await page.goto('https://twitter.com/signup');
        await delay(1000)
        await typeText(page, "[name='name']", makeid(8))
        await delay(1000)
        await click(page, "#layers > div:nth-child(2) > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-kemksi.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > div.css-18t94o4.css-901oao.r-k200y.r-1n1174f.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-19h5ruw.r-bcqeeo.r-qvutc0 > span", cursor);
        await typeText(page, "[name='email']", address.getAddress()['address']);
        await click(page, "#Month", cursor);
        await delay(Math.floor(Math.random() * 1500) + 1000)
        await page.select("[id='Month']", '3');
        await click(page, "#Day", cursor);
        await delay(Math.floor(Math.random() * 1500) + 1000)
        await page.select("[id='Day']", '22');
        await click(page, "#Year", cursor);
        await delay(Math.floor(Math.random() * 1500) + 1000)
        await page.select("[id='Year']", '1984');
        await delay(Math.floor(Math.random() * 1500) + 1000)
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao", cursor);
        await delay(Math.floor(Math.random() * 1500) + 1000)
        await click(page, "[type='checkbox']", cursor);
        await delay(Math.floor(Math.random() * 1500) + 1000)
        await page.click(".r-jwli3a", cursor);
        await page.click(".r-jwli3a", cursor);
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
        await click(page, ".r-obd0qt .css-bfa6kz .css-901oao", cursor);
        await click(page, "[autocapitalize='sentences']", cursor);
        await typeText(page, "[autocapitalize='sentences']", makeid(10));
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao", cursor);
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await click(page, ".r-136ojw6 .css-bfa6kz .css-901oao");
        await click(page, ".r-zv2cs0 .css-bfa6kz .css-901oao");
        /*await page.goto('https://www.tiktok.com/404?fromUrl=/signin');
        await page.goto('https://www.tiktok.com/404?fromUrl=/signup');
        await page.goto('https://www.tiktok.com/signup');

        await click(page, ".show-more-2f_sw");
        await click(page, ".social-container-NE2xk > :nth-child(4) .channel-item-wrapper-2gBWB");
        await click(page, "#allow");
        await click(page, ".date-selector-pc-oyWlO > div:nth-of-type(1) .select-container-2Ubyt");
        await click(page, ".list-container-2f5zg > li:nth-of-type(1) span");
        await click(page, ".date-selector-pc-oyWlO > div:nth-of-type(2) .select-container-2Ubyt");
        await click(page, ".list-container-2f5zg > :nth-child(1)");
        await click(page, ".not-selected-1Tb33");
        await click(page, ".list-container-2f5zg > :nth-child(37)");
        await click(page, ".login-button-31D24");
        await click(page, ".suggest-wrapper-Cf0Us > :nth-child(2)");
        await click(page, "[type='submit']");*/
      } finally {
        if (browser) {
          //await browser.close();
        }
      }
    //await browser.close();
})
