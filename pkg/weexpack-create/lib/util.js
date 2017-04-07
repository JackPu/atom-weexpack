
var atomPanel;

module.exports = {
  openModal(props) {
    this._closeDialog();
    const dialogHostElement = document.createElement('div');
    atomPanel = atom.workspace.addModalPanel({ item: dialogHostElement });
    dialogComponent = _reactDom.default.render(_react.default.createElement((_FileDialogComponent || _load_FileDialogComponent()).default, props), dialogHostElement);
  },

  _clsoeModal() {
    if (atomPanel != null) {
      if (dialogComponent != null) {
        _reactDom.default.unmountComponentAtNode(atomPanel.getItem());
        dialogComponent = null;
      }

      atomPanel.destroy();
      atomPanel = null;
    }
  }


}
