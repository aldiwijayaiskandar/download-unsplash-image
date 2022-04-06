import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import {color} from '@common';
import {Photo} from '@models';
import {RootState} from '@store';

type DownloadCardProps = {
  drag: () => void;
  isActive: boolean;
  data: Photo;
};

export const DownloadCard = ({drag, isActive, data}: DownloadCardProps) => {
  const downloadDetail = useSelector<RootState, Photo | undefined>(state =>
    state.download.photos.find(photo => photo.id === data.id),
  );

  return (
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: color.header,
        padding: 16,
        borderRadius: 4,
        marginTop: 10,
        borderWidth: 1,
        borderColor: color.border,
      }}>
      <Image
        source={{
          uri: downloadDetail?.imageUrl,
        }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 4,
        }}
      />
      {/* Download Indicator */}
      <View
        style={{
          flex: 1,
          paddingLeft: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: 30,
            borderRadius: 15,
            backgroundColor: color.background,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width:
                downloadDetail?.status === 'downloaded'
                  ? '100%'
                  : `${downloadDetail?.progress ?? 0}%`,
              height: '100%',
              borderRadius: 15,
              backgroundColor: color.border,
            }}></View>
          <Text style={{position: 'absolute', fontSize: 12, color: color.text}}>
            {downloadDetail?.status === 'downloaded'
              ? 'Downloaded'
              : `${data?.progress ?? 0}%`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
