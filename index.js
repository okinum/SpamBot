import {Client, Options} from 'discord.js-selfbot-v13';
import dotenv from "dotenv";
import toInteger from "lodash";
dotenv.config();
const client = new Client();

client.on('ready', async () => {
    console.log('bot on online')
    
})
let prefix = '.'

client.on('messageCreate', async(message) =>{
    if (message.author.username != client.user.username)
    {
        return
    }
    if (message.content.startsWith(prefix)) {
        let command = message.content.replace(prefix, "")
        if (command.toLowerCase() !== "help"){
            return
        }
        message.reply("```.Help -> Shows help menu.\n.Setprefix newprefix(string) sets prefix for the selfbot.\n.Spam text(text) times(int) delay(int) {Use '(b)' for a space in text. Use '(rng)' for a random number}.```")
        message.delete()
    }
})
//.setprefix -
client.on('messageCreate', async(message) =>{
    if (message.author.username != client.user.username)
    {
        return
    }
    if (message.content.startsWith(prefix)) {
        let command = message.content.replace(prefix, "").toLowerCase()
        if (command.startsWith("setprefix")){
            if (command.includes(" ")){
                let args = command.split(" ")
                let new_prefix = args[1]
                console.log(new_prefix)
                prefix = new_prefix
            }
            else {
                message.channel.send("something went wrong")
            }
            
            message.delete()
        }

    }
})

client.on('messageCreate', async(message) =>{
    if (message.author.username != client.user.username)
    {
        return
    }
    if (message.content.startsWith(prefix)) {
        let command = message.content.replace(prefix, "").toLowerCase()
        
        if (command.startsWith("spam")){
            if (command.includes(" ")){
                let args = command.split(" ")
                let times = toInteger(args[2])
                let delay = toInteger(args[3])
                // |||| .randomdm join(bk)my(bk)server!!!plz(bk) 3 2
                

                let spam = args[1].replaceAll('(b)', ' ')
                

                for (let step = 0; step < times; step ++)
                {
                    
                    setTimeout(() => { 
                        message.channel.send(spam.replaceAll('(rng)', '' + (getRandomInt(1000).toString()) + '')); 
                    }, delay * 1000 * step);
                }



                message.delete()
            }
            else{
                message.channel.send("``.Spam text(string) times(int) delay(int) {Use '(b)' for a space in text. Use '(rng)' for a random number}.``")
            }

        }
        else{
            return
        }


    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

client.login(process.env.TOKEN)
