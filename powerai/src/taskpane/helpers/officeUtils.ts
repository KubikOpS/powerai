export async function getSlideDescription(): Promise<string> {
  return new Promise((resolve, reject) => {
    PowerPoint.run(async (context) => {
      try {
        const slide = context.presentation.slides.getActiveSlide();
        slide.load('shapes');
        await context.sync();
        const shapes = slide.shapes.items;
        let desc = 'Слайд содержит:\n';
        for (const shape of shapes) {
          if (shape.hasTextFrame) {
            shape.textFrame.load('textRanges');
            await context.sync();
            const text = shape.textFrame.textRanges.items[0].text;
            const fontSize = shape.textFrame.textRanges.items[0].font.size;
            desc += `- Текст "${text}" (размер ${fontSize}pt)\n`;
          } else if (shape.type === 'Picture') {
            desc += '- Изображение\n';
          }
        }
        resolve(desc || 'Слайд пуст');
      } catch (err) {
        reject(err);
      }
    }).catch(reject);
  });
}