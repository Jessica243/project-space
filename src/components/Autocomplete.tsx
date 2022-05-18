import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, StyleSheet, TextInput, View, StyleProp, ViewStyle, Dimensions, TouchableWithoutFeedback } from 'react-native';

interface AutocompleteProps<T> {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
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
    searchResultsButton: {
      fontSize: 12,
      padding: 10,
    },
    searchBar: {
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    searchIcon: {
      right: 0,
    },
    searchText: {
      padding: 10,
      width: Dimensions.get('window').width - 135,
    },
  });

  onSubmit = () => {
    this.props.onSelect(this.state.searchString, this.state.selectedValue);
    this.setState({ hasFocus: false, selectedValue: undefined });
  };

  render() {
    const searchResults = this.props.filterValues(this.state.searchString);
    return (
      <View style={this.props.style}>
        <View style={this.styles.searchBar}>
          <TextInput
            style={this.styles.searchText}
            onChangeText={(value) => {
              this.setState({ searchString: value });
            }}
            value={this.state.searchString}
            placeholder={this.props.placeholder}
            onKeyPress={() => {
              this.setState({ hasFocus: true });
            }}
            onBlur={() => this.setState({ hasFocus: false })}
          />
          <View>
            <Button
              title="🔍"
              onPress={() => this.onSubmit()}
            />
          </View>
        </View>
        <View style={this.styles.searchResults}>
          {
            this.state.hasFocus &&
            searchResults.map((value: T) => {
              return (
                <TouchableWithoutFeedback
                  key={this.props.displayKey(value)}
                  onPress={() => {
                    this.setState({
                      searchString: this.props.displayValue(value),
                      selectedValue: value,
                      hasFocus: false,
                    });
                  }}
                >
                  <Text style={this.styles.searchResultsButton}>
                    {this.props.displayValue(value)}
                  </Text>
                </TouchableWithoutFeedback>
              );
            })
          }
        </View>

      </View>

    );
  }

}

export default Autocomplete;
