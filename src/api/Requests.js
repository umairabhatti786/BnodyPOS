import Url from "./baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignUp_Request = async (data) => {
  console.log("DataLogin",data)
  try {
    const inst = axios.create({
      baseURL: Url,
      headers: {
        // "Content-Type": "application/json",
      },
    });
    const response = await inst.post("oauth/create", data);

    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("post error", error.response);
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Invalide Error!");
    }
  }
};
const Delete_Request = async (data) => {
  try {
    const inst = axios.create({
      baseURL: Url,
      headers: {
        // "Content-Type": "application/json",
      },
    });
    const response = await inst.delete("oauth/delete", data);

    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("post error", error.response);
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Invalide Error!");
    }
  }
};

const Get_All_Events = async (body) => {
  try {
    const inst = axios.create({
      baseURL: Url,
    });
    const response = await inst.get("events/getallevents", body);
    // console.log("Get_All_Events response", response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("post error", error.response);
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Invalide Error!");
    }
  }
};

const Get_Single_Event = async (eventID) => {
  try {
    const inst = axios.create({
      baseURL: Url,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    const response = await inst.get(`events/getevent/${eventID}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      return new Error(JSON.stringify(error.response.data.message));
    } else {
      throw new Error("Invalid Error!");
    }
  }
};
const Like_Single_Event = async (eventID, body) => {
  try {
    const inst = axios.create({
      baseURL: Url,
    });
    const response = await inst.post(`events/addfavorite/${eventID}`, body);

    return response.data;
  } catch (error) {
    if (error.response) {
      return new Error(JSON.stringify(error.response.data.message));
    } else {
      throw new Error("Invalid Error!");
    }
  }
};
const UnLike_Single_Event = async (eventID, body) => {
  try {
    const inst = axios.create({
      baseURL: Url,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    const response = await inst.post(`events/removefavorite/${eventID}`, body);

    return response.data;
  } catch (error) {
    if (error.response) {
      return new Error(JSON.stringify(error.response.data.message));
    } else {
      throw new Error("Invalid Error!");
    }
  }
};

const User_Login = async (data) => {
  console.log("ataCon", data);
  try {
    let config = {
      method: "post",
      url: "https://assemble-backend.onrender.com/api/oauth/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log("response", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    return response.data;
  } catch (error) {
    if (error.response) {
      return new Error(JSON.stringify(error.response.data.message));
    } else {
      throw new Error("Invalid Error!");
    }
  }
};

const delete_user_Account = async (token, userId) => {
  try {
    const inst = axios.create({
      baseURL: Url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await inst.delete(`users/delete-account/${userId}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      return new Error(JSON.stringify(error.response.data.message));
    } else {
      throw new Error("Invalid Error!");
    }
  }
};

export {
  Get_All_Events,
  Get_Single_Event,
  User_Login,
  SignUp_Request,
  delete_user_Account,
  Like_Single_Event,
  UnLike_Single_Event,
  Delete_Request,
};
