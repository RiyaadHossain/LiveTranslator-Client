import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    return token ? token : null;
};

export const setToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};