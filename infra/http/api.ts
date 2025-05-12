import { env } from '@/config/env';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.API_BASE_URL;
  }

  async get(endpoint: string, options: { responseType?: 'json' | 'text' } = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return this.handleResponse(response, options.responseType);
  }

  async post(endpoint: string, body: any) {
    const isFormData = body instanceof FormData;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: isFormData ? undefined : {
        'Content-Type': 'application/json',
      },
      body: isFormData ? body : JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  private async handleResponse(response: Response, responseType: 'json' | 'text' = 'json') {
    if (!response.ok) {
      throw new Error(`Houve um erro ao carregar os dados da API: ${response.statusText}`);
    }

    if (responseType === 'text') {
      return response.text();
    }
    return response.json();
  }
}

export const apiClient = new ApiClient();