import { Page } from '@playwright/test';
import { XometrySignUpPage } from './SignUpPage';

export class PageFactory {
    constructor(private page: Page) { }

    getXometrySignUpPage(): XometrySignUpPage {
        return new XometrySignUpPage(this.page);
    }
}