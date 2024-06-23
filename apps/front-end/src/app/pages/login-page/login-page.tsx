export const LoginPage = () => {
  const sendError = () => {
    throw new Error('This is an error');
  };

  return (
    <div className="flex flex-col">
      <div>
        <p>Account:</p>
        <input />
      </div>
      <div>
        <p>Password:</p>
        <input type="password" />
      </div>
      <button onClick={sendError}>Send Error</button>
    </div>
  );
};
