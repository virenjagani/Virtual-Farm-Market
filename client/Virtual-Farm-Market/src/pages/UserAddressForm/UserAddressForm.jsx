import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect } from "react";
import {
  GET_CITY_LIST,
  GET_PROVINCE_LIST,
} from "../../Redux/Reducers/authReducer";

const initialValues = {
  streetNumber: "",
  homeAddress: "",
  province: "",
  city: "",
  postalCode: "",
  defaultAddress: false, //No Validation
  accessCode: "", //No Validation //Can be null
};

const validationSchema = Yup.object().shape({
  streetNumber: Yup.string()
    .matches(/^[0-9]+$/, "Street Number must contain only numbers")
    .required("Street Number is required"),
  homeAddress: Yup.string().required("Street Name is required"),
  city: Yup.string().required("City is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string()
    .matches(/^([A-Z]\d[A-Z] ?\d[A-Z]\d)$/, "Invalid Postal Code format")
    .required("Postal code is required"),
});

function UserAddressForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: GET_CITY_LIST });
    dispatch({ type: GET_PROVINCE_LIST });
  }, []);

  const handleSubmit = (values) => {
    const homeAddressCombined = values.streetNumber + ", " + values.homeAddress;
    const finalValues = {
      homeAddress: homeAddressCombined,
      province: values.province,
      city: values.city,
      postalCode: values.postalCode,
      defaultAddress: values.defaultAddress, //No Validation
      accessCode: values.accessCode, //No Validation //Can be null
    };

    console.log(finalValues);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Add Address
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                      Address:
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      id="streetNumber"
                      name="streetNumber"
                      autoComplete="streetNumber"
                      placeholder="Street Number"
                    />
                    {formik.touched.streetNumber &&
                      Boolean(formik.errors.streetNumber) && (
                        <Box sx={{ mb: 2 }}>
                          <ErrorMessage
                            name="streetNumber"
                            id="streetNumber"
                            component="div"
                            className="error text-danger"
                          />
                        </Box>
                      )}
                    <Field
                      as={TextField}
                      fullWidth
                      id="homeAddress"
                      name="homeAddress"
                      autoComplete="homeAddress"
                      placeholder="Apt, Suite, Unit, Building"
                    />
                    <ErrorMessage
                      name="homeAddress"
                      id="homeAddress"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                      City:
                    </Typography>

                    <Field
                      as={Select}
                      fullWidth
                      id="city"
                      name="city"
                      autoComplete="city"
                    >
                      {auth.cityList &&
                        auth.cityList.map((item, index) => (
                          <MenuItem value={item.name} key={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Field>
                    <ErrorMessage
                      name="city"
                      id="city"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={8}>
                        <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                          Province/Territory:
                        </Typography>
                        <Field
                          as={Select}
                          fullWidth
                          id="province"
                          name="province"
                          autoComplete="province"
                        >
                          {auth.provinceList &&
                            auth.provinceList.map((item, index) => (
                              <MenuItem value={item.name} key={item._id}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="province"
                          id="province"
                          component="div"
                          className="error text-danger"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="h5" sx={{ mt: { xs: 3, sm: 2 } }}>
                          Postal Code:
                        </Typography>
                        <Field
                          as={TextField}
                          fullWidth
                          id="postalCode"
                          name="postalCode"
                          autoComplete="postalCode"
                          placeholder="V2V 2V2 or V2V2V2"
                        />
                        <ErrorMessage
                          name="postalCode"
                          id="postalCode"
                          component="div"
                          className="error text-danger"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={FormControlLabel}
                      control={
                        <Field
                          as={Checkbox}
                          name="defaultAddress"
                          color="primary"
                        />
                      }
                      label="Make this my default address"
                    />
                  </Grid>
                  <br />
                  <br />
                  <br />
                  <br />

                  <Grid item xs={12}>
                    <Typography variant="h4">
                      Add delivery instructions (optional)
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      Do we need a security code or a call box number to access
                      this building?
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      id="accessCode"
                      name="accessCode"
                      autoComplete="accessCode"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<AddCircle />}
                    >
                      Add Address
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
}

export default UserAddressForm;
