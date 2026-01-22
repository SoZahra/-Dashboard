export const API_URL = 'http://localhost:3000/documents';


interface CreateDocumentDto {
    fileName: string,
    pageCount: number,
    metadata?: any
}

export const createDocument = async(documentData : CreateDocumentDto) => {
    try {
        const response = await fetch(`${API_URL}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(documentData)
        })
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Could not fetch ressource");
        }   
        return await response.json()

    }catch(error){
        console.error("Erreur API createDocument",error);
        throw error
    }
}


