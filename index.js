// Import discord.js and create the client
const Discord = require('discord.js')
const client = new Discord.Client();

let prodImg;
const key = require("./token.json").token;


// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

// Register an event to handle incoming messages
client.on('message', async msg => {
    // This block will prevent the bot from responding to itself and other bots
    if(msg.author.bot) {
        return
    }

    if (msg.content.startsWith("!hello")) {
        msg.reply("sup shawtie!")
    }

    if (msg.content.startsWith("!amazonbot")) {
        msg.reply("Usage: type !link 'offerID' 'item name (ps5/xbox)' to generate a webhook! \n \n Example: !link xaGCEPEvnmB1L0Xx288%2BXNRVr%2FFRe6YG4q54%2BI5twBPnxFkVPr%2FMmkTcV6YOi3PRbRFRnEvCNs8J%2Bkj45GFp4ynMiGdIvZl%2FgGFPD5HaBz8Gy8mg%2BPIfzNbxmfxnBLu%2BSY2GzPvd6CRXHc%2FDHydI6Q%3D%3D ps5")
    }

    // Check if the message starts with '!hello' and respond with 'world!' if it does.
    if(msg.content.startsWith("!link")) {
        const resp = msg.content.split(' ')
        let args = resp.shift().toLowerCase();

        if(resp[1] == "ps5"){
            prodImg = "https://m.media-amazon.com/images/I/619BkvKW35L._SX522_.jpg";
        }
        else if(resp[1] == "xbox"){
            prodImg = "https://m.media-amazon.com/images/I/41OH7dLwaJL._SX522_.jpg";
        }
        else if(!((resp[1] == 'ps5') || (resp[1] == 'xbox'))){
            prodImg = "https://ggscore.com/media/logo/t62288.png?75";
        }


        const embed = new Discord.MessageEmbed()
            .setTitle(resp[1].toUpperCase() + ' ATC LINK')
            .setDescription("AMAZON LIVE ^^ CLICK TO ATC \n \n OfferID: " + resp[0])
            .setURL("https://www.amazon.com/gp/aws/cart/add.html?OfferListingId.1="+resp[0]+"&Quantity.1=1")
            .setColor(4718336)
            .setAuthor('SS LINKS', 'https://pbs.twimg.com/profile_images/1381772852538568704/RtTf7xTg_400x400.jpg')
            .setImage(prodImg)
            .setFooter('L&W Associates')
            .setTimestamp();
        msg.reply(embed);
    }

    if(msg.content.startsWith("!sku")){
        //resp[0] = sku
        const resp = msg.content.split(' ')
        let args = resp.shift().toLowerCase();
        let prodLink = "https://www.amazon.com/-/dp/"+resp[0];

        const webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
        const driver = new webdriver.Builder().forBrowser('chrome').build();
        driver.get(prodLink);
        let offerID = driver.wait(until.elementLocated(By.id('offerListingID')), 20000);
        console.log("Hello")
        //console.log(offerID.getAttribute("value"));


    }
});

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(key);
