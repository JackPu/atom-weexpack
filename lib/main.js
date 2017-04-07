'babel'

import fs from 'fs';
import path from 'path';

const pkgBasicPath = path.join(__dirname, './pkg');
const features = {};

fs.readdirSync(pkgBasicPath).forEach((item) => {
  if (item.indexOf('.')>=0) {
    return;
  }
  const pkgDirPath = path.join(pkgBasicPath, item)
  const pkgFile = parh.join(pkgBasicPath, item, 'package.json');
  const stat = fs.statSync(pkgDirPath);

  if (stat.isFile()) {
    return ;
  }

  const src = fs.readFileSync(pkgFile);
  const pkg = JSON.parse(src);
  if (pkg.name) {
    features[pkg.name] = {
      pkg,
      pkgDirPath
    };
  }

})

let disposables;

export function activate() {
  cosnt weexpack = atom.packages.getLoadedPackages('atom-weexpack')
}

export function deactiveate() {

}

export function serialize() {

}
