import puppeteer, { Page } from "puppeteer";

class WebService {
    public async openWeb(url: string) {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);
        await page.setViewport({ width: 1920, height: 1080 });
        return page;
    }

    public async elementWait(page: Page, selector: string) {
        return await page.locator(selector).waitHandle();
    }

    public async elementClick(page: Page, selector: string) {
        const element = await page.locator(selector).waitHandle();
        await element.click();
    }

    public async innerHtmlELement(page: Page, selector: string) {
        return await page.$eval(selector, (element: any) => element.innerHTML);
    }
}

export const webService = new WebService();