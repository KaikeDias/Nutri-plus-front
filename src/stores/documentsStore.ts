import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import type { Document } from "src/models/dtos/document";
import type { DocumentDAO } from "src/models/dtos/documentDAO";
import { ref } from "vue";

export const useDocumentsStore = defineStore('document', () => {
    const documents = ref<DocumentDAO[]>([])

    const fetchDocuments = async (patientId: string) => {
        try {
            const response = await api.get(`/documents/patients/${patientId}`)

            documents.value = response.data.map((document: Document) => ({
                id: document.id,
                patientId: document.patientId,
                nutritionistId: document.nutritionistId,
                filename: document.filename,
                size: convertSize(document.size)
            }))
        } catch (error) {
            console.error('Erro ao buscar documentos:', error)
        }
    }

    const convertSize = (size: number): string => {
        if (size < 1024) {
            return `${size} bytes`;
        } else if (size < 1024 ** 2) {
            return `${(size / 1024).toFixed(2)} KB`;
        } else if (size < 1024 ** 3) {
            return `${(size / 1024 ** 2).toFixed(2)} MB`;
        } else if (size < 1024 ** 4) {
            return `${(size / 1024 ** 3).toFixed(2)} GB`;
        } else {
            return `${(size / 1024 ** 4).toFixed(2)} TB`;
        }
    }

    const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const downloadDocument = async (documentId: string) => {
        try {
            const response = await api.get(`documents/${documentId}`);
            if (response.data && response.data.fileData) {
                const file = b64toBlob(response.data.fileData, 'application/pdf');

                const link = document.createElement('a');
                const url = window.URL.createObjectURL(file);

                link.href = url;
                link.download = response.data.filename || 'teste.pdf';
                link.click();

                window.URL.revokeObjectURL(url);
            } else {
                console.error('Erro: Dados de arquivo não encontrados.');
            }
        } catch (error) {
            console.error('Erro ao baixar o documento:', error);
        }
    }

    const openDocument = async (documentId: string) => {
        try {
            const response = await api.get(`documents/${documentId}`);
            if (response.data && response.data.fileData) {
                const file = b64toBlob(response.data.fileData, 'application/pdf');
    
                // Cria a URL do objeto
                const url = window.URL.createObjectURL(file);
    
                // Abre o arquivo em uma nova aba
                window.open(url, '_blank');
    
                // Libera a URL após o uso
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Erro: Dados de arquivo não encontrados.');
            }
        } catch (error) {
            console.error('Erro ao abrir o documento:', error);
        }
    };
    

    const uploadDocument = async (formData: FormData) => {
        try {
            await api.post('/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Importante para enviar o arquivo
                  },
                }
            )
        } catch (error) {
            console.error('Erro no upload de documento:', error);
        }
    }

    const deleteDocument = async (documentId: string) => {
        try {
            await api.delete(`/documents/${documentId}`)
        }catch (error) {
            console.error('Erro ao deletar documento:', error)
            throw new Error('Erro ao deletar documento');
        }
    }

    return { documents, fetchDocuments, downloadDocument, uploadDocument, deleteDocument, openDocument }
})