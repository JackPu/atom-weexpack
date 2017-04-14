'use babel'
// weexpakc cerate a project
import React from 'react';
import ReactDom from 'react-dom';
import createPackage from '../../commons-atom/create-package';
import UniversalDisposable from '../../commons-node/UniversalDisposable';
import FileDialog from '../components/file-dialog';


let atomPanel = null;
console.log(FileDialog);
class Activation {
  constructor(rawState) {
    this._didActivateDisposable = atom.packages.onDidActivateInitialPackages(() => {
      this._didActivateDisposable.dispose();
    });
    const self = this;
    this._disposable = new UniversalDisposable(this._didActivateDisposable);
    this._disposable.add(
      atom.commands.add('atom-workspace', {
        'weexpack: cerate': self.create(),
    }));

  }

  create() {
    console.log(1);
    // this._openDialog();
  }

  _openDialog(props) {
    const dialogEle = document.createElement('div');
    atomPanel = atom.workspace.addModalPanel({item: dialogEle});
  }

  _closeDialog() {
    if (atomPanel != null) {
      if (dialogComponent != null) {
        ReactDom.unmountComponentAtNode(atomPanel.getItem());
        dialogComponent = null;
      }

      atomPanel.destroy();
      atomPanel = null;
    }

  }
}
console.log(123);
createPackage(module.exports, Activation);
