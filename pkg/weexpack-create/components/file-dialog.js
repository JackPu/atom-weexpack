'use babel';
/** new file dialog
* 20170407
**/


import React from 'react';
import ReactDom from 'react-dom';

import AtomInput from '../../weexpack-ui/input';

export default class FileDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 123,
    };
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

  _confirm() {
    this.props.onConfirm(this.refs.input.getText(), this.state.options);
    this._close();
  }

  _close() {
    if (!this._isClosed) {
      this._isClosed = true;
      this.props.onClose();
    }
  }


}
