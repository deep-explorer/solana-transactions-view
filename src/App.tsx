import "./App.css";
import { CollapsibleTable } from "./component/CollapsibleTable";

function App() {
  return (
    <div className="App-header">
      <div>
        <h1>Account's Transactions</h1>
        {/* <div>
          <h3>Address:</h3>
          <span>rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt</span>
        </div> */}
      </div>
      <CollapsibleTable />
    </div>
  );
}

export default App;
