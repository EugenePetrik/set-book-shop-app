const retryAsync = async (fn, retries = 3) => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (attempt === retries) throw error;
    }
  }
};

module.exports = { retryAsync };
