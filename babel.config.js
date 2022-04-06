module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@common': './src/common',
          '@components': './src/components',
          '@config': './src/config',
          '@models': './src/models',
          '@providers': './src/providers',
          '@store': './src/store',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils'
        }
      }
    ],
    'jest-hoist',
    'react-native-reanimated/plugin'
  ]
};
