import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { makePostProduct } from '../../../redux/slices/product-slice/ProductPostSlice'; 
import { makeEditProduct } from '../../../redux/slices/product-slice/ProductEditSlice';
import './ProductCreateForm.scss'
import { fetchProductSingleRequest } from '../../../redux/slices/product-slice/ProductGetSingleSlice';

const ProductCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { loading: postLoading, success, error: postError } = useSelector((state) => state.productPost);
  const { product, loading: singleLoading, error: singleError } = useSelector((state) => state.productGetSingle);
  

  const [initialValues, setInitialValues] = useState({
    image: '',
    name: '',
    productID: '',
    description: '',
    productVolume: '',
    mrpPriceCustomer: '',
    adoPrice: '',
    mdPrice: '',
    sdPrice: '',
    distributorPrice: '',
    autoUpdate: false,
    activateStatus: false,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductSingleRequest(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setInitialValues(product);
    }
  }, [product]);

  const validationSchema = Yup.object({
    image: Yup.string().required('Product Image is required'),
    name: Yup.string().required('Product Name is required'),
    productID: Yup.string().required('Product ID is required'),
    description: Yup.string(),
    productVolume: Yup.string().required('Product Volume is required'),
    mrpPriceCustomer: Yup.number().required('MRP Price is required').positive('Must be a positive number'),
    adoPrice: Yup.number().required('ADO Price is required').positive('Must be a positive number'),
    mdPrice: Yup.number().required('MD Price is required').positive('Must be a positive number'),
    sdPrice: Yup.number().required('SD Price is required').positive('Must be a positive number'),
    distributorPrice: Yup.number().required('Distributor Price is required').positive('Must be a positive number'),
    autoUpdate: Yup.boolean(),
    activateStatus: Yup.boolean().required('Activate Status is required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (id) {
        /* Dispatch edit product action */
        await dispatch(makeEditProduct({ ...values, id }));
        navigate('/dashboard/products');
      } else {
        /* Dispatch create product action */
        await dispatch(makePostProduct(values));
        navigate('/dashboard/products');
      }

      /* Optionally reset the form or handle the response */
      resetForm();
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (success) {
      /* Handle success scenario if needed */
      console.log('Product created/updated successfully');
    }
  }, [success]);

  if (postLoading || singleLoading) return <div>Loading...</div>;
  if (postError) return <div>Error: {postError}</div>;
  if (singleError) return <div>Error: {singleError}</div>;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form-container">
        <Container>
          <div className="form-grid-group">
            <div className="product_group">
              <div className="form-group">Products Details:</div>

              <div className="form-group">
                <label htmlFor="image">Add Image*</label>
                <Field type="text" id="image" name="image" placeholder="Enter image URL" />
                <ErrorMessage name="image" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="name">Product Name*</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="productID">Product ID*</label>
                <Field type="text" id="productID" name="productID" />
                <ErrorMessage name="productID" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field as="textarea" id="description" name="description" />
                <ErrorMessage name="description" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="productVolume">Product Volume*</label>
                <Field type="text" id="productVolume" name="productVolume" placeholder="e.g., 200 ml, 500 ml, 1 Litre" />
                <ErrorMessage name="productVolume" component="div" className="error-message" />
              </div>
            </div>

            {/* Price group */}
            <div className='price_group'>
              <div className="form-group">Pricing Details:</div>

              <div className="form-group">
                <label htmlFor="mrpPriceCustomer">MRP Price (Customer)*</label>
                <Field type="number" id="mrpPriceCustomer" name="mrpPriceCustomer" />
                <ErrorMessage name="mrpPriceCustomer" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="adoPrice">ADO Price*</label>
                <Field type="number" id="adoPrice" name="adoPrice" />
                <ErrorMessage name="adoPrice" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="mdPrice">MD Price*</label>
                <Field type="number" id="mdPrice" name="mdPrice" />
                <ErrorMessage name="mdPrice" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="sdPrice">SD Price*</label>
                <Field type="number" id="sdPrice" name="sdPrice" />
                <ErrorMessage name="sdPrice" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="distributorPrice">Distributor Price*</label>
                <Field type="number" id="distributorPrice" name="distributorPrice" />
                <ErrorMessage name="distributorPrice" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="autoUpdate">Auto Update</label>
                <Field type="checkbox" id="autoUpdate" name="autoUpdate" />
              </div>

              <div className="form-group">
                <label htmlFor="activateStatus">Activate Status*</label>
                <Field type="checkbox" id="activateStatus" name="activateStatus" />
                <ErrorMessage name="activateStatus" component="div" className="error-message" />
              </div>

              <Button
                sx={{
                  background: 'linear-gradient(90deg, #01C572 100%, #187E53 100%)',
                  color: '#fff',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #187E53 100%, #01C572 100%)',
                  },
                }}
                type="submit"
              >
                {id ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </div>
        </Container>
      </Form>
    </Formik>
  );
};

export default ProductCreateForm;
