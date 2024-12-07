const Dropdowns = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>; // Handle the case where data is not available
  }

  const keys = Object.keys(data); // Safe to call because we checked for null/undefined

  return (
    <div>
      {keys.map(key => (
        <div key={key}>{key}: {data[key]}</div>
      ))}
    </div>
  );
};
