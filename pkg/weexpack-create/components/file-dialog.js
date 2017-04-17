'use babel';
/** new file dialog
* 20170407
**/


import React from 'react';
import ReactDom from 'react-dom';
import UniversalDisposable from '../../commons-node/UniversalDisposable';
import AtomInput from '../../weexpack-ui/input';

export default class FileDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 123,
    };
    this._disposable = new UniversalDisposable();
    this._confirm = this._confirm.bind(this);
    this._close = this._close.bind(this);
    this._handleDocumentMouseDown = this._handleDocumentMouseDown.bind(this);
  }

  componentDidMount() {
    const input = this.refs.input;
    this._disposable.add(ReactDOM.findDOMNode(input), {
      'core:confirm': this._confirm,
      'core:close': this._close
    })
    document.addEventListener('mousedown', this._handleDocumentMouseDown)
  }

  render() {
    return (
      <div className="tree-view-dialog" ref="dialog">
        <label>{this.props.message}</label>
        <AtomInput
         initialValue={this.props.initialValue}
         ref="input"
        />
      </div>
    );
  }

  _handleDocumentMouseDown(event) {
    const dialog = this.refs.dialog;
    if (event.target !== dialog && !dialog.contains(event.target)) {
      this._close();
    }
  }

  _confirm() {
    this.props.onConfirm(this.refs.input.getVal(), this.state.options);
    this._close();
  }

  _close() {
    if (!this._isClosed) {
      this._isClosed = true;
      this.props.onClose();
    }
  }


}
