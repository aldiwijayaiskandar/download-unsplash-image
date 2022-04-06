import {create} from 'apisauce';

import {Photo} from '@models';

const api = create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'cWeD4a6lxJCHLOmgLRzphu21YNsH71Es9vq9uFP4AAs',
  },
});

export const getPhotos = async (): Promise<Photo[]> => {
  const response = (
    await api.get('photos/', {
      client_id: 'cWeD4a6lxJCHLOmgLRzphu21YNsH71Es9vq9uFP4AAs',
      page: 0,
      per_page: 200,
    })
  ).data as any;

  return response.map((item: any) => ({
    id: item.id,
    description: item.description,
    imageUrl: item.urls.regular,
    downloadUrl: item.links.download,
    progress: 0,
    status: 'pending',
  }));
};
