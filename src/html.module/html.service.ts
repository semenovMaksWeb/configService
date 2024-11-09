import { JSDOM } from "jsdom"

class HtmlService {

    convertStringInDom(html: string): HTMLElement {
        return new JSDOM(html).window.document.body;
    }

    findElementHtml(selector: string, html: HTMLElement) {
        return html.querySelector(selector);
    }

    findElementHtmlAll(selector: string, html: HTMLElement) {
        return html.querySelectorAll(selector);
    }

    getInnerHtml(selector: string, html: HTMLElement) {
        return html.querySelector(selector)?.innerHTML;
    }

    getTextContent(selector: string, html: HTMLElement) {
        return html.querySelector(selector)?.textContent;
    }

    getAtrHtml(selector: string, nameArt: string, html: HTMLElement) {
        return html.querySelector(selector)?.getAttribute(nameArt);
    }
}

export const htmlService = new HtmlService();
