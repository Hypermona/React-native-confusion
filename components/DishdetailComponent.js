import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, Modal, Button } from "react-native";
import { Card, Icon, Rating, Input, AirbnbRating } from "react-native-elements";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comment";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon
            raised
            // reverse
            name={props.favorites ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorites ? alert("Already favorite") : props.onPress()
            }
          />
          <Icon
            raised
            // reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.toggleModal()}
          />
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
}
function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        {/* <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text> */}
        <Rating
          imageSize={15}
          readonly
          startingValue={item.rating}
          style={{ alignItems: "flex-start", paddingVertical: 5 }}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}
        </Text>
      </View>
    );
  };
  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 3,
      author: "",
      comment: "",
    };
  }
  handleComment(dishId) {
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  MarkFavoriteDish(dishId) {
    this.props.postFavorite(dishId);
  }
  render() {
    const { dishId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[dishId]}
          favorites={this.props.favorites.some((e) => e === dishId)}
          onPress={() => this.MarkFavoriteDish(dishId)}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          visible={this.state.showModal}
          animationType={"slide"}
          transparent={false}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={{ padding: 20 }}>
            <Rating
              fractions="{1}"
              startingValue="{3.3}"
              showRating
              onFinishRating={(rat) => this.setState({ rating: rat })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              label="Username"
              placeholder="Your name"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={(value) => this.setState({ author: value })}
            />
            <Input
              label="Comment"
              placeholder="Your comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              onChangeText={(value) => this.setState({ comment: value })}
            />
            <Button
              onPress={() => {
                this.handleComment(dishId);
                this.toggleModal();
              }}
              color="#512DA8"
              title="Add Comment"
            />
            <View style={{ height: 10 }}></View>
            <Button
              onPress={() => {
                this.toggleModal();
              }}
              color="#6c757d"
              title="Close"
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
