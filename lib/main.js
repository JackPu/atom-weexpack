'use babel';
/**
* atom-weexpack is an atom plugin to build weex(vue) project
* @flow
**/

require('./load-dependence.js');
import fs from 'fs';
import path from 'path';
import invariant from 'assert';
import { CompositeDisposable } from 'atom';
import weexpackPkg from '../package.json';

atom.deserializers.add({
  name: 'weexpack.forceLoadModules',
  deserialize() {},
});

const pkgBasicPath = path.join(__dirname, '../pkg');
const features = {};
fs.readdirSync(pkgBasicPath).forEach((item) => {
  if (item.indexOf('.') >= 0) {
    return;
  }
  const pkgDirPath = path.join(pkgBasicPath, item);
  const pkgFile = path.join(pkgBasicPath, item, 'package.json');
  const stat = fs.statSync(pkgDirPath);

  if (stat.isFile()) {
    return;
  }

  const src = fs.readFileSync(pkgFile);
  const pkg = JSON.parse(src);
  if (pkg.name) {
    features[pkg.name] = {
      pkg,
      pkgDirPath,
      useKeyPath: `weexpack.use.${pkg.name}`,
    };
  }
});

let disposables;

// load package
let initialLoadDisposable = atom.packages.onDidLoadPackage(pack => {
  if (pack.name !== 'weexpack') { return; }
  console.log(pack);
  Object.keys(features).forEach(name => {
    const feature = features[name];
    const _enabled = atom.config.get(feature.useKeyPath);
    if (_enabled) {
      atom.packages.loadPackage(feature.pkgDirPath);
    }
  });

  invariant(initialLoadDisposable != null);
  initialLoadDisposable.dispose();
  initialLoadDisposable = null;
});

export function activate() {
  const weexpack = atom.packages.getLoadedPackages('weexpack');
  if (!weexpack) {
    return;
  }
  disposables = new CompositeDisposable();
  disposables.add(
    atom.menu.add([{
      label: 'Weexpack',
      submenu: [{
        label: `weexpack v ${weexpackPkg.version}`,
        enabled: false,
      }],
    }]
  ));
  // find the right position to insert the menu
  const insertIndex = atom.menu.template.findIndex((item) => {
    return item .role === 'window' || item.role === 'help'
  });

  if (insertIndex !== -1) {
    const weexpackIndex = atom.menu.template.findIndex((item) => {
      return item.label === 'Weexpack';
    });
    const menuItem = atom.menu.template.splice(weexpackIndex, 1)[0];
    const newIndex = insertIndex > insertIndex ? insertIndex - 1 : insertIndex;
    atom.menu.template.splice(newIndex, 0 , menuItem);
    atom.menu.update();
  }
  Object.keys(features).forEach((name) => {
    const feature = features[name];
    if (name.indexOf('weexpack') > -1) {
      atom.packages.activatePackage(feature.pkgDirPath);
    }
  });
  // Watch the config to manage toggling features
  Object.keys(features).forEach((name) => {
    const feature = features[name];
    const watcher = atom.config.onDidChange(feature.useKeyPath, event => {
      if (event.newValue === true) {
        atom.packages.activatePackage(feature.pkgDirPath);
      } else if (event.newValue === false) {
        try {
          const pkg = atom.packages.getLoadedPackages(name);
          if (pkg) {
            atom.packages.deactiveatePackage(name);
          }
        } catch (ew) {
          console.error(`Error: cnnot load ${name}`);
        }
      }
    });
    invariant(disposables != null);
    disposables.add(watcher);
  });
}



export function deactiveate() {
  Object.keys(features).forEach((name) => {
    try {
      const pkg = atom.packages.getLoadedPackages(name);
      if (pkg) {
        atom.packages.deactiveatePackage(name);
      }
    } catch (ew) {
      console.error(`Error: cnnot load ${name}`);
    }
  });
  if (disposables) {
    disposables.dispose();
    disposables = null;
  }
}

export function serialize() {
  Object.keys(features).forEach((name) => {
    try {
      const pkg = atom.packages.getLoadedPackages(name);
      if (pkg) {
        atom.packages.serializePackage(pkg);
      }
    } catch (ew) {
      console.error(`Error not found package ${name}`);
    }
  });
}
