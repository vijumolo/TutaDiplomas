import { PDFDocument } from 'pdf-lib';
import pdfMapping from '../data/pdfMapping.json';

const pdfUrl = `${import.meta.env.BASE_URL}DIPLOMAS.pdf`;
let cachedPdfBytes: ArrayBuffer | null = null;

export const generatePdfDiploma = async (cyclist: any) => {
  return new Promise<Blob>(async (resolve, reject) => {
    try {
      // 1. Fetch DIPLOMAS.pdf only once
      if (!cachedPdfBytes) {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo DIPLOMAS.pdf");
        }
        cachedPdfBytes = await response.arrayBuffer();
      }

      // 2. Load the original PDF
      const pdfDoc = await PDFDocument.load(cachedPdfBytes);

      // 3. Find the exact page matching the cyclist
      const pageIndex = (pdfMapping as Record<string, number>)[cyclist.number.toString()];
      if (pageIndex === undefined || pageIndex < 0 || pageIndex >= pdfDoc.getPageCount()) {
        throw new Error(`No se encontró el diploma original para el ciclista: ${cyclist.name}`);
      }

      // 4. Create a new PDF with just that page
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
      newPdf.addPage(copiedPage);

      // 5. Generate and return Blob
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      resolve(blob);

    } catch (error) {
      console.error("Error extrayendo el diploma en PDF:", error);
      reject(error);
    }
  });
};
