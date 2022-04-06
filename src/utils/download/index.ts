import RNFetchBlob from 'rn-fetch-blob';

import {Content, Photo} from '@models';
import {dispatch} from '@utils';
import {setDownloadedPhotoStatus, setDownloadPhotoProgress} from '@store';

export const canBeDragged = (data: Content[]): boolean => {
  let drag = true;
  const downloadingTextIndex = data.findIndex(
    x => x.type === 'text' && x.text === 'Downloading',
  );
  if (data[0].type === 'photo') return false;

  for (let i = 0; i < downloadingTextIndex; i++) {
    if (data[i].type === 'photo' && data[i].data?.status === 'downloading')
      drag = false;
    break;
  }

  return drag;
};

export const fetchPhoto = (photo: Photo) =>
  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: RNFetchBlob.fs.dirs.PictureDir + '/image_' + photo.id + '.jpg',
      description: 'Image',
    },
  }).fetch('GET', photo.downloadUrl);
