import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  MessageSearchResult,
  MessageSearchBody,
} from './message-search-body.interface';
import { IMessage } from '../messages/message.interface';
@Injectable()
export default class MessagesSearchService {
  index = 'messages';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexMessage(message: IMessage) {
    return this.elasticsearchService.index<MessageSearchBody>({
      index: this.index,
      document: {
        message_id: message._id,
        text: message.text,
      },
    });
  }

  async search(text: string): Promise<MessageSearchBody[]> {
    const body = await this.elasticsearchService.search<MessageSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['text'],
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source as unknown as MessageSearchBody);
  }
}
