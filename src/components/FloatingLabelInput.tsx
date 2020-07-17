import React from 'react';
import { View, TextInput, Text, Platform } from 'react-native';

interface Props {
  value: string,
  defaultValue: string,
  placeholderTextColor: string,
  primaryColor: string,
  label: string,
  onChangeText: any,
  noValidation: boolean,
  style: any,
  parentRef: any,
  textContentType: any,
  blurOnSubmit: boolean,
  borderBottomColor: string,
  alwaysEnabled: boolean,
}

export default class FloatingLabelInput extends React.PureComponent<Props> {
  constructor (props: Props) {
    super(props);

    this.hasError = false;
    this.inputVal = '';
  }

  inputVal: string;
  inputRef: any;
  labelRef: any;
  hasError: boolean;
  borderRef: any;
  errorLabelRef: any;

  componentDidMount() {
    if (this.props.value || this.props.defaultValue || this.inputVal) {
      this.inputHasText();
    }

    if (this.props.alwaysEnabled) {
      this.inputFocus({}, true);
    }
  }

  // Implement native props (eg: clear text)
  /* istanbul ignore next */
  setNativeProps = (nativeProps: any) => {
    this.inputRef.setNativeProps(nativeProps);
  }

  inputHasText = () => {
    const color = this.props.placeholderTextColor;

    /* istanbul ignore else */
    if (this.labelRef) this.labelRef.setNativeProps({ style: { color: color, opacity: 1 } });
  }

  inputFocus = (ref: any, standBy?: boolean) => {
    const color = standBy ? this.props.placeholderTextColor : this.props.primaryColor;

    if (!this.inputVal && this.props.defaultValue) this.inputVal = this.props.defaultValue;

    /* istanbul ignore next */
    if (!this.hasError) {
      if (this.borderRef) this.borderRef.setNativeProps({ style: { borderBottomWidth: 2, borderBottomColor: color } });
      if (this.labelRef) this.labelRef.setNativeProps({ style: { color: color, opacity: 1 } });
      if (this.inputRef) this.inputRef.setNativeProps({ placeholder: '' });
    }
  }

  /* istanbul ignore next */
  inputBlur = () => {
    if (!this.hasError) {
      if (this.props.value || this.inputVal) this.inputHasText();
      else {
        if (this.labelRef) this.labelRef.setNativeProps({ style: { opacity: 0 } });
      }

      if (this.borderRef) this.borderRef.setNativeProps({ style: { borderBottomWidth: 1, borderBottomColor: this.props.borderBottomColor } });
      if (this.inputRef) this.inputRef.setNativeProps({ placeholder: this.props.label, text: this.inputVal });
    }
  }

  /* istanbul ignore next */
  focus () {
    this.inputRef.focus();
  }

  /* istanbul ignore next */
  error = (has: boolean, msg: string, color: string) => {
    if (has) {
      this.hasError = true;

      if (this.errorLabelRef) this.errorLabelRef.setNativeProps({ style: { color: color || '#f44336', opacity: 1 }, text: msg });
      if (this.labelRef) this.labelRef.setNativeProps({ style: { opacity: 0 } });
      if (this.borderRef) this.borderRef.setNativeProps({ style: { borderBottomWidth: 2, borderBottomColor: color || '#f44336' } });
    } else {
      this.hasError = false;

      if (this.errorLabelRef) this.errorLabelRef.setNativeProps({ style: { opacity:0 }, text: '' });

      this.inputBlur();
    }
  }

  onChangeText = (text: string = '') => {
    this.inputVal = text;

    /* istanbul ignore else */
    if (this.props && this.props.onChangeText) {
      this.props.onChangeText(this.props.parentRef, text);
    }
  }

  render() {
    return (
      <View style={{ paddingTop: 18 }}>
        <Text
          style={[styles.labelStyle, { color: this.props.placeholderTextColor }]}
          ref={ref => this.labelRef = ref}
        >
           { this.props.label }
        </Text>

        { !this.props.noValidation &&
          <TextInput
            editable={false}
            style={[styles.errorLabelStyle, { opacity: 0, color: this.props.placeholderTextColor }]}
            ref={ref => this.errorLabelRef = ref}
            defaultValue=''
            testID='textInputValidationLabel'
          />
        }

        <TextInput
          {...this.props}
          ref={ref => this.inputRef = ref}
          onChangeText= {this.onChangeText}
          onFocus={this.inputFocus}
          onBlur={this.inputBlur}
          placeholder={this.props.label}
          clearButtonMode='while-editing'
          selectionColor={this.props.primaryColor + '60'}
          style={[this.props.style, styles.textInputStyle]}
        />

        <View ref={ref => this.borderRef = ref} style={[styles.borderStyle, { borderBottomColor: this.props.borderBottomColor }]} />
      </View>
    );
  }

  static defaultProps = {
    primaryColor: '#1976d2',
    defaultValue: '',
    value: '',
    placeholderTextColor: '#aaaaaa',
    label: '',
    onChangeText: () => {},
    noValidation: false,
    style: {},
    parentRef: {},
    textContentType: 'name',
    blurOnSubmit: false,
    borderBottomColor: '#e6e6e6',
    alwaysEnabled: false,
    testID: 'textInput',
  };
}

const styles: any = {
  borderStyle: {
    height: 2,
    width: '98%',
    flex: 1,
    alignSelf: 'center',
    borderBottomWidth: 1,
    marginTop: -7,
    marginBottom: 7,
  },
  textInputStyle: {
    color: '#000',
    zIndex: -9999,
  },
  labelStyle: {
    position: 'absolute',
    left: 5,
    opacity: 0,
    top: 10,
    fontSize: 13,
  },
  errorLabelStyle: {
    position: 'absolute',
    left: Platform.OS === 'android' ? 1 : 5,
    opacity: 0,
    top: Platform.OS === 'android' ? -5 : 10,
    fontSize: 13,
  },
}