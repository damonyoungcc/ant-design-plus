const isUrl = (path) => {
  if (!path) return false;
  if (!path.startsWith('http')) {
    return false;
  }
  try {
    const url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
};

export default isUrl;
