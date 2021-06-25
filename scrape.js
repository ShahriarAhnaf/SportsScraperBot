const cheerio = require('cheerio');
const request = require('request');

var teamSideA = [""],
    teamSideB = [""],
    statusArr = [""],
    dates = [];
var counterPerDay = [0]; 

request('https://www.espn.com/soccer/fixtures/_/league/uefa.euro', (error, response, html)=>{
    if(!error && response.statusCode ==200){
        const $ = cheerio.load(html);
        const $2 = cheerio.load(html);



        $2(".table-caption").each((n,el)=>{
            const date = $2(el).text();
            console.log(date);
            dates.push(date); 
            counterPerDay.push(0); //increase length of array to hold extra table of matches
        
     
        
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
            .text();

            //push into array for later
            statusArr.push(status);
            teamSideA.push(team1);
            teamSideB.push(team2);
             //increase counter number in hte array
              counterPerDay[n]= i;
            });
        });
    }

//    console.log(dates);
for (var i = 0; i < teamSideA.length; i++){
    console.log(`${teamSideA[i]} ${statusArr[i]} ${teamSideB[i]}`);
    console.log(i);
}



});
