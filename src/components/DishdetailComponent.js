import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



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

    function RenderComments({dish}) {
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );

      
    }

export default DishDetail;

