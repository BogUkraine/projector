const { convertImage } = require('./converter');

exports.handler = async (event) => {
    try {
        // Assuming the file is sent as a Base64-encoded string in the event body
        const base64File = JSON.parse(event.body).file;
        const inputBuffer = Buffer.from(base64File, 'base64');
        
        // Example processing: Convert the image to PNG format
        const output = await convertImage(inputBuffer)
        const outputBuffer = await output.toBuffer()
        
        // Convert the output back to Base64 for the response
        const base64Output = outputBuffer.toString('base64');

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file: base64Output })
        };
    } catch (err) {
        console.error("Error processing file:", err);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "File processing failed" })
        };
    }
}