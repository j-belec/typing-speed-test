const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  home: async function (req, res) {
    res.render("home");
  },
  lang: async function (req, res) {
    const language = req.params.lang;

    const phrasesArr = await prisma.phrase.findMany({
      where: { lang: language },
    });
    const id = Math.round(Math.random() * (phrasesArr.length - 1));
    const phraseArr = phrasesArr[id].content.split(" ");

    res.render("game", { phrase: phraseArr, lang: language });
  },
};
