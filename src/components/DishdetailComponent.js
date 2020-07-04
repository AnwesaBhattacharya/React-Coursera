import React,{ Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Row, Col, Label, Button } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
  constructor(props){
    super(props);

    this.state = {
            isModalOpen: false
        };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
  }

  handleComment(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.authorName, values.comment);

  }

  render() {

    return(
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                      <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                  <Col md={11}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        placeholder="Rating"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         >
                                         <option value="1">1</option>
                                         <option value="2">2</option>
                                         <option value="3">3</option>
                                         <option value="4">4</option>
                                         <option value="5">5</option>
                                      </ Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="authorName" md={4}>Your Name</Label>
                                  <Col md={11}>
                                    <Control.text model=".authorName" id="authorName" name="authorName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".authorName"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                  <Col md={11}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                                        placeholder="Comment"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                          
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    
                    </ModalBody>
        </Modal>

        <Button onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
      </div>

      );

  }
}


    function RenderDish({dish}) {
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

    function RenderComments({comments, addComment, dishId}) {
      const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
      
      if(comments !=null){
        const Comments=comments.map((comment)=>{
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
          {Comments}
          <CommentForm dishId={dishId} addComment={addComment}/>
          </div>
      );
      }
      else 
        return(
          <div></div>
          );
      
    }

    const  DishDetail = (props) => {
      if(props.dish!=null)  
        return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                          addComment={props.addComment}
                          dishId={props.dish.id}
                          />
                    </div>
                </div>
                </div>
            );

      
    }

export default DishDetail;

