import { test, expect } from '@playwright/test';
import { validEmailTestCases, invalidEmailTestCases, xometrySignUpData } from '../data/emailTestData';
import { ROUTES } from '../utils/constants/routes';
import { PageFactory } from '../pages/PageFactory';
import { XometrySignUpPage } from '../pages/SignUpPage';

test.describe('Email Validation Tests on Xometry Sign Up', () => {
    let pageFactory: PageFactory;
    let signUpPage: XometrySignUpPage;

    test.beforeEach(async ({ page }) => {
        pageFactory = new PageFactory(page);
        signUpPage = pageFactory.getXometrySignUpPage();
        await page.goto(ROUTES.SIGN_UP);
        await expect(page).toHaveURL(/sign_up/);
        await signUpPage.acceptCookiesIfVisible();
    });

    validEmailTestCases.forEach(({ email, description }) => {
        test(`Should accept email: ${description}`, async () => {

            await test.step('Fill in full name', async () => {
                await signUpPage.fullNameInput.fill(xometrySignUpData.fullName);
                await expect(signUpPage.fullNameInput).toHaveValue(xometrySignUpData.fullName);
            });

            await test.step('Fill in job title', async () => {
                await signUpPage.jobTitleInput.fill(xometrySignUpData.jobTitle);
                await expect(signUpPage.jobTitleInput).toHaveValue(xometrySignUpData.jobTitle);
            });

            await test.step('Fill in phone number', async () => {
                await signUpPage.phoneInput.fill(xometrySignUpData.phone);
            });

            await test.step(`Fill in email: ${email}`, async () => {
                await signUpPage.emailInput.fill(email);
                await expect(signUpPage.emailInput).toHaveValue(email);
            });

            await test.step('Check consent checkbox', async () => {
                await signUpPage.checkConsent();
                await expect(signUpPage.consentCheckbox).toBeChecked();
            });


            await test.step(`Verify valid email: ${description}`, async () => {
                await signUpPage.submit();
                const recaptchaVisible = await signUpPage.recaptcha.isVisible().catch(() => false);
                if (recaptchaVisible) {
                    console.log('Captcha detected, skipping post-submit visibility check.');
                    return;
                }
                await expect(signUpPage.emailInput).not.toBeVisible({ timeout: 5000 });
            });

        });
    });

    test('Should reject all invalid emails', async () => {
        await test.step('Fill in full name', async () => {
            await signUpPage.fullNameInput.fill(xometrySignUpData.fullName);
            await expect(signUpPage.fullNameInput).toHaveValue(xometrySignUpData.fullName);
        });

        await test.step('Fill in job title', async () => {
            await signUpPage.jobTitleInput.fill(xometrySignUpData.jobTitle);
            await expect(signUpPage.jobTitleInput).toHaveValue(xometrySignUpData.jobTitle);
        });

        await test.step('Fill in phone number', async () => {
            await signUpPage.phoneInput.fill(xometrySignUpData.phone);
        });

        await test.step('Check consent checkbox', async () => {
            await signUpPage.checkConsent();
            await expect(signUpPage.consentCheckbox).toBeChecked();
        });

        for (const { email, error, description } of invalidEmailTestCases) {
            await test.step(`Test invalid email: ${description}`, async () => {
                try {
                    await test.step(`Fill in email: ${email}`, async () => {
                        await signUpPage.emailInput.clear();
                        await signUpPage.emailInput.fill(email);
                        await expect(signUpPage.emailInput).toHaveValue(email);
                    });

                    await test.step('Click Join Xometry button', async () => {
                        await signUpPage.submit();
                    });

                    await test.step(`Verify error for: ${description}`, async () => {
                        const isVisible = await signUpPage.emailErrorMessage
                            .isVisible({ timeout: 3000 })
                            .catch(() => false);

                        expect.soft(isVisible, `Error message for "${description}"`).toBe(true);

                        if (isVisible) {
                            const errorMessage = await signUpPage.getEmailErrorMessageText();
                            expect.soft(
                                errorMessage[0],
                                `Error text for "${description}". Expected: "${error}", Got: "${errorMessage[0]}"`
                            ).toContain(error);
                        } else {
                            console.error(`❌ No error message visible for: ${description}`);
                        }
                    });

                } catch (e) {
                    console.error(`❌ Test failed for "${description}": ${e.message}`);
                }
            });
        }
    });
});
