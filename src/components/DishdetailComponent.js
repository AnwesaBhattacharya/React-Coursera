import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);

    }

    renderDish(dish) {
        if (dish != null){
          console.log(dish.name)
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else
            return(
                <div></div>
            );
    }

    renderComments(dish){
      const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
      
      if(dish!= null && dish.comments !=null){
        const comments=dish.comments.map((comment)=>{
          var date=new Date(comment.date);
          return(
            <div>
            <ul class="list-unstyled">
              <li>{comment.comment}</li>
              <li>--{comment.author},{monthNames[date.getMonth()]} {("0"+date.getDate()).slice(-2)}, {date.getFullYear()}</li>
              </ul>
            </div>
            );
        })
        return(
          <div>
          <h4>Comments</h4>
          {comments}
          </div>
      );
      }
      else 
        return(
          <div></div>
          );
    }

    render() {
        
      if(this.props.dish!=null)  
        return (
            <div className="row">
                  <div className="col-12 col-md-5 m-1">
                      {this.renderDish(this.props.dish)}
                  </div>
                  <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                  </div>
            </div>
        );
      else 
        return(
          <div></div>
        );
    }
}


export default DishDetail;