'use babel';

import fs from 'fs';
import path from 'path';
import { CompositeDisposable } from 'atom';
import weexpackPkg from '../package.json';

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
      label: 'weexpack',
      submenu: [{
        label: `weexpack v ${weexpackPkg.version}`,
        enable: false,
      }],
    }]));
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
