import {Photo} from '@models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface DownloadState {
  photos: Photo[];
}

const initialState: DownloadState = {
  photos: [],
};

const downloadSlice = createSlice({
  initialState,
  name: 'download',
  reducers: {
    addDownloadedPhoto: (
      state: DownloadState,
      {payload}: PayloadAction<Photo>,
    ) => {
      const findIndex = state.photos.findIndex(item => item.id === payload.id);
      if (findIndex < 0) state.photos = [...state.photos, payload];
    },
    setDownloadedPhotoStatus: (
      state: DownloadState,
      {payload}: PayloadAction<{id: string; status: Photo['status']}>,
    ) => {
      const index = state.photos.findIndex(item => item.id === payload.id);
      state.photos[index] = {
        ...state.photos[index],
        status: payload.status,
      };
    },
    setDownloadPhotoProgress: (
      state: DownloadState,
      {payload}: PayloadAction<{id: string; progress: number}>,
    ) => {
      const index = state.photos.findIndex(item => item.id === payload.id);
      state.photos[index] = {
        ...state.photos[index],
        progress: payload.progress,
      };
    },
  },
});

export const downloadReducer = downloadSlice.reducer;
export const {
  addDownloadedPhoto,
  setDownloadedPhotoStatus,
  setDownloadPhotoProgress,
} = downloadSlice.actions;
