export interface YoutubeResponse {
  kind: string;
  etag: string;
  items?: (ItemsEntity)[] | null;
  nextPageToken: string;
  pageInfo: PageInfo;
}

export interface ItemsEntity {
  kind: string;
  etag: string;
  id: string;
  contentDetails: ContentDetails;
}

export interface ContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: ContentRating;
  projection: string;
}

export interface ContentRating {}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
