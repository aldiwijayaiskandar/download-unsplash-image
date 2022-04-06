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
  const downloadingPhoto = useSelector<RootState, Photo[]>(state =>
    state.download.photos.filter(photo => photo?.status === 'pending'),
  );

  const [photos, setPhotos] = useState<Photo[]>([]);

  // Detect all Pending picture Queue and run the task
  useEffect(() => {
    for (
      let i = 0;
      i < (downloadingPhoto.length > 3 ? 3 : downloadingPhoto.length);
      i++
    ) {
      if (downloadingPhoto[i] && downloadingPhoto[i].progress === 0) {
        if (downloadingPhoto[i].task) {
          downloadingPhoto[i]
            .task()
            .progress((received: number, total: number) => {
              dispatch(
                setDownloadPhotoProgress({
                  id: downloadingPhoto[i].id,
                  progress: (received / total) * 100,
                }),
              );
            })
            .then(() => {
              dispatch(
                setDownloadedPhotoStatus({
                  id: downloadingPhoto[i].id,
                  status: 'downloaded',
                }),
              );
            });
        }
      }
    }
  }, [downloadingPhoto.length]);

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
