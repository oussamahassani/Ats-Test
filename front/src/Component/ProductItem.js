import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import LazyLoad from 'react-lazyload';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Moment from 'react-moment'

import { Link } from 'react-router-dom'




const ProductItem = ({ products: { _id, category, productName, imageUrl,price, createdAt, averageScore } }) => {

  
  const getaverageScore = () => {

   return    <Rating
   name="simple-controlled"
   value={Number(averageScore)}
  
 />
  }




    return (
        <Fragment>
             <Card className="m-3 col-sm-6 col-md-3 ">
      <CardActionArea>
     



<LazyLoad height={150}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="150"
           image={imageUrl ? imageUrl :"/imageload.gif"}
          className="spinner"
          title="Contemplative Reptile"
        />
        </LazyLoad>
        <CardContent>
   
          <Typography gutterBottom variant="h5" component="h2">
          Category : {category}
          </Typography>
          <Typography variant="body2" component="p">
          Product Name : {productName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Price : <span className='text-success'>{price}</span>
          </Typography>
          
          
          <Typography variant="body2" color="textSecondary" component="p">
          Created At :    <Moment format='YYYY/MM/DD'>{createdAt}</Moment>
          </Typography>
          {
            getaverageScore()
           }
       
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link to={`/Single/${_id}`}>
                                    <Button>View Details</Button></Link>
       
      </CardActions>
    </Card>


        </Fragment>

    )
}

ProductItem.propTypes = {
    products: PropTypes.object.isRequired,
}

export default ProductItem
