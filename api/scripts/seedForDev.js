const resetDb = require("./resetDb");
const seed = require("./seed");

const seedData = {
    users: [
        {
            email: "johnsmith@etchtestapp.com",
            password: "password1",
        },
        {
            email: "johnsmithian@etchtestapp.com",
            password: "password1",
        },
    ],
    cards: [
        {
            userId: 1,
            question: "Capital of England",
            answer: "London",
            progress: 0,
            nextAnswerAfter: new Date(Date.now() - 1),
        },
        {
            userId: 1,
            question: "Capital of France",
            answer: "Paris",
            progress: 3,
            nextAnswerAfter: new Date(Date.now() + 100000000),
        },
        {
            userId: 1,
            question: "Capital of Italy",
            answer: "Rome",
            progress: 5,
            nextAnswerAfter: new Date(Date.now() - 100),
        },
        {
            userId: 1,
            question: `He was an old man who fished alone in a skiff in the Gulf Stream and he had gone
            eighty-four days now without taking a fish. In the first forty days a boy had been with him.
            But after forty days without a fish the boy’s parents had told him that the old man was
            now definitely and finally salao, which is the worst form of unlucky, and the boy had gone
            at their orders in another boat which caught three good fish the first week. It made the
            boy sad to see the old man come in each day with his skiff empty and he always went
            down to help him carry either the coiled lines or the gaff and harpoon and the sail that
            was furled around the mast. The sail was patched with flour sacks and, furled, it looked
            like the flag of permanent defeat.`,
            answer: `The old man was thin and gaunt with deep wrinkles in the back of his neck. The
            brown blotches of the benevolent skin cancer the sun brings from its [9] reflection on the
            tropic sea were on his cheeks. The blotches ran well down the sides of his face and his
            hands had the deep-creased scars from handling heavy fish on the cords. But none of
            these scars were fresh. They were as old as erosions in a fishless desert. `,
            progress: 1,
            nextAnswerAfter: new Date(Date.now() - 100),
        },
        {
            userId: 1,
            question: "How many bits in a byte?",
            answer: "8",
            progress: 5,
            nextAnswerAfter: new Date(Date.now() + 1000000),
        },
        {
            userId: 1,
            question: "What was Harry's ginger friend called?",
            answer: "Ron",
            progress: 5,
            nextAnswerAfter: new Date(Date.now() + 1000000),
        },
        {
            userId: 1,
            question: "Why am I muscly?",
            answer: "I don't work out",
            progress: 5,
            nextAnswerAfter: new Date(Date.now() + 1000000),
        },
        {
            userId: 1,
            question: "?",
            answer: "!",
            progress: 5,
            nextAnswerAfter: new Date(Date.now() + 1000000),
        },
        {
            userId: 2,
            question: "Should be John Smithian",
            answer: "!",
            progress: 5,
            nextAnswerAfter: new Date(Date.now() + 1000000),
        },
        {
            userId: 1,
            question: "Should be finished",
            answer: "Is it not?",
            progress: 6,
            nextAnswerAfter: null,
        },
    ],
};

resetDb().then(() => seed(seedData));
