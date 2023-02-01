export const removeDuplicates = (array) => {
  array.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      array.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });
};
