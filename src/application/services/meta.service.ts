import { Injectable, resolve } from '@reactblog/core/annotations';
import { ApiService } from '@reactblog/ui/services/api.service';

@Injectable
export class MetaService {

  @resolve
  private readonly apiService: ApiService | undefined;

  async loadMeta (type: string) {
    console.log(type);
    await this.apiService.get('/seo/meta');
  }
}
