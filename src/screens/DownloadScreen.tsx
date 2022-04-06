import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import FlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {useSelector} from 'react-redux';

import {color} from '@common';
import {DownloadState, RootState, setPhotoArrangement} from '@store';
import {Content} from '@models';
import {DownloadCard} from '@components';
import {
  canBeDragged,
  dispatch,
  setDownloadImageToPending,
  setRedownloadImage,
} from '@utils';

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
    /* Setting the data to content */
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

  const [data, setData] = useState<Content[]>([]);

  const renderItem = ({item, drag, isActive}: RenderItemParams<Content>) =>
    item.type === 'text' ? (
      // the text is not putted inside a ScaleDecorator and not calling drag to make it unDraggabe
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
        onDragEnd={({data}) => {
          /* 
              Checking if the card can be dragged 
              Note:
              - if card can be dragged then arrange photos in redux ( it will automatically change the state above)
              - then check if the dragged card is change to pending
              - then check if the dragged card is redownloading needed
          */
          if (canBeDragged(data)) {
            dispatch(
              setPhotoArrangement(
                data.filter(x => x.type === 'photo').map(item => item.data),
              ),
            );
            setDownloadImageToPending(data);
            setRedownloadImage(data);
          }
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DownloadScreen;
