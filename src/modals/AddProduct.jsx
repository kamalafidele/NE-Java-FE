import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from 'moment';

import Modal from "../components/Modal";
import Input from "../components/Input";

import Button from "../components/Button";
import ErrorMessage from '../components/ErrorMessage';
import productsApi from "../api/productsApi";

import ProductsContext from '../contexts/index';
import COLOR_PALETTE from "../constants/colors";
import generateRandomCode from "../utils/generate-code";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Product Name"),
  type: Yup.string().required().label("Product Type"),
  price: Yup.number().required().label("Product Price"),
  image: Yup.string().required().label("Image URL"),
});

function AddProduct({ isOpen, closeModal }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const { products, setProducts } = useContext(ProductsContext);

  const requestClose = () => {
    closeModal();
  }

  const handleAddProduct = async ({  name, type, price, image }) => {
    const code = generateRandomCode();
    const today = new Date();
    const inDate = today;

    setLoading(true);
    const result = await productsApi.addProduct(code, name, type, price, inDate, image);
    setLoading(false);

    console.log(result.data);
    if (!result.ok) return setError(result.data.error || result.data.status || 'Unexpected error occurred!');

    setProducts([...products, result.data ]);
    requestClose();
  };


  return (
    <Modal closeModal={(e) => requestClose() } isOpen={isOpen}>
      <h3 style={{ textAlign: "center", color: COLOR_PALETTE.PRIMARY }}>Add New Product</h3>
      <Formik
        initialValues={{
          name: "",
          type: "",
          price: 0,
          image: ""
        }}
        onSubmit={(values) => handleAddProduct(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
          <div className="inputs-container">
            <div className="row">
              { error && <ErrorMessage text={error}/>}
            </div>
            <div className="row">
              <label htmlFor="name">Product Name</label>
              <Input
                placeHolder={"Product Name"}
                type={"text"}
                width={100}
                onChange={handleChange('name')}
                onBlur={() => setFieldTouched("name")}
              />
              { touched.name && <ErrorMessage text={errors.name}/> }
            </div>
            <div className="row">
              <label htmlFor="type">Product Type</label>
              <Input
                placeHolder={"Product type"}
                type={"text"}
                width={100}
                onChange={handleChange('type')}
                onBlur={() => setFieldTouched("type")}
              />
              { touched.type && <ErrorMessage text={errors.type}/> }
            </div>
            <div className="row">
              <label htmlFor="price">Product Price</label>
              <Input
                placeHolder={"Product price"}
                type={"number"}
                width={100}
                onChange={handleChange('price')}
                onBlur={() => setFieldTouched("price")}
              />
              { touched.price && <ErrorMessage text={errors.price}/> }
            </div>
            <div className="row">
              <label htmlFor="image">Image URL</label>
              <Input
                placeHolder={"Image URL"}
                type={"text"}
                width={100}
                onChange={handleChange('image')}
                onBlur={() => setFieldTouched("image")}
              />
              { touched.image && <ErrorMessage text={errors.image}/> }
            </div>
            {/* <div className="row">
              <label htmlFor="department">Department</label>
              <Select 
              data={departments} 
              onChange={handleChange('department')}
              placeHolder={'Choose Department'}
              width={100}
              onBlur={() => setFieldTouched("department")}
              />
              { touched.department && <ErrorMessage text={errors.department}/> }
            </div>
            <div className="row">
              <label htmlFor="laptop">Laptop</label>
              <Select 
              data={laptops} 
              onChange={handleChange('laptop')}
              placeHolder={'Choose Laptops'}
              width={100}
              onBlur={() => setFieldTouched("laptop")}
              />
              { touched.laptop && <ErrorMessage text={errors.laptop}/> }
            </div> */}

            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                text={ loading ? 'Loading...' : "Add Product" }
                width={50}
                onClick={handleSubmit}
                type={"submit"}
              />
            </div>
          </div>
        )}
      </Formik>
    </Modal>
  );
}

export default AddProduct;
