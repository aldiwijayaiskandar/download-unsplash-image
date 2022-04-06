export interface Photo {
  id: string;
  imageUrl: string;
  description: string;
  downloadUrl: string;
  task?: any;
  progress: number;
  status: 'pending' | 'downloading' | 'downloaded';
}
