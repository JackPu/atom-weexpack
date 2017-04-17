'use babel';
// input component
import React from 'react';
import ReactDOM from 'react-dom';
import { maybeToString } from '../commons-node/string';
import classNames from 'classnames';

const Props = {

};


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
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
    return this.state.val;
  }

  getTextEditor() {
    return this.getInputElement().getModel();
  }

  getInputElement() {
    return ReactDOM.findDOMNode(this);
  }

}

Input.defaultProps = {

};
export default Input;
