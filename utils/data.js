thoughtsArray = [
    {
        text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
        author: "Thomas Edison"
    },
    {
        text: "You can observe a lot just by watching.",
        author: "Yogi Berra"
    },
    {
        text: "A house divided against itself cannot stand.",
        author: "Abraham Lincoln"
    },
    {
        text: "Difficulties increase the nearer we get to the goal.",
        author: "Johann Wolfgang von Goethe"
    },
    {
        text: "Fate is in your hands and no one elses",
        author: "Byron Pulsifer"
    },
    {
        text: "Be the chief but never the lord.",
        author: "Lao Tzu"
    },
    {
        text: "Nothing happens unless first we dream.",
        author: "Carl Sandburg"
    },
    {
        text: "Well begun is half done.",
        author: "Aristotle"
    },
    {
        text: "Life is a learning experience, only if you learn.",
        author: "Yogi Berra"
    },
    {
        text: "Self-complacency is fatal to progress.",
        author: "Margaret Sangster"
    },
    {
        text: "Peace comes from within. Do not seek it without.",
        author: "Buddha"
    },
    {
        text: "What you give is what you get.",
        author: "Byron Pulsifer"
    },
    {
        text: "We can only learn to love by loving.",
        author: "Iris Murdoch"
    },
    {
        text: "Life is change. Growth is optional. Choose wisely.",
        author: "Karen Clark"
    },
    {
        text: "You'll see it when you believe it.",
        author: "Wayne Dyer"
    },
    {
        text: "To lead people walk behind them.",
        author: "Lao Tzu"
    },
    {
        text: "Having nothing, nothing can he lose.",
        author: "William Shakespeare"
    },
    {
        text: "Trouble is only opportunity in work clothes.",
        author: "Henry J. Kaiser"
    },
    {
        text: "A rolling stone gathers no moss.",
        author: "Publilius Syrus"
    },
    {
        text: "Ideas are the beginning points of all fortunes.",
        author: "Napoleon Hill"
    },
    {
        text: "Everything in life is luck.",
        author: "Donald Trump"
    },
    {
        text: "Doing nothing is better than being busy doing nothing.",
        author: "Lao Tzu"
    },
    {
        text: "Trust yourself. You know more than you think you do.",
        author: "Benjamin Spock"
    },
    {
        text: "Study the past, if you would divine the future.",
        author: "Confucius"
    },
    {
        text: "From error to error one discovers the entire truth.",
        author: "Sigmund Freud"
    },
    {
        text: "Well done is better than well said.",
        author: "Benjamin Franklin"
    },
    {
        text: "Bite off more than you can chew, then chew it.",
        author: "Ella Williams"
    },
    {
        text: "Work out your own salvation. Do not depend on others.",
        author: "Buddha"
    },
    {
        text: "One today is worth two tomorrows.",
        author: "Benjamin Franklin"
    },
    {
        text: "Once you choose hope, anythings possible.",
        author: "Christopher Reeve"
    },
    {
        text: "God always takes the simplest way.",
        author: "Albert Einstein"
    },
    {
        text: "One fails forward toward success.",
        author: "Charles Kettering"
    },
]



reactionsArray = [
    "This is some awesome thinking!",
    "What terrific math skills you’re showing!",
    "You are an amazing writer!",
    "Wow! You have improved so much!",
    "Nice idea!",
    "You are showing excellent understanding!",
    "This is clear, concise, and complete!",
    "What a powerful argument!",
    "I knew you could do it!",
    "Wonderful ideas!",
    "It was a pleasure to grade this!",
    "Keep up the incredible work!",
    "My goodness, how impressive!",
    "You’re showing inventive ideas!",
    "You’ve shown so much growth!",
    "Interesting thoughts!",
    "I love your neat work!",
    "Doesn’t it feel good to do such great work?",
    "First-rate work!",
    "This is fascinating information!",
    "You inspire me!",
    "This is right on target!",
    "What an astounding observation!",
    "This is very well thought out!",
    "I can tell you’ve been practicing!",
    "You’ve come a long way!",
    "I can tell you’ve been paying attention!",
    "Reading this made my day!",
    "This is very perceptive!",
    "What an accomplishment!"
]

usersArray = 
[
"Moy",
"Spellworth",
"Ronan",
"Wainscot",
"Jann",
"Appleton",
"Roocroft",
"Prenty",
"Marzellano",
"Brookes",
"Lundberg",
"Garland",
"Tremontana",
"Mauger",
"Aps",
"Edgecumbe",
"Atkirk",
"Durbyn",
"Minchell",
"Capper",
"Leedes",
"Wozencroft",
"Sweed",
"Doyley",
"Feast",
"Frith",
"Avrahamof",
"Berrane",
"Yarr",
"Elms",
"Purcell",
"Quince",
"Findlater",
"Ablett",
"L'Archer",
"Asbrey",
"Rowland",
"Scafe",
"Shawe",
"Broadwell",
"Monard",
"Scrivinor",
"Plenderleith",
"Petrovsky",
"Bear",
"Larraway",
"Vinck",
"Leheude",
"Broxton",
"Frick"
]


const randomNumber = (arr) => Math.floor(Math.random() * arr.length );


// Seeding user objects
const  userSeeds = () => {
    let results = [];
    let position = [];
    let i = 1;

// Selects 30 users from user lists making sure there are no repeated records.
    while (i <= 10 ) {
        
        let currentPosition = randomNumber(usersArray);

        if (!position.includes(currentPosition)) {
            
            position.push(currentPosition);
            let user = usersArray[currentPosition];

            results.push({
                username: user,
                email: user + '@mail.com'
            });
            i++;
        }
    }

    return results;

}


const users = [...userSeeds()];

console.log('>>>>>>>>>>>\n\n', users, '<<<<<<<<<<<<<\n\n')

module.exports = { users, thoughtsArray, randomNumber };