const cheerio = require('cheerio');
const request = require('request');

var teamSideA = [""],
    teamSideB = [""],
    statusArr = [""],
    dates = [""];
    
request('https://www.espn.com/soccer/fixtures/_/league/uefa.euro', (error, response, html)=>{
    if(!error && response.statusCode ==200){
        const $ = cheerio.load(html);
        const $2 = cheerio.load(html);

        
        $2('.responsive-table-wrap').each((n, el) => {

            const date = $2(el).find('.table-caption').text();
            console.log(date);
            dates.push(date);
            $('tr').each((i, element) => {
                //get status of match
                const status = $(element)
                .find('.record')
                .text();
                //get left side team
                const team1 = $(element)
                .find('td')
                .find('span:first')
                .text()
            //get right side team
            const team2 = $(element)
            .find('td')
            .find('span:last')
            .text()
                //push into array for later
            statusArr.push(status);
            teamSideA.push(team1);
            teamSideB.push(team2);
                
            //console.log(`${team1} ${status} ${team2}`);
            });
    });
        
    }
    console.log(dates);
for (var i = 0; i < teamSideA.length/2; i++){
    console.log(`${teamSideA[i]} ${statusArr[i]} ${teamSideB[i]}`);
    console.log(i);
}
});

//FIX PUSH FUNCTION
//console.log(teamSideB);