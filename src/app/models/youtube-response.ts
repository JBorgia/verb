export interface YoutubeResponse {
  kind: string;
  etag: string;
  items: ItemEntity[];
  nextPageToken: string;
  pageInfo: PageInfo;
}

export interface ItemEntity {
  kind: string;
  etag: string;
  id: string;
  contentDetails: ContentDetails;
  snippet: Snippet;
}

export interface ContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: any;
  projection: string;
}


export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags?: (string)[] | null;
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage?: string | null;
  defaultLanguage?: string | null;
}

export interface Thumbnails {
  default: ThumbnailResolution;
  medium: ThumbnailResolution;
  high: ThumbnailResolution;
  standard: ThumbnailResolution;
  maxres: ThumbnailResolution;
}

export interface ThumbnailResolution {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}



