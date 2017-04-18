'use babel';

import fs from 'fs';
import path from 'path';

export default {
  // check the folder could initialise weex project
  checkProj(dir) {
    if (fs.existsSync(path)) {
      if (fs.existsSync(path.join(dir, 'src'))) {
        atom.notifications.addError(`Your directory "src" cannot be replaced`);
        return false;
      }
      if (fs.existsSync(path.join(dir, 'package.json'))) {
        atom.notifications.addError(`Your directory cannot be initialized`);
        return false;
      }
    }
    return true;
  },


};
