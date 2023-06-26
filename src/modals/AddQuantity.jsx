import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Modal from "../components/Modal";
import Input from "../components/Input";

import Button from "../components/Button";
import Select from "../components/Select";
import ErrorMessage from '../components/ErrorMessage';
import productsApi from "../api/productsApi";
import quantitiesApi from "../api/quantitiesApi";

import COLOR_PALETTE from "../constants/colors";
import QuantityContext from "../contexts/quantity";

const validationSchema = Yup.object().shape({
  operation: Yup.string().required().label("Operation"),
  quantity: Yup.number().required().label("Quantity Number"),
  product: Yup.string().required().label("Product"),
});

function AddQuantity({ isOpen, closeModal }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);


  const { quantities, setQuantities } = useContext(QuantityContext);

  const requestClose = () => {
    closeModal();
  }

  const handleAddQuantity = async ({  operation, quantity, product }) => {
    const date = new Date();

    setLoading(true);
    const result = await quantitiesApi.addQuantity(operation, quantity, product, date);
    setLoading(false);

    if (!result.ok) return setError(result.data.error || result.data.status || 'Unexpected error occurred!');

    setQuantities([...quantities, result.data ]);
    requestClose();
  };

  const fetchProducts = async () => {
    const result = await productsApi.getAllProducts();
    setProducts(result.data);
  }

  useEffect(() => {
    fetchProducts();
  })

  return (
    <Modal closeModal={(e) => requestClose() } isOpen={isOpen}>
      <h3 style={{ textAlign: "center", color: COLOR_PALETTE.PRIMARY }}>Add New Product Quantity</h3>
      <Formik
        initialValues={{
          operation: "",
          quantity: 0,
          product: ""
        }}
        onSubmit={(values) => handleAddQuantity(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
          <div className="inputs-container">
            <div className="row">
              { error && <ErrorMessage text={error}/>}
            </div>
            <div className="row">
              <label htmlFor="operation">Operation Name</label>
              <Input
                placeHolder={"Operation Name IN/OUT"}
                type={"text"}
                width={100}
                onChange={handleChange('operation')}
                onBlur={() => setFieldTouched("operation")}
              />
              { touched.operation && <ErrorMessage text={errors.operation}/> }
            </div>
            <div className="row">
              <label htmlFor="quantity">Quantity Number</label>
              <Input
                placeHolder={"Quantity Number"}
                type={"number"}
                width={100}
                onChange={handleChange('quantity')}
                onBlur={() => setFieldTouched("quantity")}
              />
              { touched.quantity && <ErrorMessage text={errors.quantity}/> }
            </div>
            <div className="row">
              <label htmlFor="product">Product</label>
              <Select 
              data={products} 
              onChange={handleChange('product')}
              placeHolder={'Choose Product'}
              width={100}
              onBlur={() => setFieldTouched("product")}
              />
              { touched.product && <ErrorMessage text={errors.product}/> }
            </div>

            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                text={ loading ? 'Loading...' : "Add Quantity" }
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

export default AddQuantity;
