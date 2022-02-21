const checkIfErrorExist = (err) => {
  return Object.keys(err).filter((keys) => err[keys] !== "").length > 0;
};

export default checkIfErrorExist;
