/*
Sumber : https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files

https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
*/

module.exports = {
    sendme: function () {
        console.log("well done");
    },
    bar: function () {
      // whatever
    }
  };