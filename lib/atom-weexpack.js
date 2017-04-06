'use babel';

import AtomWeexpackView from './atom-weexpack-view';
import { CompositeDisposable } from 'atom';

export default {

  atomWeexpackView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomWeexpackView = new AtomWeexpackView(state.atomWeexpackViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomWeexpackView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-weexpack:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomWeexpackView.destroy();
  },

  serialize() {
    return {
      atomWeexpackViewState: this.atomWeexpackView.serialize()
    };
  },

  toggle() {
    console.log('AtomWeexpack was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
