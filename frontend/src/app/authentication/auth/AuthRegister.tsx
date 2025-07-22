import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link  from 'next/link';
import {register} from '@/services/authAuthService';
import { RegisterType } from '@/types/index';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (data.password !== data.confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    if (!data.name || !data.email || !data.password) {
        alert("Please fill in all fields");
        return;
    }
    if (typeof data.password === "string" && data.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }

    try{
        delete data.confirmPassword;
        const registerData: RegisterType = data as unknown as RegisterType
        await register(registerData);
    } catch (error) {
        console.error("Registration failed:", error);
    }
};
const AuthRegister = ({ title, subtitle, subtext }: registerType) => (
    <>
        {title ? (
            <Typography
                variant="h2"
                sx={{
                    fontWeight: "700",
                    mb: 1
                }}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <form onSubmit={handleSubmit}>

                <Stack sx={{
                    mb: 3
                }}>
                    <Typography
                        variant="subtitle1"
                        component="label"
                        htmlFor='name'
                        sx={{
                            fontWeight: 600,
                            mb: "5px"
                        }}>Name</Typography>
                    <CustomTextField id="name" name="name" variant="outlined" fullWidth required />

                    <Typography
                        variant="subtitle1"
                        component="label"
                        htmlFor='email'
                        sx={{
                            fontWeight: 600,
                            mb: "5px",
                            mt: "25px"
                        }}>Email Address</Typography>
                    <CustomTextField id="email" type="email" name="email" variant="outlined" fullWidth required/>

                    <Typography
                        variant="subtitle1"
                        component="label"
                        htmlFor='password'
                        sx={{
                            fontWeight: 600,
                            mb: "5px",
                            mt: "25px"
                        }}>Password</Typography>
                    <CustomTextField id="password" name="password" type="password" variant="outlined" fullWidth required/>

                    <Typography
                        variant="subtitle1"
                        component="label"
                        htmlFor='confirmPassword'
                        sx={{
                            fontWeight: 600,
                            mb: "5px",
                            mt: "25px"
                        }}>Confirm Password</Typography>
                    <CustomTextField id="confirmPassword" name="confirmPassword" type="password" variant="outlined" fullWidth required/>

                </Stack>
                <Button type='submit' color="primary" variant="contained" size="large" fullWidth  >
                    Sign Up
                </Button>
            </form>

        </Box>
        {subtitle}
    </>
);

export default AuthRegister;
