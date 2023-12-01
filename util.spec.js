const { generateText, checkAndGenerate } = require('./util');
const puppeeter = require('puppeteer');

test('Should output name & age', () => {
    const text = generateText('Khush', 24);
    expect(text).toBe('Khush (24 years old)');
});

// check for false positives -> check for null, undefined 

test('Should output data less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

test('Should generate a valid text output', () => {
    const text = checkAndGenerate('Khush', 25);
    expect(text).toBe('Khush (25 years old)');
});

test('Should create an element with text and correct class', async () => {
    const browser = await puppeeter.launch({
        headless: true,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('file:///Users/khushbu.raval/JS_tutorial/js-testing-introduction-starting-setup/index.html');
    await page.click('input#name');
    await page.type('input#name', 'Hina');
    await page.click('input#age');
    await page.type('input#age', '24');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Hina (24 years old)');
}, 10000);

// jest matchers
test("Exact value matchers", () => {
    expect(2 * 2).toBe(4);
    expect(4 - 2).not.toBe(1);
});
test("truthiness Assertion", () => {
    var test = "Software Testing demo"
    var name = 'Khushi';
    var n = null
    expect(n).toBeNull()
    expect(name).not.toBeNull()
    // test should have a valid value
    expect(test).toBeTruthy()
    //fail - as null is unsuccess
    expect(n).toBeTruthy()
    // pass - null worked as false or negative
    expect(n).toBeFalsy()
    // 0 - work as false
    expect(0).toBeFalsy()
});

test("numeric comparison", () => {
    var number1 = 100;
    var number2 = -20;
    var number3 = 0;
    // validate greater than
    expect(number1).toBeGreaterThan(10)
    // validate less than or equal
    expect(number2).toBeLessThanOrEqual(0)
    // validate greater than or equal
    expect(number3).toBeGreaterThanOrEqual(0)
})

test("string matchers",() => {
    var string1 = "BrowserStack - Automation tool" 
    // test for match the string - Success
    expect(string1).toMatch(/tool/);
    // test for not match the string - Failure
    expect(string1).not.toMatch(/abc/)
  })