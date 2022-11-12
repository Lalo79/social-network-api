const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughtsArray, randomNumber } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {

    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.collection.insertMany(users);

    const userDb = await User.find({});

    console.log('>>>>', userDb ,'<<<<<<\n')

    let thoughts =[];
    for (let i = 0; i < 40; i++) {
        
        thoughts.push({
            thoughtText: thoughtsArray[randomNumber(thoughtsArray)].text,
            username: userDb[randomNumber(userDb)]._id,
        });
    }

    await Thought.collection.insertMany(thoughts);



    for (let j = 0; j < userDb.length; j++) {
        
        let friendsArr = [];
        numberOfFriends = 1 + randomNumber([1,2,3,4]);

        console.log('\n>>>> number of friends ', numberOfFriends)

        for (let m = 0; m < numberOfFriends; m++) {
            if ( !friendsArr.includes(userDb[randomNumber(userDb)]._id) )
            {
            friendsArr.push(userDb[randomNumber(userDb)]._id);
            }
        }

        console.log('\n>>>> FriendsArray ', friendsArr)


        let thoughtEl = await Thought.find(
            {username: userDb[j]._id}
        );

        await User.findOneAndUpdate(
            { _id: userDb[j]._id },
            { $addToSet: { thoughts: thoughtEl, friends: friendsArr }},
            { new: true }
        );

        console.log('\n>>>> Thought ', thoughtEl)
        
    }





    process.exit(0); 

});


