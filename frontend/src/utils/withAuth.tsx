
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { tokenExist } from "@/utils/cokiesHelper";
import { useSelector,useDispatch } from "react-redux";
import { setLogIn } from "@/redux/slices/isLogedInSlice";


const withAuth = (WrappedComponent: any) => {

  const Wrapper = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLogedIn = useSelector((state: any) => state.isLogedIn.value);

    useEffect(() => {

      if(!isLogedIn && tokenExist(isLogedIn)){
        dispatch(setLogIn());

      }

      if (!tokenExist(isLogedIn)) {
        router.replace("/authentication/login");
      }
    },  [isLogedIn, dispatch]);

    if (!isLogedIn) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
