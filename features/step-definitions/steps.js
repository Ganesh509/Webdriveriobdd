import LoginPage from '../../pageobjects/login.page.js'; // include .js extension

const loginPage = new LoginPage();

Given('I open login page', async () => {
    await loginPage.open();
});

When('I login with username {string} and password {string}', async (username, password) => {
    await loginPage.login(username, password);
});

Then('I should see dashboard', async () => {
    await expect(loginPage.dashboard).toBeDisplayed();
});
