// example.spec.js
const { test, expect, request } = require('@playwright/test');

test.describe('Imdb All test Cases', () => {

    var moviesTitle = ['Airplane Mode']
    // 'Batman Begins', 'Logan',
    // , 'Logan', 'Airplane Mode'];
    for (let i = 0; i < moviesTitle.length; i++) {

        var jsnFile;

        test('First result as movie name for ' + moviesTitle[i], async ({ page }) => {

            await page.goto('https://www.imdb.com/');
            await page.fill('[placeholder="Search IMDb"]',moviesTitle[i]);
            await page.keyboard.press("Enter");
            await expect(page.locator(':nth-child(3) > .findList > tbody > :nth-child(1) > .result_text > a'))
            .toHaveText(moviesTitle[i]);
        })

        test('Correct Director name for movie ' + moviesTitle[i], async ({ page }) => {
            
            test.setTimeout(120000);

            var str = ""
            str = moviesTitle[i].split(" ");
            str = str.join("+");
            str = str.toLowerCase();

            var id = ""
            await page.request.get('http://www.omdbapi.com/?t=' + str + '&apikey=59da03cd&')
                .then((resp) => {
                    return resp.json();
                })
                .then((resp2) => {
                    jsnFile = resp2;
                    id = jsnFile.imdbID;
                    console.log(id);
                })


            await page.goto('https://www.imdb.com/title/' + id + "/");
            var dirName = [];
            var count = 1;
            while(1){
                try{
                    await page.locator(`body > div:nth-child(2) > main:nth-child(6) > div:nth-child(1) > section:nth-child(4) > section:nth-child(1) > div:nth-child(4) > section:nth-child(1) > section:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(${count}) > a:nth-child(1)`)
                        .textContent()
                        .then((resp) => {
                            console.log(`${count} =>count:: ${resp}=> resp`);
                            dirName.push(resp);
                            count += 1;
                        });
                }
                catch (err) {
                    console.log("OOps");
                    break;
                }
            }
            dirName.sort();
            console.log(dirName);
            var dirOmdb = jsnFile.Director;
            dirOmdb = dirOmdb.split(",");
            for (var i = 0; i < dirOmdb.length; i++) {
                dirOmdb[i] = dirOmdb[i].trim();
            }
            dirOmdb.sort();
            console.log(`dirOmdb is ${dirOmdb}`);
            expect(dirName).toEqual(dirOmdb);


        })


    }

})