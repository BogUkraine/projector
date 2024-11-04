const sharp = require('sharp');

const convertImage = async (inputBuffer) => {
    return await sharp(inputBuffer).toFormat('png')
}

module.exports = { convertImage };
