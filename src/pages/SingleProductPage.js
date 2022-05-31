import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  //to fetch the id for adding it to the url in order to navigate to single product.
  const {id} = useParams()
  //To redirect the current page to a given destination if error is enconterd.
  //useHistory() now updated to UseNavigate() in latest react update
  const navigate = useNavigate()
  //destructuring
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext()

  useEffect(() => {
    //we are combining url with id so that we could navigate to single product with given id
    fetchSingleProduct(`${url}${id}`)
  },[id])

  //using setTimeout we set an interval of 3sec and after that using UseNavigate() it redirects to homepage.
  useEffect(() => {
    if(error) {
      setTimeout(() => {
        navigate('/')
      },3000)
    }
  },[error])

  if(loading){
    return <Loading />
  }
  if(error){
    return <Error />
  }

  const {
    name,
    price, 
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product
  return (
    <Wrapper>
      <PageHero title={name} product/>
      <div className='section section-center page'>
        <Link to='/products' className='btn'>back to products</Link>
        <div className='product-center'>
          <ProductImages images={images}/>
          <section className='content'>
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews}/>
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available : </span>
              {stock>0? 'In stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU : </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand : </span>
              {company}
            </p>
            <hr /> 
            {stock > 0 && <AddToCart />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
