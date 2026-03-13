const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../../pageobjects/login.page');
const { expect } = require('chai');

Given('I open the login page', async () => {
    await LoginPage.open();
});

When('I enter username {string}', async (username) => {
    await LoginPage.username.setValue(username);
});

When('I enter password {string}', async (password) => {
    await LoginPage.password.setValue(password);
});

When('I click login button', async () => {
    await LoginPage.loginBtn.click();
});

Then('I should see the dashboard', async () => {
    const isDisplayed = await LoginPage.dashboard.isDisplayed();
    expect(isDisplayed).to.be.true;
});

