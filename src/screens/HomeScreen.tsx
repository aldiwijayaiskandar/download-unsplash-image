import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {useSelector} from 'react-redux';

import {color} from '@common';
import {Photo} from '@models';
import {getPhotos} from '@services';
import {
  RootState,
  setDownloadedPhotoStatus,
  setDownloadPhotoProgress,
} from '@store';

import {PhotoCard} from '@components';
import {dispatch} from '@utils';

const HomeScreen = () => {
  const pendingPhotos = useSelector<RootState, Photo[]>(state =>
    state.download.photos.filter(
      photo => photo?.status === 'pending' || photo?.status === 'downloading',
    ),
  );

  const downloadingPhotos = useSelector<RootState, Photo[]>(state =>
    state.download.photos.filter(photo => photo?.status === 'downloading'),
  );

  const [photos, setPhotos] = useState<Photo[]>([]);

  // Detect all Pending picture Queue and run the task
  useEffect(() => {
    if (downloadingPhotos.length < 3) {
      for (let i = 0; i < 3 - downloadingPhotos.length; i++) {
        if (pendingPhotos[i]) {
          if (pendingPhotos[i].task) {
            pendingPhotos[i]
              .task()
              .progress({interval: 100}, (received: number, total: number) => {
                console.log('PROGRESS');
                dispatch(
                  setDownloadPhotoProgress({
                    id: pendingPhotos[i].id,
                    progress: (received / total) * 100,
                  }),
                );
              })
              .then(() => {
                dispatch(
                  setDownloadedPhotoStatus({
                    id: pendingPhotos[i].id,
                    status: 'downloaded',
                  }),
                );
              });
          }
        }
      }
    }
  }, [pendingPhotos.length]);

  const onRefresh = async () => {
    try {
      const response = await getPhotos();
      setPhotos(response);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: color.background}}>
      <FlatList
        keyExtractor={item => item.id}
        data={photos}
        numColumns={4}
        renderItem={({item}) => <PhotoCard key={item.id} data={item} />}
        contentContainerStyle={{paddingVertical: 20}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomeScreen;
