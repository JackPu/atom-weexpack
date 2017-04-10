// input component
import React from 'react';
import ReactDom from 'react-dom';

const Props = {

};


class Input extends React.Component {
  constuctor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  redner() {
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

}

Input.defaultProps = {

};
export default Input;
