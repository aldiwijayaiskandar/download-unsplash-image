import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import FlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useSelector} from 'react-redux';

import {color} from '@common';
import {DownloadState, RootState} from '@store';
import {Content} from '@models';
import {DownloadCard} from '@components';

const DownloadScreen = () => {
  const downloadedSelector = useSelector<RootState, DownloadState>(
    state => state.download,
  );

  const onGetDownloadedPhotos = useCallback(
    (): Content[] =>
      downloadedSelector.photos
        .filter(item => item?.status === 'downloaded')
        .map(item => ({
          type: 'photo',
          data: item,
        })),
    [downloadedSelector.photos],
  );

  const onGetDownloadingPhotos = useCallback(
    (): Content[] =>
      downloadedSelector.photos
        .filter(
          item => item?.status === 'downloading' || item?.status === 'pending',
        )
        .map(item => ({
          type: 'photo',
          data: item,
        })),
    [downloadedSelector.photos],
  );

  useEffect(() => {
    setData([
      {
        type: 'text',
        text: 'Downloaded',
      },
      ...onGetDownloadedPhotos(),
      {
        type: 'text',
        text: 'Downloading',
      },
      ...onGetDownloadingPhotos(),
    ]);
  }, [downloadedSelector.photos]);

  const [data, setData] = useState<Content[]>([
    {
      type: 'text',
      text: 'Downloaded',
    },
    ...onGetDownloadedPhotos(),
    {
      type: 'text',
      text: 'Downloading',
    },
    ...onGetDownloadingPhotos(),
  ]);

  const renderItem = ({
    item,
    drag,
    isActive,
    index,
  }: RenderItemParams<Content>) =>
    item.type === 'text' ? (
      <Text
        key={`${item.text}`}
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: color.text,
          marginVertical: 5,
        }}>
        {item.text}
      </Text>
    ) : (
      <ScaleDecorator key={item.data?.id}>
        {item.data && (
          <DownloadCard data={item.data} drag={drag} isActive={isActive} />
        )}
      </ScaleDecorator>
    );

  return (
    <View style={{flex: 1, backgroundColor: color.background, padding: 16}}>
      <FlatList
        keyExtractor={item => `${item.data?.id}`}
        data={data}
        onDragEnd={({data}) => setData(data)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DownloadScreen;
