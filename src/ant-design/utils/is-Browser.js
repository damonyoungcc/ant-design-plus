const isBrowser = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.matchMedia !== 'undefined'
  );
};

export default isBrowser;
