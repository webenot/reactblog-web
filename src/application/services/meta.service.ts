import { Injectable, resolve } from '@reactblog/core/annotations';
import { ApiService } from '@reactblog/ui/services/api.service';

@Injectable
export class MetaService {

  @resolve
  private readonly apiService: ApiService;

  async loadMeta (type: string) {
    const result = await this.apiService.get('/seo', { q: type });
    console.log('-----------------------------');
    console.log(result);
    console.log('-----------------------------');
  }
}
