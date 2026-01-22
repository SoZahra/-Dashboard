export const DocumentStatus = {
  PENDING: 'PENDING',
  PROCESSED: 'PROCESSED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type DocumentStatusType = typeof DocumentStatus[keyof typeof DocumentStatus];

export interface Document {
    id: number,
    fileName: string,
    status: DocumentStatusType,
    pageCount: number,
    createdAd: string,
    metadata?: any
}

export interface DocumentStats {
    status: DocumentStatusType,
    total_pages: string | number
}