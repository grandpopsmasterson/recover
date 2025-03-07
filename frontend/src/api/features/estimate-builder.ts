import { Marker, Materials, RoomCard } from "@/types/estimateBuilder";
import { apiClient } from "../clients";


export const estimateBuilderApi = {

    async getPriceList(): Promise<Materials[]> {
        try {
            const response = await apiClient.get('/endpoint');
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async setMarkers(request: Marker, roomId: RoomCard): Promise<RoomCard> {
        try {
            const response = await apiClient.post(`/endpoint/${roomId}`, request);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async updateMarkers(request: Marker, roomId: RoomCard): Promise<RoomCard> {
        try{
            const response = await apiClient.put(`/endpoint/${roomId}`, request);
            return response.data
        } catch (error) {
            throw error;
        }
    },
}