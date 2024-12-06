"use client";
import * as React from "react";
import FormInput from "@/components/FormInput";
import Image from "next/image";
import AccountImage from "../../../public/access_account.svg";
import { callAPI } from "@/config/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Formik, Form, FormikProps } from "formik";
import { SignUpSchema } from "./SignUpSchema";
import { ISignUpValue } from "./type";

interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  const onSignUp = async (formValue: ISignUpValue) => {
    try {
      // Lengkapi fungsi ini hingga bisa menambah data ke file db.json
      const res = await callAPI.post("/users", {
        name: `${formValue.firstName} ${formValue.lastName}`,
        email: formValue.email,
        password: formValue.password,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-5 md:px-24 py-14 bg-slate-800 h-screen block md:flex items-center gap-16">
      <div
        id="left"
        className="hidden md:flex w-full md:w-1/2 flex-col justify-center space-y-5"
      >
        <h1 className="text-3xl text-white font-bold">Post your story</h1>
        <p className="text-white text-2xl font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <Image src={AccountImage} alt="image" width={350} className="m-auto" />
      </div>
      <div id="right" className="w-full md:w-1/2 h-fit">
        <Card>
          <CardHeader>
            <h1 className="text-2xl">Sign up now</h1>
          </CardHeader>
          <CardContent>
            <Formik
              validationSchema={SignUpSchema}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confPassword: "",
              }}
              onSubmit={(values, { resetForm }) => {
                console.log("Value from input formik :", values);
                onSignUp(values);
                resetForm();
              }}
            >
              {(props: FormikProps<ISignUpValue>) => {
                const { values, handleChange, errors, touched } = props;
                return (
                  <Form>
                    <div className="py-2 md:py-6 space-y-5">
                      <div className="flex gap-8">
                        <FormInput
                          id="firstName"
                          type="text"
                          label="First name"
                          onChange={handleChange}
                          value={values.firstName}
                        />
                        <FormInput
                          id="lastName"
                          type="text"
                          label="Last name"
                          onChange={handleChange}
                          value={values.lastName}
                        />
                      </div>
                      <FormInput
                        id="email"
                        type="text"
                        label="Email"
                        onChange={handleChange}
                        value={values.email}
                      />
                      <p className="text-red-500">{errors.email}</p>
                      <FormInput
                        id="password"
                        type="password"
                        label="Password"
                        onChange={handleChange}
                        value={values.password}
                      />
                      <p className="text-red-500">{errors.password}</p>
                      <FormInput
                        id="confPassword"
                        type="password"
                        label="Confirmation Password"
                        onChange={handleChange}
                        value={values.confPassword}
                      />
                      <div className="flex items-center gap-4">
                        <Button
                          type="submit"
                          className="bg-gray-400 text-white px-2 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full shadow"
                        >
                          Sign Up
                        </Button>
                        <p className="text-sm">Already have an account ?</p>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
