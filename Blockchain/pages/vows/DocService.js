import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html) => {
    savePDF(html, { 
      
      fileName: 'certifcado.pdf',
      margin: 1
    })
  }
}

const Doc = new DocService();
export default Doc;