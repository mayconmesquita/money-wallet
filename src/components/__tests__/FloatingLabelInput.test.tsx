import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import FloatingLabelInput from '../FloatingLabelInput';

describe('FloatingLabelInput', () => {
  const defaultValue = 'DefaultValue';

  test('should have default onChangeText function', () => {
    const onChangeText = FloatingLabelInput.defaultProps.onChangeText;

    expect(onChangeText).toBeDefined();
    expect(onChangeText()).toBe(undefined);
  });

  test('should have default value', () => {
    const { getByTestId } = render(
      <FloatingLabelInput
        defaultValue={defaultValue}
        alwaysEnabled={true}
      />
    );

    const textInput = getByTestId('textInput');

    expect(textInput.props.defaultValue).toBe(defaultValue);
  });

  test('should create inner RN TextInput', () => {
    const { getByTestId } = render(
      <FloatingLabelInput />
    );

    const textInput = getByTestId('textInput');

    expect(textInput).toBeDefined();
  });

  test('change text should callback', () => {
    const onChangeHandler = jest.fn();

    const { getByTestId } = render(
      <FloatingLabelInput
        onChangeText={onChangeHandler}
      />
    );

    const textInput = getByTestId('textInput');
    const newValue = 'New Text Value';

    fireEvent.changeText(textInput, newValue);

    expect(onChangeHandler).toHaveBeenCalledWith({}, newValue);
  });
});
