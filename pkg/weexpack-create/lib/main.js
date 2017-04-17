'use babel'
// weexpakc cerate a project
import React from 'react';
import ReactDOM from 'react-dom';
import createPackage from '../../commons-atom/create-package';
import UniversalDisposable from '../../commons-node/UniversalDisposable';
import FileDialog from '../components/file-dialog';

let atomPanel = null;
let dialogComponent = null;
class Activation {
  constructor(rawState) {
    this._didActivateDisposable = atom.packages.onDidActivateInitialPackages(() => {
      this._didActivateDisposable.dispose();
    });
    const self = this;
    this._disposable = new UniversalDisposable(this._didActivateDisposable);
    this._disposable.add(
      atom.commands.add('atom-workspace', {
        'weexpack-create: createVue': () => this.createVue(),
        'weexpack-create: createWeex': () => this.createWeex()
    }));

  }

  createVue() {
    this.create('vue');
  }

  createWeex() {
    this.create('weex');
  }

  create(fileType) {
    this._openDialog({
      message: 'Enter the path:',
      onConfirm: (path) => {
        console.log(path);
      },
      onClose: () => {
        this._closeDialog();
      }
    });
  }

  _openDialog(props) {
    this._closeDialog();
    const dialogEle = document.createElement('div');
    atomPanel = atom.workspace.addModalPanel({item: dialogEle});
    dialogComponent = ReactDOM.render(
      <FileDialog {...props} />,
      dialogEle,
    );
  }

  _closeDialog() {
    if (atomPanel != null) {
      if (dialogComponent != null) {
        ReactDOM.unmountComponentAtNode(atomPanel.getItem());
        dialogComponent = null;
      }
      atomPanel.destroy();
      atomPanel = null;
    }
  }
}

createPackage(module.exports, Activation);
