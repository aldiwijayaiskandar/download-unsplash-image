import RNFetchBlob from 'rn-fetch-blob';

import {Content, Photo} from '@models';
import {dispatch} from '@utils/redux';
import {setDownloadedPhotoStatus} from '@store';

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

export const setRedownloadImage = (data: Content[]): void => {
  const downloadingTextIndex = data.findIndex(
    x => x.type === 'text' && x.text === 'Downloading',
  );

  for (let i = downloadingTextIndex; i < data.length; i++) {
    if (
      data[i].data &&
      data[i].type === 'photo' &&
      data[i].data?.status === 'downloaded'
    ) {
      // deletePhoto(data[i].data);
      dispatch(
        setDownloadedPhotoStatus({
          id: data[i]?.data?.id ?? '',
          status: 'pending',
        }),
      );
      break;
    }
  }
};

export const setDownloadImageToPending = (data: Content[]): void => {
  const downloadingTextIndex = data.findIndex(
    x => x.type === 'text' && x.text === 'Downloading',
  );

  for (let i = downloadingTextIndex + 3; i < data.length; i++) {
    if (
      data[i].data &&
      data[i].type === 'photo' &&
      data[i].data?.status === 'downloading'
    ) {
      // data[i]?.data?.task.cancel();
      dispatch(
        setDownloadedPhotoStatus({
          id: data[i]?.data?.id ?? '',
          status: 'pending',
        }),
      );
      break;
    }
  }
};

const getImagePath = (name: string) =>
  RNFetchBlob.fs.dirs.PictureDir + '/image_' + name + '.jpg';

export const fetchPhoto = (photo: Photo) =>
  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: 'Download Complete',
      description: 'file description',
      mediaScannable: true,
      path: getImagePath(photo.id),
    },
  }).fetch('GET', photo.downloadUrl, {
    'Cache-Control': 'no-store',
  });

export const deletePhoto = async (photo?: Photo) => {
  if (photo) {
    await RNFetchBlob.fs.unlink(getImagePath(photo.id));
  }
};
