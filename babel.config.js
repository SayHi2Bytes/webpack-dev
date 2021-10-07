const plugins = [];

module.exports = function (api) {
  const isDevelopment = api.env() === 'development';

  console.log('Babel api.env() =>', api.env());

  if (isDevelopment) {
    plugins.push('react-refresh/babel');
  }

  return {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: plugins,
  };
};
