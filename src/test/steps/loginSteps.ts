import {Given, When, Then} from "@cucumber/cucumber"
import {chromium, Page, Browser, expect,} from "@playwright/test"

let browser: Browser;
let page: Page;
Given('User navigates to the application',{timeout: 30000}, async function () {
    browser = await chromium.launch({headless: false}); 
    page = await browser.newPage();  
    await page.goto("https://www.upwork.com/")  
    // console.log("rin")
    
  });
  Given('User clicks on the Login link', async function () {
    console.log("rin")
    await page.locator("#nav-main > div > a.up-n-link.nav-item.login-link.d-none.d-lg-block.px-20").click();  
  });

Given('User enters the username as {string}', async function (username) {
    await page.locator("#login_username").fill(username);
        
});
Given('User clicks on the Login button', async function () {
        
});




   

      When('User clicks on the Continue with Email button',{timeout: 9000}, async function () {
        
        await page.locator("#login_password_continue").click();
      });

      When('User enters the password as {string}', async function (password) {
       await page.locator('#login_password').fill(password)
      });

      When('User clicks on the login button', async function () {
        await page.locator('#login_control_continue').click();
      });

      Then('Login should success',{timeout: 20000}, async function () {
        // await page.evaluate(() => {
        //     window.scrollBy(0, 200); 
        //   });
        const context = await browser.newContext();
        await page.locator('#nav-right > ul > li.air3-search > div > form > div.nav-search-input-container > input.nav-search-autosuggest-input').fill('qa automation');
        await page.keyboard.press('Enter');
        // await page.evaluate("window.scrollBy(0, 300)")
        await page.waitForSelector('#job-1703616176674881536 > div.row.my-10 > div.col > h3 > a');

        await page.locator('#job-1703616176674881536 > div.row.my-10 > div.col > h3 > a').click();
        await page.locator('#main > div.container > div.row.app-frame.is-user > div > div > div.col-9 > div > div.up-card-section.pt-0 > div > div:nth-child(4) > div.up-slider > div > div > div.up-slider-body > div > div > div.up-card.py-0.overflow-y-auto > div > div.col-12.job-details-sidebar.d-none.d-lg-flex > aside > div:nth-child(1) > div.cta-row > div.cta.apply > div > span > span:nth-child(1) > button').click();
        const pages = await context.pages();
        const secondTab = pages[1];
        await secondTab.bringToFront();
        await page.waitForSelector('#main > div.container > div:nth-child(4) > div > div:nth-child(4) > div:nth-child(6) > div:nth-child(2) > footer > div > button.up-btn.up-btn-primary.m-0');
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.locator('#main > div.container > div:nth-child(4) > div > div:nth-child(4) > div:nth-child(6) > div:nth-child(2) > footer > div > button.up-btn.up-btn-primary.m-0').click();
        const fail = page.locator("#main > div.container > div:nth-child(4) > div > div.up-alert.up-alert-danger.up-alert-inline > div.up-alert-content.break > div.up-alert-slot-container > p");
        await expect(fail).toBeVisible();
        await browser.close();
      });
      
       Then('Login should fail', async function () {
        const failureMessage = page.locator("#username-message");
        await expect(failureMessage).toBeVisible();
        await browser.close();
      })
      Then('Error message should displayed', async function () {
        const failureMessage = page.locator("#username-message");
        await expect(failureMessage).toBeVisible();
        const failedMessage = page.locator("#main > div > div.span-md-8.span-lg-6.px-lg-12x.mx-lg-2x.auth-growable-flex > div:nth-child(1) > div > div.air3-alert-content");
        await expect(failedMessage).toBeVisible();
        await browser.close()
      });