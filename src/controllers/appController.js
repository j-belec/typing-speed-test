// const Phrase = require("../models/Phrase");

module.exports = {
  home: async function (req, res) {
    res.render("home");
  },
  // lang: async function (req, res) {
  //   const language = req.params.lang;

  //   const phrasesArr = await Phrase.findAll({
  //     where: { lang: language },
  //   });
  //   const id = Math.round(Math.random() * (phrasesArr.length - 1));
  //   const phraseContent = phrasesArr[id].dataValues.content.split(" ");

  //   res.render("game", { phrase: phraseContent, lang: language });
  // },
};
