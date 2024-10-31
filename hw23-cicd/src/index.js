const { convertImage } = require('./converter');

export const handler = async (event) => {
    try {
        const number = JSON.parse(event.body).number
        const shouldIReturnTrue = convertImage(number)

        if (shouldIReturnTrue) return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'The number is odd! :)',
            }),
        };

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'The number is not odd! :(',
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
}