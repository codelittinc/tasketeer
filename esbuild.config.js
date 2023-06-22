const cssModulesPlugin = require('esbuild-css-modules-plugin');
const esbuild = require('esbuild');

const envPlugin = {
  name: 'env',
  setup(envBuild) {
    // Intercept import paths called "env" so esbuild doesn't attempt
    // to map them to a file system location. Tag them with the "env-ns"
    // namespace to reserve them for this plugin.
    envBuild.onResolve({ filter: /^env$/ }, (args) => ({
      path: args.path,
      namespace: 'env-ns',
    }));

    // Load paths tagged with the "env-ns" namespace and behave as if
    // they point to a JSON file containing the environment variables.
    envBuild.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }));
  },
};

async function build(args) {
  const context = await esbuild.context({
    entryPoints: ['app/javascript/application.js'],
    logLevel: 'info',
    bundle: true,
    minify: args && args.includes('--production'),
    publicPath: 'assets',
    outfile: 'app/assets/builds/app.js',
    plugins: [cssModulesPlugin(), envPlugin],
    loader: {
      '.js': 'jsx',
      '.png': 'dataurl',
      '.woff': 'dataurl',
      '.woff2': 'dataurl',
      '.eot': 'dataurl',
      '.ttf': 'dataurl',
      '.svg': 'dataurl',
      '.otf': 'dataurl',
    },
  });

  if (args && args.includes('--watch')) {
    return context.watch();
  }

  await context.rebuild();
  await context.dispose();
}

build(process.argv.slice(2))
  .then(() => { console.log('Build succeeded.'); })
  .catch((e) => {
    console.log('Error building:', e.message);
    process.exit(1);
  });
