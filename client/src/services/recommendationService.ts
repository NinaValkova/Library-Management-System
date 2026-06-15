import { apiRequest } from "../api/apiRequest";
import { RECOMMENDER_SERVICE_URL } from "../constants/url";

const recommendationService = {
  async getRecommendations(userId: number): Promise<number[]> {
    const res = await apiRequest<{
      user_id: number;
      recommendations: number[];
    }>(`${RECOMMENDER_SERVICE_URL}/${userId}`);
        
    if (!res || !res.recommendations) return [];

    return res.recommendations;
  },
};

export default recommendationService;