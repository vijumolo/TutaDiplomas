import { jsPDF } from 'jspdf';

// Constant background image
// We'll use a placeholder or the downloaded background if we have an exact match.
const bgRawUrl = '/bg.jpg';

export const generatePdfDiploma = async (cyclist: any) => {
  return new Promise<Blob>(async (resolve, reject) => {
    try {
      // Create a landscape A4 PDF
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4' // 297 x 210 mm
      });

      // Load background image
      const imgParams = new Image();
      imgParams.crossOrigin = "Anonymous";
      imgParams.src = bgRawUrl;

      imgParams.onload = () => {
        // Draw the background image to cover the whole A4 page
        doc.addImage(imgParams, 'JPEG', 0, 0, 297, 210);

        // Configure font styles to match the desired template
        doc.setTextColor(50, 50, 50); // Dark Slate

        // Title
        doc.setFont('times', 'bold');
        doc.setFontSize(36);
        doc.text("Certificado de Participación", 148.5, 60, { align: 'center' });

        doc.setFontSize(16);
        doc.setTextColor(200, 80, 20); // Orange-ish
        doc.text("XXVII CIRCUITO CICLÍSTICO NACIONAL 'MIGUEL A. SANABRIA'", 148.5, 75, { align: 'center' });

        // Participant Name
        doc.setTextColor(20, 20, 20);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(40);
        doc.text(cyclist.name.toUpperCase(), 148.5, 110, { align: 'center' });

        // Stats grid
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(14);
        
        // Col 1
        doc.text(`Dorsal: ${cyclist.number}`, 70, 140);
        doc.text(`Posición: #${cyclist.position}`, 70, 150);
        doc.text(`Categoría: ${cyclist.category}`, 70, 160);

        // Col 2
        doc.text(`Equipo: ${cyclist.team}`, 180, 140);
        doc.text(`Vuelta: ${cyclist.laps} Laps`, 180, 150);
        doc.text(`Tiempo: ${cyclist.time}`, 180, 160);

        // Signatures
        doc.setLineWidth(0.5);
        doc.line(60, 185, 120, 185);
        doc.setFontSize(12);
        doc.text("Firma Autorizada", 90, 192, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.text("Tuta, Boyacá", 207, 185, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.text("Lugar del Evento", 207, 192, { align: 'center' });

        // Generate the blob
        const pdfBlob = doc.output('blob');
        resolve(pdfBlob);
      };
      
      imgParams.onerror = (err) => {
        console.error("Failed to load background image", err);
        reject(err);
      };

    } catch (error) {
       console.error("Error creating PDF", error);
       reject(error);
    }
  });
};
