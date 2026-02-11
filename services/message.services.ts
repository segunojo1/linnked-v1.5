import axios from "axios";

export class MessageService {

    static async getMessage(payload: {scrambledId: string}) {
        try {
            const response = await axios.get(`https://linnked-e4c8bhdgcydec9hp.eastus-01.azurewebsites.net/api/linnked/${payload.scrambledId}`
            );
            
            return response.data;
          } catch (error) {
            console.error("Error getting message:", error);
            throw error;
          }
    }

    static async messageResponse(payload: {scrambledId: string, accept: boolean | null}) {
      try {
          const response = await axios.post(`https://linnked-e4c8bhdgcydec9hp.eastus-01.azurewebsites.net/api/linnked/${payload.scrambledId}/respond`, payload, {
            params: {
              scrambledId: payload.scrambledId,
              accept: payload.accept
            }
          }
          );
          
          return response.data;
        } catch (error) {
          console.error("Error getting message response:", error);
          throw error;
        }
  }
}