const _lowdb = require("./lowdb")
const { chalk } = _lowdb;

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

_lowdb.exports = {
	color,
	bgcolor
}
