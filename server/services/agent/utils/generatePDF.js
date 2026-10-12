import PDFDocument from "pdfkit";

export function generatePDF({title, sections}) {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument({
            size: "A4",
            margin:{
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            },
        });

        let chunks = [];

        doc.on("data", (chunk) => {chunks.push(chunk)});
        doc.on("end", () => resolve(Buffer.concat(chunks)))
        doc.on("error", (err) => reject(err));


        doc.fontSize(22).text(title, { align: "center" });
        doc.moveDown(1.5);

        for (const section of sections) {
         doc.fontSize(16).text(section.heading);
         doc.moveDown(0.5);

      doc.fontSize(11).text(section.content, {
         lineGap: 4,
         paragraphGap: 8,
        });

        doc.moveDown();
    }

    doc.end();

    })

}