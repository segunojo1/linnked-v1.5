import axios from "axios";

export class FormService {

    static async generateLink(payload: {senderFirstName: string, senderEmail: string, recipientFirstName: string, customMessage: string, isAiGenerated: boolean, personalityDescription: string, messageTitle: string}) {
        try {
            const response = await axios.post(`https://linnked-e4c8bhdgcydec9hp.eastus-01.azurewebsites.net/api/linnked/send`, 
              payload, {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            
            return response.data;
          } catch (error) {
            console.error("Error registering user:", error);
            throw error;
          }
    }

    static async editMultipage(scrambledId: string, multipage: boolean) {
      try {
        const response = await axios.put(
          `https://linnked-e4c8bhdgcydec9hp.eastus-01.azurewebsites.net/api/linnked/edit/multipage`, multipage,
          {
            params: { scrambledId }, // Query parameter
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        return response.data;
      } catch (error) {
        console.error("Error editing multipage:", error);
        throw error;
      }
    }
}