'use babel'
// weexpakc cerate a project
import React from 'react';
import ReactDom from 'react-dom';
import createPackage from '../../commons-atom';
import UniversalDisposable from '../../commons-node/UniversalDisposable';
import FileDialog from '../components/file-dialog';

const weexpackCreate = require('weexpack-create');
let atomPanel = null;

class Activation() {
  constructor(rawState) {
    this._disposable = new UniversalDisposable();
    this._disposable.add(atom.commands.add('atom-workspace', {
      'weexpack: cerate': this.create(),
    }));

  }

  create() {

  }

  _openDialog(props) {
    const dialogEle = document.createElement('div');
    atomPanel = atom.workspace.addModalPanel({item: dialogEle});
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
