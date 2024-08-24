export interface MessageSearchBody {
  message_id: string;
  text: string;
}

export interface MessageSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: MessageSearchBody;
    }>;
  };
}
