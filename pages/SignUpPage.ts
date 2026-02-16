import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class XometrySignUpPage extends BasePage {
  constructor(public page: Page) {
    super(page);
  }

  // Inputs
  get fullNameInput() {
    return this.page.getByTestId('SignUpForm__Name--Input');
  }

  get emailInput() {
    return this.page.getByTestId('SignUpForm__Email--Input');
  }

  get jobTitleInput() {
    return this.page.getByTestId('SignUpForm__JobTitle--Input');
  }

  get phoneInput() {
    return this.page.getByTestId('SignUpForm__Phone--Input');
  }

  get consentCheckbox() {
    return this.page.getByTestId('SignUpForm__Mail--Checkbox');
  }

  get submitButton() {
    return this.page.getByTestId('SignUpForm__Submit--Button');
  }

  get emailErrorMessage() {
    return this.page.locator('div[id="email_help"]');
  }

  get recaptcha() {
    return this.page.locator('iframe[title*="reCAPTCHA"], [data-testid*="Captcha"]').first();
  }

  get ucBanner() {
    return this.page.getByTestId('uc-footer');
  }

  get acceptAllButton() {
    return this.page.getByTestId('uc-accept-all-button');
  }

  async acceptCookiesIfVisible(timeout = 7000): Promise<void> {
    try {
      const isVisible = await this.ucBanner.waitFor({ state: 'visible', timeout }).then(() => true).catch(() => false);

      if (isVisible) {
        await this.acceptAllButton.click();
      }
    } catch (error) {
      console.warn('UC banner not found or already dismissed.');
    }
  }

  async fillSignUpForm(fullName: string, email: string, jobTitle: string, phone: string) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.jobTitleInput.fill(jobTitle);
    await this.phoneInput.fill(phone);
  }

  async getEmailErrorMessageText() {
    return await this.emailErrorMessage.allTextContents();
  }

  async checkConsent() {
    if (!(await this.consentCheckbox.isChecked())) {
      await this.consentCheckbox.click();
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async submitFormSafely(description = 'form submission'): Promise<void> {
    // await this.submitButton.click();
    // await this.page.waitForTimeout(1000);
    const recaptchaFrame = this.page.frames().find(frame =>
      frame.url().includes('google.com/recaptcha') ||
      frame.url().includes('recaptcha')
    );

    if (recaptchaFrame) {
      console.log('Recaptcha detected, skipping post-submit verification.');
      return;
    }
    console.log('No recaptcha, proceeding with verification');
  }
}
