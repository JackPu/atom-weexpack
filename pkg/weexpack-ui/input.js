// input component
import React from 'react';
import ReactDom from 'react-dom';

const Prpos = {

};


export default class Input extend React.Component {
  props: {

  }

  state: {
    value: '',
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
