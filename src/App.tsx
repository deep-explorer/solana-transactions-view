import "./App.css";
import { CollapsibleTable } from "./component/CollapsibleTable";

function App() {
  return (
    <div>
      <div className="relative">
        <h1 className="text-4xl font-serif text-center p-5 h-[50px] ">
          Account's Transactions
        </h1>
      </div>
      <CollapsibleTable />
    </div>
  );
}

export default App;
