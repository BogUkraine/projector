const { convertImage } = require('./converter');

export const handler = async (event) => {
    try {
        // Assuming the file is sent as a Base64-encoded string in the event body
        const base64File = event.body.file;
        const inputBuffer = Buffer.from(base64File, 'base64');
        
        // Example processing: Convert the image to PNG format
        const outputBuffer = (await convertImage(inputBuffer)).toBuffer();
        
        // Convert the output back to Base64 for the response
        const base64Output = outputBuffer.toString('base64');

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file: base64Output })
        };
    } catch (err) {
        console.error("Error processing file:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: "File processing failed" })
        };
    }
}