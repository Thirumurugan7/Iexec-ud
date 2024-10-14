export const generateRandomNumbers = () => {
      const regexPattern = /^\d{10}$/;
      const randomNumber = Math.random().toString().substr(2, 10);
    
      return randomNumber.replace(regexPattern, '');
  };
  