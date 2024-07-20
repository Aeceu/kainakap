export const handleFile = (e) => {
  return new Promise((resolve, reject) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      const result = reader.result;
      resolve(result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
};
