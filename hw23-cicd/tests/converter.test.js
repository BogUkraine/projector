const { convertImage } = require('../src/converter');
const fs = require('fs');

describe('Image Conversion', () => {
  test('converts JPEG to BMP', async () => {
    const outputPath = await convertImage('path/to/input.jpg', 'bmp');
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('converts JPEG to GIF', async () => {
    const outputPath = await convertImage('path/to/input.jpg', 'gif');
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('converts JPEG to PNG', async () => {
    const outputPath = await convertImage('path/to/input.jpg', 'png');
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});
