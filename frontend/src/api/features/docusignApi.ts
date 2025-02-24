import { apiClient } from "../clients"


export const docusignApi = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async fetchDocusign(): Promise<any>{ // figure out the api response body, and if there are any outputs (scope type)
        try {
            const response = await apiClient.get('/docusignEndPoint');
            console.log('Docusign Response Data: ', response);
            return response;
        } catch(error) {
            console.error('Error fetching signing url');
            throw error;
        }
    }
}