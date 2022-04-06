import React from 'react';
import {Image, Pressable} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {Photo} from '@models';
import {screenWidthScale} from '@common';
import {dispatch} from '@utils';
import {
  addDownloadedPhoto,
  setDownloadedPhotoStatus,
  setDownloadPhotoProgress,
} from '@store';

type PhotoCardProps = {
  data: Photo;
};

const imageWidth = screenWidthScale(25) - 5;

export const PhotoCard = ({data}: PhotoCardProps) => {
  return (
    <Pressable
      onPress={() => {
        let dirs = RNFetchBlob.fs.dirs;
        let task = () => {
          dispatch(
            setDownloadedPhotoStatus({
              id: data.id,
              status: 'downloading',
            }),
          );
          return RNFetchBlob.config({
            // response data will be saved to this path if it has access right.
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path: dirs.PictureDir + '/image_' + data.id + '.jpg',
              description: 'Image',
            },
          })
            .fetch('GET', data.downloadUrl)
            .progress((received, total) => {
              dispatch(
                setDownloadPhotoProgress({
                  id: data.id,
                  progress: (received / total) * 100,
                }),
              );
            })
            .then(() => {
              console.log('Done');
              dispatch(
                setDownloadedPhotoStatus({
                  id: data.id,
                  status: 'downloaded',
                }),
              );
            });
        };

        dispatch(
          addDownloadedPhoto({
            ...data,
            task,
          }),
        );
      }}>
      <Image
        key={data.id}
        source={{
          uri: data.imageUrl,
        }}
        style={{
          width: imageWidth,
          aspectRatio: 1,
          marginHorizontal: 2.5,
          marginVertical: 2.5,
          borderRadius: 4,
        }}
      />
    </Pressable>
  );
};
