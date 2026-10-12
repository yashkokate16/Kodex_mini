import { getModel } from "../config/llmmodel.js";
import {generatePDF} from "../utils/generatePDF.js";
import { randomUUID } from "node:crypto";
import { supabase } from "../config/supabase.js";





export let pdfAgent = async (state) => {

    let {prompt} = state;

    if(!prompt || prompt.trim().length === 0) {
        return {
            ...state,
            aiResponse: "Prompt is empty. Please provide a valid prompt.",
        };
    }
    
    let llm = await getModel("PDFGroq") 

    let result = await llm.invoke([
        {
            role: "system",
            content:`You generate useful, well-organized PDF document content.
Return ONLY valid JSON with this exact structure:
{
  "title": "Document title",
  "sections": [
    {
      "heading": "Section heading",
      "content": "Section text"
    }
  ]
}
Make the document detailed enough to satisfy the user's prompt.
Do not wrap the JSON in Markdown fences.`,
        },
        {
            role: "user",
            content: prompt
        }
    ])



    let raw =
  typeof result.content === "string"
    ? result.content
    : JSON.stringify(result.content);

      const cleaned = raw
  .replace(/^```(?:json)?\s*/i, "")
  .replace(/\s*```$/, "")
  .trim();

    console.log("Raw PDF model output:", raw);
console.log("Cleaned PDF model output:", cleaned);

let document = JSON.parse(cleaned);
console.log("Parsed PDF document:", document);

    // let document = JSON.parse(cleaned);

    if (!document || typeof document !== "object") {
  throw new Error("PDF output must be a JSON object");
}

if (typeof document.title !== "string") {
  throw new Error("PDF output is missing a valid title");
}

if (!Array.isArray(document.sections)) {
  throw new Error("PDF output is missing the sections array");
}

if (document.sections.length === 0) {
  throw new Error("PDF output contains no sections");
}

if (
  !document.sections.every(
    (section) =>
      section &&
      typeof section.heading === "string" &&
      typeof section.content === "string"
  )
) {
  throw new Error("One or more PDF sections have invalid fields");
}

  let pdfBuffer = await generatePDF(document);

  // upload to bucket in supabase

  let bucket = process.env.SUPABASE_PDF_BUCKET;
  let key = `generated/${randomUUID()}.pdf`;

  let {error :uploadError} = await supabase.storage.from(bucket).upload(key, pdfBuffer,{
    contentType: "application/pdf",
    upsert: true

  })

  if(uploadError) {
    console.error("Error uploading PDF to Supabase:", uploadError);
    throw new Error("Failed to upload PDF to Supabase");
  }




  let {data, error :urlError} = await supabase.storage.from(bucket).createSignedUrl(key, 3600, {
    download: `${document.title}.pdf`
  });

  if(urlError || !data?.signedUrl) {
    console.error("Error creating signed URL for PDF:", urlError);
    throw new Error("Failed to create signed URL for PDF");
  }


  return {

    ...state,

    aiResponse: `PDF generated successfully. You can download it from [here](${data.signedUrl}).`,
    pdfUrl: data.signedUrl,
    pdfKey: key,
    pdfFilename: `${document.title}.pdf`,
  }

}


