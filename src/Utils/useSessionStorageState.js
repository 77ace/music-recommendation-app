import { useState, useEffect } from "react";

// this custom hook will be used to store/retrieve states from the session storage, to maintain user selection on page reload
const useSessionStorageState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorageState;
