import { env } from '@/config/env';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.API_BASE_URL;
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return this.handleResponse(response);
  }

  async post(endpoint: string, body: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`Houve um erro ao carregar os dados da API: ${response.statusText}`);
    }
    return response.json();
  }
}

export const apiClient = new ApiClient();