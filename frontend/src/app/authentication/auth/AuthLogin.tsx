import React from "react";
import { login } from "@/services/authAuthService";
import { LogInType } from "@/types/index";
import { useRouter } from "next/navigation";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";




const AuthLogin = ({ title, subtitle, subtext }: {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();

  
  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try{
        await login(data as unknown as LogInType);
        localStorage.setItem("isLogedIn","true");
        router.replace("/");

    } catch (error) {
        alert(error);
    }
  }

  return (<>
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
    <form onSubmit={handleSubmit}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="email"
              sx={{
                fontWeight: 600,
                mb: "5px"
              }}>
              Email
            </Typography>
            <CustomTextField id="email" name="email" type="email" variant="outlined" fullWidth required />
          </Box>
          <Box sx={{
            mt: "25px"
          }}>
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="pass"
              sx={{
                fontWeight: 600,
                mb: "5px"
              }}>
              Password
            </Typography>
            <CustomTextField id="password" name="password" type="password" variant="outlined" fullWidth required />
          </Box>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              my: 2
            }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            {/* <Typography
              component={Link}
              href="/"
              sx={{
                fontWeight: "500",
                textDecoration: "none",
                color: "primary.main"
              }}>
              Forgot Password ?
            </Typography> */}
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            // component={Link}
            // href="/"
            type="submit"
          >
            Sign In
          </Button>
        </Box>
    </form>
    {subtitle}
  </>
);

};

export default AuthLogin;
