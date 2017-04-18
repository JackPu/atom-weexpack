'use babel';
// input component
import React from 'react';
import ReactDOM from 'react-dom';
import { maybeToString } from '../commons-node/string';
import classNames from 'classnames';
import UniversalDisposable from '../commons-node/UniversalDisposable'

const Props = {

};


class Input extends React.Component {
  constructor(props) {
    super(props);
    const value = props.initialValue ? props.initialValue: '';
    this.state = {
      value
    };
  }

  componentDidMount() {
    const disposable = this._disposable = new UniversalDisposable();
    const textEditor = this.getTextEditor();
    const inputEle = this.getInputElement();

    disposable.add(
      atom.commands.add(inputEle,
        {
          'core:confirm': () => {
            if (typeof this.props.onConfirm === 'function') {
              this.props.onConfirm();
            }
          },
          'core:close': () => {
            if (typeof this.props.onClose === 'function') {
              this.props.onClose();
            }
          }
        }
      )
    );
    this.setVal(this.state.value);
    disposable.add(textEditor.onDidChange(() => {
      this.setState({
        value: textEditor.getText()
      });
      this.props.onDidChange.call(null, textEditor.getText());
    }));

  }

  render() {
    const className = classNames(this.props.className, {
      'atom-text-editor-unstyled': this.props.unstyled,
      [`atom-text-editor-${maybeToString(this.props.size)}`]: (this.props.size != null),
    });
    return (
      <atom-text-editor
        class={className}
        mini
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      />
    );
  }

  setVal(val) {
    this.getTextEditor().setText(val);
  }

  getVal() {
    return this.state.value;
  }

  getTextEditor() {
    return this.getInputElement().getModel();
  }

  getInputElement() {
    return ReactDOM.findDOMNode(this);
  }

  onDidChange(callback) {
    return this.getTextEditor().onDidChange(callback);
  }

}

Input.defaultProps = {
  onDidChange: function() {},
  value: ''
};
export default Input;
