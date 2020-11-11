/// <reference path="../node_modules/@types/jest/index.d.ts" />

import SoundPlayer from './2.4.soundplayer';
import SoundPlayerConsumer from './2.4.soundplayerconsumer';

jest.mock('./2.4.soundplayer');

test('check class constructor', () => {
  new SoundPlayerConsumer();

  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});
