import { Injectable } from '@nestjs/common';

@Injectable()
export class PageService {
  async createPage() {
    return 'create page in service';
  }
}
