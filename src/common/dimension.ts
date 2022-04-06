import {Dimensions} from 'react-native';

const deviceDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export const deviceWidth = deviceDimensions.width;
export const deviceHeight = deviceDimensions.height;

export const screenWidth = screenDimensions.width;
export const screenWidthScale = (ratio: number) => (screenWidth * ratio) / 100;
export const screenHeight = screenDimensions.height;
export const screenHeightScale = (ratio: number) =>
  (screenHeight * ratio) / 100;
