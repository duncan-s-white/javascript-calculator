function Button({ id, type, dispatch, content }) {
  if (!content) content = type;
  return (
    <div className="button" id={id} onClick={() => dispatch({ type: type })}>
      {content}
    </div>
  );
}

export default Button;
