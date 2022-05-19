import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import appStyles from '../../appStyles';
import { ParkingSpotLocation, parkingTypeName } from '../../database/parkingData';
import parkingDiscussions from '../../database/parkingDiscussionData';
import userInformation, { UserInformation } from '../../database/userData';
import validate from '../../util/validator';

interface DetailPageProps {
  onBack: () => void;
  onDrive: () => void;
  destination: ParkingSpotLocation;
  user: UserInformation;
}

interface DetailPageState {
  comment: string;
  commentError: string;
  scrollView: ScrollView | null;
}

class DetailPage extends Component<DetailPageProps, DetailPageState> {
  state: DetailPageState = {
    comment: '',
    commentError: '',
    scrollView: null,
  };

  styles = StyleSheet.create({
    scrollComments: {
      paddingVertical: 10,
    },
    otherParkingComment: {
      backgroundColor: '#f0f0f0',
      marginTop: 5,
      marginBottom: 5,
      padding: 5,
    },
    myParkingComment: {
      backgroundColor: 'lightblue',
      marginTop: 5,
      marginBottom: 5,
      padding: 5,
    },
    newComment: {
      borderWidth: 1,
    },
  });

  findCommentsByParkingId = (parkingId: number) => {
    return parkingDiscussions.filter(p => p.parkingId === parkingId);
  };

  findUserById = (userId: number) => {
    return userInformation.find(u => u.id === userId);
  };

  isLengthGreaterThanZero = (value: string) => value.length > 0;

  onSaveComment = () => {
    this.setState({ commentError: '' });

    const commentResult = validate(this.state.comment, [
      {
        check: this.isLengthGreaterThanZero,
        errorMsg: "Comment can't be empty",
      },
    ]);

    if(commentResult.isValid) {
      parkingDiscussions.push({
        id: parkingDiscussions.length + 1,
        userId: this.props.user.id,
        parkingId: this.props.destination.id,
        comment: this.state.comment,
        createdAt: new Date(),
      });
      this.setState({ comment: '' });
    } else {
      const [ commentError ] = commentResult.errorMessages;
      this.setState({
        commentError: commentError || '',
      });
    }
  };

  render() {
    const comments = this.findCommentsByParkingId(this.props.destination.id);
    return (
      <View style={appStyles.page}>
        <Text>Name: {this.props.destination.name}</Text>
        <Text>Address: {this.props.destination.address}</Text>
        <Text>Type: {parkingTypeName[ this.props.destination.type ]}</Text>
        <Text>Price:</Text>
        <Text>Duration:</Text>
        <Text>Clearance:</Text>
        <Text>Rating: ⭐️⭐️⭐️⭐️</Text>
        <Text></Text>
        <Text>Discussion:</Text>
        <ScrollView
          contentContainerStyle={this.styles.scrollComments}
          ref={ref => this.setState({ scrollView: ref })}
          onContentSizeChange={() => this.state.scrollView?.scrollToEnd({ animated: true })}
        >
          {
            comments.map(comment => {
              const user = this.findUserById(comment.userId);

              const commentStyle = comment.userId == this.props.user.id
                ? this.styles.myParkingComment
                : this.styles.otherParkingComment;

              return (
                <View key={comment.id} style={commentStyle}>
                  <Text>
                    {user?.firstName} {user?.surname} ({comment.createdAt.toDateString()})
                  </Text>
                  <Text>{comment.comment}</Text>
                </View>
              );
            })
          }
        </ScrollView>

        <View>
          <TextInput
            style={this.styles.newComment}
            multiline={true}
            numberOfLines={4}
            value={this.state.comment}
            placeholder='Leave a comment'
            onChangeText={(text) => this.setState({ comment: text, commentError: '' })}
          />
          {
            this.state.commentError.length > 0 &&
              <Text style={appStyles.validationError}>
                {this.state.commentError}
              </Text>
          }
          <Button title='Add comment' onPress={this.onSaveComment} />
        </View>
        <View style={appStyles.buttonRow}>
          <Button title="Back" onPress={this.props.onBack}/>
          <Button title="Drive" onPress={this.props.onDrive}/>
        </View>
      </View>
    );
  }
}

export default DetailPage;
