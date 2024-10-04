import { JSDOM } from "jsdom"

class HtmlService {

    convertStringInDom(html: string): HTMLElement {
        return new JSDOM(html).window.document.body;
    }

    findElement(selector: string, html: HTMLElement) {
        return html.querySelector(selector);
    }

    findElemetnAll(selector: string, html: HTMLElement) {
        return html.querySelectorAll(selector);
    }
}

export const htmlService = new HtmlService();
