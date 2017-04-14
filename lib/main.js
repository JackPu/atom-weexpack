'use babel';
/**
* atom-weexpack is an atom plugin to build weex(vue) project
* @flow
**/


import fs from 'fs';
import path from 'path';
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
    };
  }
});

let disposables;

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
  console.log(atom.menu.template);
  const index = atom.menu.template.findIndex((item) => {
    return item .role === 'window' || item.role === 'help'
  });

  if (index === -1) {
    const weexpackIndex = atom.menu.findIndex((item) => {
      return item.label === 'Weexpack';
    });
    const menuItem = atom.menu.template.splice(weexpackIndex, 1)[0];
    console.log(menuItem);
  }
  Object.keys(features).forEach((name) => {
    const feature = features[name];
    atom.packages.enablePackage(feature.pkgDirPath);
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
