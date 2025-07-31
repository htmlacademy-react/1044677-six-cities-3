import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner" data-testid="spinner">
      <div className="loader">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
