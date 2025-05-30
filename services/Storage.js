import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@energy_events';

export const getEvents = async () => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json != null ? JSON.parse(json) : [];
};

export const saveEvent = async (event) => {
  const data = await getEvents();
  data.push(event);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const USER_KEY = '@user_profile';

export const saveUser = async (user) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
  const json = await AsyncStorage.getItem(USER_KEY);
  return json ? JSON.parse(json) : null;
};