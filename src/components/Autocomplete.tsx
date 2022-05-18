import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import appStyles from '../appStyles';

interface AutocompleteProps<T> {
  placeholder: string;
  onSelect: (searchString: string, value?: T) => void;
  filterValues: (value: string) => T[];
  displayValue: (value: T) => string;
  displayKey: (value: T) => string;
}

interface AutocompleteState<T> {
  searchString: string;
  hasFocus: boolean;
  selectedValue?: T;
}

class Autocomplete<T> extends Component<AutocompleteProps<T>, AutocompleteState<T>> {
  state: AutocompleteState<T> = {
    searchString: '',
    hasFocus: false,
    selectedValue: undefined,
  };

  styles = StyleSheet.create({
    searchResults: {
      alignItems: 'flex-start',
      backgroundColor: 'white',
    },
    searchBar: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: 'white',
    },
  });

  render() {
    const searchResults = this.props.filterValues(this.state.searchString);

    return (
      <View>
        <View style={this.styles.searchBar}>
          <TextInput
            style={appStyles.userInput}
            onChangeText={(value) => {
              this.setState({ searchString: value });
            }}
            value={this.state.searchString}
            placeholder={this.props.placeholder}
            onFocus={() => this.setState({ hasFocus: true })}
            onBlur={() => this.setState({ hasFocus: false })}
          />
          <Button
            title="🔍"
            onPress={() => {
              this.props.onSelect(this.state.searchString, this.state.selectedValue);
              this.setState({ hasFocus: false });
            }}
          />

        </View>
        <View style={this.styles.searchResults}>
          {
            this.state.hasFocus &&
          searchResults.map((value: T) => {
            return (
              <Button
                key={this.props.displayKey(value)}
                title={this.props.displayValue(value)}
                color='black'
                onPress={() => {
                  this.setState({
                    searchString: this.props.displayValue(value),
                    selectedValue: value,
                  });
                }}
              />
            );
          })
          }
        </View>

      </View>

    );
  }

}

export default Autocomplete;
