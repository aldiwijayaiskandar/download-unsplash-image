import React from 'react';
import {Image, Pressable} from 'react-native';

import {Photo} from '@models';
import {screenWidthScale} from '@common';
import {dispatch, fetchPhoto} from '@utils';
import {addDownloadedPhoto, setDownloadedPhotoStatus} from '@store';

type PhotoCardProps = {
  data: Photo;
};

const imageWidth = screenWidthScale(25) - 5;

export const PhotoCard = ({data}: PhotoCardProps) => {
  return (
    <Pressable
      onPress={() => {
        let task = () => fetchPhoto(data);

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
