import {Content} from '@models';

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
