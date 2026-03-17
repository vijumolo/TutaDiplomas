import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import cyclists from '../src/data/cyclists.json' with { type: 'json' };

async function mapPages() {
  try {
    const bytes = new Uint8Array(fs.readFileSync('Diplomas/DIPLOMAS.pdf'));
    const doc = await pdfjs.getDocument({ data: bytes }).promise;
    const numPages = doc.numPages;
    const mapping = {};
    
    console.log(`Loaded PDF with ${numPages} pages.`);

    for (let i = 1; i <= numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const text = content.items.map(item => item.str).join(' ');
      
      const textUpper = text.toUpperCase();
      
      // Look for any cyclist name in the text
      const matches = cyclists.filter(c => textUpper.includes(c.name.toUpperCase()));
      
      if (matches.length > 0) {
        // Save mapping by cyclist "number" (bib number)
        mapping[matches[0].number] = i - 1; // 0-indexed for pdf-lib!
        console.log(`Page ${i} -> ${matches[0].name}`);
      }
    }
    
    console.log(`Found ${Object.keys(mapping).length} mappings out of ${cyclists.length} cyclists.`);
    fs.writeFileSync('src/data/pdfMapping.json', JSON.stringify(mapping, null, 2));
    
  } catch (error) {
    console.error(error);
  }
}

mapPages();
