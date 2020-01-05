import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

export default class SearchButton extends React.Component {
  
  constructor(props) {
    super(props);
    this.buttonPressed = this.buttonPressed.bind(this);
    this.state = {
      buttonPressed: false,
      sendButtonPressedState: props.sendButtonPressedState,
      backgroundColor: '#fff',
      textColor: '#000'
    }
  }

  componentWillReceiveProps(props) {
    if (props.permissionToEnableSearchButton && this.state.permissionToEnableSearchButton === false) {
      let buttonRef = this.state.buttonRef;
      buttonRef.disabled = false;

      if (this.state.buttonPressed) {
        props.sendButtonPressedState(false)
      }

      this.setState({
        backgroundColor: '#fff',
        textColor: '#000',
        buttonRef: buttonRef,
        buttonPressed: false,
        permissionToEnableSearchButton: true
      });
    }
   
    this.setState({
      sendButtonPressedState: props.sendButtonPressedState,
    });
  }

  buttonPressed(buttonRef) {

    if (this.state.buttonRef === undefined || this.state.buttonRef.disabled === false) {
      buttonRef.disabled = true;

      this.setState({
        buttonPressed: true,
        permissionToEnableSearchButton: false,
        buttonRef: buttonRef,
        backgroundColor: '#ddd',
        textColor: '#aaa'
      });

      this.state.sendButtonPressedState(true);
    }
  }

  render() {
    return(
      <TouchableOpacity
        disabled={false}
        style={[styles.button,
               {backgroundColor: this.state.backgroundColor}
        ]}
        ref={button => buttonRef = button}
        onPress={() => this.buttonPressed(buttonRef)}
      >
        <Text
          style={
            {color: this.state.textColor}
          }
        >
          Aloita haku
        </Text>
      </TouchableOpacity>
    )
  }
}

const screenDimensions = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height
}

const styles = StyleSheet.create({
  button: {
    marginLeft: screenDimensions.width - 110,
    marginTop: 50,
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});