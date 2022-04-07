
function Button(props){
  return (
    <div className="button" id={props.name}>
    {props.content}
    </div>
  );
}

export default Button;
