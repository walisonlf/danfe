import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { xmlContent } = await request.json();
    
    if (!xmlContent) {
      return NextResponse.json(
        { success: false, message: 'Conteúdo XML não fornecido' },
        { status: 400 }
      );
    }

    // Validação básica do XML
    if (!xmlContent.includes('<NFe') && !xmlContent.includes('<nfe')) {
      return NextResponse.json(
        { success: false, message: 'O arquivo não parece ser um XML de NFe válido' },
        { status: 400 }
      );
    }

    try {
      // Chamada para a API MeuDanfe
      const response = await axios.post(
        'https://ws.meudanfe.com/api/v1/get/nfe/xmltodanfepdf/API',
        xmlContent,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );

      // A API retorna o PDF em base64
      const pdfBase64 = response.data;
      
      return NextResponse.json({
        success: true,
        pdfBase64,
      });
    } catch (apiError: any) {
      console.error('Erro na API MeuDanfe:', apiError.response?.data || apiError.message);
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Erro ao processar o XML na API externa. Verifique se o XML é válido.',
          error: apiError.response?.data || apiError.message
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro interno:', error);
    
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor', error: error.message },
      { status: 500 }
    );
  }
}